import React from 'react';
import { Table, Button, Input, Icon, Modal, List } from 'antd';
import './index.css';


export const realIP = 'http://211.87.179.16:80/shangchuan'
// export const realIP = 'http://localhost:8080'

class Teacher extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            picList: [],
            picModal: false,
            videoList: [],
            docList: [],
        }
    }

    componentDidMount() {
        console.log(sessionStorage.courseId)
        let url = `${realIP}/allStudents?courseId=${sessionStorage.courseId}`
        fetch(url, { method: 'POST' }).then(res => res.json()).then(data => {
            this.setState({
                data: data
            })
        });
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={node => { this.searchInput = node; }}
                        placeholder={`搜索前请在右侧的题目类型区域勾选具体的题目类型`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm)}
                        icon="search"
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
            </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
            </Button>
                </div>
            ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },

    })

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    depatch = (name,courseId) => {
        fetch(`${realIP}/userData?userName=${name}&courseId=${courseId}`)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                const { picList, videoList, docList, } = data;
                this.setState({
                    picList,
                    videoList,
                    docList,
                })
                console.log(data)
            });
        this.setState({ picModal: true})
    }

    picModal = () => { this.setState({ picModal: true }) }

    cancelPic = () => { this.setState({ picModal: false }) }
    
    jump(event) {
        const w=window.open('about:blank');
        w.location.href=event
    }

    render() {
        const { picList, videoList, docList, data } = this.state
        const student = data.map(item => {
            return {
                key: item.id,
                name: item.userName,
                action: item.courseId
            }
        })
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name')
            }, {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => <a onClick={this.depatch.bind(this,record.name,record.action)}>点击查看</a>
            }
        ]
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
                <header className="cour-select-header">
                    <h1>学生提交报告</h1>
                </header>
                <Table columns={columns} dataSource={student} pagination={{ pageSize: 20 }} bordered={true} size={"small"} />
                <Modal visible={this.state.picModal} onOk={this.cancelPic} onCancel={this.cancelPic} >
                    <List size="small"
                        bordered
                        dataSource={picture}
                        renderItem={item => <List.Item><img alt="" width={450} height={300} src={`${item.url}`} /></List.Item>} />
                    <Table columns={columnsDoc} dataSource={dataDoc} pagination={false} size={"small"} />
                    <Table columns={columnsVideo} dataSource={dataVideo} pagination={false} size={"small"}/>
                </Modal>
            </div>
        )
    }
}
export default Teacher;