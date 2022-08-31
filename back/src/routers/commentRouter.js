import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { commentService} from '../services/commentService';

const router = Router();

router.get('/',(req,res,next)=>{
    res.send('comment Router Worked')
})

router.post('/add/:id',login_required, async(req,res,next)=>{
    //id별로 경로를 받는다
    try{
        const writerUserID = req.currentUserId;
        const commentedID = req.params.id;
        const description = req.body.description;
        console.log(`data in router writerUserID:${writerUserID} commentedID:${commentedID} description:${description}`)
        const result = await commentService.addComment({writerUserID, commentedID, description});
        if(result.errorMessage){
            throw new Error(result.errorMessage);
        }
        res.status(201).json(result);
    }
    catch(error){
        next(error);
    }
})


router.get('/readComment/:id',login_required, async(req,res,next)=>{
    try{
        console.log('readComment 요청 들어옴')
        const currentPageUserID = req.params.id;
        console.log(`현재 페이지 유저 : ${currentPageUserID}`);
        const result = await commentService.readComment({currentPageUserID})
        
        res.status(200).send(result)
    }
    catch(error){
        next(error)
    }
})

router.put('/fix/:commentID', login_required, async(req,res,next)=>{
    try{
        console.log('fix Router work start')
        const currentUser = req.currentUserId;
        const commentID = req.params.commentID;
        console.log('params', commentID)
        const findComment = await commentService.findCommentByCommentID({commentID});
        if(findComment.errorMessage){
            res.status(200).send(findComment)
        }
        else{
            if(findComment.writer_id != currentUser){
                console.log("write_id",findComment.writer_id )
                console.log("currentUser", currentUser)
                res.status(205).send({
                    errorMessage : "권한이 없습니다"
                })
            }
            else{
                const fixedDescription = req.body.description;
                console.log(fixedDescription, "DESCRIPTION!!!!!!!!!!")
                const result = await commentService.fixComment({commentID, fixedDescription})
                console.log("service에서 최종 리턴값 돌아옴",result)
                if(result.matchedCount == 0){
                    res.status(205).send({errorMessage : "오류가 발생했습니다"})
                }
                else
                {res.status(200).send({Message : "수정 성공"})}
            }
    }
    }
    catch(error){
        next(error)
    }
})

router.delete('/delete/:commentID', login_required, async (req,res,next)=>{
    try{
        console.log('delete실행');
        const currentUser = req.currentUserId;
        const commentID = req.params.commentID;
        console.log('params', commentID)
        const findComment = await commentService.findCommentByCommentID({commentID});
        if(findComment.errorMessage){
            res.status(200).send(findComment)
        }
        else{
            if(findComment.writer_id != currentUser){
                console.log("write_id",findComment.writer_id )
                console.log("currentUser", currentUser)
                res.status(205).send({
                    errorMessage : "권한이 없습니다"
                })
            }
            else{
                //권한이 확인되었으니까 삭제 들어감
                const deletComment = await commentService.deleteComment(commentID)
                if(deletComment.deletedCount == 0){res.status(205).send({Message : "삭제 실패"})}
                else{
                res.status(200).send({Message : "삭제 성공"})}
            }
    }
    }
    catch(error){
        next(error)
    }
})


module.exports = router