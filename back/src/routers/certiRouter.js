import { certiService } from "../services/certiService";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
const certiRouter = Router();

//1. 자격증 추가(ok)
certiRouter.post("/create", login_required, async (req, res, next) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.when_date;
    const user_id = req.currentUserId;
    // console.log(user_id);

    const newCerti = await certiService.addCerti({
      user_id,
      title,
      description,
      date,
    });

    res.status(200).json(newCerti);
  } catch (error) {
    next(error);
  }
});

//2. 자격증 정보 전체 조회(ok)
certiRouter.get("/certificatelist", login_required, async (req, res, next) => {
  try {
    const user_id = req.currentUserId;

    const certiList = await certiService.getCertificate({ user_id });
    // console.log("Hey",certiList)
    res.status(200).json(certiList);
  } catch (error) {
    next(error);
  }
});

//3. 자격증 정보 수정
certiRouter.put("/edit", login_required, async (req, res, next) => {
  try {
    const user_id = req.currentUserId
    const id = req.body.id;
    const title = req.body.title??null;
    const description = req.body.description??null;
    const when_date = req.body.when_date??null;

    const toUpdate = {
      title,
      description,
      when_date
    }
    // console.log(1)
    const editCerti = await certiService.editCerti({user_id, toUpdate, id})
    
    // res.status(200).json("Hello");
    res.status(201).json(editCerti);
  } catch (error) {
    next(error);
  }
});

//4. 자격증 정보 삭제
certiRouter.delete("/delete/:id", login_required, async (req, res, next) => {
  try {
    const id = req.params.id;
    // console.log("params",id)
    const user_id =req.currentUserId
    // console.log("user_id:",user_id, )
    // console.log("id:",id, )

    const deleteResult = await certiService.deleteCerti({user_id, id})
    // res.status(200).json("hello") 
    res.status(201).json(deleteResult);
  } catch (error) {
    next(error);
  }
});


//5. 네트워크 정보 전체 조회
certiRouter.get("/certificatelist/:id", login_required, async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("🐰")
    const certiList = await certiService.getCertificateId({ id });
    res.status(200).json(certiList);
  } catch (error) {
    next(error);
  }
});

export { certiRouter };
