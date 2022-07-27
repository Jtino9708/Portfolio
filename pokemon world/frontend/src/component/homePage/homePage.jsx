import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie'
import {decode as base64_decode, encode as base64_encode} from 'base-64';

const cookies = new Cookies();


class memberHomePage extends Component {
    state = {
        headSelected: '',
        email: '',

    }

    async componentDidMount() {
        if (cookies.get('token')) {
            var member = await axios.get(`http://127.0.0.1:8000/api/member/${cookies.get('token')}`);
            this.state.headSelected = member.data[0].head;
            this.state.email = member.data[0].email;
            this.setState({});
        }

    }

    logOut = () => {
        cookies.remove('token');
        window.location = "/homePage";
    }

    isLogin=()=>{
        if(!cookies.get('token')){
            return (<div class="form-inline my-2 my-lg-0 ml-auto">
                        <span class="text-secondary mr-3 font-weight-bold" id="member_msg"></span>
                        <a href="/login" class="btn btn-outline-primary mr-1">login</a>
                    </div>)
        }else{
            return (
                <div class="form-inline my-2 my-lg-0 ml-auto">
                    <span class="text-secondary mr-3 font-weight-bold" id="member_msg"></span>
                    <img src={this.state.headSelected} className="btn m-0 p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false" style={{width:45,height:45}}/>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ left:'auto',right:0,position: "absolute" ,zIndex:100}}>
                        <a className="dropdown-item" href="/member">會員頁</a>
                        <a className="dropdown-item" href={"/newPassword/"+base64_encode(this.state.email)}>修改密碼</a>
                        <button className="dropdown-item" type="button" onClick={this.logOut}>登出</button>
                    </div>
                </div>
            )
        }
    }


    render() {
        return (
            <div style={{ 'backgroundColor': '#25244b','overflow':'hidden'} }>
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
                                {this.isLogin()}
                            </div>
                        </nav>
                    </div>
                </div>
                {/* navbar end */}


                <div className="container-fluid mt-2 " style={{ 'overflow':'hidden'} }>
                    <div className="row">
                        {/* <div className='col'></div> */}
                        <div className='container-fluid backgroundAnimation'>

                            {/* <!-- ---------- Banner carousel ----------- --> */}
                            <div className='row d-flex ' >
                                <div className='col-8 p-0'>
                                    <div className='img-fluid'>
                                        <img src="img/UNITE1.webp" width="113%" alt="" onClick={()=>{window.location = "/start";}}/>
                                    </div>
                                    
                                    
                                </div>
                                <div className='col-4 p-0'>
                                    <div className="img-fluid">
                                    <img src="img/go0.jpg" width="100%" alt="" onClick={()=>{window.location = "/littleGame";}}/>
                                    </div>
                                        
                                   
                                </div>
                            </div>



                            {/* <div className="mb-3 row d-flex justify-content-center">
                                <div class="col-lg-8">
                                    <div class="input-group">
                                        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                        <button type="button" class="btn btn-outline-warning">search</button>
                                    </div>
                                </div>
                            </div> */}

                            <div className="row" >

                            </div>

                            <div>
                                <div className='lightinback x1'></div>
                                <div className='lightinback x2'></div>
                                <div className='lightinback x3'></div>
                                <div className='lightinback x4'></div>
                                <div className='lightinback x5'></div>
                                <div className='lightinback x6'></div>
                                <div className='lightinback x7'></div>
                                <div className='lightinback x8'></div>
                                <div className='lightinback x9'></div>
                            </div>
                        </div>
                        {/* <div className='col'></div> */}
                    </div>

                </div>

            </div>
        );
    }
}

export default memberHomePage;