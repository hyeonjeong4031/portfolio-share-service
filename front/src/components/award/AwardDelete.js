// import React, { useState } from "react";
import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardDelete({ currentAward, setAwards})
{
const handleSubmit = async (e) => {
    e.preventDefault();
    // e.stopPropagation();

    // currentAward의 user_id를 user_id 변수에 할당함.
    const user_id = currentAward.user_id;

    await Api.delete(`award/delete/${currentAward.id}`);

    // "award/readAll" 엔드포인트로 GET 요청함.
    console.log("Delete쪽")
    const res = await Api.get("award/readAll");
    // awards를 response의 data로 세팅함.
    setAwards(res.data);

};   return ( 
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mt-3 text-center mb-4">
                <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" className="me-3">
                    확인
                </Button>
                <Button variant="secondary">
                    취소
                </Button>
                </Col>
        </Form.Group>
        </Form>
);
}

export default AwardDelete;




