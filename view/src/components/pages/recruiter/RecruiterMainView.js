import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import UserManagement from "../../UserManagement";
import AddUser from "../../AddUser"
import SplitButton from "react-bootstrap/SplitButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import TestMenu from "./TestMenu";


//TODO: dodac routy
class RecruiterMainView extends Component {

    render() {
        return (
            <Router>
                <Container fluid={true}>
                    <Row style={{background: "LightBlue", padding: "0.5rem"}}>
                        <Col md="auto">Welcome, {this.props.username}</Col>
                        <Col md="auto">
                            <Link to="/users">
                            <SplitButton variant="primary" title={"Users"}>
                                <DropdownItem as="button"><Link to="/add-user">Add User</Link></DropdownItem>
                            </SplitButton></Link>
                        </Col>
                        <Col md="auto"><Link to="/test-groups"><Button variant="primary">Test Groups</Button></Link></Col>
                        <Col md="auto"><Link to="/test-menu"><Button variant="primary">Tests</Button></Link></Col>
                        <Col md="auto"><Link to="/check-tests"><Button variant="primary">Check Tests</Button></Link></Col>
                    </Row>
                    <Switch>
                        <Route path="/users" component={UserManagement}/>
                        <Route path="/add-user" component={AddUser}/>
                        <Route path="/test-menu"><TestMenu props={this.props}/></Route>
                    </Switch>
                </Container>
            </Router>
        );
    }
}

export default RecruiterMainView;