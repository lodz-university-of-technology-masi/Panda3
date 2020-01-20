import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ActiveTests from "./ActiveTests"
import TestResults from "./TestResults"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import CandidateTestView from "./CandidateTestView";
import {ReactSVG} from "react-svg";
import Panda from "../../../resources/panda.svg";
import Bamboo from "../../../resources/bamboo.svg";
import {logout} from "../../utils/Cognito";
import {createBrowserHistory} from "history";
import Handle404 from "../../404";

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
                <Container fluid={true} style={{height:"fit-content"}}>
                    <Row className="d-flex top-menu">
                        <Col className="d-flex align-items-center welcome" md="auto">Welcome, {this.props.user.name}</Col>
                        <Col md="auto"><Link to="/tests"><Button variant="primary">Active tests</Button></Link></Col>
                        <Col md="auto"><Link to="/results"><Button variant="primary">My results</Button></Link></Col>
                        <Col md="auto">
                            <Button variant="dark" onClick={logout}>Logout</Button>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-end">
                            <ReactSVG className="panda" src={Bamboo}/>
                            <ReactSVG className="panda" src={Panda}/>
                        </Col>
                    </Row>
                    <Switch>
                        <Route exact path="/"><ActiveTests user={this.props.user}/></Route>
                        <Route path="/tests"><ActiveTests user={this.props.user}/></Route>
                        <Route path="/results"><TestResults user={this.props.user}/></Route>
                        <Route path="/test/:id" render={(routing) =>
                            <CandidateTestView
                            match={routing.match}
                            history={routing.history}
                            user={this.props.user}/>}/>
                        <Route path='*' exact={true} component={Handle404} />
                    </Switch>
                </Container>
            </Router>
        );
    }
}

export default UserMainView;