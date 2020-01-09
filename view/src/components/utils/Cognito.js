import Auth from 'aws-amplify'

export function logout() {
    Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
}