import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie'
import {decode as base64_decode, encode as base64_encode} from 'base-64';

const cookies = new Cookies();

class sendMail extends Component {
    constructor(props){
        super(props);
        if(cookies.get('token')){
            window.location = "/homePage";
        }
        this.state = { 
            newMember:{
                mail:''
            }
        }
    }
    

    clickOk=async()=>{
        let resalt = await axios.get(`http://127.0.0.1:8000/api/sendResetPasswordMail/${base64_encode(this.state.newMember.mail)}`)
            .then(() => {alert('請至信箱完成密碼設置');window.location = "/homePage";})
            .catch((error) => alert('信箱未註冊'));
    }

    mailOnChange=(e)=>{
        this.state.newMember.mail = e.target.value;
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
            <div className='row mx-0' style={{marginTop:'150px'}}>
            <div className='col'></div>
                    <div className='col-6 align-self-center bg-info text-center'>
                        <h2 className='my-4'>請輸入信箱</h2>
                        <form className='mb-5 mt-3' action="">
                            <span className='font-weight-bold' >信箱 :</span>
                            <input type="text" className='m-2' onChange={this.mailOnChange} value={this.state.newMember.mail}/><br />
                            <input onClick={this.clickOk} type="button" value="確認" className='m-3 btn btn-secondary'/>
                        </form>
                    </div>
                    <div className='col'></div>
            </div>
        </div>
        );
    }
}
 
export default sendMail;