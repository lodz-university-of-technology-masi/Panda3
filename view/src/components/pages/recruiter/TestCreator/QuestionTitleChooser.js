import React, {Component} from 'react';
import Form from "react-bootstrap/Form";

class QuestionTitleChooser extends Component {
    render() {
        return <div className="d-flex mb-2"  style={{flexDirection:"column", width:"100%"}}>
            <Form.Control
                type="text"
                className="d-flex"
                value={this.props.value}
                placeholder={"Question"}
                onChange={this.props.onChange}
                />
        </div>
    }
}

export default  QuestionTitleChooser;