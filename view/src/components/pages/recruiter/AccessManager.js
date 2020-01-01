import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import "@kenshooui/react-multi-select/dist/style.css"
import LoadingSpinner from "../../LoadingSpinner";
import Alert from "react-bootstrap/Alert";
import MultiSelect from "@kenshooui/react-multi-select";
import Button from "react-bootstrap/Button";
import ApiHelper from "../../utils/API";

class AccessManager extends Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            error:null,
            success:null,
            loading:true,
            users:[],
            selectedItems: [],
            items: [],
        }
    }

    fetchUsers = async() =>{

      let users = await ApiHelper.getParticipants().catch((e)=>alert(e));
      let usersWithAccess = await ApiHelper.getUserWithAccess(this.props.match.params.id).catch((e)=>alert(e));

      let items = Object.keys(users).map((key) => ({id:key, label:users[key].name + ' ' + users[key].surname}));

      let selectedItems = Object.keys(usersWithAccess).map((key) => ({id:key, label:usersWithAccess[key].name + ' ' + usersWithAccess[key].surname}));
      for(let i=0; i<selectedItems.length;i++){
          let a = selectedItems[i];
          let match = items.find( i => i.label === a.label );
          a.id = match.id;
      }
        this.setState({
            users:users,
            items: items,
            selectedItems: selectedItems
        });

    };

    Submit = async() => {
        this.setState({loading:true});
        const users = this.state.selectedItems.map(item => this.state.users[item.id].id);
        const body = {
            testId:this.props.match.params.id,
            users:users
        };
        await ApiHelper.addUsersToTest(body).then(() => this.setState({success:true})).catch(() => this.setState({success:false})).finally(() => this.setState({loading:false}))
    };

    handleChange(selectedItems) {
        this.setState({ selectedItems });
    }

    componentDidMount = async() => {
        await this.fetchUsers().then(()=>this.setState({loading:false}))
    };

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
            <div className="d-flex bg-items-color"  style={{padding:"0.5rem", borderStyle:"solid", borderWidth:"0.3rem", borderRadius:"1rem", borderColor:"LightGray", marginTop:"1rem", minHeight:"20rem", width:"auto", flexDirection:"column"}}>
                <label className="text-center" style={{fontWeight:"bold", fontSize:"2rem"}}>Select users</label>
                <MultiSelect
                    items={items}
                    selectedItems={selectedItems}
                    onChange={this.handleChange}
                    messages={this.messages}
                />
                <Button className="mb-2" style={{width:"100%"}} variant="success" onClick={this.Submit}>Save</Button>
                {
                    this.state.success === true
                        ?  <Alert variant="success">Permissions changed</Alert>
                    : this.state.success === null ? null :
                        <Alert variant="danger">Error changing permissions</Alert>

                }
            </div>
        </Container>
    }

}

export default AccessManager;