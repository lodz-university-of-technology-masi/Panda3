import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {ApiHelper} from "../../utils/API";
import LoadingSpinner from "../../LoadingSpinner";


class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            firstName:'',
            lastName:'',
            phone:'',
            email:''
        };
        this.handleFirstName.bind(this);
        this.handleLastName.bind(this);
        this.handleMail.bind(this);
        this.handlePhone.bind(this);
    }

    handlePhone(event){
        this.setState({phone:event.target.value})
    }

    handleSubmit = async() => {
        this.setState({loading:true});
       let body = {
           name: this.state.firstName,
           surname: this.state.lastName,
           email: this.state.email,
           phone: this.state.phone,
       };
       await ApiHelper.addUser(body).then(data => {
           console.log(data);
           this.props.history.push('/candidates')
       }).catch(err => {alert(err);this.setState({loading:false});});
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


    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
        return <Container className="justify-items-center mt-3">
            <Form className="justify-items-center bg-items-color grayBorder" onSubmit={(e) => this.handleSubmit(e)}
                  style={{position:"absolute", left:"40%", top:"25%", padding:"1rem"}}>
                <Row>
                    <Col md="auto">
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e) => this.handleFirstName(e)} type="text" placeholder="Enter name" required={true}/>
                        </Form.Group>
                    </Col>
                    <Col md="auto">
                        <Form.Group>
                            <Form.Label>Family Name</Form.Label>
                            <Form.Control onChange={(e) => this.handleLastName(e)} type="text" placeholder="Enter last name" required={true} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md="auto">
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => this.handleMail(e)} type="email" placeholder="Enter e-mail" required={true}/>
                        </Form.Group>
                    </Col>
                    <Col md="auto">
                        <Form.Group>
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control onChange={(e) => this.handlePhone(e)} type="tel" placeholder="Enter phone" required={true}/>
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
                        <Link to="/candidates"><Button variant="warning">Cancel</Button></Link>
                    </Col>
                </Row>
            </Form>
        </Container>
    }
}

export default AddUser;
