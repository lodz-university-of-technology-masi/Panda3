import React from 'react';
import Amplify from 'aws-amplify';
import HomeController from "./components/HomeController";

Amplify.configure({
    Auth: {
        identityPoolId: 'eu-central-1:d8667c34-8b20-4412-bb1b-b07038ec560b',
        region: 'eu-central-1',
        //userPoolId: '',
       // userPoolWebClientId: '',
        mandatorySignIn: true,
    },
    API: {
        region: 'eu-central-1',
        endpoints: [
            {
                name: "name",
                endpoint: "ep",
            }
        ]
    }
});



function App() {
  return (
        <div style={{width: '100%'}}>
            <HomeController/>
        </div>
  );
}

export default App;
