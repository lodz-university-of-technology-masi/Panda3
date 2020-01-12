import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import UserMainView from "./pages/candidate/UserMainView";
import RecruiterMainView from "./pages/recruiter/RecruiterMainView";
import LoadingSpinner from "./LoadingSpinner";
import {ForgotPassword, SignIn, RequireNewPassword, withAuthenticator} from "aws-amplify-react";

class HomeController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRecruiter: false,
        }
    }

    componentDidMount = async () => {
        await Auth.currentSession().then(
            r => {
                const payload = r.getIdToken().decodePayload();
                const groups = payload['cognito:groups'];
                if (groups && groups.includes('Recruiters')) {
                    this.setState({isRecruiter: true})
                }
                this.setState({user: payload})
            }
        ).finally(() => this.setState({loading: false}));
    };

    getHome = (user) => {
        const {isRecruiter} = this.state;
        if (isRecruiter) {
            return <RecruiterMainView user={user}/>;
        }
        return <UserMainView user={user}/>;
    };

    render() {
        if (this.state.loading) {
            return LoadingSpinner();
        }
        return this.getHome(this.state.user)
    }
}

export default withAuthenticator(HomeController, false, [
    <SignIn/>,
    <ForgotPassword/>,
    <RequireNewPassword/>
]);

