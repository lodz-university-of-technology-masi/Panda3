import React, {Component} from 'react';
import {withAuthenticator} from "aws-amplify-react";
import {Auth} from 'aws-amplify';
import UserMainView from "./UserMainView";

class HomeController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false
        }
    }

    componentDidMount = async () => {
        const session = await Auth.currentSession();
        const groups = session.getIdToken().decodePayload()['cognito:groups'];
        this.setState({isAdmin: groups && groups.includes('Admin')})
    };

    render() {
        const {isAdmin} = this.state;
        if (isAdmin) {
            return;
        }
        return <UserMainView/>;
    }
}

//Czekamy na cognito
//export default withAuthenticator(HomeController, false)
export default HomeController;