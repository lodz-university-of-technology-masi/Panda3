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
    }

    handleChange(event) {
        this.setState({answer: event.target.value},
            () => {this.props.onAnswer(this.state.answer)}
        );
    }

    render() {
        return (
            <Container>
                <Row>{this.state.title}</Row>
                    <textarea className="form-control-lg form-control"
                              value={this.state.answer}
                              readOnly={this.props.readOnly}
                              onChange={this.handleChange}/>
            </Container>
        );
    }
}

OpenQuestion.propTypes = {
    defaultAnswer: PropTypes.string,
    title: PropTypes.string,
    onAnswer: PropTypes.func,
    readOnly:PropTypes.bool
};

OpenQuestion.defaultProps = {
    defaultAnswer: '',
    title:'',
    readOnly:false
};
export default OpenQuestion;