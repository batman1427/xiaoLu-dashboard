import React from 'react'

import ReactTable from 'react-table'
import {Panel} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

import {dealservice} from '../../service/deal.service'

import "react-table/react-table.css";

export class Deal extends React.Component{

    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
        this.exportFile = this.exportFile.bind(this);
        this.state = {
            dealList: [],
            fileUrl: null,
            columns : [
                {Header: '认购日期', accessor : 'subscriptionTime'},
                {Header: '认筹日期', accessor : 'recognitionTime'},
                {Header: '物业类型', accessor : 'propertyType'},
                {Header: '地块', accessor : 'dealSection'},
                {Header: '是否精装', accessor : 'decoration'},
                {Header: '栋号', accessor : 'buildingId'},
                {Header: '房号', accessor : 'roomNum'},
                {Header: '客户姓名', accessor : 'customerName'},
                {Header: '微信号', accessor : 'wechatId'},
                {Header: '联系方式', accessor : 'customerTel'},
                {Header: '预测面积', accessor : 'predictedArea'},
                {Header: '认购单价', accessor : 'subscriptionUnitPrice'},
                {Header: '认购总价', accessor : 'subscriptionTotalPrice'},
                {Header: '折扣说明', accessor : 'discountDetail'},
                {Header: '5万抵15万', accessor : 'fiveToFifteen'},
                {Header: '折后15W价格', accessor : 'fifteenAfterDiscount'},
                {Header: '开盘折扣', accessor : 'openingQuotationDiscount'},
                {Header: '按时签约折扣', accessor : 'discountOfContractOntime'},
                {Header: '实际成交单价', accessor : 'actualDealUnitPrice'},
                {Header: '成交总价公示输入', accessor : 'dealTotalPriceInput'},
                {Header: '成交总价手工复核', accessor : 'dealTotalPriceCheck'},
                {Header: '付款金额1', accessor : 'amountOfPaymentFirst'},
                {Header: '付款日期1', accessor : 'dateOfPaymentFirst'},
                {Header: '付款金额2', accessor : 'amountOfPaymentSecond'},
                {Header: '付款日期2', accessor : 'dateOfPaymentSecond'},
                {Header: '付款金额3', accessor : 'amountOfPaymentThird'},
                {Header: '付款日期3', accessor : 'dateOfPaymentThird'},
                {Header: '约定签约日期', accessor : 'arrangeContractDate'},
                {Header: '认购未签约情况', accessor : 'subscriptionWithoutContract'},
                {Header: '实际签约日期', accessor : 'actualContractDate'},
                {Header: '贷款金额', accessor : 'loanAmount'},
                {Header: '办理贷款日期', accessor : 'transactLoanDate'},
                {Header: '贷款银行', accessor : 'loanBank'},
                {Header: '付款方式', accessor : 'paymentMethod'},
                {Header: '到款比例', accessor : 'paymentRate'},
                {Header: '累积到款', accessor : 'accumulativePayment'},
                {Header: '未到款金额', accessor : 'unPayment'},
                {Header: '清款日期', accessor : 'completePaymentDate'},
                {Header: '按揭进度情况', accessor : 'mortgageSchedule'},
                {Header: '销售公司', accessor : 'salesCompany'},
                {Header: '员工提点', accessor : 'staffPercentage'},
                {Header: '置业顾问佣金', accessor : 'realtyConsultantSalary'},
                {Header: '置业顾问', accessor : 'realtyConsultant'},
                {Header: '现对接人', accessor : 'abutmentPerson'},
                {Header: '合同鉴证日期', accessor : 'agreementAuthenticationDate'},
                {Header: '家庭住址', accessor : 'address'},
                {Header: '身份证号码', accessor : 'cardId'},
                {Header: '年龄', accessor : 'age'},
                {Header: '居住区域', accessor : 'residentialZone'},
                {Header: '工作区域', accessor : 'workZone'},
                {Header: '职业', accessor : 'occupation'},
                {Header: '获知途径', accessor : 'accessKnown'},
                {Header: '推荐人', accessor : 'referee'},
                {Header: '推荐人联系电话', accessor : 'refereeTel'},
                {Header: '置业目的', accessor : 'realtyPurpose'},
                {Header: '置业次数', accessor : 'realtyTimes'},
                {Header: '佣金结算单递交时间', accessor : 'salarySettlementSubmitTime'},
                {Header: '佣金发放时间', accessor : 'salaryGrantTime'},
                {Header: '佣金结算比例', accessor : 'salarySettlementRate'},
                {Header: '结佣提点', accessor : 'settleSalaryRate'},
                {Header: '结佣金额', accessor : 'settleSalaryMoney'},
                {Header: '佣金结算单递交时间二', accessor : 'salarySettlementSubmitTimeSecond'},
                {Header: '佣金发放时间二', accessor : 'salaryGrantTimeSecond'},
                {Header: '佣金结算比例二', accessor : 'salarySettlementRateSecond'},
                {Header: '保证金', accessor : 'deposit'},
                {Header: '预计交付时间', accessor : 'predictedDeliverTime'},
                {Header: '是否签购房合同', accessor : 'signPurchaseContract'},
                {Header: '是否签物业合同', accessor : 'signPropertyContract'},
                {Header: '中介交款金额', accessor : 'intermediaryMoney'},
                {Header: '老带新(积分)', accessor : 'oldToNew'},
                {Header: '客户权属', accessor : 'customerOwnership'},
                {Header: '能来签约时间', accessor : 'availableSignTime'},
                {Header: '按揭办理', accessor : 'mortgageHandle'},
                {Header: '备注', accessor : 'remark'}
            ]
        }
    }

    componentDidMount() {
        dealservice.fetchDealList()
            .then(
                (result) => {
                    if (result.responseCode === 'RESPONSE_OK') {
                        this.setState({
                            fileUrl: result.fileUrl,
                            dealList: result.data.map(function (e) {
                                result = {subscriptionTime: e.subscriptionTime, recognitionTime: e.recognitionTime, propertyType: e.propertyType, dealSection: e.dealSection, decoration: e.decoration, buildingId: e.buildingId, roomNum: e.roomNum, customerName: e.customerName, wechatId: e.wechatId, customerTel: e.customerTel, predictedArea: e.predictedArea, subscriptionUnitPrice: e.subscriptionUnitPrice, subscriptionTotalPrice: e.subscriptionTotalPrice, discountDetail: e.discountDetail, fiveToFifteen: e.fiveToFifteen, fifteenAfterDiscount: e.fifteenAfterDiscount, openingQuotationDiscount: e.openingQuotationDiscount, discountOfContractOntime: e.discountOfContractOntime, actualDealUnitPrice: e.actualDealUnitPrice, dealTotalPriceInput: e.dealTotalPriceInput, dealTotalPriceCheck: e.dealTotalPriceCheck, amountOfPaymentFirst: e.amountOfPaymentFirst, dateOfPaymentFirst: e.dateOfPaymentFirst, amountOfPaymentSecond: e.amountOfPaymentSecond, dateOfPaymentSecond: e.dateOfPaymentSecond, amountOfPaymentThird: e.amountOfPaymentThird, dateOfPaymentThird: e.dateOfPaymentThird, arrangeContractDate: e.arrangeContractDate, subscriptionWithoutContract: e.subscriptionWithoutContract, actualContractDate: e.actualContractDate, loanAmount: e.loanAmount, transactLoanDate: e.transactLoanDate, loanBank: e.loanBank, paymentMethod: e.paymentMethod, paymentRate: e.paymentRate, accumulativePayment: e.accumulativePayment, unPayment: e.unPayment, completePaymentDate: e.completePaymentDate, mortgageSchedule: e.mortgageSchedule, salesCompany: e.salesCompany, staffPercentage: e.staffPercentage, realtyConsultantSalary: e.realtyConsultantSalary, realtyConsultant: e.realtyConsultant, abutmentPerson: e.abutmentPerson, agreementAuthenticationDate: e.agreementAuthenticationDate, address: e.address, cardId: e.cardId, age: e.age, residentialZone: e.residentialZone, workZone: e.workZone, occupation: e.occupation, accessKnown: e.accessKnown, referee: e.referee, refereeTel: e.refereeTel, realtyPurpose: e.realtyPurpose, realtyTimes: e.realtyTimes, salarySettlementSubmitTime: e.salarySettlementSubmitTime, salaryGrantTime: e.salaryGrantTime, salarySettlementRate: e.salarySettlementRate, settleSalaryRate: e.settleSalaryRate, settleSalaryMoney: e.settleSalaryMoney, salarySettlementSubmitTimeSecond: e.salarySettlementSubmitTimeSecond, salaryGrantTimeSecond: e.salaryGrantTimeSecond, salarySettlementRateSecond: e.salarySettlementRateSecond, deposit: e.deposit, predictedDeliverTime: e.predictedDeliverTime, signPurchaseContract: e.signPurchaseContract, signPropertyContract: e.signPropertyContract, intermediaryMoney: e.intermediaryMoney, oldToNew: e.oldToNew, customerOwnership: e.customerOwnership, availableSignTime: e.availableSignTime, mortgageHandle: e.mortgageHandle, remark: e.remark};
                                result.subscriptionTime = dealservice.modifyTime(e.subscriptionTime);
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
        dealservice.fetchNeedDeal(startDate, endDate)
            .then(
                (result) => {
                    if (result.responseCode === 'RESPONSE_OK') {
                        this.setState({
                            fileUrl: result.fileUrl,
                            dealList: result.data.map(function (e) {
                                result = {subscriptionTime: e.subscriptionTime, recognitionTime: e.recognitionTime, propertyType: e.propertyType, dealSection: e.dealSection, decoration: e.decoration, buildingId: e.buildingId, roomNum: e.roomNum, customerName: e.customerName, wechatId: e.wechatId, customerTel: e.customerTel, predictedArea: e.predictedArea, subscriptionUnitPrice: e.subscriptionUnitPrice, subscriptionTotalPrice: e.subscriptionTotalPrice, discountDetail: e.discountDetail, fiveToFifteen: e.fiveToFifteen, fifteenAfterDiscount: e.fifteenAfterDiscount, openingQuotationDiscount: e.openingQuotationDiscount, discountOfContractOntime: e.discountOfContractOntime, actualDealUnitPrice: e.actualDealUnitPrice, dealTotalPriceInput: e.dealTotalPriceInput, dealTotalPriceCheck: e.dealTotalPriceCheck, amountOfPaymentFirst: e.amountOfPaymentFirst, dateOfPaymentFirst: e.dateOfPaymentFirst, amountOfPaymentSecond: e.amountOfPaymentSecond, dateOfPaymentSecond: e.dateOfPaymentSecond, amountOfPaymentThird: e.amountOfPaymentThird, dateOfPaymentThird: e.dateOfPaymentThird, arrangeContractDate: e.arrangeContractDate, subscriptionWithoutContract: e.subscriptionWithoutContract, actualContractDate: e.actualContractDate, loanAmount: e.loanAmount, transactLoanDate: e.transactLoanDate, loanBank: e.loanBank, paymentMethod: e.paymentMethod, paymentRate: e.paymentRate, accumulativePayment: e.accumulativePayment, unPayment: e.unPayment, completePaymentDate: e.completePaymentDate, mortgageSchedule: e.mortgageSchedule, salesCompany: e.salesCompany, staffPercentage: e.staffPercentage, realtyConsultantSalary: e.realtyConsultantSalary, realtyConsultant: e.realtyConsultant, abutmentPerson: e.abutmentPerson, agreementAuthenticationDate: e.agreementAuthenticationDate, address: e.address, cardId: e.cardId, age: e.age, residentialZone: e.residentialZone, workZone: e.workZone, occupation: e.occupation, accessKnown: e.accessKnown, referee: e.referee, refereeTel: e.refereeTel, realtyPurpose: e.realtyPurpose, realtyTimes: e.realtyTimes, salarySettlementSubmitTime: e.salarySettlementSubmitTime, salaryGrantTime: e.salaryGrantTime, salarySettlementRate: e.salarySettlementRate, settleSalaryRate: e.settleSalaryRate, settleSalaryMoney: e.settleSalaryMoney, salarySettlementSubmitTimeSecond: e.salarySettlementSubmitTimeSecond, salaryGrantTimeSecond: e.salaryGrantTimeSecond, salarySettlementRateSecond: e.salarySettlementRateSecond, deposit: e.deposit, predictedDeliverTime: e.predictedDeliverTime, signPurchaseContract: e.signPurchaseContract, signPropertyContract: e.signPropertyContract, intermediaryMoney: e.intermediaryMoney, oldToNew: e.oldToNew, customerOwnership: e.customerOwnership, availableSignTime: e.availableSignTime, mortgageHandle: e.mortgageHandle, remark: e.remark};
                                result.subscriptionTime = dealservice.modifyTime(e.subscriptionTime);
                                return result;
                            })
                        })
                    }else{
                        this.setState({dealList: [], fileUrl: result.fileUrl})
                    }
                }
            )
    }

    exportFile() {
        dealservice.exportFile(this.state.fileUrl)

    }

    render() {
        return (
            <div style={{marginTop: "20px"}}>
                <div className="deal_screen" style={{marginLeft: "0px", display: "flex"}}>
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
                        data={this.state.dealList}
                        columns = {this.state.columns}
                        filterable={false}
                    />
                </Panel>
            </div>
        );
    }
}

export default withRouter(Deal);