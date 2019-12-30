import React from 'react'
import Amplify from 'aws-amplify'
import Helmet from "react-helmet"
import HomeController from "./components/HomeController"
import {API_NAME, API_MAIN_EP, REGION} from "./components/utils/API";


Amplify.configure({
    /*Auth: {
        identityPoolId: 'eu-central-1:d8667c34-8b20-4412-bb1b-b07038ec560b',
        region: 'eu-central-1',
        //userPoolId: '',
       // userPoolWebClientId: '',
        mandatorySignIn: false,
    },*/
    API: {
        region: REGION,
        endpoints: [
            {
                name: API_NAME,
                endpoint: API_MAIN_EP,
            },
        ]
    }
});



function App() {
  return (
        <div style={{width:"100%", height:"100%", margin:"0auto"}}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Panda3</title>
            </Helmet>
            <HomeController/>
            <div className="container">
            </div>
        </div>
  );
}

export default App;
