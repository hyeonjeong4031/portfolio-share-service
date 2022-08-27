import { certiModel } from "../schemas/certi";

class Certificate{

    static async addCerti({data}){
        const createOne = await certiModel.create(data)
                return createOne
    }


    static async getCerti({user_id}){
        const certificates = await certiModel.find({user_id})
        
        return certificates
    }
    static async getCertiId({id}){
        const certificates = await certiModel.find({id})
        

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












}


export {Certificate}