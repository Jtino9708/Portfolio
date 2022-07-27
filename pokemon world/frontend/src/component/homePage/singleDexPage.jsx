import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie'
import { decode as base64_decode, encode as base64_encode } from 'base-64';

const cookies = new Cookies();

class memberHomePage extends Component {
    state = {
        headSelected: '',
        email: '',
        memberId: '',
        point: 0,
        pokemonData: [{
            Attack: 1,
            Defense: '',
            HP: '',
            SPattack: '',
            SPdefense: '',
            Speed: '',
            id: '',
            imgPath: '',
            pname: '',
            type0: '',
            type1: ''
        }],
        getID: '',
        result: {},
        resultData: {},
    }

    async componentDidMount() {
        if (cookies.get('token')) {
            var member = await axios.get(`http://127.0.0.1:8000/api/member/${cookies.get('token')}`);
            this.state.headSelected = member.data[0].head;
            this.state.email = member.data[0].email;
            this.setState({});
        }
        try {
            let member = await axios.get(`http://127.0.0.1:8000/api/member/${cookies.get('token')}`);
            this.state.memberId = member.data[0].memberId;
            // this.state.account = member.data[0].account;
            this.state.point = member.data[0].point;
            // this.state.totalCards = member.data[0].totalcards;
            // this.state.totalCardsShow = member.data[0].totalcards;
            //this.state.headSelected = member.data[0].head;
            // this.state.headSelectedTemp = member.data[0].head;
            // this.state.team = member.data[0].team;
            // this.state.teamActive = member.data[0].teamActive;
            // this.state.email = member.data[0].email;
            this.setState({});
            //console.log(this.state);
        } catch (error) {
            console.log(error);
        }

        var pokemonData = await axios.get(`http://127.0.0.1:8000/api/pokemon`);
        this.state.pokemonData = pokemonData.data;
        //console.log(this.state.pokemonData);

        this.state.getID = this.props.match.params.dexIDselect;
        console.log(this.state.getID);
        this.state.result = await axios.get(`http://127.0.0.1:8000/api/pokemon/${this.state.getID}`)
        this.state.resultData = this.state.result.data
        console.log(this.state.resultData);

        this.setState({});
    }

    logOut = () => {
        cookies.remove('token');
        window.location = "/homePage";
    }

    isLogin = () => {
        if (!cookies.get('token')) {
            return (<div class="form-inline my-2 my-lg-0 ml-auto">
                <span class="text-secondary mr-3 font-weight-bold" id="member_msg"></span>
                <a href="/login" class="btn btn-outline-primary mr-1">login</a>
            </div>)
        } else {
            return (
                <div class="form-inline my-2 my-lg-0 ml-auto">
                    <span class="text-secondary mr-3 font-weight-bold" id="member_msg"></span>
                    <img src={'/'+this.state.headSelected} className="btn m-0 p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false" style={{ width: 45, height: 45 }} />
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ left: 'auto', right: 0 }}>
                        <a className="dropdown-item" href="/member">會員頁</a>
                        <a className="dropdown-item" href={"/newPassword/" + base64_encode(this.state.email)}>修改密碼</a>
                        <button className="dropdown-item" type="button" onClick={this.logOut}>登出</button>
                    </div>
                </div>
            )
        }
    }


    tradeOnce = (props) => {
        if (this.state.resultData.id < 152) {
            if (this.state.point >= parseInt(this.state.resultData.Attack) * 10) {

                var tradeInfo = {
                    "id": `${base64_decode(cookies.get('token'))}`,
                    "addCard": props.target.getAttribute('data-clickID'),
                }
                var updatePoint = {
                    "id": `${base64_decode(cookies.get('token'))}`,
                    "addPoint": parseInt(this.state.resultData.Attack) * -10
                }
                if (axios.post("http://127.0.0.1:8000/api/updateTotalCards", tradeInfo) && axios.post("http://127.0.0.1:8000/api/updatePoint", updatePoint)) {
                    alert('ok');
                } else {
                    alert('we have some trouble');
                }


            } else {
                alert('所需point不足')
            }

        } else {
            alert('尚未開放')
        }


        // console.log(props.target.getAttribute('data-clickID'));


    }


    render() {
        return (
            <div style={{ 'backgroundColor': '#25244b' }}>

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


                <div className="container-fluid mt-3 ">

                    <div className="row" >

                        <div className='col'></div>
                        <div className='col-10 backgroundAnimation'>
                            <div className='row'>
                                <div className='col-6 ' style = {{textAlign : 'center'}}>
                                    <p className='display-4 text-light font-weight-bold'>ID : {this.state.resultData.id}</p>
                                    <p className='display-4 text-light font-weight-bold'>{this.state.resultData.pname}</p>
                                    <img src={'/' + this.state.resultData.imgPath} height="500px" width="500px" class="img-fluid" alt="" />
                                </div>
                                <div className='col-6'>

                                    <table className='mt-5 table table-borderless'>
                                        <tbody>
                                            <tr>

                                                <td ><p className='h1 text-light'>HP : {this.state.resultData.HP}</p></td>
                                                <td ><p className='h1 text-light'>速度 : {this.state.resultData.Speed}</p></td>
                                            </tr>
                                            <tr>
                                                <td><p className='h1 text-light'>攻擊 : {this.state.resultData.Attack}</p></td>
                                                <td><p className='h1 text-light'>防禦 : {this.state.resultData.Defense}</p></td>
                                            </tr>
                                            <tr>
                                                <td><p className='h1 text-light'>特殊攻擊 : {this.state.resultData.SPattack}</p></td>
                                                <td><p className='h1 text-light'>特殊防禦 : {this.state.resultData.SPdefense}</p></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/* <p className='h1 text-light'>HP: {this.state.resultData.HP}</p><br />
                                            <p className='h1 text-light'>Attack: {this.state.resultData.Attack}</p><br />
                                            <p className='h1 text-light'>Defense: {this.state.resultData.Defense}</p><br />
                                            <p className='h1 text-light'>SPattack: {this.state.resultData.SPattack}</p><br />
                                            <p className='h1 text-light'>SPdefense: {this.state.resultData.SPdefense}</p><br />
                                            <p className='h1 text-light'>Speed: {this.state.resultData.Speed}</p><br /> */}

                                    <div className='row'>
                                        <div className='col-6'></div>
                                        <div className='  col-6'>
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            
                                            
                                            <p className='display-4 text-light font-weight-bold'>Point : {parseInt(this.state.resultData.Attack) * 10}</p>
                                            <button className='btn-block r-3 mb-3 btn btn-link text-dark  bg-warning ' data-toggle="modal" data-target="#purchaseModal">
                                                <p className='h1 text-dark font-weight-bold'>購買</p>
                                                {/* <br /> */}
                                                
                                            </button>
                                        </div>

                                    </div>



                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />

                                </div>
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
                        <div className='col'></div>

                        {/* <!-- Modal --> */}
                        <div class="modal fade" id="purchaseModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">所需點數:{parseInt(this.state.resultData.Attack) * 10}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        確定購買 ?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">cancel</button>
                                        <button type="button" class="btn btn-primary" data-dismiss="modal" data-clickID={this.state.resultData.id} onClick={this.tradeOnce}>confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default memberHomePage;