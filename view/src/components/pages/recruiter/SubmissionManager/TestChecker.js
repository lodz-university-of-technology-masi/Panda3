import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import QuestionController from "../../../fragments/questions/QuestionController";
import update from 'immutability-helper';
import ApiHelper from "../../../utils/API";
import LoadingSpinner from "../../../fragments/LoadingSpinner";

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

    fetchTestData = async() => {
        const test = await ApiHelper.getTestById(this.props.match.params.testId);
        const answers = await ApiHelper.getAnswersToCheck(this.props.match.params.testId, this.props.match.params.userId).catch((e)=>alert(e));
        this.setState({
            test: test,
            answers:answers,
            result:Array(answers.length)})
    };

    SubmitTest = () => {
        this.setState({loading:true});
        let body = {
            userId: this.props.match.params.userId,
            testId: this.props.match.params.testId,
            results: this.state.result
        };
        let redirect = '/submissions/' + this.props.match.params.testId;
        ApiHelper.checkTest(body).then(() =>
            this.props.history.push(redirect)
        ).catch(e => alert(e));
    };


    componentDidMount = async() => {
        await this.fetchTestData().then(() => this.setState({loading:false})).catch((e) => alert(e));
        for (let i=0;i<this.state.result.length;i++){
            if(this.state.test.questions[i].type === 'W'){
                let json = JSON.parse(this.state.answers[i]);
                this.setState((prevState) => ({
                    answers: update(prevState.answers,{[i]:{$set:json}})
                }));
            }
        }
    };

    getVerdict = () => {
       switch (this.state.result[this.state.counter]) {
           case true: return <b style={{color:"green"}}>CORRECT</b>;
           case false: return <b style={{color:"red"}}>WRONG</b>;
           default: return <b>UNDECIDED</b>
       }
    };

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
        return <Container className="d-flex justify-content-between bg-items-color" style={{borderStyle:"solid", borderWidth:"0.3rem", borderColor:"LightGray", marginTop:"1rem", minHeight:"25rem", borderRadius:"1rem", flexDirection:"column"}}>
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
                        ?<Button onClick={this.SubmitTest} variant="success" disabled={this.state.result[this.state.counter] === undefined}>Submit</Button>
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