import { CommentModel } from "../schemas/comment";

class Comment {
  static async create({ newComment }) {
    console.log(newComment)
    const createComment = await CommentModel.create(newComment);

    return createComment;
  }


  static async findByCommentedID({commentedID}){
    const award_this = await CommentModel.find({commentedID});
    return award_this;
  }

//   static async fixOneAward({filter, data}){
//     console.log(filter)
//     console.log(data)
//     const fixedAward = await AwardModel.updateOne({id : filter}, data)
//     console.log(fixedAward)
//     return fixedAward
//   }
//   static async deleteOneAward({awardID}){
//     console.log('deleteOne 작동')
//     const deleteAward = await AwardModel.deleteOne({id:awardID})
//     console.log(deleteAward)
//     return deleteAward
//   }
}

export { Comment };
