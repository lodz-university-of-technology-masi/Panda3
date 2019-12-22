import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

class NumberQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            answer: this.props.defaultAnswer
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({answer: event.target.value});
    }

    componentWillUnmount() {
        this.props.onAnswer(this.state.answer);
    }

    render() {
        return (
            <Container>
                <Row>{this.state.title}</Row>
                <input type="number" className="form-control"
                          value={this.state.answer}
                          onChange={this.handleChange}/>
            </Container>
        );
    }
}

NumberQuestion.propTypes = {
    defaultAnswer: PropTypes.string,
    title: PropTypes.string,
    onAnswer: PropTypes.func
};

NumberQuestion.defaultProps = {
    defaultAnswer: '',
    title:''
};

export default NumberQuestion;