import React, {Component} from 'react'
import BasicTable from "./BasicTable";
import LoadingSpinner from "./LoadingSpinner";
import ApiHelper from "./utils/API";
import Alert from "react-bootstrap/Alert";

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

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        } else if(this.state.error){
            return <Alert variant="danger">Fetch error</Alert>;
        }
        return <div>
            <span>Results:</span>
            <BasicTable
                data={this.state.results}
                columns={this.state.columns}
            />
        </div>
    }
}

export default TestResults;