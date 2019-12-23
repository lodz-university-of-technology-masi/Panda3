import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import update from 'immutability-helper';
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import TestCreatorQuestionController from "./TestCreatorQuestionController";
import QuestionTitleChooser from "./QuestionTitleChooser";

class TestCreator extends Component{
    constructor(props) {
        super(props);
        this.state = {
            counter:0,
            loading:true,
            selectedType:'O',
            test: {
                title:'',
                language:'',
                questions: [
                    {
                        question:'',
                        type:'',
                    }
                ]
            }
        };
        console.log("State: " + this.state);
    }

    setTestType = (type) => {
        this.setState((prevState) => ({
            test:update(prevState.test.questions,{[prevState.counter]:{type: {$set:type}}})
        }));
    };

    setSelectedType = (type) => {
        console.log(type);
        this.setState({selectedType:type});
    };

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

    fetchTestData = () => {
        this.setState({loading:false})
    };

    SubmitTest = () => {
        //Todo:call to api
        alert(this.state.answers)
    };

    componentDidMount() {
        this.fetchTestData();
    }


    render() {
        if(this.state.loading){
            return null;
        }
        console.log(this.state);
        return <Container className="d-flex justify-content-between" style={{borderStyle:"solid", borderWidth:"0.3rem", borderColor:"LightGray", marginTop:"1rem", minHeight:"20rem", borderRadius:"1rem", flexDirection:"column"}}>
            <div>
            <Row className="d-flex justify-content-between" style={{margin:"1rem"}}>
            <div className="d-flex"  style={{width:"auto", flexDirection:"column"}}>
                <label className="text-center">Enter test title:</label>
                <Form.Control
                    type="text"
                    className="d-flex"
                    onChange=""
                    placeholder={"Sample title"}
                    value={this.state.test.title}
                    style={{width:"auto"}}/>
            </div>
                <div className="d-flex"  style={{width:"auto", flexDirection:"column"}}>
                    <label className="text-center">Enter Language:</label>
                    <Form.Control
                        type="text"
                        className="d-flex"
                        onChange=""
                        placeholder={"Language"}
                        value={this.state.test.title}
                        style={{width:"auto"}}/>
                </div>
                <div className="d-flex"  style={{width:"auto", flexDirection:"column"}} >
                    <label className="text-center">Select question type:</label>
                    <ButtonGroup>
                        <Button variant="info" className="mr-1" onClick={() => this.setSelectedType('O')}>Open</Button>
                        <Button variant="info" onClick={() => this.setSelectedType('W')}>Closed</Button>
                        <Button variant="info" className="ml-1" onClick={() => this.setSelectedType('L')}>Number</Button>
                    </ButtonGroup>
                </div>
                <div className="d-flex"  style={{width:"auto", flexDirection:"column"}}>
                    <span className="d-flex">
                    Question {this.state.counter + 1} / {this.state.test.questions.length}
                    </span>
                    <Button variant="danger" disabled={this.state.test.questions.length === 1}>Delete this question</Button>
                </div>
            </Row>
            <Row className="d-flex" style={{marginLeft:"1rem", marginRight:"1rem"}}><QuestionTitleChooser/></Row>
            </div>
            <TestCreatorQuestionController type={this.state.selectedType}/>
            <Row className="justify-content-between" style={{margin:"1rem"}}>
                <Button onClick={this.DecrementCounter} disabled={this.state.counter === 0}>Previous</Button>
                {
                    this.state.counter === this.state.test.questions.length - 1
                        ?<Link to="/tests"><Button onClick={this.SubmitTest} variant="success" disabled={this.state.counter < this.state.test.questions.length}>Add question</Button></Link>
                        :<Button onClick={this.IncrementCounter}>Next</Button>
                }
            </Row>
        </Container>
    }
}

export default TestCreator;