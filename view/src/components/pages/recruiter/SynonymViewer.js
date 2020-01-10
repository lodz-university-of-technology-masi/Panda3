import React, {Component} from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {getSynonyms} from "../../utils/Yandex";
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import LoadingSpinner from "../../LoadingSpinner";
import BasicTable from "../../BasicTable";

class SynonymViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            error:null,
            dicEntry:[],
            columns: [{
                Header: 'Meaning',
                accessor: 'text'
            },{
                id: 'synonyms',
                Header: 'Synonyms',
                Cell: table => {
                    let synonyms = table.row.original.syn;
                    if(synonyms !== undefined){
                        let items = Object.keys(synonyms).map((key) => (synonyms[key].text));
                        return (
                            <p>{items.join(', ')}</p>
                        )
                    } else{
                        return (
                            <p/>
                        )
                    }
                }
            }]

        }
    }

    componentDidMount = async () => {
        await getSynonyms(this.props.match.params.text, this.props.match.params.lang).then(r => this.setState({
            dicEntry: r,
            loading: false
        })).catch(e => {
            alert(e);
            this.props.history.push('/view-tests')
        });
    };

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }

        return <Container className="d-flex bg-items-color grayBorder m1rem p_d" style={{minHeight:"5rem", flexDirection:"column"}}>
            <Row className="d-flex justify-content-start align-items-baseline">
                <Col md="auto"><span style={{fontWeight:"bold", fontSize:"2rem"}}>{this.props.match.params.text}</span></Col>
                <Col md="auto"><p style={{fontStyle:"italic", fontSize:"1rem"}}>{this.state.dicEntry[0].pos}</p></Col>
                <Col md="auto"><p style={{fontStyle:"italic", fontSize:"1rem"}}>{this.state.dicEntry[0].ts}</p></Col>
            </Row>
            <Row>
                <hr className="divider"/>
            </Row>
            <Row>
            <BasicTable
                data={this.state.dicEntry[0].tr}
                columns={this.state.columns}
            />
            </Row>
        </Container>
    }
}

export default SynonymViewer;