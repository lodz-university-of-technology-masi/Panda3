import React, {Component} from 'react'
import BasicTable from "../../fragments/BasicTable";
import LoadingSpinner from "../../fragments/LoadingSpinner";
import ApiHelper from "../../utils/API";
import Container from "react-bootstrap/Container";
import Error from "../../fragments/Error";

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
        return ApiHelper.getResults(this.props.user.sub).then( data =>{
            console.log(data);
            this.setState({
                results: data,
                loading:false,
            })}
        )
    };

    componentDidMount = async() => {
        await this.fetch().catch(e =>
                this.setState({
                    loading:false,
                    error:true
                })
        )
    };

    getResultComponent = () => {
        if(this.state.results.length ===  0)
            return <span className="noTests">No results</span>;
        return <BasicTable
            data={this.state.results}
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