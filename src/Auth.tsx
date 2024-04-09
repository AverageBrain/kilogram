import React, {Component} from 'react';
import { authApiClient } from './client/hands';
// new userApiClient().getMe().then(res => console.log(res))


class Auth extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <p onClick={() => authApiClient.authWithGithub()}>Auth with github</p>
            </div>
        );
    }
}

export default Auth;