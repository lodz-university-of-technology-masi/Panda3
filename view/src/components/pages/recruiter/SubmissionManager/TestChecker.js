import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import QuestionController from "../../../questions/QuestionController";
import update from 'immutability-helper';
import {Link} from "react-router-dom";

class TestChecker extends Component{
    constructor(props) {
        super(props);
        this.state = {
            result:[],
            counter:0,
            loading:true,
            test: {
                questions: []
            },
            answers:[]
        };
    }

    CheckQuestion = (result) => {
        this.setState((prevState) => ({
            result: update(prevState.result,{[prevState.counter]:{$set:result}})
        }));
        if(this.state.counter < this.state.test.questions.length - 1){
            this.IncrementCounter();
        }
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
        const answers = JSON.parse('["Kowalski",[false,true,false,false],"4"]');
        this.setState({
            test: data,
            answers:answers,
            result:Array(answers.length)})
    };

    SubmitTest = () => {
        //Todo:call to api
        let json = JSON.stringify(this.state.result);
        console.log(json);
    };


    componentDidMount() {
        this.fetchTestData();
        this.setState({loading:false});
    }

    getVerdict = () => {
       switch (this.state.result[this.state.counter]) {
           case true: return <b style={{color:"green"}}>CORRECT</b>;
           case false: return <b style={{color:"red"}}>WRONG</b>;
           default: return <b>UNDECIDED</b>
       }
    };

    render() {
        console.log(this.state.result);
        console.log(this.state.result.length < this.state.test.questions.length);
        if(this.state.loading){
            return null;
        }
        return <Container className="d-flex justify-content-between" style={{borderStyle:"solid", borderWidth:"0.3rem", borderColor:"LightGray", marginTop:"1rem", minHeight:"25rem", borderRadius:"1rem", flexDirection:"column"}}>
            <Row className="d-flex justify-content-between" style={{margin:"1rem"}}>
            <span className="d-flex">
                {this.state.test.title}
            </span>
                <span className="d-flex">
                Question {this.state.counter + 1} / {this.state.test.questions.length}
            </span>
            </Row>
            <QuestionController param={this.state.test.questions[this.state.counter]} defaultVal={this.state.answers[this.state.counter]} readOnly={true}/>
            <div>
            <Row className="justify-content-center mt-2 mb-2" style={{marginLeft:"1rem", marginRight:"1rem"}}>
                <Col md="auto">
                    <span className="text-center">VERDICT: {this.getVerdict()}</span>
                </Col>
            </Row>
            <Row className="justify-content-center" style={{marginLeft:"1rem", marginRight:"1rem"}}>
                <Col md="auto">
                    <Button onClick={() => this.CheckQuestion(false)} variant="danger" size="lg">WRONG</Button>
                </Col>
                <Col md="auto">
                    <Button onClick={() => this.CheckQuestion(true)} variant="success" size="lg">CORRECT</Button>
                </Col>
            </Row>
            <Row className="justify-content-between" style={{margin:"1rem"}}>
                <Button onClick={this.DecrementCounter} disabled={this.state.counter === 0}>Previous</Button>
                {
                    this.state.counter === this.state.test.questions.length - 1
                        ?<Link to={"/submissions/" + this.props.match.params.id}><Button onClick={this.SubmitTest} variant="success" disabled={this.state.result[this.state.counter] === undefined}>Submit</Button></Link>
                        : this.state.result[this.state.counter] === undefined
                          ? null
                            :<Button onClick={this.IncrementCounter}>Next</Button>
                        }
            </Row>
            </div>
        </Container>
    }
}

export default TestChecker;