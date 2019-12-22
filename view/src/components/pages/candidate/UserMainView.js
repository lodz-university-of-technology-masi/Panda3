import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ActiveTests from "../../ActiveTests"
import TestResults from "../../TestResults"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import CandidateTestView from "../../CandidateTestView";

class UserMainView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Container fluid={true}>
                    <Row style={{background: "LightBlue", padding: "0.5rem"}}>
                        <Col md="auto">Welcome, {this.props.username}</Col>
                        <Col md="auto"><Link to="/tests"><Button variant="primary">Active tests</Button></Link></Col>
                        <Col md="auto"><Link to="/results"><Button variant="primary">Test results</Button></Link></Col>
                    </Row>
                    <Switch>
                        <Route path="/tests" component={ActiveTests}/>
                        <Route path="/results" component={TestResults} />
                        <Route path="/test" component={CandidateTestView}/>
                    </Switch>
                </Container>
            </Router>
        );
    }
}

export default UserMainView;