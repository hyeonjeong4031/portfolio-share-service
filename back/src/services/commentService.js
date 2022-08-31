import { User, Comment} from '../db';
import { v4 as uuidv4 } from "uuid";

class commentService {
    static async addComment({writerUserID, commentedID, description}){
        console.log('comment Service worked')
        // console.log(`data in service writerUserID:${writerUserID} commentedID:${commentedID} description:${description}`)
        const id = uuidv4();

        if(!writerUserID){
            const errorMessage="작성자 값이 전달되지 않았습니다"
        } else if(!commentedID){
            const errorMessage="방명록이 달린 사용자가 전달되지 않았습니다"
        } else if(!description){
            const errorMessage="내용이 전달되지 않았습니다"
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
    
}

export {commentService}