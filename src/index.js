import React from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import App from "./App";
import "./main.css"
import moment from 'moment';

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
moment().format("MMMM Do YYYY,h:mm:ss a")

ReactDOM.render(<App />, document.getElementById('root'))
