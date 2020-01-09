import React, {Component} from 'react';
import {withAuthenticator} from "aws-amplify-react";
import {Auth} from 'aws-amplify';
import UserMainView from "./pages/candidate/UserMainView";
import RecruiterMainView from "./pages/recruiter/RecruiterMainView";
import LoadingSpinner from "./LoadingSpinner";

class HomeController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            isRecruiter: false,
            username:''
        }
    }

    componentDidMount = async () => {
        await Auth.currentSession().then(
            r => {
                const payload = r.getIdToken().decodePayload();
                if(payload.profile === 'Recruiter' ){
                    this.setState({isRecruiter:true})
                }
                this.setState({username:payload.email})
            }
        ).finally(() => this.setState({loading:false}));
    };

    render() {
        if(this.state.loading){
            return LoadingSpinner();
        }
        const {isRecruiter} = this.state;
        const {username} = this.state;
        if (isRecruiter) {
            return <RecruiterMainView username={username}/>;
        }
        return <UserMainView username={username}/>;
    }
}

export default withAuthenticator(HomeController, false)