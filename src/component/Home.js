import React, { Component } from 'react';
import { LinkCommon } from './Common/Link';

class Home extends Component {
    render() {
        return (
            <div>
                <LinkCommon to='/user' className='btn btn-primary m-3'>Dashbord</LinkCommon>
                <LinkCommon to='/login' className='btn btn-primary'>Login</LinkCommon>
            </div>
        );
    }
}

export default Home;