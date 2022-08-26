import { certiService } from "../services/certiService";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
const router = Router();

//1. 자격증 추가
router.post("/create",login_required,
async(req,res,next)=>{
    try {
        const title = req.body.title;
        const description = req.body.description;
        const date= req.body.when_date;
        const user_id = req.currentUserId;
        console.log(user_id)
        
        const newCerti = await certiService.addCerti({
            user_id,
            title,
            description,
            date
        } )


        res.status(200).json(newCerti)
    } catch (error) {
            next(error)        
    }


})

//2. 자격증 정보 전체 조회
router.get("/certificatelist", 
login_required,
async(req, res, next)=>{
    try {
        const user_id = req.currentUserId;
        
        const certiList = certiService.getCerti({user_id})
        res.status(200).json(certiList);
        // res.status(200).json("Hello");
        
    } catch (error) {
        next(error)
    }
})

//3. 자격증 정보 수정
router.put("/edit",
login_required,
async(req, res, next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
)


//4. 자격증 정보 삭제
router.delete("/delete",
login_required,
async(req, res, next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
)




export {router}