import React, {Component} from 'react';
import {UserApiClient} from "./types/hands/UserApiClient";
import {AuthApiClient} from "./types/hands/AuthApiClient";
new UserApiClient().getMe().then(res => console.log(res))


class Auth extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <p onClick={() => new AuthApiClient().authWithGithub()}>Auth with github</p>
            </div>
        );
    }
}

export default Auth;