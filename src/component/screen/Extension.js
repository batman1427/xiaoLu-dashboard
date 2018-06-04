import React from 'react'

import ReactTable from 'react-table'
import {Panel} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

import {extensionservice} from '../../service/extension.service'

import "react-table/react-table.css";

export class Extension extends React.Component{

    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
        this.exportFile = this.exportFile.bind(this);
        this.state = {
            extensionList: [],
            fileUrl: null,
            columns : [
                {Header: '日期', accessor : 'extensionTime'},
                {Header: '拓客地点', accessor : 'extensionLocation'},
                {Header: '姓名', accessor : 'customerName'},
                {Header: '联系方式', accessor : 'customerTel'},
                {Header: '置业顾问', accessor : 'realtyConsultant'},
                {Header: '转访日期', accessor : 'visitTime'},
                {Header: '客户情况', accessor : 'customerSituation'},
                {Header: '成交日期', accessor : 'dealTime'},
                {Header: '成交楼盘', accessor : 'dealBuilding'},
                {Header: '成交房号', accessor : 'dealRoomnum'},
                {Header: '备注', accessor : 'remark'}
            ]
        }
    }

    componentDidMount() {
        extensionservice.fetchExtensionList()
            .then(
                (result) => {
                    if (result.responseCode === 'RESPONSE_OK') {
                        this.setState({
                            fileUrl: result.fileUrl,
                            extensionList: result.data.map(function (e) {
                                result = {extensionTime: e.extensionTime, extensionLocation: e.extensionLocation, customerName: e.customerName, customerTel: e.customerTel, realtyConsultant: e.realtyConsultant, visitTime: e.visitTime, customerSituation: e.customerSituation, dealTime: e.dealTime, dealBuilding: e.dealBuilding, dealRoomnum: e.dealRoomnum, remark: e.remark};
                                result.extensionTime = extensionservice.modifyTime(e.extensionTime);
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
        extensionservice.fetchNeedExtension(startDate, endDate)
            .then(
                (result) => {
                    if (result.responseCode === 'RESPONSE_OK') {
                        this.setState({
                            fileUrl: result.fileUrl,
                            extensionList: result.data.map(function (e) {
                                result = {extensionTime: e.extensionTime, extensionLocation: e.extensionLocation, customerName: e.customerName, customerTel: e.customerTel, realtyConsultant: e.realtyConsultant, visitTime: e.visitTime, customerSituation: e.customerSituation, dealTime: e.dealTime, dealBuilding: e.dealBuilding, dealRoomnum: e.dealRoomnum, remark: e.remark};
                                result.extensionTime = extensionservice.modifyTime(e.extensionTime);
                                return result;
                            })
                        })
                    }else{
                        this.setState({extensionList: [], fileUrl: result.fileUrl})
                    }
                }
            )
    }

    exportFile() {
        extensionservice.exportFile(this.state.fileUrl)

    }

    render() {
        return (
            <div style={{marginTop: "20px"}}>
                <div className="extension" style={{marginLeft: "0px", display: "flex"}}>
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
                        data={this.state.extensionList}
                        columns = {this.state.columns}
                        filterable={false}
                    />
                </Panel>
            </div>
        );
    }
}

export default withRouter(Extension);