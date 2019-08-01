import React from 'react';
import WrappedNormalLoginForm from './WrappedNormalLoginForm';
import './index.css';
import * as imgSrc from '../shangchuan.png'


class Login extends React.Component {
    componentDidMount() {
        sessionStorage.clear();
    }


    render() {
        return (
            <div className="login-page">
                <header className="login-header">
                    <h1>实习材料提交系统</h1>
                </header>
                <div className="login-content">
                    <img src={imgSrc} alt="logo.png"/>
                    <div className="login-moudle">
                        <WrappedNormalLoginForm />                        
                    </div>
                </div>
                <br />
                <b style={{color:"red"}}>提示：必须使用谷歌浏览器</b>
            </div>
        )
    }
}


export default Login;