### 1. **기본 MVP (Project/Award/Education/Certificate)**

- CRUD 기능 구현
    - Create
    - Read
    - Update
    - Delete
    

### 2. 기능추가

- Project image Upload
    - 사용자들의 프로젝트에 이미지 자료를 업로드 할 수 있도록 함.
- 방명록
    - 유저간의 커뮤니케이션을 위한 공간
    - 포트폴리오 페이지에서 방명록을 작성, 수정, 삭제 기능 사용 가능

### 3. 기능개선

- Withdrawal
    - 회원 탈퇴 여부를 관리함.
    - 관리자 문의를 통해 탈퇴한 회원 계정 및 데이터 복원 가능.
- MVP Delete
    - 작성된 MVP 목록을 삭제할 수 있도록 함.
- Update & Delete 시 Authentication 강화
    - request.params으로  document id를 받아오는 기존 로직은  해당API를 이용해 타인의 포트폴리오를 수정 및 삭제 가능하다는 점을 인지하였음.
     이를 방지하기 위해 현재 요청하는 유저와 해당 목록의 유저가 일치하는지 한번 더 확인하도록 로직 구현.
- ErrorMessage 출력
    - 기본 MVP 에서 Create, Update 시 빈칸이 존재.
    - Login시 사용자와 일치하지 않는 정보 입력.
    - Registration 시 이미 존재하는 email 입력.