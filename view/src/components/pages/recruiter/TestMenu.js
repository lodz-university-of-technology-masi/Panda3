import React  from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link, Route, Switch} from "react-router-dom";
import Button from "react-bootstrap/Button";
import RecruiterTests from "./RecruiterTests";
import TestCreator from "./TestCreator/TestCreator";



const TestMenu = () => {
    return <Container fluid={true}>
        <Row style={{background: "LightBlue", padding: "0.5rem"}}>
            <Col md="auto">
                <Link to="/test-menu/view-tests"><Button>View Tests</Button></Link>
            </Col>
            <Col md="auto">
                <Link to="/test-menu/test-creator"><Button>Test Creator</Button></Link>
            </Col>
        </Row>
            <Route path="/test-menu/view-tests"><RecruiterTests/></Route>
            <Route path="/test-menu/test-creator"><TestCreator/></Route>
    </Container>
};

 export default TestMenu