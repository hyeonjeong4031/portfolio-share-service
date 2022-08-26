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













}


export {Certificate}