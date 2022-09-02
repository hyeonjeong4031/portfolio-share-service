**1. 기본 MVP (Project/Award/Education/Certificate) CRUD 기능 구현** 

- 3계층 구조의 로직 설계
    - Control layer - Router
        - express를 이용한 라우팅
    - Service layer - Logic
        - 해당 라우터에 접근한 요청에 Logic을 적용
    - Model layer
        - Add, Get, Put,  Delete method를 이용하여 Database 접근
        

### 2. 기능추가

1. Project image Upload 
    - 파일 데이터를 다루기 위한 **multer module** 사용
    - 이미지 파일 업로드만 허용하기 위해 multer option 적용하여 이미지 파일 확장자명(jpg/png), 이미지 파일 용량(20MB) 제한
    - 이미지 파일 GET 요청에는 응답의 content-type을 image/jpg로 지정하여 해당 API가 바로 이미지를 받을 수 있도록 함
    - 실제 서비스들과 마찬가지로 개인 로컬 컴퓨터가 아닌 몽고디비 서버에 이미지 데이터를 넣기 위해 Project Schema에 image field 추가  {”type” : buffer }
        - 이미지 데이터를 몽고디비에 바로 저장할 수 있는 데이터 타입이 없어서 이미지를 binary data로 저장하기 위함
    - 프론트엔드에서 json이 아닌 form-data 형식으로 이미지 파일을 받아 multer 패키지로 받은 이미지 파일을 다룸
        - req.file.buffer로 이미지 파일을 받아 데이터 베이스에 저장
        - 이미지는 json string 형식으로 주고 받기가 어려워서 form-data와 multer 패키지 이용
    - 이미지 GET 요청에는 response를 content-type: image/json 형식으로 하여 DB에서 해당 document의 binary image data 자체를 res.send로 전송
        - 해당 get 요청의 url 자체가 이미지 응답이 되어 전송
        - 프론트 엔드에서 <img src="url"/>로 이미지를 받음

1. 방명록
    - req.params.id를 통해 특정 포트폴리오의 방명록을 불러옴
    - req.currentUserId를 통해 작성자의 정보를 확인
    - 작성자의 방명록 수정 & 삭제 권한
        - 댓글을 작성할 때 토큰의 페이로드에 있는 아이디 정보를 writer_id로 저장해둠. 이후 해당 댓글 수정 및 삭제
    

### 3. 기능개선

1. Withdrawal
    - 탈퇴를 진행하였을 때,  user Schema에 withrawal값을 추가해
    회원 정보를 delete하는 대신 put을 사용하여 boolean type으로 데이터 관리 
    ( ”withrawal” : true 면 탈퇴한 상태로 간주)
    - “withrawal” : true
        - login 시 “존재하지 않는 계정입니다.” 메세지 리턴
        - 회원가입시 탈퇴한 계정과 동일한 email을 사용하여도 email 중복 오류 메세지가 뜨지 않음.
    - 동일한 email이 여러개이면 가장 최신의 email withrawal값을 참조하여 회원 탈퇴 여부 파악
    - 관리자 문의를 통해 탈퇴한 회원 계정 및 데이터 복원 가능.
2. MVP Delete
    - 해당하는 document id를 request.params로 받아와 Delete 메소드를 사용하여 구현
3. Update & Delete 시 Authentication 강화 
    - Update 및 Delete 수행 전에 현재 토큰의 유저 정보와 변경하고자 하는 document의 유저 정보를 비교하여 일치하지 않으면 오류 반환