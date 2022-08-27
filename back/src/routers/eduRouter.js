import is from "@sindresorhus/is";
import { Router } from "express";
import { User, Edu } from "../db";
import { login_required } from "../middlewares/login_required";
import { eduService } from "../services/eduService";
const eduRouter = Router();

eduRouter.get("/", (req, res, next) => {
  res.send("hello!!");
});

//학력 추가 라우터
eduRouter.post("/create", login_required, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    const school = req.body.school;
    const major = req.body.major;
    const position = req.body.position;
    console.log(req.body);
    console.log(`${school}재학중`);
    const newEdu = await eduService.addEdu({
      user_id,
      school,
      major,
      position,
    });
    if (newEdu.errorMessage) {
      throw new Error(newEdu.errorMessage);
    }
    //db에 자료 저장 완료
    //디비에서 자료 빼기

    res.status(200).json(newEdu);
    //아하 디비에 이게 저장=> educationlist 라우터로 res?
    //그러면 이 코드에서 res를 해주는 이유?
  } catch (e) {
    next(e, console.log("add router error"));
  }
});

//2. 학력정보 조회 라우터
eduRouter.get(
  "/educationlist",
  login_required,
  async function (req, res, next) {
    try {
      console.log(req.body.user_id);
      console.log(req.currentUserId);
      const user_id = req.currentUserId;
      // 네트워크 타인 페이지 들어가서 req.body 로

      const edu = await eduService.getEduinfo({ user_id });

      res.status(201).json(edu);
    } catch (error) {
      next(error);
    }
  }
);

//본인 정보 페이지에 들어가야만 수정 버튼 나오게 하는 방법?
//3. 학력정보 수정 라우터
eduRouter.put("/:id", login_required, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;

    const id = req.body.id;
    console.log(user_id);
    // console.log(id)
    let school = req.body.school ?? null;
    let major = req.body.major ?? null;
    let position = req.body.position ?? null;
    // ?? 앞 포지션 내용있으면 앞의값, 앞 포지션 내용 없으면 뒤의 값
    let toUpdate = { school, major, position, id };
    console.log("여기까지 오나?");

    const updateEdu = await eduService.editEdu({ user_id, toUpdate });
    console.log("여기까지 오면 성공이지!!");

    if (updateEdu.errorMessage) {
      throw new Error(updateEdu.errorMessage);
    }

    res.status(200).json(updateEdu);
  } catch (error) {
    next(error);
  }
});

//4. 삭제 기능 구현
eduRouter.delete(
  "/delete/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      const id = req.body.id;
      await Edu.deleteEdu({ id, user_id });
      //list는 delete 후 남은 list를 res해주면 된다
      console.log("hello!!!");
      const edu = await eduService.getEduinfo({ user_id });

      res.status(200).json(edu);
    } catch (error) {
      next(error);
    }
  }
);

// 네트워크 라우터-----------------------------------

//학력 추가 라우터
eduRouter.post(
  "/create/network",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      const school = req.body.school;
      const major = req.body.major;
      const position = req.body.position;
      console.log(req.body);
      console.log(`${school}재학중`);
      const newEdu = await eduService.addEdu({
        user_id,
        school,
        major,
        position,
      });
      if (newEdu.errorMessage) {
        throw new Error(newEdu.errorMessage);
      }

      res.status(200).json(newEdu);
    } catch (e) {
      next(e, console.log("add router error"));
    }
  }
);

//2. 학력정보 조회 라우터
eduRouter.get(
  "/educationlist/network",
  login_required,
  async function (req, res, next) {
    try {
      console.log(req.body.user_id);
      console.log(req.currentUserId);
      const user_id = req.body.user_id || req.currentUserId;
      // 네트워크 타인 페이지 들어가서 req.body 로

      const edu = await eduService.getEduinfo({ user_id });

      res.status(201).json(edu);
    } catch (error) {
      next(error);
    }
  }
);

//3. 학력정보 수정 라우터
eduRouter.put("/network/:id", login_required, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;

    const id = req.body.id;
    console.log(user_id);
    // console.log(id)
    let school = req.body.school ?? null;
    let major = req.body.major ?? null;
    let position = req.body.position ?? null;
    // ?? 앞 포지션 내용있으면 앞의값, 앞 포지션 내용 없으면 뒤의 값
    let toUpdate = { school, major, position, id };
    console.log("여기까지 오나?");

    const updateEdu = await eduService.editEdu({ user_id, toUpdate });
    console.log("여기까지 오면 성공이지!!");

    if (updateEdu.errorMessage) {
      throw new Error(updateEdu.errorMessage);
    }

    res.status(200).json(updateEdu);
  } catch (error) {
    next(error);
  }
});

//4. 삭제 기능 구현
eduRouter.delete(
  "/delete/network/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      const id = req.body.id;
      await Edu.deleteEdu({ id, user_id });
      //list는 delete 후 남은 list를 res해주면 된다
      console.log("hello!!!");
      const edu = await eduService.getEduinfo({ user_id });

      res.status(200).json(edu);
    } catch (error) {
      next(error);
    }
  }
);

export { eduRouter };

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
//??이것도 만들어야하나요>?
