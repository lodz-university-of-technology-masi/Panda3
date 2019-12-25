import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

const MAX_QUESTIONS =  15;

class ClosedQuestionEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            n: 4
        }
    }


    setNumOfAnswers = (event) => {
        let val = event.target.value;
        if(val > MAX_QUESTIONS) val = MAX_QUESTIONS;
        if(val < 1) val = 1;
        this.setState({n: val});
        this.props.onChangeOfNumberOfClosedAnswers(val);
    };

    getBody() {
        let inputs = [];
        for (let i = 1; i <= this.state.n; i++){
            inputs.push(
                <Row key={i} className="d-flex mb-2 align-content-center justify-content-start">
                    <input
                        checked={false}
                        readOnly={true}
                        style={{width:"2rem", marginRight:"0.8rem"}}
                        className="form-control"
                        type="checkbox"/>
                    <input
                        index={i}
                        className="form-control"
                        type="text"
                        value={this.props.answers[i-1]}
                        onChange={((event) => this.props.onChange(event))}
                        placeholder={"Answer " + i}
                        style={{width:"95%"}}
                    />
                </Row>
            );
        }
        return inputs;
    };

    render() {
        return (
            <div>
                <Row style={{margin:"1rem"}}>
                <div className="d-flex"  style={{width:"auto", flexDirection:"column"}}>
                    <label className="text-center">Number of answers:</label>
                    <input className="form-control-lg form-control"
                           value={this.state.n}
                           type="number"
                           style={{width:"auto"}}
                           onChange={(event => this.setNumOfAnswers(event))}
                    />
                </div>
                </Row>
                <div className="justify-items-center" style={{margin:"1rem"}}>
                    {this.getBody()}
                </div>
            </div>
        );
    }
}

ClosedQuestionEditor.propTypes = {
    answers: PropTypes.array,
    onChange: PropTypes.func
};

ClosedQuestionEditor.defaultProps = {
    answers: Array(4).fill(null)
};

export default ClosedQuestionEditor;