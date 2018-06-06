import React from 'react'

import ReactTable from 'react-table'
import {Panel} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

import {visitservice} from '../../service/visit.service'

import "react-table/react-table.css";

export class Visit extends React.Component{

    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
        this.exportFile = this.exportFile.bind(this);
        this.state = {
            visitList: [],
            fileUrl: null,
            columns : [
                {Header: '来访日期', accessor : 'visitTime'},
                {Header: '姓名', accessor : 'customerName'},
                {Header: '电话', accessor : 'customerTel'},
                {Header: '来访次数', accessor : 'visitedTimes'},
                {Header: '意向面积', accessor : 'intentionalArea'},
                {Header: '接受价位', accessor : 'acceptPrice'},
                {Header: '置业次数', accessor : 'realtyTimes'},
                {Header: '年龄', accessor : 'age'},
                {Header: '居住区域', accessor : 'residentialZone'},
                {Header: '工作区域', accessor : 'workZone'},
                {Header: '职业信息', accessor : 'occupation'},
                {Header: '认知途径', accessor : 'accessKnown'},
                {Header: '置业目的', accessor : 'realtyPurpose'},
                {Header: '置业类型', accessor : 'realtyType'},
                {Header: '关注点', accessor : 'concerns'},
                {Header: '客户描述', accessor : 'customerDescription'},
                {Header: '最新动态', accessor : 'latestState'},
                {Header: '客户类别', accessor : 'customerType'},
                {Header: '置业顾问', accessor : 'realtyConsultant'},
                {Header: '成交日期', accessor : 'dealTime'},
                {Header: '成交房号', accessor : 'dealRoomnum'}
            ]
        }
    }

    componentDidMount() {
        visitservice.fetchVisitList()
            .then(
                (result) => {
                    if (result.responseCode === 'RESPONSE_OK') {
                        this.setState({
                            fileUrl: result.fileUrl,
                            visitList: result.data.map(function (e) {
                                result = {visitTime: e.visitTime, customerName: e.customerName, customerTel: e.customerTel, visitedTimes: e.visitedTimes, intentionalArea: e.intentionalArea, acceptPrice: e.acceptPrice, realtyTimes: e.realtyTimes, age: e.age, residentialZone: e.residentialZone, workZone: e.workZone, occupation: e.occupation, accessKnown: e.accessKnown, realtyPurpose: e.realtyPurpose, realtyType: e.realtyType, concerns: e.concerns, customerDescription: e.customerDescription, latestState: e.latestState, customerType: e.customerType, realtyConsultant: e.realtyConsultant, dealTime: e.dealTime, dealRoomnum: e.dealRoomnum};
                                result.visitTime = visitservice.modifyTime(e.visitTime);
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
        visitservice.fetchNeedVisit(startDate, endDate)
            .then(
                (result) => {
                    if (result.responseCode === 'RESPONSE_OK') {
                        this.setState({
                            fileUrl: result.fileUrl,
                            visitList: result.data.map(function (e) {
                                result = {visitTime: e.visitTime, customerName: e.customerName, customerTel: e.customerTel, visitedTimes: e.visitedTimes, intentionalArea: e.intentionalArea, acceptPrice: e.acceptPrice, realtyTimes: e.realtyTimes, age: e.age, residentialZone: e.residentialZone, workZone: e.workZone, occupation: e.occupation, accessKnown: e.accessKnown, realtyPurpose: e.realtyPurpose, realtyType: e.realtyType, concerns: e.concerns, customerDescription: e.customerDescription, latestState: e.latestState, customerType: e.customerType, realtyConsultant: e.realtyConsultant, dealTime: e.dealTime, dealRoomnum: e.dealRoomnum};
                                result.visitTime = visitservice.modifyTime(e.visitTime);
                                return result;
                            })
                        })
                    }else{
                        this.setState({visitList: [], fileUrl: result.fileUrl})
                    }
                }
            )
    }

    exportFile() {
        visitservice.exportFile(this.state.fileUrl)

    }

    render() {
        return (
            <div style={{marginTop: "20px"}}>
                <div className="visit_screen" style={{marginLeft: "0px", display: "flex"}}>
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
                        data={this.state.visitList}
                        columns = {this.state.columns}
                        filterable={false}
                    />
                </Panel>
            </div>
        );
    }
}

export default withRouter(Visit);