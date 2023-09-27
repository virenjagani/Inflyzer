import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <Link to='/user' className='btn btn-primary m-3'>Dashbord</Link>
                <Link to='/login' className='btn btn-primary'>Login</Link>
            </div>
        );
    }
}

export default Home;