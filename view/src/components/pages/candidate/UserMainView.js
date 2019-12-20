import React, {Component} from 'react';
import TestTable from "../../TestTable";

class UserMainView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <div>
               <h2>Hello, {this.props.username}</h2>
               <div>
                   <span>Your tests: </span>
                   <TestTable/>
               </div>
           </div>
        );
    }
}

export default UserMainView;