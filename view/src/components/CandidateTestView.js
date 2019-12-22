import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button";
import QuestionController from "./questions/QuestionController";
import update from 'immutability-helper';

class CandidateTestView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            counter:0,
            loading:true,
            testData: {
                questions: []
            },
            answers:[]
        }
    }

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
        const data = {
            title: 'Przykladowy Test',
            questions:[
                {
                    question:'What is your name and surname?',
                    type:'O',
                },{
                    question:'What does Cyclomatic Complexity measure?',
                    type:'W',
                    options:[
                        'complexity of software',
                        'duplication of code',
                        'robustness',
                        'number of lines of code'
                    ]
                },{
                    question:'How many principles were in the original Agile Manifesto?',
                    type:'L'
                }
            ]
        };
        this.setState({testData: data, loading:false})
    };

    SubmitTest = () => {
        //Todo:call to api
    };

    onAnswer(value){
        this.setState((prevState) => ({
            answers: update(prevState.answers,{[prevState.counter - 1]:{$set:value}})
        }));
    }

    componentDidMount() {
       this.fetchTestData();
    }

    render() {
        if(this.state.loading){
            return null;
        }
        let question = this.state.testData.questions[this.state.counter];
        console.log(this.state.answers);
        return <Container style={{borderStyle:"solid", borderWidth:"0.3rem", borderColor:"LightGray"}}>
        <Row>
            <Col>
                Title: {this.state.testData.title}
            </Col>
            <Col>
                Question {this.state.counter + 1} / {this.state.testData.questions.length}
            </Col>
        </Row>
        <QuestionController param={question} onAnswer={this.onAnswer.bind(this)} defaultVal={this.state.answers[this.state.counter]}/>
        <Row className="justify-content-between" style={{margin:"1rem"}}>
            <Button onClick={this.DecrementCounter} disabled={this.state.counter === 0}>Previous</Button>
            {
                this.state.counter === this.state.testData.questions.length - 1
                ? <Button onClick={this.SubmitTest} variant="success">Submit</Button>
                    :<Button onClick={this.IncrementCounter}>Next</Button>
            }
        </Row>
        </Container>
    }
}

export default CandidateTestView;