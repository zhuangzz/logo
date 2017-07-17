import React from "react"
import { Button, Modal,Input,message,Menu, Dropdown,Avatar,Badge} from 'antd';
import axios from "axios";
import {url} from "../config";
import {Link} from "react-router-dom";

export default class Header extends React.Component{
	constructor(){
		super()
		this.state={
			isLogin:false,
			visible:false, 
			input:" b8611323-a75e-4e30-8f13-c74bab24f911",
			confirmLoading:false,
			user:null,
			messageCount:null
		}
	}
	handleOk(){
		let confirmLoading=true
		let accesstoken=this.state.input.trim()
		axios.post(`${url}/accesstoken`,{accesstoken})
			.then(res=>{
				message.success("恭喜你！登陆成功！")
				this.setState({
					isLogin:true,
					visible:false,
					input:"",
					confirmLoading:false,
					user:res.data
				})
				sessionStorage.accesstoken=accesstoken
				this.getMessage(accesstoken)
			})
			.catch(err=>{
				message.error("登陆失败")
				this.setState({
					confirmLoading:false,
					input:""
				})
			})
	}
	getMessage(accesstoken){
		axios.get(`${url}/message/count?accesstoken=${accesstoken}`)
		.then(res=>this.setState({messageCount:res.data.data}))
		.catch(err=>console.log("消息失败"))
	}
	
	handleLogout(){
		this.setState({
			isLogin: false,
			user: null
		})
			
		sessionStorage.removeItem('accesstoken')
	}
	render(){
		let {isLogin,visible,input,confirmLoading,user,messageCount}=this.state
		const menu = isLogin ? (
      <Menu>
        <Menu.Item>
          <h3>{user.loginname}</h3>
        </Menu.Item>
        {/*<Menu.Item>
          <Link to={`/userinfo/${user.loginname}`}>用户中心</Link>
        </Menu.Item>*/}
        <Menu.Item>
          <Link to="/message">消息中心</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={{pathname:`/collect/${user}`,state:user}}>我的收藏</Link>
        </Menu.Item>
        <Menu.Item>
          <Button type="danger" onClick={this.handleLogout.bind(this)}>退出</Button>
        </Menu.Item>
      </Menu>
    ):<p>haha</p>
		return(
			<header>
				<h1><Link to="/">logo</Link></h1>
			 {
					isLogin ? 
						<Dropdown overlay={menu}>
   						 <Badge count={messageCount}>
   						 <Link to={`/userinfo/${user.loginname}`}>
   							 <Avatar src={user.avatar_url} />
   							</Link>
   						 </Badge>
 						 </Dropdown>
						:
						<div>
        			<Button type="primary" onClick={()=>this.setState({visible:true})}>登陆</Button>
       				  <Modal
        			    title="登陆"
        			    visible={visible}
         				  onOk={this.handleOk.bind(this)}
         				  confirmLoading={confirmLoading}
         				  onCancel={()=>this.setState({visible:false})}
         				  okText="确定"
         				  cancelText="取消">

                 <Input placeholder="accesstoken" value={input} onChange={e=>this.setState({input:e.target.value})}/>
               </Modal>
            </div>
				} 

		</header>)
	}
}