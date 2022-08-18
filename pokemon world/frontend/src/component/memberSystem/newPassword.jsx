import React, { Component } from 'react';
import axios from "axios";
import {decode as base64_decode, encode as base64_encode} from 'base-64';


class newPassword extends Component {
    state = { 
        newMember:{
            mail:'',
            newPassword:'', 
            newPasswordAgain:''
        }
    }
    
    componentDidMount(){
        this.state.newMember.mail = base64_decode(this.props.match.params.mail);
    }

    clickOk=async()=>{
        if(this.state.newMember.newPassword==this.state.newMember.newPasswordAgain){
            let temp = {
                mail:this.state.newMember.mail,
                password:this.state.newMember.newPassword
            }
            let resalt = await axios.post(`http://127.0.0.1:8000/api/updateNewPassword`,temp)
            .then(() => {alert('密碼設置完成');window.location = "/homePage";})
            //.catch((error) => alert('信箱未註冊'));
        }else{
            alert('再次輸入密碼錯誤')
        }

    }

    newPasswordOnChange=(e)=>{
        this.state.newMember.newPassword = e.target.value;
        this.setState({});
    }

    newPasswordOnChangeAgain=(e)=>{
        this.state.newMember.newPasswordAgain = e.target.value;
        this.setState({});
    }


    render() { 
        return (
            <div className='backgroundAnimation2 width100'>
            {/* navbar start */}
            <div class="bg-dark">
                    <div>
                        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav">
                                    <li class="nav-item active">
                                    <a class="nav-link" href="/">
                                        <h3>首頁</h3>
                                    </a>
                                    </li>
                                    <li class="nav-item active">
                                    <a class="nav-link" href="/dexPage">
                                        <h3>圖鑑</h3>
                                    </a>
                                    </li>
                                    <li class="nav-item active">
                                    <a class="nav-link" href="/start">
                                        <h3>對戰遊戲</h3>
                                    </a>
                                    </li>
                                    <li class="nav-item active">
                                    <a class="nav-link" href="/littleGame">
                                        <h3>問答遊戲</h3>
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
                        <h2 className='my-2'>更改密碼</h2>
                        <form className='mb-5 mt-3' action="">
                            <span className='font-weight-bold' >新密碼 :</span>
                            <input type="password" className='m-2' onChange={this.newPasswordOnChange} value={this.state.newMember.newPassword}/><br />
                            <span className='font-weight-bold m-2' >再次輸入密碼 :</span>
                            <input type="password" className='mr-5' onChange={this.newPasswordOnChangeAgain} value={this.state.newMember.newPasswordAgain}/><br />
                            <input onClick={this.clickOk} type="button" value="確認" className='m-2 btn btn-secondary'/>
                        </form>
                    </div>
                    <div className='col'></div>
            </div>
        </div>
        );
    }
}
 
export default newPassword;