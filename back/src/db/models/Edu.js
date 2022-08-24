import { EduModel } from "../schemas/edu";

class Edu {
    //학력 추가
  static async create({ newEdu }) {
    const createdNewEdu = await EduModel.create(newEdu);
    return createdNewEdu;
 }

 //학력 목록 중에서 Id에 해당하는 학력 찾기
 static async findByEduId({Id}){
     const edu =await EduModel.findOne({Id});
     return edu
 }

 //전체 학력 조회
 static async findAllEdu(data){
     const eduAll = await EduModel.find({user_id:data});
     return eduAll
 }

 // update 할 때 해당하는 id를 하나 찾고,내용적으면 업데이트, option은 수정 취소버튼?? 
 static async updateEdu({id, fieldToUpdate, newValue}){
    console.log("여기는 왔다!!!")
    console.log(id)
    console.log(fieldToUpdate,newValue)
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateEdu = await EduModel.findOneAndUpdate(
            filter,
            update,
            option
            );
            console.log(updateEdu)
            return updateEdu;

}


}

export {Edu};