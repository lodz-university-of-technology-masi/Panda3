import {Auth} from 'aws-amplify'
import HomeController from "../HomeController";
import {createBrowserHistory} from "history";
const history = createBrowserHistory();
export function logout() {
    Auth.signOut({global:true})
        .then(() => {history.push('/');return HomeController})
        .catch(err => console.log(err));
}