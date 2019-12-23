import React, {Component} from 'react';
import Form from "react-bootstrap/Form";

class QuestionTitleChooser extends Component {
    render() {
        return <div className="d-flex mb-2"  style={{flexDirection:"column", width:"100%"}}>
            <Form.Control
                type="text"
                className="d-flex"
                placeholder={"Question"}
                />
        </div>
    }
}

export default  QuestionTitleChooser;