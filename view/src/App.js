import React from 'react'
import Amplify from 'aws-amplify'
import Helmet from "react-helmet"
import HomeController from "./components/HomeController"
import {API_NAME, API_MAIN_EP, REGION} from "./components/utils/API";


Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-1:c1ead9a5-abd9-46c9-87e0-1db205e0b394',
        region: 'us-east-1',
        userPoolId: 'us-east-1_FFFN7zGGO',
        userPoolWebClientId: '32ffim0p5i69sbjgr4v22legvv',
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
            <div className="container">
            </div>
        </div>
  );
}

export default App;
