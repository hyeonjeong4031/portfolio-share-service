import { CommentModel } from "../schemas/comment";

class Comment {
  static async create({ newComment }) {
    console.log(newComment)
    const createComment = await CommentModel.create(newComment);

    return createComment;
  }


  static async findByCommentedID({currentPageUserID}){
    console.log(currentPageUserID)
    const award_this = await CommentModel.find({commentedID : currentPageUserID});
    return award_this;
  }

  static async findByID({commentID}){
    console.log('model에 값 전달 확인',commentID)
    const award_this = await CommentModel.findOne({
      id : commentID});
    return award_this;
  }

//   static async deleteOneAward({awardID}){
//     console.log('deleteOne 작동')
//     const deleteAward = await AwardModel.deleteOne({id:awardID})
//     console.log(deleteAward)
//     return deleteAward
//   }
}

export { Comment };
