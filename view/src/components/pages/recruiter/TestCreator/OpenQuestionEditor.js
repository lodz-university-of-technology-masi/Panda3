import React from 'react';
import Row from "react-bootstrap/Row";

const OpenQuestionEditor = () => {
        return (
            <div>
                <Row className="d-flex" style={{marginLeft:"1rem", marginRight:"1rem"}}>
                    <textarea className="form-control-lg form-control"
                              value={'Answer'}
                              readOnly={true}
                    />
                </Row>
            </div>
        );
    };


export default OpenQuestionEditor;