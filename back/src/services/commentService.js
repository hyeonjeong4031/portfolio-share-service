import { User, Comment} from '../db';
import { v4 as uuidv4 } from "uuid";

class commentService {
    static async addComment({writerUserID, commentedID, description}){
        console.log('comment Service worked')
        // console.log(`data in service writerUserID:${writerUserID} commentedID:${commentedID} description:${description}`)
        const id = uuidv4();

        if(!writerUserID){
            const errorMessage="작성자 값이 전달되지 않았습니다"

            return {errorMessage}
        } else if(!commentedID){
            const errorMessage="방명록이 달린 사용자가 전달되지 않았습니다"
            return {errorMessage}
        } else if(!description){
            const errorMessage="내용이 전달되지 않았습니다"
            return {errorMessage}

        } 
        const newComment = {
            id ,
            commentedID,
            writer_id : writerUserID,
            description 
        }
        
        const createNewComment = await Comment.create({newComment})
        createNewComment.errorMessage=null;
        return createNewComment
    }


    static async readComment({currentPageUserID}){
        console.log('comment Service [readComment] Function start');
 
        const currentResult = await Comment.findByCommentedID({currentPageUserID })
        currentResult.errorMessage=null;
        return currentResult
    }

    static async findCommentByCommentID({commentID}){
        console.log('find Comment ID')
        
        const result = await Comment.findByID({commentID})
        console.log('서비스 단에서의 return 값',result)
        if(result == null){
            console.log('result의 값이 없음')
            const errorMessage = "해당 댓글은 존재하지 않습니다"
            return {errorMessage}
        }
        result.errorMessage = null
        return result
    }
    
    static async fixComment({commentID, fixedDescription}){
        console.log('commet 수정 요청까지 들어감');
        const fixedData = {
            description : fixedDescription
        }
        const result = await Comment.fixOneComment({commentID, fixedData})
        result.errorMessage = null
        return result

    }

}

export {commentService}