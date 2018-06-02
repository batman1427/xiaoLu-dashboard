import React from 'react'

import ReactTable from 'react-table'
import {Panel} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

import {intermediaryservice} from '../../service/intermediary.service'

import "react-table/react-table.css";

export class CallCustomer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            intermediaryList: [],
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
                            orderList: result.data.map(function (e) {
                                result = {reportTime: e.reportTime, customerSource: e.customerSource, reportBuilding: e.reportBuilding, customerName: e.customerName, customerTel: e.customerTel, intentionLevel: e.intentionLevel, visitTime: e.visitTime, visitBuilding: e.visitBuilding, customerSituation: e.customerSituation, dealTime: e.dealTime, dealBuilding: e.dealBuilding, dealRoomnum: e.dealRoomnum, remark: e.remark};
                                return result;
                            })
                        })
                    }
                }
            )
    }

    render() {
        return (
            <Panel style={{margin: "20px 0"}}>
                <ReactTable
                    data={this.state.intermediaryList}
                    columns = {this.state.columns}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]).includes(filter.value)}
                />
            </Panel>
        );
    }
}

export default withRouter(CallCustomer);