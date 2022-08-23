import { EduModel } from "../schemas/edu";

class Edu {
    //학력 추가
  static async create({ newEdu }) {
    const createdNewEdu = await EduModel.create(newEdu);
    return createdNewEdu;
 }

 //userId에 해당하는 학력 찾기
 static async findByUserId({userId}){
     const edu =await EduModel.findOne({userId});
     return edu
 }

 //전체 학력 조회
 static async findAllEdu(){
     const educations = await EduModel.find({});
     return educations
 }

 // update 할 때 해당하는 id를 하나 찾고,내용적으면 업데이트, option은 수정 취소버튼?? 
 static async updateEdu({user_Id, fieldToUpdate, newValue}){
    const filter = { userId: user_Id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateEdu = await EduModel.findOneAndUpdate(
            filter,
            update,
            option
            );
            return updateEdu;

}


}

export {Edu};