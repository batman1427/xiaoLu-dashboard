import axios from 'axios'
import $ from 'jquery';

const server = 'http://127.0.0.1:8000/';

function fetchSummaryList() {
    let url = server + 'summary';
    return axios.get(url)
        .then(function (response) {
            if (response.status < 400) {
                return response.data
            } else {
                return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
            }
        })
        .catch(
            () => {
                return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
            }
        )
}

function modifyTime(allTime) {
    if(allTime.toString().length>0) {
        let temp = allTime.toString();
        let year = temp.substring(0, 4);
        let month = temp.substring(4, 6);
        let day = temp.substring(6, 8);
        return year + "/" + month + "/" + day;
    }
}

function fetchNeedSummary(callStartDate, callEndDate, visitStartDate, visitEndDate, dealStartDate, dealEndDate, smallarea, bigarea, lowprice, highprice, area_list, accesspath_list) {
    let url = server + 'summary/search';
    let form = new FormData();
    form.set('callStartDate', callStartDate);
    form.set('callEndDate', callEndDate);
    form.set('visitStartDate', visitStartDate);
    form.set('visitEndDate', visitEndDate);
    form.set('dealStartDate', dealStartDate);
    form.set('dealEndDate', dealEndDate);
    form.set('smallarea', smallarea);
    form.set('bigarea', bigarea);
    form.set('lowprice', lowprice);
    form.set('highprice', highprice);
    form.set('area_list', area_list);
    form.set('accesspath_list', accesspath_list);
    return axios.post(url, form)
        .then(function (response) {
            if (response.status < 400) {
                return response.data
            } else {
                return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
            }
        })
        .catch(
            () => {
                return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
            }
        )

}

function exportFile(fileUrl){
    let url = server + 'export';
    let fileName = fileUrl;
    var form = $("<form></form>").attr("action", url).attr("method", "post");
    form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
    form.appendTo('body').submit().remove();
}


export const summaryservice = {
    fetchSummaryList, modifyTime, fetchNeedSummary, exportFile
};
