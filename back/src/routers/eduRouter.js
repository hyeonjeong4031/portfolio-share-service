import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { eduService } from "../services/eduService";
const educationRouter = Router();

//학력 추가 라우터
educationRouter.post(
  "/education/create",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId; //userid이걸로 받는거 맞는지 다시확인
      const school = req.body.school;
      const major = req.body.major;
      const position = req.body.position;
      //db에 자료 저장
      const education = await eduService.addEdu({
        user_id,
        school,
        major,
        position,
      });
      if (education.errorMessage) {
        throw new Error(education.errorMessage);
      }
      //디비에서 자료 빼기

      const edu = await eduService.getEduinfo(education.user_id);
                            //userid 변수 이렇게 하는게 맞나...?
      res.status(edu);

      //현재 사용자를 찾은 후에 학력추가?? 아니면 ref걸려있는
      //user_id로  학력추가?????????어디부터 잘못된게 있는지 모르겠습니당....ㅎ
    } catch (e) {
      next(e);
    }
  }
);

//2. 학력정보 조회 라우터
educationRouter.get(
  "educationlist/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const edu = await eduService.getEduinfo({ user_id });

      res.status(edu);
    } catch (error) {
      next(error);
    }
  }
);

//본인 정보 페이지에 들어가야만 수정 버튼 나오게 하는 방법?
//3. 학력정보 수정 라우터
educationRouter.put(
  "/educations/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;

      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const position = req.body.position ?? null;

      const toUpdate = { school, major, position };
      const updateEdu = await eduService.editEdu({ user_id, toUpdate });

      if (updateEdu.errorMessage) {
        throw new Error(updateEdu.errorMessage);
      }

      res.status(200).json(updateEdu);
    } catch (error) {
      next(error);
    }
  }
);


export { educationRouter };

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
//??이것도 만들어야하나용>? ㅜㅜ
