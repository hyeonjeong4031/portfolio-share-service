import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  

  static async findAll(data) {
    // console.log('this is it',data.writer);
    const award_all = await AwardModel.find({writer_id : data.writer});
    // const award_all = await AwardModel.find({});
    return award_all;
  }

  static async findByAwardId({awardID}){
    const award_this = await AwardModel.findOne({id: awardID});
    return award_this;
  }

  static async fixOneAward({filter, data}){
    console.log(filter)
    console.log(data)
    const fixedAward = await AwardModel.updateOne({id : filter}, data)
    console.log(fixedAward)
    return fixedAward
  }
  static async deleteOneAward({awardID}){
    console.log('deleteOne 작동')
    const deleteAward = await AwardModel.deleteOne({id:awardID})
    console.log(deleteAward)
    return deleteAward
  }
}

export { Award };
