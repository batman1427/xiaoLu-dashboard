import React from 'react'

import ReactTable from 'react-table'
import {Panel} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

import {intermediaryservice} from '../../service/intermediary.service'

import "react-table/react-table.css";

export class Intermediary extends React.Component{

    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
        this.exportFile = this.exportFile.bind(this);
        this.state = {
            intermediaryList: [],
            fileUrl: null,
            columns : [
                {Header: '报备日期', accessor : 'reportTime'},
                {Header: '客户归属', accessor : 'customerSource'},
                {Header: '报备楼盘', accessor : 'reportBuilding'},
                {Header: '客户姓名', accessor : 'customerName'},
                {Header: '客户电话', accessor : 'customerTel'},
                {Header: '意向等级', accessor : 'intentionLevel'},
                {Header: '到访时间', accessor : 'visitTime'},
                {Header: '到访楼盘', accessor : 'visitBuilding'},
                {Header: '客户情况', accessor : 'customerSituation'},
                {Header: '成交日期', accessor : 'dealTime'},
                {Header: '成交楼盘', accessor : 'dealBuilding'},
                {Header: '成交房号', accessor : 'dealRoomnum'},
                {Header: '备注', accessor : 'remark'}
            ]
        }
    }

    componentDidMount() {
        intermediaryservice.fetchIntermediaryList()
            .then(
                (result) => {
                    if (result.responseCode === 'RESPONSE_OK') {
                        this.setState({
                            fileUrl: result.fileUrl,
                            intermediaryList: result.data.map(function (e) {
                                result = {reportTime: e.reportTime, customerSource: e.customerSource, reportBuilding: e.reportBuilding, customerName: e.customerName, customerTel: e.customerTel, intentionLevel: e.intentionLevel, visitTime: e.visitTime, visitBuilding: e.visitBuilding, customerSituation: e.customerSituation, dealTime: e.dealTime, dealBuilding: e.dealBuilding, dealRoomnum: e.dealRoomnum, remark: e.remark};
                                result.reportTime = intermediaryservice.modifyTime(e.reportTime);
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
        intermediaryservice.fetchNeedIntermediary(startDate, endDate)
            .then(
                (result) => {
                    if (result.responseCode === 'RESPONSE_OK') {
                        this.setState({
                            fileUrl: result.fileUrl,
                            intermediaryList: result.data.map(function (e) {
                                result = {reportTime: e.reportTime, customerSource: e.customerSource, reportBuilding: e.reportBuilding, customerName: e.customerName, customerTel: e.customerTel, intentionLevel: e.intentionLevel, visitTime: e.visitTime, visitBuilding: e.visitBuilding, customerSituation: e.customerSituation, dealTime: e.dealTime, dealBuilding: e.dealBuilding, dealRoomnum: e.dealRoomnum, remark: e.remark};
                                result.reportTime = intermediaryservice.modifyTime(e.reportTime);
                                return result;
                            })
                        })
                    }else{
                        this.setState({intermediaryList: [], fileUrl: result.fileUrl})
                    }
                }
            )
    }

    exportFile() {
        intermediaryservice.exportFile(this.state.fileUrl)

    }

    render() {
        return (
            <div style={{marginTop: "20px"}}>
                <div className="intermediary_screen" style={{marginLeft: "0px", display: "flex"}}>
                    <div style={{width: "30%", marginRight: "20px"}}>
                        <div className="col-md-6 form-input">
                            <input id="startDate" type="date" ref="startDate" placeholder="起始时间"></input>
                        </div>
                        <div className="col-md-6 form-input">
                            <input id="endDate" type="date" ref="endDate" placeholder="结束时间"></input>
                        </div>
                    </div>
                    <div style={{width: "12%"}}>
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
                        data={this.state.intermediaryList}
                        columns = {this.state.columns}
                        filterable
                        defaultFilterMethod={(filter, row) =>
                            String(row[filter.id]).includes(filter.value)}
                    />
                </Panel>
            </div>
        );
    }
}

export default withRouter(Intermediary);