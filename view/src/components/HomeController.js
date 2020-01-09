import React, {Component} from 'react';
import {withAuthenticator, Loading} from "aws-amplify-react";
import {Auth} from 'aws-amplify';
import UserMainView from "./pages/candidate/UserMainView";
import RecruiterMainView from "./pages/recruiter/RecruiterMainView";
import LoadingSpinner from "./LoadingSpinner";

class HomeController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
            loading:"true"
        }
    }

    componentDidMount = async () => {
        const session = await Auth.currentSession();
        console.log(session);
        const groups = session.getIdToken().decodePayload()['cognito:profile'];
        console.log(groups);
        const username = session.getIdToken().payload['cognito:username'];
        this.setState(username);
        this.setState({isAdmin: groups && groups.includes('Admin')})
    };

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
        const {isAdmin} = this.state;
        const {username} = this.state;
        if (isAdmin) { //zmienic na true by testowac widok admina
            return <RecruiterMainView username={username}/>;
        }
        return <UserMainView username={username}/>;
    }
}

//Czekamy na cognito
export default withAuthenticator(HomeController, false)
//export default HomeController;