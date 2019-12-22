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
            answer: this.props.defaultAnswer
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({answer: event.target.value});
    }

    render() {
        let options = this.state.options.map((option)=> {
            return <Row key={option} className="d-flex align-content-center justify-content-start">
                <input style={{width:"2rem", marginRight:"0.8rem"}} className="form-control" type="checkbox"/>
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
    onAnswer: PropTypes.func
};

ClosedQuestion.defaultProps = {
    options:[],
    defaultAnswer: [],
    title:''
};

export default ClosedQuestion;