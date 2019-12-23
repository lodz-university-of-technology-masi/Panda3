import React from 'react';
import Row from "react-bootstrap/Row";

 const NumberQuestionEditor = () => {
        return (
         <div>
             <Row className="d-flex" style={{marginLeft:"1rem", marginRight:"1rem"}}>
                 <input className="form-control-lg form-control"
                        placeholder={'Answer'}
                        readOnly={true}
                        type="number"
                        style={{width:"auto"}}
                 />
             </Row>
         </div>
     );
    };


export default NumberQuestionEditor;