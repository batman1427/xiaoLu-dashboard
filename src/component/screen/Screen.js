import React from 'react'
import Option from "./Option"
import Intermediary from './Intermediary'
import CallCustomer from './CallCustomer'
import Extension from './Extension'
import IncomingCall from './IncomingCall'
import Visit from './Visit'
import Deal from './Deal'
import Summary from './Summary'
import './Screen.css';
import {Tab} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import {adminservice} from '../../service/admin.service'

class Screen extends React.Component {
    constructor(props) {
        super(props);
        let access_token = localStorage.getItem('access_token');
        if (access_token === undefined || access_token === null) {
            props.history.push('/');
        }
        adminservice.check(access_token, props);
        this.state = {};
    }

    render() {
        return (
            <Tab.Container id="operation">
                <div className="container-fluid">
                    <Option/>
                    <div id="excel">
                        <Tab.Content animation>
                            <Tab.Pane eventKey="intermediary"><Intermediary/></Tab.Pane>
                            <Tab.Pane eventKey="call_customer"><CallCustomer/></Tab.Pane>
                            <Tab.Pane eventKey="extension"><Extension/></Tab.Pane>
                            <Tab.Pane eventKey="incoming_call"><IncomingCall/></Tab.Pane>
                            <Tab.Pane eventKey="visit"><Visit/></Tab.Pane>
                            <Tab.Pane eventKey="deal"><Deal/></Tab.Pane>
                            <Tab.Pane eventKey="summary"><Summary/></Tab.Pane>
                        </Tab.Content>
                    </div>
                </div>
            </Tab.Container>
        );
    }
}

export default withRouter(Screen)