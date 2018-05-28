import React from 'react';
import {Route} from 'react-router-dom'

import Upload from './upload/Upload'
import Screen from './screen/Screen'

class MainPanel extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Route path="/upload" render={() => (<Upload/>)}/>
                <Route path="/screen" render={() => (<Screen/>)}/>
            </div>
        )

    }
}

export default MainPanel