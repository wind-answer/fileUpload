import React from 'react';
import './App.css';
import 'antd/dist/antd.min.css'
import "video-react/dist/video-react.css"; 
import { Switch, Route, Redirect } from 'react-router-dom'
import Routers from './router/routerMap';


function App() {
  return (
    <Switch>
        {
          Routers.map((item, index) => {
            return <Route key={index} exact path={item.path} render={props =>
              (
                !item.auth ? (<item.component {...props} />) :
                  (sessionStorage.isLogin ? <item.component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }}/>)
              )
            } />
          })
        }
      </Switch>
  );
}

export default App;
