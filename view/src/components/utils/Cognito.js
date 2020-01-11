import {Auth} from 'aws-amplify'

export function logout() {
    Auth.signOut({global:true})
        .then(data => console.log(data))
        .catch(err => console.log(err));
}