import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

class AddUser extends Component {
render() {
    return <Container className="justify-items-center" style={{width:"auto"}}>
        <Form className="justify-items-center">
            <Row>
                <Col md="auto">
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>
                </Col>
                <Col md="auto">
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md="auto">
                    <Form.Group>
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control type="date" placeholder="Enter date of birth" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md="auto">
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter e-mail" />
                </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-start">
                <Col md="auto">
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </Col>
                <Col md="auto">
                    <Link to="/users"><Button variant="warning">Cancel</Button></Link>
                </Col>
            </Row>
        </Form>
    </Container>
}
}

export default AddUser;