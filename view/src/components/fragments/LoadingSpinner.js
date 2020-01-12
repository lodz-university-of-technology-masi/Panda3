import React from 'react'
import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
    return <Spinner animation="grow" variant="primary" style={{zoom:"3", position:"absolute", left:"50%", top:"40%",}} />
}

export default LoadingSpinner;