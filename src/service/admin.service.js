import axios from 'axios'

const server = 'http://127.0.0.1:8000/';

function login(username, password, props) {
    let url = server + 'login';
    let form = new FormData();
    form.set('username', username);
    form.set('password', password);
    axios.post(url, form)
        .then(function (response) {
            if (response.data.responseCode === 'RESPONSE_OK') {
                let access_token = response.data.data[0].adminToken;
                localStorage.setItem('access_token', access_token);
                props.history.push('/upload')
            } else {
                console.log('authentication failed for user: ' + username)
            }
        })
        .catch(() => {
            return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
        });

}

function check(access_token, props) {
    let url = server + 'check';
    let form = new FormData();
    form.set('token', access_token);
    axios.post(url, form)
        .then(function (response) {
            if (response.data.responseCode !== 'RESPONSE_OK') {
                props.history.push('/');
            }
        })
        .catch(() => {
            return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
        });
}

export const adminservice = {
    login, check
};