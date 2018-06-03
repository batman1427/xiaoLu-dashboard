import React from 'react'
import Option from "./Option"
import Intermediary from './Intermediary'
import CallCustomer from './CallCustomer'
import Extension from './Extension'
import IncomingCall from './IncomingCall'
import './Screen.css';
import {Tab} from 'react-bootstrap'

class Screen extends React.Component {
    constructor(props) {
        super(props);
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
                            <Tab.Pane eventKey="visit"></Tab.Pane>
                            <Tab.Pane eventKey="deal"></Tab.Pane>
                            <Tab.Pane eventKey="summary"></Tab.Pane>
                        </Tab.Content>
                    </div>
                </div>
            </Tab.Container>
        );
    }
}

export default Screen