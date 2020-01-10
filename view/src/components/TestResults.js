import React, {Component} from 'react'
import BasicTable from "./BasicTable";
import LoadingSpinner from "./LoadingSpinner";
import ApiHelper from "./utils/API";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Error from "./Error";

class TestResults extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loading:true,
            results: [],
            columns: [{
                Header: 'Test',
                accessor: 'testId'
            }, {
                Header: 'Result',
                accessor: 'result'
            }]
        }
    }

    fetch = async() => {
        //TODO:userId
        const user = "0775de48-324e-406d-b043-beeda717127c";
        return ApiHelper.getResults(user).then( data =>
            this.setState({
                results: data,
                loading:false,
            })
        )
    };

    componentDidMount = async() => {
        await this.fetch().catch(e =>
            {
                console.log(e);
                this.setState({
                    loading:false,
                    error:true
                })
            }
        )
    };

    getResultComponent = () => {
        if(this.state.results.length ===  0)
            return <span className="noTests">No results</span>;
        return <BasicTable
            data={this.state.tests}
            columns={this.state.columns}
        />
    };

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        } else if(this.state.error){
            return Error();
        }
        return <Container className="grayBorder bg-items-color" style={{height:"100%", padding:"0.8rem", marginTop:"0.5rem"}}>
            {this.getResultComponent()}
        </Container>
    }
}

export default TestResults;