import React from 'react'

import ReactTable from 'react-table'
import {Panel} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

import {callcustomerservice} from '../../service/callcustomer.service'

import "react-table/react-table.css";

export class CallCustomer extends React.Component{

    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
        this.exportFile = this.exportFile.bind(this);
        this.state = {
            callCustomerList: [],
            fileUrl: null,
            columns : [
                {Header: '区域', accessor : 'datasourceArea'},
                {Header: '楼盘名称', accessor : 'datasourceBuilding'},
                {Header: '来电-来访-业主', accessor : 'datasourceType'},
                {Header: '客户姓名', accessor : 'customerName'},
                {Header: '客户电话', accessor : 'customerTel'},
                {Header: 'call客日期', accessor : 'callTime'},
                {Header: 'call客人员', accessor : 'callSalesman'},
                {Header: '反馈情况', accessor : 'feedback'},
                {Header: '意向等级', accessor : 'intentionLevel'},
                {Header: '意向楼盘', accessor : 'intentionBuilding'},
                {Header: '转访时间', accessor : 'visitTime'},
                {Header: '转访楼盘', accessor : 'visitBuilding'},
                {Header: '客户情况', accessor : 'customerSituation'},
                {Header: '成交日期', accessor : 'dealTime'},
                {Header: '成交楼盘', accessor : 'dealBuilding'},
                {Header: '成交房号', accessor : 'dealRoomnum'},
                {Header: '备注', accessor : 'remark'}
            ]
        }
    }

    componentDidMount() {
        callcustomerservice.fetchCallCustomerList()
            .then(
                (result) => {
                    if (result.responseCode === 'RESPONSE_OK') {
                        this.setState({
                            fileUrl: result.fileUrl,
                            callCustomerList: result.data.map(function (e) {
                                result = {datasourceArea: e.datasourceArea, datasourceBuilding: e.datasourceBuilding, datasourceType: e.datasourceType, customerName: e.customerName, customerTel: e.customerTel, callTime: e.callTime, callSalesman: e.callSalesman, feedback: e.feedback, intentionLevel: e.intentionLevel, intentionBuilding: e.intentionBuilding, visitTime: e.visitTime, visitBuilding: e.visitBuilding, customerSituation: e.customerSituation, dealTime: e.dealTime, dealBuilding: e.dealBuilding, dealRoomnum: e.dealRoomnum, remark: e.remark};
                                result.callTime = callcustomerservice.modifyTime(e.callTime);
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
        callcustomerservice.fetchNeedCallCustomer(startDate, endDate)
            .then(
                (result) => {
                    if (result.responseCode === 'RESPONSE_OK') {
                        this.setState({
                            fileUrl: result.fileUrl,
                            callCustomerList: result.data.map(function (e) {
                                result = {datasourceArea: e.datasourceArea, datasourceBuilding: e.datasourceBuilding, datasourceType: e.datasourceType, customerName: e.customerName, customerTel: e.customerTel, callTime: e.callTime, callSalesman: e.callSalesman, feedback: e.feedback, intentionLevel: e.intentionLevel, intentionBuilding: e.intentionBuilding, visitTime: e.visitTime, visitBuilding: e.visitBuilding, customerSituation: e.customerSituation, dealTime: e.dealTime, dealBuilding: e.dealBuilding, dealRoomnum: e.dealRoomnum, remark: e.remark};
                                result.callTime = callcustomerservice.modifyTime(e.callTime);
                                return result;
                            })
                        })
                    }else{
                        this.setState({callCustomerList: [], fileUrl: result.fileUrl})
                    }
                }
            )
    }

    exportFile() {
        callcustomerservice.exportFile(this.state.fileUrl)

    }

    render() {
        return (
            <div style={{marginTop: "20px"}}>
                <div className="callcustomer_screen" style={{marginLeft: "0px", display: "flex"}}>
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
                        data={this.state.callCustomerList}
                        columns = {this.state.columns}
                        filterable={false}
                        /*filterable
                        defaultFilterMethod={(filter, row) =>
                            String(row[filter.id]).includes(filter.value)}*/
                    />
                </Panel>
            </div>
        );
    }
}

export default withRouter(CallCustomer);