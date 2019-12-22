import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

class OpenQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            answer: this.props.defaultAnswer
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({answer: event.target.value});


    }
    componentWillUnmount() {
        this.props.onAnswer(this.state.answer);
    }

    handleSubmit(event) {
        alert(this.state.answer);
        event.preventDefault();
    }

    render() {
        return (
            <Container>
                <Row>{this.state.title}</Row>
                    <textarea className="form-control-lg form-control"
                              value={this.state.answer}
                              onChange={this.handleChange}/>
            </Container>
        );
    }
}

OpenQuestion.propTypes = {
    defaultAnswer: PropTypes.string,
    title: PropTypes.string,
    onAnswer: PropTypes.func
};

OpenQuestion.defaultProps = {
    defaultAnswer: '',
    title:''
};
export default OpenQuestion;