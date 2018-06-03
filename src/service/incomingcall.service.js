import axios from 'axios'
import $ from 'jquery';

const server = 'http://127.0.0.1:8000/';

function fetchIncomingCallList() {
    let url = server + 'incomingcall';
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

function modifyTime(callTime) {
    let temp = callTime.toString();
    let year = temp.substring(0,4);
    let month = temp.substring(4,6);
    let day = temp.substring(6, 8);
    return year+"/"+month+"/"+day;
}

function fetchNeedIncomingCall(startDate, endDate) {
    let url = server + 'incomingcall/search';
    let form = new FormData();
    form.set('startDate', startDate);
    form.set('endDate', endDate);
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


export const incomingcallservice = {
    fetchIncomingCallList, modifyTime, fetchNeedIncomingCall, exportFile
};
