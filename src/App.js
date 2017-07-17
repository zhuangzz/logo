import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {BrowserRouter,Route} from "react-router-dom";
import Home from "./components/Home"
import Topic from "./components/Topic"
import UserInfo from "./components/UserInfo"
import Message from "./components/Message"
import Collect from "./components/Collect"


export default class App extends React.Component{
	
	render(){
		
		return(
		<BrowserRouter>
			<div>
				<Header />
				<div style={{minHeight:"300px"}}>
				<Route path="/" exact component={Home} />
				<Route path="/topic/:id" component={Topic} />
				<Route path="/userinfo/:loginname" component={UserInfo} />
				<Route path="/message" component={Message} />	
				<Route path='/collect' component={Collect}/>
				
				</div>
				
				<Footer />
			</div>
		</BrowserRouter>)
	}
}