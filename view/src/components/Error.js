import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import React from "react";


function Error() {
return <Container className="d-flex justify-content-center align-items-center" style={{flexDirection:"column"}}>
    <Alert variant="danger" style={{position:"absolute", top:"40%", fontWeight:"bold"}}>Fetch error</Alert>
</Container>
}

export default Error