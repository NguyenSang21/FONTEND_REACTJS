import React, { useEffect } from 'react';
import './App.css';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import { history } from './helpers';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import socketIOClient from 'socket.io-client';
import { notification } from 'antd';
import config from './config';

function App() {
  useEffect(() => {
    const socket = socketIOClient(config.socketUrl);
    

    socket.on('DEBT_NOTICE', data => {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      console.log('LISTENING SOCKET ... ');
      if (data.username === userInfo.username) {
        notification.warning({
          message: 'Nhắc nợ',
          duration: 0,
          description: `Số tài khoản: ${data.accountNumberA} đã yêu cầu bạn trả với số tiền là ${data.amount} đ với nội dung: "${data.note}".`
        });
      }
    });

    socket.on('INTERNAL_TRANS', data => {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      console.log('LISTENING SOCKET ... ');
      if (data.usernameB === userInfo.username) {
        notification.success({
          message: 'Thông báo',
          description: `Số tài khoản: ${data.accountNumberA} đã chuyển tiền cho bạn với số tiền là ${data.amount} đ với nội dung: "${data.note}".`
        })
      }
    })
  }, []);

  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/home"
          render={props => {
            return localStorage.getItem('user') ? (
              <HomePage {...props} />
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
        <Route path="/login" component={LoginPage} />
        <Redirect path="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
