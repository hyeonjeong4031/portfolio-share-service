import { User, Edu } from "../db"


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
       

        const createNewEdu = await Edu.create({newEdu});
        createNewEdu.errorMessage = null;
        return createNewEdu ; 
        
        
    }  
    
  //2. 학력정보 조회  
    //네트워크페이지에서 유저 정보 호출시 같이 나오도록 하는 서비스
    static async getEduinfo({user_id}){
    const edu = await Edu.findById({user_id});
        return edu
    }
        

    
    
    
    //3. 학력정보 수정
    static async editEdu({user_id, toUpdate}){
        const user = await User.findById({user_id});
       
        if(!user){
            const errorMessage = "유저를 찾을 수 없습니다."
            return { errorMessage };
            
        }// 이 if문 지워도 되는건가요?? 뭔가 필요 없어보임 ㅎ

        if( toUpdate.school){
            const fieldToUpdate = "school";
            const newValue = toUpdate.school;
            user = await Edu.update({user_id, fieldToUpdate, newValue})
        }
        if( toUpdate.major){
            const fieldToUpdate = "major";
            const newValue = toUpdate.major;
            user = await Edu.update({user_id, fieldToUpdate, newValue})
        }
        if( toUpdate. position){
            const fieldToUpdate = "position";
            const newValue = toUpdate.position;
            user = await Edu.update({user_id, fieldToUpdate, newValue})
        }
        return user;
    
    }  



}


export {eduService}
