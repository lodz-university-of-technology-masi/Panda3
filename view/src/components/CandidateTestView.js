import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import QuestionController from "./questions/QuestionController";
import update from 'immutability-helper';
import {Link} from "react-router-dom";
import ApiHelper from "./utils/API";
import Alert from "react-bootstrap/Alert";
import LoadingSpinner from "./LoadingSpinner";

class CandidateTestView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            counter:0,
            loading:true,
            test: {
                title:'',
                language:{label:'English', value:'en'},
                questions: [
                    {
                        question:'',
                        type:'O',
                    }
                ]
            },
            answers:[]
        };
    }

    IncrementCounter = () => {
        this.setState((prevState) => ({
            counter: prevState.counter + 1
        })/*, () => console.log(this.state.answers)*/);
    };

    DecrementCounter = () => {
        this.setState((prevState) => ({
            counter: prevState.counter - 1
        })/*, () => console.log(this.state.answers)*/);
    };

    fetchTestData = async (id) => {
        await ApiHelper.getByTestId(id).then( test =>
            this.setState({test:test})
        ).catch(() =>
            this.setState({
                error:true,
                loading:false
            }));
    };

    SubmitTest = () => {
        //Todo:call to api
        let json = JSON.stringify(this.state.answers);
        console.log(json);
    };

    onAnswer(value){
        this.setState((prevState) => ({
            answers: update(prevState.answers,{[prevState.counter]:{$set:value}})
        }));
    }

    componentDidMount = async() => {
        await this.fetchTestData(this.props.match.params.id).then(() => this.setState({
            error:false,
            loading:false
        }));
        console.log(this.state);
    };


    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
        else if(this.state.error){
            return <Alert variant="danger">Fetch error</Alert>;
        }

        let question = this.state.test.questions[this.state.counter];
        return <Container className="d-flex justify-content-between" style={{borderStyle:"solid", borderWidth:"0.3rem", borderColor:"LightGray", marginTop:"1rem", minHeight:"20rem", borderRadius:"1rem", flexDirection:"column"}}>
        <Row className="d-flex justify-content-between" style={{margin:"1rem"}}>
            <span className="d-flex">
                {this.state.test.title}
            </span>
            <span className="d-flex">
                Question {this.state.counter + 1} / {this.state.test.questions.length}
            </span>
        </Row>
        <QuestionController param={question} onAnswer={this.onAnswer.bind(this)} defaultVal={this.state.answers[this.state.counter]}/>
           <Row className="justify-content-end align-content-end" style={{margin:"1rem"}}>
               {

                   this.state.counter + 1  === this.state.test.questions.length
                       ? this.state.answers.length < this.state.test.questions.length
                            ? <p>You need to answer all the questions</p>
                            : <p>End the test</p>
                       : null
               }
           </Row>
        <Row className="justify-content-between" style={{margin:"1rem"}}>
            <Button onClick={this.DecrementCounter} disabled={this.state.counter === 0}>Previous</Button>
            {
                this.state.counter === this.state.test.questions.length - 1
                    ?<Link to="/tests"><Button onClick={this.SubmitTest} variant="success" disabled={this.state.answers.length < this.state.test.questions.length}>Submit</Button></Link>
                    :<Button onClick={this.IncrementCounter}>Next</Button>
            }
        </Row>
        </Container>
    }
}

export default CandidateTestView;