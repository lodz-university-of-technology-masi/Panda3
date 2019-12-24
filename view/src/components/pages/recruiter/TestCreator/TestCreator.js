import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import update from 'immutability-helper';
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import TestCreatorQuestionController from "./TestCreatorQuestionController";
import QuestionTitleChooser from "./QuestionTitleChooser";
import ValidateTest from "./TestValidator";

class TestCreator extends Component{
    constructor(props) {
        super(props);
        this.state = {
            counter:0,
            loading:true,
            selectedType:'O',
            currentQuestion:'',
            test: {
                title:'',
                language:'',
                questions: [
                    {
                        question:'',
                        type:'O',
                    }
                ]
            }
        };
        console.log("State: " + this.state);
    }

    //TODO: delete answers when type changes

    setTestType = (type) => {
        this.setState((prevState) => ({
            test:update(prevState.test,{questions:{[prevState.counter]:{type: {$set:type}}}})
        }));
    };

    IncrementCounter = () => {
        this.setState((prevState) => ({
            counter: prevState.counter + 1
        }));
    };

    DecrementCounter = () => {
        this.setState((prevState) => ({
            counter: prevState.counter - 1
        }));
    };

    fetchTestData = () => {
        this.setState({loading:false})
    };

    SubmitTest = () => {
        //Todo:call to api
        alert(ValidateTest(this.state.test));
    };

    componentDidMount() {
        this.fetchTestData();
    }

    handleTestTitle = (event) => {
        let val = event.target.value;
        this.setState((prevState) => ({
            test:update(prevState.test,{title: {$set:val}})
        }))
    };

    handleTestLanguage = (event) => {
        let val = event.target.value;
        this.setState((prevState) => ({
            test:update(prevState.test,{language: {$set:val}})
        }))
    };

    handleQuestionTitle = (event) =>{
        let val = event.target.value;
        this.setState((prevState) => ({
            test:update(prevState.test,{questions:{[prevState.counter]:{question: {$set:val}}}})
        }));
    };

    deleteQuestion = () => {
        this.setState((prevState) => ({
            test:update(prevState.test,{questions:{$splice:[[this.state.counter, 1]]}})
        }), () => this.DecrementCounter);
    };

    setQuestions = () => {
        let questions = this.state.test.questions;
        questions.push({
            question:'',
            type:'O'
        });
        this.setState((prevState) => ({
            test:update(prevState.test,{questions: {$set:questions}})
        }),() => this.IncrementCounter());
    };

    setClosedAnswers = (event) => {
        let val = event.target.value;
        let i = event.target.attributes['index'].value - 1;
        console.log(i);
        if(this.state.test.questions[this.state.counter].answers === undefined){
            this.setState(prevState => ({
                test:update(prevState.test,{questions:{[prevState.counter]:{answers: {$set:[]}}}})
            }))}
        this.setState((prevState) => ({
            test:update(prevState.test,{questions:{[prevState.counter]:{answers:{[i]: {$set:val}}}}})
        }));
       console.log(this.state.test);
    };

    setClosedAnswersLength = (numberOfAnswers) => {
        let val = numberOfAnswers;
        if(this.state.test.questions[this.state.counter].answers > val){
            let difference = this.state.test.questions[this.state.counter].answers.length - val;
            this.setState((prevState) => ({
                test:update(prevState.test,{questions:{[prevState.counter]:{answers:{$splice:[[val,difference]]}}}})
            }));
        }
    };

    render() {
        if(this.state.loading){
            return null;
        }
        return <Container className="d-flex justify-content-between" style={{borderStyle:"solid", borderWidth:"0.3rem", borderColor:"LightGray", marginTop:"1rem", minHeight:"20rem", borderRadius:"1rem", flexDirection:"column"}}>
            <div>
            <Row className="d-flex justify-content-between" style={{margin:"1rem"}}>
            <div className="d-flex"  style={{width:"auto", flexDirection:"column"}}>
                <label className="text-center">Enter test title:</label>
                <Form.Control
                    type="text"
                    className="d-flex"
                    onChange={(event => this.handleTestTitle(event))}
                    placeholder={"Sample title"}
                    value={this.state.test.title}
                    style={{width:"auto"}}
                    />
            </div>
                <div className="d-flex"  style={{width:"auto", flexDirection:"column"}}>
                    <label className="text-center">Enter Language:</label>
                    <Form.Control
                        type="text"
                        className="d-flex"
                        onChange={(event => this.handleTestLanguage(event))}
                        placeholder={"Language"}
                        value={this.state.test.language}
                        style={{width:"auto"}}/>
                </div>
                <div className="d-flex"  style={{width:"auto", flexDirection:"column"}} >
                    <label className="text-center">Select question type:</label>
                    <ButtonGroup>
                        <Button variant="info" className="mr-1" onClick={() => this.setTestType('O')}>Open</Button>
                        <Button variant="info" onClick={() => this.setTestType('W')}>Closed</Button>
                        <Button variant="info" className="ml-1" onClick={() => this.setTestType('L')}>Number</Button>
                    </ButtonGroup>
                </div>
                <div className="d-flex"  style={{width:"auto", flexDirection:"column"}}>
                    <span className="d-flex">
                    Question {this.state.counter + 1} / {this.state.test.questions.length}
                    </span>
                    <Button variant="danger" disabled={this.state.test.questions.length === 1} onClick={this.deleteQuestion}>Delete this question</Button>
                </div>
            </Row>
            <Row className="d-flex" style={{marginLeft:"1rem", marginRight:"1rem"}}>
                <QuestionTitleChooser
                    value={this.state.test.questions[this.state.counter].question}
                    onChange={this.handleQuestionTitle}
                />
            </Row>
            </div>
            <TestCreatorQuestionController
                type={this.state.test.questions[this.state.counter].type}
                answers={this.state.test.questions[this.state.counter]}
                onChange={this.setClosedAnswers}
                onChangeOfNumberOfClosedAnswers={this.setClosedAnswersLength}
            />
            <Row className="justify-content-between" style={{margin:"1rem"}}>
                <Button onClick={this.DecrementCounter} disabled={this.state.counter === 0}>Previous</Button>
                {
                    this.state.counter + 1 < this.state.test.questions.length
                        ?<Button onClick={this.IncrementCounter}>Next</Button>
                        :<Button onClick={this.setQuestions} variant="info">Add new question</Button>
                }
            </Row>
            <Row className="justify-content-end" style={{margin:"1rem"}}>
                <Button variant="success" size="lg" onClick={this.SubmitTest}>Submit Test</Button>
            </Row>
        </Container>
    }
}

export default TestCreator;