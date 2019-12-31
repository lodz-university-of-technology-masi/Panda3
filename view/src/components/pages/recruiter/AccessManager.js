import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import "@kenshooui/react-multi-select/dist/style.css"
import LoadingSpinner from "../../LoadingSpinner";
import Alert from "react-bootstrap/Alert";
import update from "immutability-helper";
import MultiSelect from "@kenshooui/react-multi-select";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

class AccessManager extends Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            error:null,
            loading:true,
            users:[],
            selectedItems: [],
            items: [],
        }
    }

    fetchUsers = () =>{
      let users = [{
          username:'joe1',
          id:'testid1'
          },{
          username:'joe',
          id:'testid2'
      }];
      const items = Object.keys(users).map((key) => ({id:key, label:users[key].username}));
        this.setState({
            users:users,
            items: items,
            loading:false
        });
    };

    Submit = () => {
        const users = this.state.selectedItems.map(item => this.state.users[item.id].id);
        const body = {
            testId:this.props.match.params.id,
            users:users
        };
        console.log(body);
    };

    handleChange(selectedItems) {
        this.setState({ selectedItems });
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        this.fetchUsers();
    }

     messages = {
        searchPlaceholder: "Search...",
        noItemsMessage: "No Users...",
        noneSelectedMessage: "None Selected",
        selectedMessage: "selected",
        selectAllMessage: "Select All",
        clearAllMessage: "Clear All",
        disabledItemsTooltip: "You can only select 1 file"
    };

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
        if(this.state.error){
            return <Alert variant="danger">Fetch error</Alert>;
        }
        const { items, selectedItems } = this.state;

        return <Container>
            <div className="d-flex"  style={{padding:"0.5rem", borderStyle:"solid", borderWidth:"0.3rem", borderRadius:"1rem", borderColor:"LightGray", marginTop:"1rem", minHeight:"20rem", width:"auto", flexDirection:"column"}}>
                <label className="text-center" style={{fontWeight:"bold", fontSize:"2rem"}}>Select users</label>
                <MultiSelect
                    items={items}
                    selectedItems={selectedItems}
                    onChange={this.handleChange}
                    messages={this.messages}
                />
                <Button style={{width:"100%"}} variant="success" onClick={this.Submit}>Save</Button>
            </div>
        </Container>
    }

}

export default AccessManager;