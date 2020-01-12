import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import React from "react";


function Handle404() {
    return <Container className="d-flex justify-content-center align-items-center" style={{flexDirection:"column"}}>
        <Alert variant="danger" style={{position:"absolute", top:"40%", fontWeight:"bold"}}>404 not found</Alert>
    </Container>
}

export default Handle404