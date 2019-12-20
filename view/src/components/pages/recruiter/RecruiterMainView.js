import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class RecruiterMainView extends Component {
    render() {
        return (
            <Router>
                <Container fluid={true}>
                    <Row style={{background: "LightBlue", padding: "0.5rem"}}>
                        <Col md="auto">Welcome, {this.props.username}</Col>
                        <Col md="auto"><Link to="/users"><Button variant="primary">Users</Button></Link></Col>
                        <Col md="auto"><Link to="/test-groups"><Button variant="primary">Test Groups</Button></Link></Col>
                        <Col md="auto"><Link to="/test-menu"><Button variant="primary">Tests</Button></Link></Col>
                        <Col md="auto"><Link to="/check-tests"><Button variant="primary">Check Tests</Button></Link></Col>
                    </Row>
                    //TODO: dodac routy
                    <Switch>
                    </Switch>
                </Container>
            </Router>
        );
    }
}

export default RecruiterMainView;