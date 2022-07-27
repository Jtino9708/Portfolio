import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie'
import {decode as base64_decode, encode as base64_encode} from 'base-64';

const cookies = new Cookies();

class register extends Component {
    constructor(props){
        super(props);
        if(cookies.get('token')){
            window.location = "/homePage";
        }
        this.state = { 
            newMember:{
                account:'', 
                email:'',
                password:''
            }
        }
    }
    
    

    clickOk=async()=>{
        //console.log(this.state.newMember);
        let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if(!this.state.newMember.account){return alert('請輸入帳號')}
        if(!this.state.newMember.email){return alert('請輸入信箱')}
        if(!this.state.newMember.password){return alert('請輸入密碼')}
        if(this.state.newMember.email.search(emailRule)!= -1){
            //alert("true");
            let resalt = await axios.post("http://127.0.0.1:8000/api/register",this.state.newMember)
            .then(async() => {
                await axios.get(`http://127.0.0.1:8000/api/sendMail/${base64_encode(this.state.newMember.email)}`)
                alert('請至信箱完成認證')
                window.location = "/login"
            })
            .catch((error) => alert('信箱已註冊'));
        }else{
            alert("信箱格式不正確");
        }
    }

    accountOnChange=(e)=>{
        this.state.newMember.account = e.target.value;
        this.setState({});
    }

    emailOnChange=(e)=>{
        this.state.newMember.email = e.target.value;
        this.setState({});
    }

    passwordOnChange=(e)=>{
        this.state.newMember.password = e.target.value;
        this.setState({});
    }

    render() { 
        return (
            <div className='backgroundAnimation2 width100'>
            {/* navbar start */}
            <div class="bg-dark">
                    <div class="container">
                        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav">
                                    <li class="nav-item active">
                                    <a class="nav-link" href="/">
                                        <h1>首頁</h1>
                                    </a>
                                    </li>
                                    <li class="nav-item active">
                                    <a class="nav-link" href="/dexPage">
                                        <h4>圖鑑</h4>
                                    </a>
                                    </li>
                                    <li class="nav-item active">
                                    <a class="nav-link" href="/start">
                                        <h4>對戰遊戲</h4>
                                    </a>
                                    </li>
                                    <li class="nav-item active">
                                    <a class="nav-link" href="/littleGame">
                                        <h4>問答遊戲</h4>
                                    </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            {/* navbar end */}
            <div className='row mx-0' style={{marginTop:'100px'}}>
            <div className='col'></div>
                    <div className='col-6 align-self-center bg-info text-center'>
                        <h2 className='my-2'>加入會員</h2>
                        <form className='mb-5 mt-3' action="">
                            <span className='font-weight-bold' >帳號 :</span>
                            <input type="text" className='m-2' onChange={this.accountOnChange} value={this.state.newMember.account}/><br />
                            <span className='font-weight-bold' >email :</span>
                            <input type="text" className='m-2' onChange={this.emailOnChange} value={this.state.newMember.email}/><br />
                            <span className='font-weight-bold' >密碼 :</span>
                            <input type="password" className='m-2' onChange={this.passwordOnChange} value={this.state.newMember.password}/><br />
                            <input onClick={this.clickOk} type="button" value="確認" className='m-2 btn btn-secondary'/>
                        </form>
                    </div>
                    <div className='col'></div>
            </div>
        </div>
        );
    }
}
 
export default register;