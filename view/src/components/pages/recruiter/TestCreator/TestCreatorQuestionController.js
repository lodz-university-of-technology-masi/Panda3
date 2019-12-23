import React, {Component} from 'react';

import PropTypes from "prop-types";
import OpenQuestionEditor from "./OpenQuestionEditor";
import NumberQuestionEditor from "./NumberQuestionEditor";
import ClosedQuestionEditor from "./ClosedQuestionEditor";

class TestCreatorQuestionController extends Component {

    render() {
        let answer = this.props.defaultVal;
        switch (this.props.type) {
            case "O":
                return <OpenQuestionEditor/>;
            case "W":
                return <ClosedQuestionEditor/>;
            case "L":
                return <NumberQuestionEditor/>;
            default:
                return <span>Question Type Error</span>;
        }
    }
}

TestCreatorQuestionController.propTypes = {
    defaultVal: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.bool)
    ]),
    title: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    onAnswer: PropTypes.func
};

TestCreatorQuestionController.defaultProps = {
    title:''
};
export default TestCreatorQuestionController;