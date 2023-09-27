import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
    render() {
        return (
            <div>
                {
                    this.props.auth.token?
                    <Redirect to='/user' />: this.props.children
                }
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps,null) (PrivateRoute);