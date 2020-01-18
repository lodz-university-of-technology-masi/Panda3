import {Auth} from 'aws-amplify'
import HomeController from "../HomeController";

export function logout() {
    Auth.signOut({global:true})
        .then(() => {return HomeController})
        .catch(err => console.log(err));
}