import React from 'react'

import ReactTable from 'react-table'
import {Panel} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

import {summaryservice} from '../../service/summary.service'

import "react-table/react-table.css";

export class Summary extends React.Component{

    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
        this.exportFile = this.exportFile.bind(this);
        this.state = {
            summaryList: [],
            fileUrl: null,
            columns : [
                {Header: '客户姓名', accessor : 'customerName'},
                {Header: '联系方式', accessor : 'customerTel'},
                {Header: '中介-报备日期', accessor : 'intermediaryReportTime'},
                {Header: '中介-报备楼盘', accessor : 'intermediaryReportBuilding'},
                {Header: '中介-意向等级', accessor : 'intermediaryIntentionLevel'},
                {Header: '中介-到访时间', accessor : 'intermediaryVisitTime'},
                {Header: '中介-到访楼盘', accessor : 'intermediaryVisitBuilding'},
                {Header: '中介-客户情况', accessor : 'intermediaryCustomerSituation'},
                {Header: '中介-成交日期', accessor : 'intermediaryDealTime'},
                {Header: '中介-成交楼盘', accessor : 'intermediaryDealBuilding'},
                {Header: '中介-成交房号', accessor : 'intermediaryDealRoomnum'},
                {Header: 'CALL客-区域', accessor : 'callCustomerDatasourceArea'},
                {Header: 'CALL客-楼盘名称', accessor : 'callCustomerDatasourceBuilding'},
                {Header: 'CALL客-call客日期', accessor : 'callCustomerCallTime'},
                {Header: 'CALL客-call客人员', accessor : 'callCustomerCallSalesman'},
                {Header: 'CALL客-意向等级', accessor : 'callCustomerIntentionLevel'},
                {Header: 'CALL客-意向楼盘', accessor : 'callCustomerIntentionBuilding'},
                {Header: 'CALL客-转访时间', accessor : 'callCustomerVisitTime'},
                {Header: 'CALL客-转访楼盘', accessor : 'callCustomerVisitBuilding'},
                {Header: 'CALL客-客户情况', accessor : 'callCustomerCustomerSituation'},
                {Header: 'CALL客-成交日期', accessor : 'callCustomerDealTime'},
                {Header: '外拓-日期', accessor : 'extensionExtensionTime'},
                {Header: '外拓-置业顾问', accessor : 'extensionRealtyConsultant'},
                {Header: '外拓-转访日期', accessor : 'extensionVisitTime'},
                {Header: '外拓-客户情况', accessor : 'extensionCustomerSituation'},
                {Header: '外拓-成交日期', accessor : 'extensionDealTime'},
                {Header: '外拓-成交楼盘', accessor : 'extensionDealBuilding'},
                {Header: '外拓-成交房号', accessor : 'extensionDealRoomnum'},
                {Header: '来电-来电日期', accessor : 'incomingCallCallTime'},
                {Header: '来电-置业目的', accessor : 'incomingCallRealtyPurpose'},
                {Header: '来电-需求面积', accessor : 'incomingCallDemandArea'},
                {Header: '来电-户型', accessor : 'incomingCallHouseType'},
                {Header: '来电-居住区域', accessor : 'incomingCallResidentialZone'},
                {Header: '来电-接受价位', accessor : 'incomingCallAcceptPrice'},
                {Header: '来电-转访日期', accessor : 'incomingCallVisitTime'},
                {Header: '来电-客户情况', accessor : 'incomingCallCustomerSituation'},
                {Header: '来电-成交日期', accessor : 'incomingCallDealTime'},
                {Header: '来电-成交楼盘', accessor : 'incomingCallDealBuilding'},
                {Header: '来电-成交房号', accessor : 'incomingCallDealRoomnum'},
                {Header: '来电-销售员', accessor : 'incomingCallSalesman'},
                {Header: '来访-来访日期', accessor : 'visitVisitTime'},
                {Header: '来访-意向面积', accessor : 'visitIntentionalArea'},
                {Header: '来访-接受价位', accessor : 'visitAcceptPrice'},
                {Header: '来访-居住区域', accessor : 'visitResidentialZone'},
                {Header: '来访-置业目的', accessor : 'visitRealtyPurpose'},
                {Header: '来访-客户类别', accessor : 'visitCustomerType'},
                {Header: '来访-置业顾问', accessor : 'visitRealtyConsultant'},
                {Header: '来访-成交日期', accessor : 'visitDealTime'},
                {Header: '来访-成交房号', accessor : 'visitDealRoomnum'},
                {Header: '成交-认购日期', accessor : 'dealSubscriptionTime'},
                {Header: '成交-获知途径', accessor : 'dealAccessKnown'},
                {Header: '成交-推荐人', accessor : 'dealReferee'},
                {Header: '成交-推荐人联系电话', accessor : 'dealRefereeTel'},
            ]
        }
    }

    componentDidMount() {
        summaryservice.fetchSummaryList()
            .then(
                (result) => {
                    if (result.responseCode === 'RESPONSE_OK') {
                        this.setState({
                            fileUrl: result.fileUrl,
                            summaryList: result.data.map(function (e) {
                                result = {customerName: e.customerName, customerTel: e.customerTel, intermediaryReportTime: e.intermediaryReportTime, intermediaryReportBuilding: e.intermediaryReportBuilding, intermediaryIntentionLevel: e.intermediaryIntentionLevel, intermediaryVisitTime: e.intermediaryVisitTime, intermediaryVisitBuilding: e.intermediaryVisitBuilding, intermediaryCustomerSituation: e.intermediaryCustomerSituation, intermediaryDealTime: e.intermediaryDealTime, intermediaryDealBuilding: e.intermediaryDealBuilding, intermediaryDealRoomnum: e.intermediaryDealRoomnum, callCustomerDatasourceArea: e.callCustomerDatasourceArea, callCustomerDatasourceBuilding: e.callCustomerDatasourceBuilding, callCustomerCallTime: e.callCustomerCallTime, callCustomerCallSalesman: e.callCustomerCallSalesman, callCustomerIntentionLevel: e.callCustomerIntentionLevel, callCustomerIntentionBuilding: e.callCustomerIntentionBuilding, callCustomerVisitTime: e.callCustomerVisitTime, callCustomerVisitBuilding: e.callCustomerVisitBuilding, callCustomerCustomerSituation: e.callCustomerCustomerSituation, callCustomerDealTime: e.callCustomerDealTime, extensionExtensionTime: e.extensionExtensionTime, extensionRealtyConsultant: e.extensionRealtyConsultant, extensionVisitTime: e.extensionVisitTime, extensionCustomerSituation: e.extensionCustomerSituation, extensionDealTime: e.extensionDealTime, extensionDealBuilding: e.extensionDealBuilding, extensionDealRoomnum: e.extensionDealRoomnum, incomingCallCallTime: e.incomingCallCallTime, incomingCallRealtyPurpose: e.incomingCallRealtyPurpose, incomingCallDemandArea: e.incomingCallDemandArea, incomingCallHouseType: e.incomingCallHouseType, incomingCallResidentialZone: e.incomingCallResidentialZone, incomingCallAcceptPrice: e.incomingCallAcceptPrice, incomingCallVisitTime: e.incomingCallVisitTime, incomingCallCustomerSituation: e.incomingCallCustomerSituation, incomingCallDealTime: e.incomingCallDealTime, incomingCallDealBuilding: e.incomingCallDealBuilding, incomingCallDealRoomnum: e.incomingCallDealRoomnum, incomingCallSalesman: e.incomingCallSalesman, visitVisitTime: e.visitVisitTime, visitIntentionalArea: e.visitIntentionalArea, visitAcceptPrice: e.visitAcceptPrice, visitResidentialZone: e.visitResidentialZone, visitRealtyPurpose: e.visitRealtyPurpose, visitCustomerType: e.visitCustomerType, visitRealtyConsultant: e.visitRealtyConsultant, visitDealTime: e.visitDealTime, visitDealRoomnum: e.visitDealRoomnum, dealSubscriptionTime: e.dealSubscriptionTime, dealAccessKnown: e.dealAccessKnown, dealReferee: e.dealReferee, dealRefereeTel: e.dealRefereeTel};
                                result.intermediaryReportTime = summaryservice.modifyTime(e.intermediaryReportTime);
                                result.callCustomerCallTime = summaryservice.modifyTime(e.callCustomerCallTime);
                                result.extensionExtensionTime = summaryservice.modifyTime(e.extensionExtensionTime);
                                result.incomingCallCallTime = summaryservice.modifyTime(e.incomingCallCallTime);
                                result.visitVisitTime = summaryservice.modifyTime(e.visitVisitTime);
                                result.dealSubscriptionTime = summaryservice.modifyTime(e.dealSubscriptionTime);
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
        summaryservice.fetchNeedSummary(startDate, endDate)
            .then(
                (result) => {
                    if (result.responseCode === 'RESPONSE_OK') {
                        this.setState({
                            fileUrl: result.fileUrl,
                            summaryList: result.data.map(function (e) {
                                result = {customerName: e.customerName, customerTel: e.customerTel, intermediaryReportTime: e.intermediaryReportTime, intermediaryReportBuilding: e.intermediaryReportBuilding, intermediaryIntentionLevel: e.intermediaryIntentionLevel, intermediaryVisitTime: e.intermediaryVisitTime, intermediaryVisitBuilding: e.intermediaryVisitBuilding, intermediaryCustomerSituation: e.intermediaryCustomerSituation, intermediaryDealTime: e.intermediaryDealTime, intermediaryDealBuilding: e.intermediaryDealBuilding, intermediaryDealRoomnum: e.intermediaryDealRoomnum, callCustomerDatasourceArea: e.callCustomerDatasourceArea, callCustomerDatasourceBuilding: e.callCustomerDatasourceBuilding, callCustomerCallTime: e.callCustomerCallTime, callCustomerCallSalesman: e.callCustomerCallSalesman, callCustomerIntentionLevel: e.callCustomerIntentionLevel, callCustomerIntentionBuilding: e.callCustomerIntentionBuilding, callCustomerVisitTime: e.callCustomerVisitTime, callCustomerVisitBuilding: e.callCustomerVisitBuilding, callCustomerCustomerSituation: e.callCustomerCustomerSituation, callCustomerDealTime: e.callCustomerDealTime, extensionExtensionTime: e.extensionExtensionTime, extensionRealtyConsultant: e.extensionRealtyConsultant, extensionVisitTime: e.extensionVisitTime, extensionCustomerSituation: e.extensionCustomerSituation, extensionDealTime: e.extensionDealTime, extensionDealBuilding: e.extensionDealBuilding, extensionDealRoomnum: e.extensionDealRoomnum, incomingCallCallTime: e.incomingCallCallTime, incomingCallRealtyPurpose: e.incomingCallRealtyPurpose, incomingCallDemandArea: e.incomingCallDemandArea, incomingCallHouseType: e.incomingCallHouseType, incomingCallResidentialZone: e.incomingCallResidentialZone, incomingCallAcceptPrice: e.incomingCallAcceptPrice, incomingCallVisitTime: e.incomingCallVisitTime, incomingCallCustomerSituation: e.incomingCallCustomerSituation, incomingCallDealTime: e.incomingCallDealTime, incomingCallDealBuilding: e.incomingCallDealBuilding, incomingCallDealRoomnum: e.incomingCallDealRoomnum, incomingCallSalesman: e.incomingCallSalesman, visitVisitTime: e.visitVisitTime, visitIntentionalArea: e.visitIntentionalArea, visitAcceptPrice: e.visitAcceptPrice, visitResidentialZone: e.visitResidentialZone, visitRealtyPurpose: e.visitRealtyPurpose, visitCustomerType: e.visitCustomerType, visitRealtyConsultant: e.visitRealtyConsultant, visitDealTime: e.visitDealTime, visitDealRoomnum: e.visitDealRoomnum, dealSubscriptionTime: e.dealSubscriptionTime, dealAccessKnown: e.dealAccessKnown, dealReferee: e.dealReferee, dealRefereeTel: e.dealRefereeTel};
                                result.intermediaryReportTime = summaryservice.modifyTime(e.intermediaryReportTime);
                                result.callCustomerCallTime = summaryservice.modifyTime(e.callCustomerCallTime);
                                result.extensionExtensionTime = summaryservice.modifyTime(e.extensionExtensionTime);
                                result.incomingCallCallTime = summaryservice.modifyTime(e.incomingCallCallTime);
                                result.visitVisitTime = summaryservice.modifyTime(e.visitVisitTime);
                                result.dealSubscriptionTime = summaryservice.modifyTime(e.dealSubscriptionTime);
                                return result;
                            })
                        })
                    }else{
                        this.setState({summaryList: [], fileUrl: result.fileUrl})
                    }
                }
            )
    }

    exportFile() {
        summaryservice.exportFile(this.state.fileUrl)

    }

    render() {
        return (
            <div style={{marginTop: "20px"}}>
                <div className="summary_screen" style={{marginLeft: "0px", display: "flex"}}>
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
                        data={this.state.summaryList}
                        columns = {this.state.columns}
                        filterable={false}
                    />
                </Panel>
            </div>
        );
    }
}

export default withRouter(Summary);