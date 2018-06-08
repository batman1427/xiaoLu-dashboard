import React from 'react';
import {Route} from 'react-router-dom'

import Upload from './upload/Upload'
import Screen from './screen/Screen'
import LoginForm from  './login/LoginForm'

class MainPanel extends React.Component{
    render() {
        return (
            <div>
                <Route exact path="/" render={() => (<LoginForm/>)}/>
                <Route exact path="/login" render={() => (<LoginForm/>)}/>
                <Route path="/upload" render={() => (<Upload/>)}/>
                <Route path="/screen" render={() => (<Screen/>)}/>
            </div>
        )

    }
}

export default MainPanel