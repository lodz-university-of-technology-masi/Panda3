import React, {Component} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {getLanguages} from "../../utils/Yandex";
import Button from "react-bootstrap/Button";
import VirtualizedSelect from 'react-virtualized-select';

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import Alert from "react-bootstrap/Alert";

class Translator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            error:false,
            language:null,
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

    translate = (event) => {
        event.preventDefault();
        console.log(this.state.language.value);
    };

    render() {
        if(this.state.loading){
            return null;
        }
        else if(this.state.loading){
            return <Alert variant="danger">Fetch error</Alert>;
        }
        const options = Object.keys(this.state.languages).map((key) => ({label:this.state.languages[key], value:key}));

        return <Container className="d-flex justify-content-between" style={{borderStyle:"solid", borderWidth:"0.3rem", borderColor:"LightGray", marginTop:"1rem", minHeight:"5rem", borderRadius:"1rem", flexDirection:"column"}}>
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