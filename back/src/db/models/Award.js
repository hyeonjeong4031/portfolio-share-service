import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findById({ user_id ,title }) {
    const award_this = await AwardModel.findOne({ id: user_id , title : title});
    return award_this;
  }

  static async findAll(data) {
    // console.log('this is it',data.writer);
    const award_all = await AwardModel.find({writer_id : data.writer});
    // const award_all = await AwardModel.find({});
    return award_all;
  }
}

export { Award };
