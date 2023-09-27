
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class PublicRoute extends Component {
    render() {
        return (
            <div>
                {
                    this.props.auth.token?
                     this.props.children:<Redirect to='/login' />
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

export default connect(mapStateToProps,null) (PublicRoute);