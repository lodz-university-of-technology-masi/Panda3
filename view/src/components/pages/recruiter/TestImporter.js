import React, {Component} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class TestImporter extends Component {

    handleSubmit = (e) => {
        console.log(this.state);
        alert();
    };

    readFile = (e) => {
        this.setState({file:e.target.value})
    };

    render() {
        return <Container className="d-flex justify-content-center">
            <Form className="align-items-center justify-content-center bg-items-color grayBorder" onSubmit={(e) => this.handleSubmit(e)} style={{position:"absolute", top:"25%",padding:"0.2rem", marginTop:"1rem", minHeight:"5rem"}}>
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
                <Row className="justify-content-center">
                <Col md="auto">
                    <Button variant="success" size="lg" type="submit">
                        Submit
                    </Button>
                </Col>
                </Row>
            </Form>
        </Container>
    }

}

export default TestImporter;