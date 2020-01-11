import React, {Component} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {getLanguages, translateTest} from "../../utils/Yandex";
import Button from "react-bootstrap/Button";
import VirtualizedSelect from 'react-virtualized-select';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import LoadingSpinner from "../../LoadingSpinner";
import TranslationSpinner from "../../TranslationSpinner";
import ApiHelper from "../../utils/API";
import Error from "../../Error";

class Translator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            translating:false,
            loading:true,
            error:false,
            language:{label:'English', value:'en'},
            languages:[]
        }
    }

    componentDidMount = async () => {
        const languages = await getLanguages();
        try{
            this.setState({
                languages: languages,
                loading: false
            });
        } catch (e) {
            this.setState({
                error:true,
                loading: false
            })
        }
    };

    translate = async (event) => {
        event.preventDefault();
        this.setState({translating:true});
        await ApiHelper.getTestById(this.props.match.params.id).then(test => translateTest(test,this.state.language).then(test => ApiHelper.createTest(test).then(() =>
            this.props.history.push('/view-tests')
        ))).catch(() => this.setState({translating:false}))
    };

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
        else if(this.state.translating){
            return TranslationSpinner();
        }
        else if(this.state.error){
            return Error();
        }
        const options = Object.keys(this.state.languages).map((key) => ({label:this.state.languages[key], value:key}));

        return <Container className="d-flex justify-content-between bg-items-color" style={{borderStyle:"solid", borderWidth:"0.3rem", borderColor:"LightGray", marginTop:"1rem", minHeight:"5rem", borderRadius:"1rem", flexDirection:"column"}}>
            <Row className="d-flex justify-content-center align-items-center" style={{margin:"1rem"}}>
                <Col md="auto">Test: {this.props.match.params.id}</Col>
                <Col md={'auto'}>
                    <div className="d-flex"  style={{width:"auto", flexDirection:"column", marginBottom:"2rem"}}>
                        <label className="text-center">Select language:</label>
                        <VirtualizedSelect
                            options={options}
                            onChange={(selectValue) => this.setState({ language:selectValue })}
                            value={this.state.language}
                            style={{minWidth:"12rem"}}
                        />
                    </div>
                </Col>
                <Col md={'auto'}><Button variant="success" size="lg" onClick={this.translate}>Translate</Button></Col>
            </Row>
        </Container>
    }
}

export default Translator;