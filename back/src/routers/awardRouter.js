import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
// import { userAuthService } from "../services/userService";
import { awardService} from '../services/awardService';



const router = Router();

router.get('/',(req,res,next)=>{
    res.send('hello world')
})

//수상 이력 등록 api
router.post('/add', login_required,   async (req,res,next)=>{
    try{
        console.log("수상이력 추가")
        const user_id = req.currentUserId;
        const awardTitle = req.body.title;
        const awardDescription = req.body.description;
        console.log(`현재 currentId : ${user_id}, body내용 : ${req.body.title}`)
        console.log(awardTitle, awardDescription);
        const newAward = await awardService.addAward({
            writer : user_id, 
            title : awardTitle, 
            description : awardDescription
        });

        if(newAward.errorMessage){
            throw new Error(newAward.errorMessage);
        }
        res.status(201).json(newAward);
    }
    catch(error){
        next(error);
    }
}
);

router.get('/readAll', login_required, async(req,res,next)=>{
    try{
        const user_id = req.currentUserId;
        const allAward = await awardService.readAllAward({writer : user_id})
        res.status(200).send(allAward)
    }
    catch(error){
        next(error);
    }
})


router.get('/readAll/:id', login_required, async(req,res,next)=>{
    //id는 url에서 받아오지만 로그인 하지 않은 사용자가 요청하면 안될거 같아서 login_required를 제거하지 않음
    try{
        console.log('네트워크 - 다른 유저 award 읽어오기')
        const user_id = req.params.id; //사용자의 아이디를 url에서 받아옴
        const userAward = await awardService.readAllAward({writer : user_id})
        if (userAward.errorMessage) {
            throw new Error(userAward.errorMessage);
          }
        res.status(200).send(userAward)
    }
    catch(error){
        next(error);
    }
})

router.put('/fix/:awardID', login_required, async(req,res,next)=>{
    try{
        //해당 아이디를 찾기 위해서 기존 아이디의 소유자를 착음
        console.log('id를 찾기 시작했습니다')
        const awardID = req.params.awardID;
        const currentUser = req.currentUserId;
        const awardThis = await awardService.readOneAward({awardID})
        //해당 상의 소유자와 현재 접속자가 일치하면 해당 글을 보여주고 아니면 에러 메시지 전송
        if (awardThis.errorMessage) {
            throw new Error(awardThis.errorMessage);
          }
        //에러가 없는 상태 , else문 쓰려다가 그냥 안씀
        if(currentUser != awardThis.writer_id){
            const errorMessage="권한이 없습니다"
            throw new Error(errorMessage);
        }
        //해당 글의 작성자가 사용자랑 일치 
        const fixedTitle = req.body.title;
        const fixedDescription = req.body.description;
        const fixedAward = await awardService.fixAward({
            awardID : awardID, 
            title : fixedTitle,
            description : fixedDescription})
        if(
            fixedAward.matchedCount == 0
        ){
            const message = {
                message : "에러가 발생해 정보 수정에 실패했습니다"}
        }
        const message = {
            message : "정보 변환에 성공했습니다"}
        res.status(200).send(message)
    }
    catch(error){
        //에러처리 라우터에 라우터를 넘겨줌
        next(error);
    }
})

router.delete('/delete/:awardID', login_required, async(req,res,next)=>{
    try{
        //해당 아이디를 찾기 위해서 기존 아이디의 소유자를 착음
        console.log('id를 찾기 시작했습니다')
        const awardID = req.params.awardID;
        const currentUser = req.currentUserId;
        const awardThis = await awardService.readOneAward({awardID})
        //해당 상의 소유자와 현재 접속자가 일치하면 해당 글을 보여주고 아니면 에러 메시지 전송
        if (awardThis.errorMessage) {
            throw new Error(awardThis.errorMessage);
          }
        //에러가 없는 상태 , else문 쓰려다가 그냥 안씀
        if(currentUser != awardThis.writer_id){
            const errorMessage="권한이 없습니다"
            throw new Error(errorMessage);
        }
        //해당 글의 작성자가 사용자랑 일치 
        
        const fixedAward = await awardService.deleteAward({
            awardID : awardID
        })
        const message = {
            message : "삭제에 성공했습니다"}
        if(fixedAward.deletedCount == 0){
            message = {
                message : "에러가 발생해 정보 삭제에 실패했습니다"}
        }
        console.log(fixedAward)
        
        res.status(200).send(message)
    }
    catch(error){
        //에러처리 라우터에 라우터를 넘겨줌
        next(error);
    }
})




module.exports = router;