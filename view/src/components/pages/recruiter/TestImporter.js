import React, {Component} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {Storage} from 'aws-amplify'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LoadingSpinner from "../../fragments/LoadingSpinner";
import Alert from "react-bootstrap/Alert";
import ApiHelper from "../../utils/API";

class TestImporter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        loading:false,
        error:null
        }
    }

    handleSubmit = async(event) => {
        console.log(event);
        event.preventDefault();
        console.log(this.state.file);
        this.setState({loading:true});
        let key = 'import/' + Date.now() + '.csv';
        await Storage.put(key, this.state.file, {}).then (result =>
        {
            console.log(result);
            this.setState({
                loading: false,
                error:false
            })//TODO:saverecruiter to test
        }).then(() => {ApiHelper.addTestToRecruiter(this.props.userId)}).catch(err => {
                alert(err);
                this.setState({
                    loading: false,
                    error:true
                })
            });
    };

    readFile = (e) => {
        console.log(e);
        this.setState({file:e.target.files[0]})
    };

    getFeedbackComponent = () => {
        if(this.state.error) return <Alert variant="danger">Upload Error.</Alert>;
        else if(this.state.error === false) return <Alert variant="success">Success</Alert>;
        else return null;
    };

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
        return <Container className="d-flex justify-content-center">
            <Form className="align-items-center justify-content-center bg-items-color grayBorder" onSubmit={this.handleSubmit} style={{position:"absolute", top:"25%",padding:"0.2rem", marginTop:"1rem", minHeight:"5rem"}}>
                <Row className="justify-content-center">
                    <Col md="auto">
                        <Form.Group>
                            <Form.Label>Upload .csv file</Form.Label>
                            <Form.Control type="file" accept=".csv" required={true}
                                   onChange={(event)=> {
                                    this.readFile(event)
                                    }}
                                   onClick={(event)=> {
                                       event.target.value = null
                                   }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center mb-2">
                <Col md="auto">
                    <Button variant="success" size="lg" type="submit">
                        Submit
                    </Button>
                </Col>
                </Row>
                {this.getFeedbackComponent()}
            </Form>
        </Container>
    }

}

export default TestImporter;