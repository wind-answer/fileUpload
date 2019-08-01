import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';

export const realIP = 'http://211.87.179.16:80/shangchuan'
// export const realIP = 'http://localhost:8080'
class NormalLoginForm extends React.Component {
    componentDidMount() {
        sessionStorage.clear();
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { username, password } = values;
                let url = `${realIP}/login?userName=${username}&password=${password}`
                fetch(url, { method: 'POST' }).then(res => res.json()).then(data => {
                    console.log(data.code)
                    if (data.code === 200) {
                        sessionStorage.setItem('isLogin', true);
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('role',0);
                        this.props.history.push({ pathname: '/course-select' });
                    }else if(data.code === 300) {
                        sessionStorage.setItem('isLogin', true);
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('role',1);
                        this.props.history.push({ pathname: '/course-select' });
                    }else{
                        message.error("用户名或密码错误！")
                    }

                });
                // console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            style={{ width: 250 }}
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            style={{ width: 250 }}
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: 250 }}>
                        登 录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default withRouter(WrappedNormalLoginForm);