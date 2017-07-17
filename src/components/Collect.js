import React from 'react';
import axios from 'axios';
import {url} from '../config';
import {Spin, Button, message} from 'antd';
import {Link} from 'react-router-dom';

export default class Collect extends React.Component{
  constructor(){
    super()
    this.state={
      data: [],
      wait: true
    }
  }
  componentDidMount(){
    let loginname = this.props.location.state.loginname;

    axios.get(`${url}/topic_collect/${loginname}`)
      .then(res => {
        console.log(res);
        this.setState({
          wait: false,
          data: res.data.data
        })
      })
      .catch(err => message.error('请求失败'))
  }
  cancelCollect(topic_id){
    if (sessionStorage.accesstoken) {
      var accesstoken = sessionStorage.accesstoken
    }else{
       alert('请先登录')
      return
    }
    axios.post(`${url}/topic_collect/de_collect`, {accesstoken,topic_id})
      .then(res => {
        this.setState({
          data: this.state.data.filter(item=>item.id!==topic_id)
        })
      })
      .catch(err => message.error('取消失败'))
  }
  render(){
    let {wait, data} = this.state;
    let tabs = {
      job: '招聘',
      ask: '问答',
      share: '分享'
    }
  // console.log(this.props)
    return(
      <div style={{padding: '10px'}}>
        {
          wait ? <div style={{textAlign: 'center'}}><Spin size='large'/></div> :
          data.map(item=>(
            <div key={item.id} className='topic'>
              <img src={item.author.avatar_url} alt="avatar"/>
              <div>
                <h3 title={item.title}><Link to={`/topic/${item.id}`}>{item.title}</Link></h3>
                <span style={{backgroundColor: "#00bb00",padding:"0 5px",marginRight: "10px",borderRadius: "2px",color:"#fff"}} className='tab'>{item.top?'置顶':item.good?'精华':tabs[item.tab]}</span>
                <span>阅读量：<strong>{item.visit_count}</strong></span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>回复量：<strong>{item.reply_count}</strong></span>
                <Button onClick={this.cancelCollect.bind(this, item.id)} style={{float:"right",paddingRight:"10px"}} type="primary">取消收藏</Button>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

