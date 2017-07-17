import React from "react";
import { Spin } from 'antd';
import {Link} from "react-router-dom"


export default class ShowTopics extends React.Component{
	constructor(){
		super()
		this.state={
			
		}
	}
	render(){
		// console.log(this.props.data)
		let {data}=this.props
		let tabs=
			{ask:"问答",
			job:"招聘",
			share:"分享"
			}
		return(
			<div className="topics">
				{
					data.length===0?  <div style={{textAlign:"center"}}><Spin size="large" /></div>
					:
					data.map(item=>(
						<div key={item.id} className="topic">
							<Link to={`/userinfo/${item.author.loginname}`}>
								{/*<Link  to={{pathname:`/user/${item.author.loginname}`,state:item.author.loginname}}>*/}
								{/*<img onClick={this.showUser.bind(this,item.author.loginname)} src={item.author.avatar_url} alt="avatar"/>*/}
								<img src={item.author.avatar_url} alt="avatar"/>
							</Link>
							<div>	
								<h3><Link to={`/topic/${item.id}`}>{item.title}</Link></h3>
								<span className="tabs">{item.top? "置顶":item.good? "精华":tabs[item.tab]}</span>
								<span>阅读量：<strong>{item.visit_count}</strong></span>
								&nbsp;&nbsp;
								<span>回复量：<strong>{item.reply_count}</strong></span>
								
							</div>
							
						</div>))
				}
			</div>)
	}
}