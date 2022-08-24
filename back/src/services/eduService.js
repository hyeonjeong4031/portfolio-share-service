import { User, Edu } from "../db"
import { v4 as uuidv4 } from "uuid"; //unique id 생성
import jwt from "jsonwebtoken";

class eduService{

//1. 학력추가
    static async addEdu({user_id, school, major, position}){
//라우터에서 이 함수 호출하고 객체 형식 정해주기
//이건 데이터베이스에 저장을 위한 함수! 


        if(!school){
            const errorMessage = "학교이름을 입력해주세요."
            return errorMessage
        }
        if(!major){
            const errorMessage = "전공을 선택하여주세요."
            return errorMessage
        }
       

            const eduId = uuidv4();//자료 아이디를 uuidv4로 하는 이유?
            const newEdu = 
            {id:eduId, user_id:user_id, school: school, major:major, position:position}


            const createNewEdu = await Edu.create({newEdu});
            createNewEdu.errorMessage = null;
            console.log("db 저장 완료")
            return createNewEdu ; 

        
    }  
    
  //2. 본인 학력정보 조회  
    //네트워크페이지에서 유저 정보 호출시 같이 나오도록 하는 서비스
    static async getEduinfo({user_id}){
        console.log("user_id:",{user_id})
        console.log("user_id:",user_id)
        console.log(typeof(user_id))

        if(!user_id){
            const errorMessage  = "정보를 조회할 대상이 없음"
            return {errorMessage}
        }

    const alledu = await Edu.findAllEdu(user_id);
        return alledu
    }
        


    
    
    //3. 학력정보 수정
    static async editEdu({user_id, toUpdate}){
        let user = await Edu.findByEduId({user_id});
        const id = user.id
        console.log(user)
        console.log("!!!!!!")
        console.log("수정 전:", user.id)
        console.log("수정할 내용:", toUpdate.school)
       
        if(!user){
            const errorMessage = "학력수정에러-유저를 찾을 수 없습니다."
            return { errorMessage };
            
        }

        if( toUpdate.school){
            const fieldToUpdate = "school";
            const newValue = toUpdate.school;
            user = await Edu.updateEdu({id, fieldToUpdate, newValue})
            console.log("리턴 되나?")
        }

        console.log("!!!!!!")
        console.log("수정 후 내용:", user.school)
        if( toUpdate.major){
            const fieldToUpdate = "major";
            const newValue = toUpdate.major;
            user = await Edu.updateEdu({id, fieldToUpdate, newValue})
        }
        if( toUpdate. position){
            const fieldToUpdate = "position";
            const newValue = toUpdate.position;
            user = await Edu.updateEdu({id, fieldToUpdate, newValue})
        }
        return user;
    
    }  
////DB에 수정내용 저장이 안되니까 그거 수정하기


}


export {eduService}
