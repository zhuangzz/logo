import React from "react";
import axios from "axios";
import {url} from "../config";
import {message,Avatar,Spin} from "antd";
import {Link} from "react-router-dom"
export default class UserInfo extends React.Component{
	constructor(){
		super()
		this.state={
			user:null
		}
	}
	componentDidMount(){
		let loginname=this.props.match.params.loginname
		axios.get(`${url}/user/${loginname}`)
		.then(res=>this.setState({user:res.data.data}))
		.catch(err=>message.error("用户信息获取失败"))
	}
	render(){
		// console.log(this.props)
		let {user}=this.state
		// console.log(user)
		return(
			<div>
				{
					user?
						(<div style={{padding:"0 10px"}}>
							<Avatar style={{margin:"5px 0"}} src={user.avatar_url}/>
							<h3>用户名：{user.loginname}</h3>
							<h4 style={{borderBottom:"1px solid #3ba0e9",padding:"5px 0"}}>积分：{user.score}</h4>
							<h2 style={{paddingTop:"5px"}}>回复的话题：</h2>
							{
								user.recent_replies.map(item=>(
									<div key={item.id}>
										<Link to={`/topic/${item.id}`}> {item.title}</Link>
									</div>
									)
								)
							}
							<h2>发布的话题：</h2>
							{
								user.recent_topics.map(item=>(
									<div key={item.id}>
										<Link to={`/topic/${item.id}`}> {item.title}</Link>
									</div>
									)
									)
						}
					</div>)
					:
					<div style={{textAlign:"center"}}><Spin size="large"/></div>
				}
			</div>)
	}
}