import React from 'react'
import {Link} from 'react-router-dom'
import {Nav} from 'react-bootstrap'
import {NavItem} from 'react-bootstrap'

class Option extends React.Component {
    render() {
        return (
            <div>
                <Nav bsStyle="pills" >
                    <NavItem eventKey="intermediary">
                        中介带访
                    </NavItem>
                    <NavItem eventKey="call_customer">
                        CALL客表
                    </NavItem>
                    <NavItem eventKey="extension">
                        外拓表
                    </NavItem>
                    <NavItem eventKey="incoming_call">
                        来电
                    </NavItem>
                    <NavItem eventKey="visit">
                        来访
                    </NavItem>
                    <NavItem eventKey="deal">
                        成交
                    </NavItem>
                    <NavItem eventKey="summary">
                        综合
                    </NavItem>
                    <NavItem>
                    <Link id="turn_to_upload" to={'/upload'}>上传文件</Link>
                    </NavItem>
                </Nav>
            </div>
        )
    }
}

export default Option