import React from 'react'
import Option from "./Option"
import Intermediary from './Intermediary'
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
                    <div id="intermediary">
                        <Tab.Content animation>
                            <Tab.Pane eventKey="intermediary"><Intermediary/></Tab.Pane>
                            <Tab.Pane eventKey="call_customer"></Tab.Pane>
                            <Tab.Pane eventKey="extension"></Tab.Pane>
                            <Tab.Pane eventKey="incoming_call"></Tab.Pane>
                            <Tab.Pane eventKey="visit"></Tab.Pane>
                            <Tab.Pane eventKey="deal"></Tab.Pane>
                            <Tab.Pane eventKey="summary"></Tab.Pane>
                            <Tab.Pane eventKey="upload"></Tab.Pane>
                        </Tab.Content>
                    </div>
                </div>
            </Tab.Container>
        );
    }
}

export default Screen