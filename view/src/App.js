import React from 'react'
import Amplify from 'aws-amplify'
import Helmet from "react-helmet"
import HomeController from "./components/HomeController"
import Container from "react-bootstrap/Container"

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
        <Container fluid={true}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Panda3</title>
            </Helmet>
            <HomeController/>
        </Container>
  );
}

export default App;
