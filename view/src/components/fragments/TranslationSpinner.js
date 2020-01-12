import React from 'react'
import Spinner from "react-bootstrap/Spinner";

function TranslationSpinner() {
    return <div className="d-flex align-items-center" style={{position:"absolute", left:"45%", top:"40%", flexDirection:"column"}}>
        <Spinner animation="border" variant="primary" style={{zoom:"3"}} />
        <span className="text-center" style={{fontWeight:"bold", marginTop:"1rem", fontSize:"1.5rem"}}>Translating . . .</span>
    </div>
}

export default TranslationSpinner;
