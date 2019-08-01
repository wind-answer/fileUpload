import React from 'react';
import { List } from 'antd';
import './index.css'


export const realIP = 'http://211.87.179.16:80/shangchuan'
// export const realIP = 'http://localhost:8080'

class CourseSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        let url = `${realIP}/userCourse?userName=${sessionStorage.username}`
        fetch(url, { method: 'POST' }).then(res => res.json()).then(data => {
            this.setState({
                data: data
            })
        });
    }

    handleSelectCourse = (courseId, e) => {
        sessionStorage.setItem('courseId', courseId)
        if(sessionStorage.role === '0') {
            this.props.history.push({ pathname: '/home' });
        }else if(sessionStorage.role === '1'){
            this.props.history.push({ pathname: '/teacher' });
        }
    }

    render() {
        const { data } = this.state
        return (
            <div className="cour-select-page">
                <header className="cour-select-header">
                    <h1>实习材料提交系统</h1>
                </header>
                <div className="cour-select-content">
                    <div className="cour-list-count">{`您一共${data.length}门课程：`}</div>
                    <div className="cour-select-moudle">
                        <List
                            bordered
                            dataSource={data}
                            renderItem={item => (
                                <List.Item className="cour-list-item" onClick={this.handleSelectCourse.bind(this, item.id)}>
                                    {item.course_name}
                                </List.Item>
                            )}
                        />
                    </div>
                </div>

            </div>
        )
    }
}
export default CourseSelect;