import { certiModel } from "../schemas/certi";

class Certificate{

    static async addCerti({data}){
        const createOne = await certiModel.create(data)
                return createOne
    }

 
    static async getCerti({user_id}){
        const certificates = await certiModel.find({user_id})
        console.log("모델 자격증 유저아이디로 찾기user_id",certificates)

        return certificates
    }
    static async getCertiId({id}){
        console.log("모델 자격증 id:",id)
        const certificates = await certiModel.findOne({id})
        
        console.log("모델 자격증 id로 찾기id:",certificates)
        return certificates
    }
    static async CertiIdUserId({id}){
        console.log("모델 자격증 id:",id)
        const certificates = await certiModel.find({user_id:id})
        
        console.log("모델 자격증 id로 찾기id:",certificates)
        console.log("왜 null 일까???:",certificates)
        return certificates
    }

    static async editCerti({fieldToUpdate, id, newValue}){
        const filter = {id:id};
        const update = {[fieldToUpdate]: newValue};
        const option = {returnOriginal:false}
        
        const editCerti = await certiModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return editCerti
    } 


static async deleteCerti({id}){
    const deleteOne = await certiModel.deleteOne({id}) 
    // console.log("🐰")
    return deleteOne

}









}


export {Certificate}