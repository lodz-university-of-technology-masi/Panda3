import React, {Component} from 'react';

import PropTypes from "prop-types";
import OpenQuestionEditor from "./OpenQuestionEditor";
import NumberQuestionEditor from "./NumberQuestionEditor";
import ClosedQuestionEditor from "./ClosedQuestionEditor";

class TestCreatorQuestionController extends Component {

    render() {
        switch (this.props.type) {
            case "O":
                return <OpenQuestionEditor/>;
            case "W":
                return <ClosedQuestionEditor answers={this.props.answers} onChange={this.props.onChange} onChangeOfNumberOfClosedAnswers={this.props.onChangeOfNumberOfClosedAnswers}/>;
            case "L":
                return <NumberQuestionEditor/>;
            default:
                return <span>Question Type Error</span>;
        }
    }
}

TestCreatorQuestionController.propTypes = {
    answers: PropTypes.array,
    onChange: PropTypes.func,
    onChangeOfNumberOfClosedAnswers: PropTypes.func
};

TestCreatorQuestionController.defaultProps = {
    answers: []
};
export default TestCreatorQuestionController;