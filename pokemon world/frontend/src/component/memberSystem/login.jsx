import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie'
import {decode as base64_decode, encode as base64_encode} from 'base-64';

const cookies = new Cookies();

class login extends Component {
    constructor(props){
        super(props);
        if(cookies.get('token')){
            window.location = "/homePage";
        }
        this.state = { 
            email:'',
            password:''
        }
    }

    clickLogin = async()=>{
        let temp={
            email:this.state.email,
            password:this.state.password
        }
        // await fetch('http://127.0.0.1:8000/api/member', {
        //     method: 'POST', // or 'PUT'
        //     body: JSON.stringify(temp), // data can be `string` or {object}!
        //     credentials: 'include',
        //     headers: new Headers({
        //       'Content-Type': 'application/json'
        //     })
        //   }).then(res => res.json())
        //   .catch(error => console.error('Error:', error))
        //   .then(response => console.log('Success:', response));
        let member = await axios.post('http://127.0.0.1:8000/api/member',temp,{
                withCredentials: true
        })
        .then((e)=>{
            // console.log(e.data);
            if(e.data[1]){
                if(e.data[0]){
                    cookies.set('token', e.data[0],{ path: '/',secure: true,sameSite :true});
                    //let a =cookies.get('token');
                    window.location = "/homePage";
                    //console.log(a)
                }else{
                    alert('信箱或密碼錯誤')
                }
            }else if(e.data[0] == '信箱或密碼錯誤'){
                alert('信箱或密碼錯誤')
            }else{
                alert('信箱未認證，請至信箱完成認證')
            }
        })
        .catch(()=>{alert('信箱或密碼錯誤')});
    }

    emailOnChange=(e)=>{
        this.state.email = e.target.value;
        this.setState({});
    }

    passwordOnChange=(e)=>{
        this.state.password = e.target.value;
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
                    <div className='col align-self-center bg-info text-center'>
                        <form className='m-5' action="">
                            <h2>會員登入</h2>
                            <span className='font-weight-bold' >信箱 :</span>
                            <input type="text" className='m-2' onChange={this.emailOnChange} value={this.state.email}/><br />
                            <span className='font-weight-bold' >密碼 :</span>
                            <input type="password" className='m-2' onChange={this.passwordOnChange} value={this.state.password}/><br />
                            <input onClick={this.clickLogin} type="button" value="登入" className='m-2 btn btn-secondary'/>
                            <a href="/register" className='btn btn-success'>加入會員</a>
                            <a href="/sendMail" className='btn btn-success ml-2'>忘記密碼</a>
                        </form>
                    </div>
                    <div className='col'></div>
                </div>
            </div>
        );
    }
}
 
export default login;