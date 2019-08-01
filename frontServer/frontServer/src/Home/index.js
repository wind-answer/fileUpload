import React from 'react';
import { Upload, Button, Icon, Input, message, Row, Col, Modal, Table, List, } from 'antd';
// import { Player } from 'video-react';
import 'antd/dist/antd.min.css'
const { Dragger } = Upload;

export const realIP = 'http://211.87.179.16:80/shangchuan'
// export const realIP = 'http://localhost:8080'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            videoUrl: '',
            reject: false,
            picList: [],
            picModal: false,
            videoList: [],
            docList: [],
            projUrl: '',
            courseName: ''
        }
        this.reject = false;
        this.rejectDoc = false;
        this.rejectVideo = false;
    }

    componentDidMount() {
        const userName = sessionStorage.username;
        console.log(sessionStorage.courseId)
        fetch(`${realIP}/userData?userName=${userName}&courseId=${sessionStorage.courseId}`)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                const { picList, videoList, docList, projUrl, courseName } = data;
                this.setState({
                    picList,
                    videoList,
                    docList,
                    projUrl: projUrl,
                    videoUrl: videoList.length > 0 && videoList[0].url,
                    courseName
                })
                console.log(data)
            });

        this.setState({
            userName: userName
        })
    }
    onChangePic = (info) => {

        let { file, fileList } = info;
        const status = file.status;
        if (status !== 'uploading') {
            console.log(file, fileList);
        }
        if (status === 'done') {
            fileList[fileList.length - 1].url = fileList[fileList.length - 1].response;
            message.success(`${file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${file.name} file upload failed.`);
        }
        fileList.forEach(imgItem => {
            if (imgItem && imgItem.status === 'done' && imgItem.response && imgItem.response.imgUrl) {
                imgItem.thumbUrl = imgItem.response.imgUrl;
            }
        });
        if (this.reject) {
            fileList[fileList.length - 1].status = "error"
            this.reject = false
        }
        this.setState({
            picList: fileList
        });
    }

    onChangeDoc = (info) => {
        const { file, fileList } = info;
        const status = file.status;
        if (status !== 'uploading') {
            console.log(file, fileList);
        }
        if (status === 'done') {
            fileList[fileList.length - 1].url = fileList[fileList.length - 1].response;
            message.success(`${file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${file.name} file upload failed.`);
        }
        if (this.rejectDoc) {
            fileList[fileList.length - 1].status = "error"
            this.rejectDoc = false
        }
        this.setState({
            docList: fileList
        });
    }

    onChangeVideo = (info) => {
        const { status, response } = info.file;
        let { fileList } = info
        if (status === 'done') {
            this.setState({
                videoUrl: response
            })
        }
        if (this.rejectVideo) {
            fileList[fileList.length - 1].status = "error"
            this.rejectVideo = false
        }
        this.setState({
            videoList: fileList
        });
    }

    onRemovePic = (file) => {
        let url = `${realIP}/deletePIC?url=${file.response}&courseId=${sessionStorage.courseId}`
        fetch(url, { method: 'POST' }).then(res => res.json());
    }

    onRemoveDoc = (file) => {
        let url = `${realIP}/deleteDOC?url=${file.response}&courseId=${sessionStorage.courseId}`
        fetch(url, { method: 'POST' }).then(res => res.json());
    }
    onRemoveVideo = (file) => {
        if (file.response) {
            let url = `${realIP}/deleteVideo?url=${file.response}&courseId=${sessionStorage.courseId}`
            fetch(url, { method: 'POST' }).then(res => res.json()).then(data => {
                this.setState({
                    videoUrl: ''
                })
            })
        }

    }
    handleDocBeforeUpload = (file, fileList) => {
        const isLt3M = file.size / 1024 / 1024 < 3;
        if (!isLt3M) {
            message.error(`超过3M限制，不允许上传~`);
            this.rejectDoc = true;
            return false;
        }
    }

    handleVideoBeforeUpload = (file, fileList) => {
        const isMP4 = file.type === 'video/mp4'
        const { videoList } = this.state;
        const isLt50M = file.size / 1024 / 1024 < 50;
        if (videoList.length > 0) {
            message.error(`只能上传一个视频哦~`);
            this.rejectVideo = true;
            return false;
        }
        if (!isMP4) {
            message.error(`只能上传.mp4格式的视频~`);
            this.reject = true;
            return false;
        } else if (!isLt50M) {
            message.error(`超过50M限制，不允许上传~`);
            this.rejectVideo = true;
            return false;
        }
    }
    handlePicBeforeUpload = (file, fileList) => {
        const isJPG = file.type === 'image/jpeg';
        const isJPEG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        const isLt3M = file.size / 1024 / 1024 < 3;

        if (!(isJPG || isJPEG || isGIF || isPNG)) {
            message.error(`只能上传JPG 、JPEG 、GIF、 PNG格式的图片~`);
            this.reject = true;
            return false;
        } else if (!isLt3M) {
            message.error(`超过3M限制，不允许上传~`);
            this.reject = true;
            return false;
        }
    }

    onInputProjUrl = (e) => {
        this.setState({
            projUrl: e.target.value
        })
    }

    handleSaveProjUrl = () => {
        const { projUrl, userName } = this.state;
        let url = `${realIP}/saveProjUrl?url=${projUrl}&userName=${userName}&courseId=${sessionStorage.courseId}`
        fetch(url, { method: 'POST' }).then(res => res.json())
        console.log(projUrl);
    }

    picModal = () => { this.setState({ picModal: true }) }

    cancelPic = () => { this.setState({ picModal: false }) }

    jump(event) {
        const w=window.open('about:blank');
        w.location.href=event
    }

    render() {
        const { userName, picList, docList, projUrl, videoList, courseName } = this.state;
        const props = {
            action: `${realIP}/uploadPIC`,
            data: { userName: userName, courseId: sessionStorage.courseId },
            listType: 'picture',
            onChange: this.onChangePic,
            onRemove: this.onRemovePic,
            className: 'upload-list-inline',
            beforeUpload: this.handlePicBeforeUpload,
            // fileList: [...picList]
        };
        const props2 = {
            name: 'file',
            multiple: true,
            action: `${realIP}/uploadDOC`,
            data: { userName: userName, courseId: sessionStorage.courseId },
            onChange: this.onChangeDoc,
            onRemove: this.onRemoveDoc,
            beforeUpload: this.handleDocBeforeUpload,
            // fileList: [...docList]
        };
        const props3 = {
            action: `${realIP}/uploadVideo`,
            listType: 'picture',
            data: { userName: userName, courseId: sessionStorage.courseId },
            onChange: this.onChangeVideo,
            onRemove: this.onRemoveVideo,
            beforeUpload: this.handleVideoBeforeUpload,
            // fileList: [...videoList]
        };
        var picture = []
        for (let i = 0; i < picList.length; i++) {
            picture.push({
                url: picList.map(item => item.thumbUrl)[i],
                title: picList.map(item => item.name)[i]
            })
        }
        const dataDoc = docList.map(item => {
            return {
                key: item.uid,
                name: item.name,
                url: item.thumbUrl,
            }
        })
        const columnsDoc = [
            {
                title: '报告名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                dataIndex: 'url',
                render: (text, record) => (
                    <span>
                        <a href={record.url}>点击查看</a>
                    </span>
                )
            },
        ];
        const dataVideo = videoList.map(item => {
            return {
                key: item.uid,
                name: item.name,
                url: item.thumbUrl,
            }
        })
        const columnsVideo = [
            {
                title: '视频名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                dataIndex: 'url',
                render: (text, record) => (
                    <span>
                        <a onClick={this.jump.bind(this,record.url)}>点击查看</a>
                    </span>
                )
            },
        ];

        return (
            <div className="App">
                <h1>{"实习材料提交系统"}</h1>
                <Button style={{ marginTop: '9px', marginLeft: '18px' }} type="primary" onClick={() => this.picModal()}>已上传内容预览</Button>
                <Modal visible={this.state.picModal} onOk={this.cancelPic} onCancel={this.cancelPic} >
                    <List size="small"
                        bordered
                        dataSource={picture}
                        renderItem={item => <List.Item><img alt="" width={450} height={300} src={`${item.url}`} /></List.Item>} />
                    <Table columns={columnsDoc} dataSource={dataDoc} pagination={false} />
                    <Table columns={columnsVideo} dataSource={dataVideo} pagination={false} />
                </Modal>
                <a href={'/#/docs'} style={{ marginLeft: '18px' }}>常见问题</a>
                {/* {!this.state.picModal? <div></div>:<div>
                    <List size="small"
                        bordered
                        dataSource={picture}
                        renderItem={item => <List.Item><img alt="" width={1220} height={720} src={`${item.url}`} /></List.Item>} />
                    <Table columns={columnsDoc} dataSource={dataDoc} pagination={false} />
                    <Table columns={columnsVideo} dataSource={dataVideo} pagination={false} />
                </div>} */}
                <div className="app-content">
                    <div className="stu-info">
                        <div>{`1、您的课程：${courseName}`}</div>
                    </div>
                    <div className="pic-upload">
                        {"2、请选择需要上传的图片（单张小于3MB）："}
                        <br />
                        <br />
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" />上传图片
                            </Button>
                        </Upload>
                        <br />
                        {"3、请选择需要上传的文件，如PPT、文档："}
                        <br />
                        <br />
                        <Dragger {...props2}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">点击或者拖拽文件到此处进行上传</p>
                            <p className="ant-upload-hint">
                                支持单个或者批量上传
                    </p>
                        </Dragger>
                        <br />
                        {"4、您的项目地址："}
                        <br />
                        <br />
                        <Row>
                            <Col span={15}>
                                <Input placeholder="请输入您的项目地址" value={projUrl} onChange={this.onInputProjUrl} />
                            </Col>
                            <Col span={5} push={1}>
                                <Button onClick={this.handleSaveProjUrl}>保存</Button>
                            </Col>
                        </Row>
                        <br />
                        {"5、请选择您需要上传的视频(.mp4格式小于50MB)："}
                        <br />
                        <br />
                        <Upload {...props3}>
                            <Button>
                                <Icon type="upload" />上传视频
                    </Button>
                        </Upload>
                        <br />
                        {/* {"视频预览："}
                        <br />
                        <br />
                        <Player src={videoUrl} /> */}
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;
