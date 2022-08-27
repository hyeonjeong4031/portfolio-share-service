import { Certificate  } from "../db";// db에 연결된 데이터 가져옴
import { v4 as uuidv4 } from "uuid"; //unique id 생성
import { certiModel } from "../db/schemas/certi";
 


class certiService{
    //1. add
    static async addCerti({ user_id,title, description, date}){
        const certiId = uuidv4();
        
        if(!title){
            const errorMessage = "title is required"
            return errorMessage
        }
        if(!date){
            const errorMessage = "date is required"
            return errorMessage
        }


        const data = ({
            id : certiId,
            user_id: user_id,
            title: title,
            description: description,
            when_date: date
        })
        const result = await Certificate.addCerti({data})
        return result
    }



    //2. get
    static async getCerti({user_id}){
        if(!user_id){
            return "user_id is required"
        }
        const getCertilist = Certificate.getCerti({user_id})
        console.log("????:" ,getCertilist)
        return getCertilist
    }

    //3. edit
    //4. delete


};


export { certiService };