import { CommentModel } from "../schemas/comment";

class Comment {
  static async create({ newComment }) {
    console.log(newComment)
    const createComment = await CommentModel.create(newComment);

    return createComment;
  }



  static async findByCommentedID({currentPageUserID}){
    console.log(currentPageUserID)
    const comment_this = await CommentModel.find({commentedID : currentPageUserID});
    return comment_this;
  }

  static async findByID({commentID}){
    console.log('model에 값 전달 확인',commentID)
    const comment_this = await CommentModel.findOne({
      id : commentID});
    return comment_this;
  }

  static async fixOneComment({commentID, fixedData}){
    console.log('방명록 수정 model')
    console.log(commentID, "COMMENTID")
    console.log(fixedData, "DATA!!!!!!!!!!")
    const comment_this = await CommentModel.updateOne({id : commentID}, fixedData)
    return comment_this
  }

  static async deleteOneComment(commentID){
    console.log('delet 모데ㄹ', commentID)
    const comment_this = await CommentModel.deleteOne({id : commentID});
    return comment_this
  }


}

export { Comment };
