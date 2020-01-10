import React from 'react'
import Amplify from 'aws-amplify'
import Helmet from "react-helmet"
import HomeController from "./components/HomeController"
import {API_NAME, API_MAIN_EP, REGION} from "./components/utils/API";

Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-1:9542f1b5-845e-4057-bc00-a940917f4457',
        region: 'us-east-1',
        userPoolId: 'us-east-1_no7qa6ygZ',
        userPoolWebClientId: '42n9c0k2ngao1fjnukr3u4pr7h',
        mandatorySignIn: true,
    },
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
        </div>
  );
}

export default App;
