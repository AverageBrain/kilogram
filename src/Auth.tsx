import React, {Component} from 'react';
import {UserApiClient} from "./types/hands/UserApiClient";




class Auth extends Component {
    componentDidMount() {
        new UserApiClient().getMe().then(res => console.log(res))
    }

    render() {
        return (
            <div>
                <p onClick={() => new UserApiClient().authWithGithub()}>Auth with github</p>
            </div>
        );
    }
}

export default Auth;