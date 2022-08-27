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
    static async getCertificate({user_id}){
        if(!user_id){
            return "user_id is required"
        }
        const getCertilist = await Certificate.getCerti({user_id})
        console.log("????:" ,getCertilist)
        console.log("?!!!" ,typeof(getCertilist))

        return getCertilist
    }

    //3. edit
    //user_id랑 게시물의 user_id, id랑 게시글의 id 확인
    static async editCerti({user_id, toUpdate, id}){
       const CertiData1 = await Certificate.getCerti({user_id})
       const CertiData2 = await Certificate.getCertiId({id})
       //     return
       // }
       let editCerti = await CertiData2[0]
       console.log("serviceData:",toUpdate)
       console.log("DATA1,",CertiData1[0].user_id)
       console.log(" DATA2:",CertiData2[0].id)
       console.log("id:",id)

       if(user_id !== CertiData1[0].user_id){
           const errorMessage = "User_id does not match "
           return errorMessage
       }
       if(id !== CertiData2[0].id){
           const errorMessage = "Certificate_id does not match "
           return errorMessage
       }
       
        if(toUpdate.title){
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            editCerti = await Certificate.editCerti({
                id,
                fieldToUpdate,
                newValue
            })
        }
        if(toUpdate.description){
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            editCerti = await Certificate.editCerti({
                id,
                fieldToUpdate,
                newValue
            })
        }
        if(toUpdate.when_date){
            const fieldToUpdate = "when_data";
            const newValue = toUpdate.when_date;
            editCerti = await Certificate.editCerti({
                id,
                fieldToUpdate,
                newValue
            })
        }
        console.log(editCerti)
        return editCerti

    


    }




    //4. delete


};


export { certiService };