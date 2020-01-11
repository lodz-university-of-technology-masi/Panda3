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
    Link,
    withRouter,
} from "react-router-dom";
import CandidateTestView from "../../CandidateTestView";
import {ReactSVG} from "react-svg";
import Panda from "../../../resources/panda.svg";
import Bamboo from "../../../resources/bamboo.svg";
import {logout} from "../../utils/Cognito";
import { createBrowserHistory } from "history";
import RecruiterTests from "../recruiter/RecruiterTests";

const history = createBrowserHistory();

class UserMainView extends Component {
    constructor(props) {
        super(props);
        this.state ={
            history:history
        }
    }


    render() {
        return (
            <Router>
                <Container fluid={true} style={{height:"100%"}}>
                    <Row style={{background: "LightBlue", padding: "0.5rem"}}>
                        <Col className="d-flex align-items-center welcome" md="auto">Welcome, {this.props.user.name}</Col>
                        <Col md="auto"><Link to="/tests"><Button variant="primary">Active tests</Button></Link></Col>
                        <Col md="auto"><Link to="/results"><Button variant="primary">My results</Button></Link></Col>
                        <Col md="auto">
                            <Button variant="dark" onClick={()=>{this.state.history.push('/');logout()}}>Logout</Button>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-end">
                            <ReactSVG className="panda" src={Bamboo}/>
                            <ReactSVG className="panda" src={Panda}/>
                        </Col>
                    </Row>
                    <Switch>
                        <Route exact path="/"><ActiveTests/></Route>
                        <Route path="/tests"><ActiveTests/></Route>
                        <Route path="/results"><TestResults/></Route>
                        <Route path="/test/:id">{withRouter(CandidateTestView)}</Route>
                    </Switch>
                </Container>
            </Router>
        );
    }
}

export default UserMainView;