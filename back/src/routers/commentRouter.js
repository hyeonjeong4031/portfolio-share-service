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

    }
})


module.exports = router