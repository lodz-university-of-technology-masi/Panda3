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
        this.setState({answer: event.target.value},
            () => {this.props.onAnswer(this.state.answer)}
        );
    }

    componentDidUpdate(prevProps, nextState,nextContent) {
        if (prevProps.title !== this.props.title) {
            this.setState({title: this.props.title})
        }
        if (prevProps.defaultAnswer !== this.props.defaultAnswer) {
            this.setState({answer: this.props.defaultAnswer})
        }
    }

    render() {
        return (
            <Container>
                <Row className="mb-1">{this.state.title}</Row>
                <Row>
                    <input type="number" className="form-control"
                           readOnly={this.props.readOnly}
                           value={this.state.answer}
                           onChange={this.handleChange}
                           placeholder="Enter a number"
                           style={{width:"auto"}}
                    />
                </Row>
            </Container>
        );
    }
}

NumberQuestion.propTypes = {
    defaultAnswer: PropTypes.string,
    title: PropTypes.string,
    onAnswer: PropTypes.func,
    readOnly:PropTypes.bool
};

NumberQuestion.defaultProps = {
    defaultAnswer: '',
    title:'',
    readOnly:false
};

export default NumberQuestion;