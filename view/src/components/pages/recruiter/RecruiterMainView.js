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
    withRouter
} from "react-router-dom";
import UserManagement from "../../UserManagement";
import AddUser from "../../AddUser"
import SplitButton from "react-bootstrap/SplitButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import RecruiterTests from "./RecruiterTests";
import TestCreator from "./TestCreator/TestCreator";
import Translator from "./Translator";
import PendingSubmissions from "./SubmissionManager/PendingSubmissions";
import TestChecker from "./SubmissionManager/TestChecker";
import { ReactSVG } from 'react-svg'
import Panda from '../../../resources/panda.svg';

class RecruiterMainView extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.match);
        return (
            <Router>
                <Container fluid={true}>
                    <Row className="d-flex" style={{background: "LightBlue", padding: "0.5rem"}}>
                        <Col className="d-flex align-items-center" md="auto">Welcome, {this.props.username}</Col>
                        <Col md="auto">
                            <Link to="/users">
                            <SplitButton variant="primary" title={"Users"}>
                                <DropdownItem as="button"><Link to="/add-user">Add User</Link></DropdownItem>
                            </SplitButton></Link>
                        </Col>
                        <Col md="auto">
                            <Link to="/view-tests"><Button>View Tests</Button></Link>
                        </Col>
                        <Col md="auto">
                            <Link to="/test-creator"><Button>Test Creator</Button></Link>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-end">
                            <ReactSVG className="panda" src={Panda}/>
                        </Col>
                    </Row>
                    <Switch>
                        <Route path="/users" component={UserManagement}/>
                        <Route path="/add-user" component={AddUser}/>
                        <Route path="/view-tests"><RecruiterTests/></Route>
                        <Route path="/test-creator" component={TestCreator}/>
                        <Route path="/modify-test/:id">{withRouter(TestCreator)}</Route>
                        <Route path="/translate/:id">{withRouter(Translator)}</Route>
                        <Route path="/submissions/:id">{withRouter(PendingSubmissions)}</Route>
                        <Route path="/check-test/:id">{withRouter(TestChecker)}</Route>
                    </Switch>
                </Container>
            </Router>
        );
    }
}

export default RecruiterMainView;