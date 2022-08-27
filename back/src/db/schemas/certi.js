import { Schema, model } from "mongoose";

const CertiSchema = new Schema ({
    user_id:{
        type: String,
        required: true,
    },
    //Population은 다른 콜렉션으로부터 도큐먼트 안 특정 경로를 통해 그 부분을 도큐먼트로 자동으로 대체(치환)하는 과정이다.
    //Schema.Types.ObjectId ,
    id:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
        default: "자격증 제목"
    },
    description:{
        type:String,
        required: false,
        default: "상세내역"

    },
    when_date:{
        type:Date,
        required: true,

    }
},{timestamps: true})

const certiModel = model("certi", CertiSchema);

export { certiModel } 