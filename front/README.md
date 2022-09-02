### **1. 기본 MVP (Project/Award/Education/Certificate) CRUD 기능 구현**

- Create
    - 확인 버튼 클릭 시 `POST` api 요청 후 `GET` 요청으로 데이터 세팅
- Read
    - `useEffect` 함수 내에서 `GET` api 요청으로 데이터 세팅
- Update
    - 확인 버튼 클릭 시 시 `PUT` api 요청 후 `GET` 요청으로 데이터 세팅
- Delete
    - 삭제 버튼 클릭 시 `DELETE` api 요청 후 남은 데이터들을 `response`로 반환받아 `state` 세팅함수로 데이터 세팅 

### 2. 기능추가

1. 프로젝트 이미지 업로드
    - Input type을 file로 설정하여 파일을 입력받음.
    - `form-data` 형태로 변수 생성 후 이미지 파일 담음.
    - `project.id`를 `endpoint`에 담아 `PUT` api로 전송
2. 방명록
    - `portfolioOwnerId` 및 `GET` api를 통해 해당 포트폴리오 유저의 댓글 목록을 받아옴.
    - comment객체 내의 id값으로 작성자 정보를 받아와 유저 name 출력
    - userContext를 사용해 현재 유저 정보를 확인하고, 코멘트 작성자 id와 동일한지 확인하여 편집 기능 출력 조건화
    
    ```jsx
    (comment.writer_id === userState.user?.id)
    ```
    

### 3. 기능개선

1. 회원 탈퇴 기능 
    - `withrawal` 값이 `true`일 경우
        - 네트워크 페이지에서 해당 계정의 포트폴리오 열람 불가
2. 유저 이메일 변경 제한
    - 프로필 편집 시 이메일 중복 방지를 위해 `props`에 `plaintext readOnly`를 작성하여 읽기전용으로 설정
3. 에러 메세지 추가
    
    1) 로그인 시 계정 유효 여부 검사
    
    - 로그인 api 요청 시 err가 발생할 경우 state 세팅 함수로 에러메세지 설정 및 출력
    
    2) 회원가입 시 이메일 중복 오류 메세지
    
    - api 요청 시 이미 존재하는 이메일일 경우 에러를 반환받고, 에러를 반환받았을 경우 state 세팅함수로 에러메세지 세팅 및 출력
    
    3) MVP에서 입력 시 빈칸 여부 검사
    
    - title, descripton 등 해당 `state` 값이 존재하지 않을 경우 `setErrMsg` 세팅함수로 에러메세지 설정 및 출력