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
import UserManagement from "./UserManagement";
import RecruiterTests from "./RecruiterTests";
import TestCreator from "./TestCreator/TestCreator";
import Translator from "./Translator";
import PendingSubmissions from "./SubmissionManager/PendingSubmissions";
import TestChecker from "./SubmissionManager/TestChecker";
import { ReactSVG } from 'react-svg'
import Panda from '../../../resources/panda.svg';
import AccessManager from "./AccessManager";
import TestImporter from "./TestImporter";
import {getLanguages} from "../../utils/Yandex";
import VirtualizedSelect from "react-virtualized-select";
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import SynonymViewer from "./SynonymViewer";
import {getSelectionText} from "../../utils/utils";
import {logout} from "../../utils/Cognito";
import Bamboo from "../../../resources/bamboo.svg";
import { createBrowserHistory } from "history";
import AddUser from "./AddUser";
import Handle404 from "../../404";
import HomeController from "../../HomeController";

const history = createBrowserHistory();


class RecruiterMainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history:history,
            loading:true,
            error:null,
            languages:[],
            synonymsUrl:'/synonyms/',
            language:{label:'English', value:'en'},
        }
    }

    setSynonymsURL = () =>{
        let text = getSelectionText();
        this.setState((prevState) => ({
            synonymsUrl:'/synonyms/'+ prevState.language.value +'/'+ text
        }));
    };

    handleLanguage = (selectValue) => {
        this.setState({
            language:selectValue
        });
    };

    componentDidMount = async () => {
        const languages = await getLanguages();
        try{
            const options = Object.keys(languages).map((key) => ({label:languages[key], value:key}));
            this.setState({
                languages: options,
                loading:false
            });
        } catch (e) {
            this.setState({
                error:true,
                loading:false
            })
        }
    };

    render() {
        return (
            <Router>
                <Container fluid={true} style={{height:"fit-content"}}>
                    <Row className="d-flex top-menu">
                        <Col className="d-flex align-items-center welcome" md="auto">Welcome, {this.props.user.name}</Col>
                        <Col md="auto">
                            <Link to="/candidates"><Button variant="primary">Candidates</Button></Link>
                        </Col>
                        <Col md="auto">
                            <Link to="/view-tests"><Button>View Tests</Button></Link>
                        </Col>
                        <Col md="auto">
                            <Link to="/test-creator"><Button>Test Creator</Button></Link>
                        </Col>
                        <Col md="auto">
                            <Link to="/import"><Button>Import tests</Button></Link>
                        </Col>
                        <Col md="auto">
                            <Button variant="dark" onClick={logout}>Logout</Button>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-end">
                            <div className="d-flex align-items-center">
                                <a href={this.state.synonymsUrl} target="_blank" rel="noopener noreferrer"><Button onClick={this.setSynonymsURL} className="mr-1">Get Synonyms in </Button></a>
                        <VirtualizedSelect
                            options={this.state.languages}
                            onChange={(selectValue) => this.handleLanguage(selectValue)}
                            value={this.state.language}
                            style={{minWidth:"8rem"}}
                        />
                        </div>
                        </Col>
                        <Col md="auto" className="d-flex align-items-center justify-content-end">
                            <ReactSVG className="panda" src={Bamboo}/>
                            <ReactSVG className="panda" src={Panda}/>
                        </Col>
                    </Row>
                    <Switch>
                        <Route exact path="/" render={() => <RecruiterTests userId={this.props.user.sub}/>}/>
                        <Route path="/view-tests" render={() => <RecruiterTests userId={this.props.user.sub}/>}/>
                        <Route exact path="/candidates" component={UserManagement}/>
                        <Route exact path="/candidates/add" component={AddUser}/>
                        <Route path="/test-creator" render={(routing) => <TestCreator match={routing.match} history={routing.history} userId={this.props.user.sub}/>}/>
                        <Route path="/modify-test/:id" render={(routing) => <TestCreator match={routing.match} history={routing.history} modify={true}/>}/>
                        <Route path="/translate/:id">{withRouter(Translator)}</Route>
                        <Route path="/submissions/:id">{withRouter(PendingSubmissions)}</Route>
                        <Route path="/check-test/:testId/:userId">{withRouter(TestChecker)}</Route>
                        <Route path="/manage-access/:id">{withRouter(AccessManager)}</Route>
                        <Route path="/import" render={() => <TestImporter userId={this.props.user.sub}/>}/>
                        <Route path="/synonyms/:lang/:text">{withRouter(SynonymViewer)}</Route>
                        <Route path='*' exact={true} component={Handle404} />
                    </Switch>
                </Container>
            </Router>
        );
    }
}

export default RecruiterMainView;