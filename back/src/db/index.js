import mongoose from "mongoose";
import { User } from "./models/User";
<<<<<<< HEAD
import { Certificate } from "./models/Certi";
=======
import {Award} from './models/Award';
>>>>>>> 8421f081f42179f77678d7cc821435755a29a2c6

const DB_URL =
  process.env.MONGODB_URL ||
  "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
);
db.on("error", (error) =>
  console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);

<<<<<<< HEAD
export { User };
export {Certificate}
=======
export { User, Award };
>>>>>>> 8421f081f42179f77678d7cc821435755a29a2c6
