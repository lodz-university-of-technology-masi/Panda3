import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PropTypes from 'prop-types';

class ClosedQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.props.options,
            title: this.props.title,
            answers: this.props.defaultAnswer
        };
        this.handleChange = this.handleChange.bind(this);
        /*if(this.state.answers.length > this.props.options.length) {
            this.state.answers.length = this.props.options.length
        }*/
    }

    handleChange(event, index) {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.answers[index] = event.target.checked;
        this.forceUpdate();
        this.props.onAnswer(this.state.answers);
    }

    render() {
        let options = this.state.options.map((option, index)=> {
            return <Row key={index} className="d-flex align-content-center justify-content-start">
                <input
                    disabled={this.props.readOnly}
                    checked={this.state.answers[index]}
                    onChange={(e) => this.handleChange(e, index)}
                    style={{width:"2rem", marginRight:"0.8rem"}}
                    className="form-control"
                    type="checkbox"/>
                <span  className="text-center" style={{width:"auto"}}>{option}</span>
            </Row>
        });
        return (
            <Container>
                <Row>{this.state.title}</Row>
                {options}
            </Container>
        );
    }
}

ClosedQuestion.propTypes = {
    defaultAnswer: PropTypes.arrayOf(PropTypes.bool),
    title: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    onAnswer: PropTypes.func,
    readOnly:PropTypes.bool
};

ClosedQuestion.defaultProps = {
    options:[],
    title:'',
    defaultAnswer:Array(15).fill(false),
    readOnly:false
};

export default ClosedQuestion;