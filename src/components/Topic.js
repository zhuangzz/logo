import React from "react";
import axios from "axios";
import {url} from "../config.js";
import {message,Card ,BackTop,Avatar,Input,Button,Icon ,Modal} from "antd"
import moment from 'moment';



export default class Topic extends React.Component{
	constructor(){
		super()
		this.state={
			data:null,
			comment:"",
			visible:false,
			replyInfo:null,
			reply:'',
			collect:false
		}
	}
	getData(){
		let id = this.props.match.params.id;
		axios.get(`${url}/topic/${id}`)
			.then(res=> this.setState({data: res.data.data}))
			.catch(err=> message.error('数据请求失败'))
	}
	componentDidMount(){
		this.getData()
	}
	handleComment(type){
		if (sessionStorage.accesstoken) {
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		if(type==="comment"){
			var content=this.state.comment	
		}else{
			var content=this.state.reply
		}
		let data={accesstoken,content}
		if(type==="reply")data.reply_id=this.state.replyInfo.id
		let id=this.state.data.id
		axios.post(`${url}/topic/${id}/replies`,data)
		.then(res=>{
			this.setState({comment:""})
			this.getData ()
			if(type==="reply")this.setState({visible:false})
			}) 
		.catch(err=>message.error("评论失败"))
	}
	showReply(reply){
		// console.log(reply)
		this.setState({visible:true,replyInfo:reply,reply:`@${reply.author.loginname} `})
	}
	showLike(reply_id){
		if (sessionStorage.accesstoken) {
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		axios.post(`${url}/reply/${reply_id}/ups`,{accesstoken})
		.then(res=>this.getData())
		.catch(err=>message.error("点赞失败"))
	}
	showCollect(){
		let id = this.props.match.params.id;
		console.log(id)
		if (sessionStorage.accesstoken) {
			var accesstoken = sessionStorage.accesstoken
		}else{
			// alert('请先登录')
			return
		}
		axios.post(`${url}/topic_collect/collect`, {accesstoken, topic_id: id})
			.then(res => {this.setState({collect: true});message.success('收藏成功')})
			.catch(err => message.error('请求失败'))
	}
	render(){
		let {data,comment,visible,reply,replyInfo,collect}=this.state
		// console.log(data)
		// console.log(this.props)
		return(
			<div>
				<Card loading={!data}>
					{
					data ?
					(<div>	
						<h1 style={{textAlign:"center"}}>{data.title}</h1>
						<div className="topic-topic">
							<Avatar src={data.author.avatar_url}/>
							&nbsp;&nbsp;
							<span>阅读量：<strong>{data.visit_count}</strong></span>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<span>回复量：<strong>{data.reply_count}</strong></span>	
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Button type="primary" onClick={this.showCollect.bind(this)}>{collect? '已收藏' : '收藏'}</Button>
						</div>
						<div className="topic-content" style={{width:"100%"}} dangerouslySetInnerHTML={{__html:data.content}}>
						</div>
						<h2>发表你的评论:</h2>
						<Input type="textarea" rows={4} value={comment} style={{height:"50px"}} onChange={e=>this.setState({comment:e.target.value})} placeholder="吐槽吧"/>
						<Button style={{margin:"4px 0"}} type="primary" onClick={this.handleComment.bind(this,"comment")}>提交</Button>
						<h2>全部回复:</h2>
						 {
							data.replies.map(item=>(
								<div className="topic-a" key={item.id}>
									<Avatar style={{flexShrink:"0"}} src={item.author.avatar_url}/>
									<div className="topic-right">
									<div className="topic-up">
										<span>{item.author.loginname}&nbsp;&nbsp;·&nbsp;&nbsp;{moment(item.create_at).fromNow()}
										</span>
										<span>
										<Icon type="smile-o" onClick={this.showLike.bind(this,item.id)}></Icon>
										{item.ups.length}&nbsp;&nbsp;&nbsp;
										<Icon type="rollback" onClick={this.showReply.bind(this,item)}></Icon>
										</span>		
									</div>
									<div dangerouslySetInnerHTML={{__html: item.content}} />
									</div>
									
								</div>
								)
							)
						 	
						 }
					</div>):null
				}
				</Card>
				
				<Modal
          title={replyInfo? `回复：${replyInfo.author.loginname}`:"空"}
          visible={visible}
          onOk={this.handleComment.bind(this,"reply")}
          onCancel={()=>this.setState({visible:false})}
        >
          <Input type="textarea" rows={4} value={reply} onChange={e=>this.setState({reply: e.target.value})} placeholder='留下您的评论' ref={input=> this.input = input}/>
          </Modal>
        <BackTop />
			</div>)
	}
}