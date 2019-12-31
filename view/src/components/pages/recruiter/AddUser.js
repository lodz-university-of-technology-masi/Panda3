import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {ApiHelper} from "../../utils/API";

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
                firstName:'',
                lastName:'',
                dateOfBirth:'',
                email:''
        };
        this.handleFirstName.bind(this);
        this.handleLastName.bind(this);
        this.handleMail.bind(this);
        this.handleDoB.bind(this);
        this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        /*let user = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            dateOfBirth:this.state.dateOfBirth,
            email:this.state.email
        };*/
        event.preventDefault();
        let user =
            {
                name:this.state.firstName,
                surname:this.state.lastName
            };
        ApiHelper.createParticipant(user).then(r => alert(r)).catch((e) => alert(e));
    };

   handleFirstName(event) {
        this.setState({firstName:event.target.value})
    };

    handleLastName(event) {
        this.setState({lastName:event.target.value})
    };

    handleMail(event){
        this.setState({email:event.target.value})
    };

    handleDoB(event){
        this.setState({dateOfBirth:event.target.value})
    };

render() {
    return <Container className="justify-items-center mt-3">
        <Form className="justify-items-center bg-items-color" onSubmit={(e) => this.handleSubmit(e)}
              style={{position:"absolute", left:"40%", top:"25%", padding:"0.5rem", borderStyle:"solid", borderWidth:"0.3rem", borderRadius:"1rem",borderColor:"lightGray"}}>
            <Row>
                <Col md="auto">
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control onChange={(e) => this.handleFirstName(e)} type="text" placeholder="Enter name" required={true}/>
                    </Form.Group>
                </Col>
                <Col md="auto">
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control onChange={(e) => this.handleLastName(e)} type="text" placeholder="Enter last name" required={true} />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-around">
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

/*<Row>
    <Col md="auto">
        <Form.Group>
            <Form.Label>Date of birth</Form.Label>
            <Form.Control onChange={(e) => this.handleDoB(e)} type="date" placeholder="Enter date of birth"  required={true}/>
        </Form.Group>
    </Col>
</Row>
<Row>
<Col md="auto">
    <Form.Group>
    <Form.Label>Email address</Form.Label>
<Form.Control onChange={(e) => this.handleMail(e)} type="email" placeholder="Enter e-mail"  required={true}/>
</Form.Group>
</Col>
</Row>*/