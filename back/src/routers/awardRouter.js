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
        console.log(req)
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


module.exports = router;