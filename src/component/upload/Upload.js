import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Button, ButtonToolbar, ControlLabel, FormControl, FormGroup, Panel} from 'react-bootstrap'
import axios from 'axios'
import './Upload.css';

class Upload extends Component {

    constructor(props) {
        super(props);

        this.import_file = this.import_file.bind(this);
        this.validate = this.validate.bind(this);
        this.upload = this.upload.bind(this);

        this.state = {
            full_filled: false,
            order_list: null,
            filename: null,
            tips: '选择数据文件上传'
        };
    }

    render() {
        return (
            <Panel>
                <div className="container-fluid">
                    <FormGroup>
                        <ControlLabel>请选择需要导入的数据文件(后缀为.xls或者.xlsx)</ControlLabel>
                    </FormGroup>
                    <br></br>
                    <FormGroup>
                        <ControlLabel htmlFor="file-upload" bsClass="btn" bsStyle="primary" className="label_upload">
                            文件选择
                        </ControlLabel>
                        <FormControl id="file-upload" type="file" accept=".xls, .xlsx" onChange={this.import_file}
                                     style={{display: "none"}}>

                        </FormControl>
                        <ControlLabel className="label_tips">{this.state.tips}</ControlLabel>
                    </FormGroup>
                    <br></br>
                    <ButtonToolbar>
                        <Button className="toolbar_submit" bsStyle="success" disabled={!this.state.full_filled} onClick={this.upload}>确认上传</Button>
                        <Link id="turn_to_screen" to={'/screen'}>数据查询</Link>
                    </ButtonToolbar>
                </div>
            </Panel>
        );
    }

    import_file = (e) => {
        if (e.target.files !== null && e.target.files[0] !== null) {
            this.setState({
                order_list: e.target.files[0],
                filename: e.target.files[0].name,
                tips: '您当前选择的文件为: ' +  e.target.files[0].name
            }, this.validate)
        }
    }

    validate = () => {
        if (this.state.order_list !== null) {
            this.setState({full_filled: true})
        }
    }

    upload() {
        let upload_url = 'http://127.0.0.1:8000/upload';
        let form = new FormData();
        form.set('data_file', this.state.order_list);
        axios.post(upload_url, form)
            .then(function (response) {
                //alert(JSON.parse(JSON.stringify(response.data)).name);
            })
            .catch(() => {
                return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
            });

    }

}

export default Upload;



