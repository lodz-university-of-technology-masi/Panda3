import React, {Component} from 'react';
import OpenQuestion from "./OpenQuestion";
import NumberQuestion from "./NumberQuestion";
import ClosedQuestion from "./ClosedQuestion";
import PropTypes from "prop-types";

class QuestionController extends Component {

    render() {
        let answer = this.props.defaultVal;
        switch (this.props.param.type) {
            case "O":
                return <OpenQuestion
                    title={this.props.param.question}
                    onAnswer={this.props.onAnswer}
                    defaultAnswer={answer}
                    readOnly={this.props.readOnly}
                />;
            case "W":
                return <ClosedQuestion
                    title={this.props.param.question}
                    options={this.props.param.options}
                    onAnswer={this.props.onAnswer}
                    defaultAnswer={answer}
                    readOnly={this.props.readOnly}
                />;
            case "L":
            return <NumberQuestion
                title={this.props.param.question}
                onAnswer={this.props.onAnswer}
                defaultAnswer={answer}
                readOnly={this.props.readOnly}
            />;
            default:
                return <span>Question Type Error</span>;
        }
    }
}

QuestionController.propTypes = {
    defaultVal: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.bool)
    ]),
    title: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    onAnswer: PropTypes.func,
    readOnly:PropTypes.bool
};

QuestionController.defaultProps = {
    title:'',
    readOnly:false
};
export default QuestionController;