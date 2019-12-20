import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ActiveTests from "../../ActiveTests";
import TestResults from "../../TestResults";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class UserMainView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                    <Container>
                        <Row>
                            <Col>Welcome, {this.props.username}</Col>
                            <Col><Link to="/tests">Active tests</Link></Col>
                            <Col><Link to="/results">Test results</Link></Col>
                        </Row>
                            <Switch>
                                <Route path="/tests" component={ActiveTests}/>
                                <Route path="/results" component={TestResults} />
                            </Switch>
                    </Container>
            </Router>
        );
    }
}

export default UserMainView;