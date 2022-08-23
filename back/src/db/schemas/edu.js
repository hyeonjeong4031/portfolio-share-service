import { Schema, model } from  "mongoose";

const EduSchema = new Schema(
    {   
        school: {
            type: String,
            required: true,   
        },
        major:{
            type: String,
            required: true,   
        },
        position:{
            type: String,
            required: true,   
        },
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.

        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
      
        

},{
    timestamps: true,
  })

  const EduModel = model("Edu", EduSchema);

export { EduModel };
