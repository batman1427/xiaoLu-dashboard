import React from 'react'

import ReactTable from 'react-table'
import {Panel} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

import {incomingcallservice} from '../../service/incomingcall.service'

import "react-table/react-table.css";

export class IncomingCall extends React.Component{

    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
        this.exportFile = this.exportFile.bind(this);
        this.state = {
            incomingcallList: [],
            fileUrl: null,
            columns : [
                {Header: '来电日期', accessor : 'callTime'},
                {Header: '客户姓名', accessor : 'customerName'},
                {Header: '联系电话', accessor : 'customerTel'},
                {Header: '置业目的', accessor : 'realtyPurpose'},
                {Header: '需求面积', accessor : 'demandArea'},
                {Header: '户型', accessor : 'houseType'},
                {Header: '居住区域', accessor : 'residentialZone'},
                {Header: '接受价位', accessor : 'acceptPrice'},
                {Header: '获知途径', accessor : 'accessKnown'},
                {Header: '咨询内容', accessor : 'consultContent'},
                {Header: '转访日期', accessor : 'visitTime'},
                {Header: '客户情况', accessor : 'customerSituation'},
                {Header: '成交日期', accessor : 'dealTime'},
                {Header: '成交楼盘', accessor : 'dealBuilding'},
                {Header: '成交房号', accessor : 'dealRoomnum'},
                {Header: '销售员', accessor : 'salesman'}
            ]
        }
    }

    componentDidMount() {
        incomingcallservice.fetchIncomingCallList()
            .then(
                (result) => {
                    if (result.responseCode === 'RESPONSE_OK') {
                        this.setState({
                            fileUrl: result.fileUrl,
                            incomingcallList: result.data.map(function (e) {
                                result = {callTime: e.callTime, customerName: e.customerName, customerTel: e.customerTel, realtyPurpose: e.realtyPurpose, demandArea: e.demandArea, houseType: e.houseType, residentialZone: e.residentialZone, acceptPrice: e.acceptPrice, accessKnown: e.accessKnown, consultContent: e.consultContent, visitTime: e.visitTime, customerSituation: e.customerSituation, dealTime: e.dealTime, dealBuilding: e.dealBuilding, dealRoomnum: e.dealRoomnum, salesman: e.salesman};
                                result.callTime = incomingcallservice.modifyTime(e.callTime);
                                return result;
                            })
                        })
                    }else{
                        this.setState({fileUrl: result.fileUrl})
                    }
                }
            )
    }

    fetch() {
        let startDate = this.refs.startDate.value;
        let endDate = this.refs.endDate.value;
        incomingcallservice.fetchNeedIncomingCall(startDate, endDate)
            .then(
                (result) => {
                    if (result.responseCode === 'RESPONSE_OK') {
                        this.setState({
                            fileUrl: result.fileUrl,
                            incomingcallList: result.data.map(function (e) {
                                result = {callTime: e.callTime, customerName: e.customerName, customerTel: e.customerTel, realtyPurpose: e.realtyPurpose, demandArea: e.demandArea, houseType: e.houseType, residentialZone: e.residentialZone, acceptPrice: e.acceptPrice, accessKnown: e.accessKnown, consultContent: e.consultContent, visitTime: e.visitTime, customerSituation: e.customerSituation, dealTime: e.dealTime, dealBuilding: e.dealBuilding, dealRoomnum: e.dealRoomnum, salesman: e.salesman};
                                result.callTime = incomingcallservice.modifyTime(e.callTime);
                                return result;
                            })
                        })
                    }else{
                        this.setState({incomingcallList: [], fileUrl: result.fileUrl})
                    }
                }
            )
    }

    exportFile() {
        incomingcallservice.exportFile(this.state.fileUrl)

    }

    render() {
        return (
            <div style={{marginTop: "20px"}}>
                <div className="incomingcall_screen" style={{marginLeft: "0px", display: "flex"}}>
                    <div style={{width: "30%", marginRight: "20px"}}>
                        <div className="col-md-6 form-input">
                            起始时间
                            <input id="startDate" type="date" ref="startDate" placeholder="起始时间"></input>
                        </div>
                        <div className="col-md-6 form-input">
                            结束时间
                            <input id="endDate" type="date" ref="endDate" placeholder="结束时间"></input>
                        </div>
                    </div>
                    <div style={{width: "12%", paddingTop: "17px"}}>
                        <button id="search_btn" type="button" onClick={this.fetch}>
                            查询
                        </button>
                        <button id="export_btn" style={{marginLeft: "20px"}} onClick={this.exportFile}>
                            导出
                        </button>
                    </div>
                </div>
                <Panel style={{margin: "20px 0"}}>
                    <ReactTable
                        data={this.state.incomingcallList}
                        columns = {this.state.columns}
                        filterable={false}
                    />
                </Panel>
            </div>
        );
    }
}

export default withRouter(IncomingCall);