import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie'
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './css/memberpage.css';


const cookies = new Cookies();

class memberHomePage extends Component {
    state = {
        headSelected: '',
        email: '',
        memberId: '',
        point: 0,
        costPoint: 0,
        purchaseID: '',
        pokemonData: [],
        pokemonDataShow: [],
        dexIDselect: '',
        serchInput: '',
        scrollTopDisplay:'none'

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
            // this.state.headSelected = member.data[0].head;
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
        this.state.pokemonDataShow = pokemonData.data;
        console.log(this.state.pokemonData);
        this.setState({});

    }

    getPoint = async () => {
        let member = await axios.get(`http://127.0.0.1:8000/api/member/${cookies.get('token')}`);
        this.state.memberId = member.data[0].memberId;
        this.state.point = member.data[0].point;
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
                    <img src={this.state.headSelected} className="btn m-0 p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false" style={{ width: 45, height: 45 }} />
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ left: 'auto', right: 0 }}>
                        <a className="dropdown-item" href="/member">?????????</a>
                        <a className="dropdown-item" href={"/newPassword/" + base64_encode(this.state.email)}>????????????</a>
                        <button className="dropdown-item" type="button" onClick={this.logOut}>??????</button>
                    </div>
                </div>
            )
        }
    }

    //type1?
    type1IsSet = (item, key) => {
        if (item.type1) {
            return <button class="ml-1 btn  text-light btn-info font-weight-bold">{this.state.pokemonDataShow[key].type1}</button>
        }
    }

    dexIDselect = (props) => {
        console.log(props.target.getAttribute('data-clickID'));
        // this.state.dexIDselect = ;
        // this.setState({});
        window.location = `/singleDexPage/${props.target.getAttribute('data-clickID')}`;

    }
    showAll = () => {
        this.state.serchInput = '';
        this.state.pokemonDataShow = this.state.pokemonData;
        this.setState({});
    }
    searchByName = () => {
        //this.state.pokemonDataShow=[this.state.pokemonData.filter(i=>i.pname==this.state.serchInput)];
        this.state.pokemonDataShow = [];
        this.state.pokemonData.map((iteam, index) => {
            if (iteam.pname.includes(this.state.serchInput)) {
                this.state.pokemonDataShow.push(iteam);
            }
        })
        this.setState({});
    }

    searchByType = () => {
        // console.log(this.state.pokemonData.filter(i=>(i.type0==`${this.state.serchInput}`||i.type1==`${this.state.serchInput}`)));
        var typeAll = ['??????', '???', '???', '???', '???', '???', '??????', '???', '??????', '??????', '?????????', '???', '??????', '??????', '???', '???', '???', '??????']
        if (this.state.serchInput != '' && typeAll.includes(this.state.serchInput)) {
            this.state.pokemonDataShow = this.state.pokemonData.filter(i => (i.type0 == this.state.serchInput || i.type1 == this.state.serchInput));
            //console.log(this.state.pokemonDataShow);
            this.setState({});
        } else {
            alert('???????????????')
        }
    }

    purchaseModal = (props) => {
        console.log(props.target.getAttribute('data-clickID'));
        this.state.purchaseID = props.target.getAttribute('data-clickID');
        this.state.costPoint = this.state.pokemonDataShow[this.state.purchaseID - 1].Attack * 10

        console.log(this.state.costPoint)
        this.setState({});
    }

    tradeOnce = (props) => {
        if (props.target.getAttribute('data-clickID') < 152) {
            this.getPoint();
            if (this.state.point >= parseInt(this.state.pokemonData[this.state.purchaseID].Attack) * 10) {

                var tradeInfo = {
                    "id": `${base64_decode(cookies.get('token'))}`,
                    "addCard": this.state.purchaseID,
                }
                var updatePoint = {
                    "id": `${base64_decode(cookies.get('token'))}`,
                    "addPoint": parseInt(this.state.pokemonData[this.state.purchaseID - 1].Attack) * -10
                }
                if (axios.post("http://127.0.0.1:8000/api/updateTotalCards", tradeInfo) && axios.post("http://127.0.0.1:8000/api/updatePoint", updatePoint)) {
                    alert('ok');
                } else {
                    alert('we have some trouble');
                }


            } else {
                alert('?????????????????????????????????????????????????????????')
            }

        } else {
            alert('????????????')
        }


        // console.log(props.target.getAttribute('data-clickID'));


    }

    topFunction = ()=>{
        // console.log(document.documentElement.scrollTop)
        document.documentElement.scrollTop=0;
    }

    isScroll = () => {
        // console.log(document.documentElement.scrollTop);
        if(document.documentElement.scrollTop>50){
            this.state.scrollTopDisplay = 'block';
            this.setState({});
        }else{
            this.state.scrollTopDisplay = 'none';
            this.setState({});
        }
    }

    render() {
        return (
            <div style={{ 'backgroundColor': '#25244b' }}>
                {window.onscroll = ()=>{this.isScroll()}}
                {/* top button */}
                <button onClick={this.topFunction} id="myBtn" title="Go to top" style={{display:`${this.state.scrollTopDisplay}`}}>Top</button>

                {/* navbar start */}
                <div class="bg-dark">
                    <div>
                        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav">
                                    <li class="nav-item active">
                                        <a class="nav-link" href="/">
                                            <h3>??????</h3>
                                        </a>
                                    </li>
                                    <li class="nav-item active">
                                        <a class="nav-link" href="/dexPage">
                                            <h3>??????</h3>
                                        </a>
                                    </li>
                                    <li class="nav-item active">
                                        <a class="nav-link" href="/start">
                                            <h3>????????????</h3>
                                        </a>
                                    </li>
                                    <li class="nav-item active">
                                        <a class="nav-link" href="/littleGame">
                                            <h3>????????????</h3>
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
                    <div className="row">
                        <div className='col'></div>
                        <div className='col-10 backgroundAnimation '>

                            <div className="mb-3 row d-flex justify-content-center">
                                <div class="col-lg-8">
                                    <div class="input-group">
                                        <input type="search" id="Input" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={(e) => { this.state.serchInput = e.target.value; this.setState({}); }} value={this.state.serchInput} />

                                        <div class="dropdown">
                                            <button class="btn btn-secondary dropdown-toggle btn-outline-warning" type="button" data-toggle="dropdown" aria-expanded="false">
                                                searchBy
                                            </button>
                                            <div class="dropdown-menu">
                                                <button class="dropdown-item" type="button" onClick={this.showAll}>All</button>
                                                <button class="dropdown-item" type="button" onClick={this.searchByName}>name</button>
                                                <button class="dropdown-item" type="button" onClick={this.searchByType}>type</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row " id="showDex">

                                {this.state.pokemonDataShow.map((item, key) =>
                                    <div className="col-sm-12 col-md-6 col-lg-4 ">
                                        <div className="mt-5 item ">

                                            <div className='row d-flex justify-content-start'>
                                                <div className='col-12 d-flex justify-content-start'>
                                                    {/* <p className="h2 ml-3" style={{ color: '#a9eee9' }}>ID : {this.state.pokemonDataShow[key].id}</p> */}

                                                    <button className=" btn btn-link text-dark  text-wrap font-weight-bold" data-clickID={`${this.state.pokemonDataShow[key].id}`} onClick={this.dexIDselect}>
                                                        <p className="h2  font-weight-bold" style={{ color: '#a9eee9' }} data-clickID={`${this.state.pokemonDataShow[key].id}`} onClick={this.dexIDselect} >{this.state.pokemonDataShow[key].pname}</p>
                                                    </button>
                                                </div>


                                            </div>

                                            <div className='row d-flex justify-content-center'>
                                                <img src={this.state.pokemonDataShow[key].imgPath} width="66.6%" />
                                            </div>

                                            <div className="row d-flex justify-content-center">

                                                <div className='col-8 d-flex justify-content-start'>
                                                    <button className="ml-0 btn  btn-light font-weight-bold">NO. {this.state.pokemonDataShow[key].id}</button>
                                                    <button className="ml-2 btn  btn-success font-weight-bold">{this.state.pokemonDataShow[key].type0}</button>
                                                    {this.type1IsSet(item, key)}
                                                </div>

                                                

                                                <div className='col-4 d-flex justify-content-center' data-toggle="modal" data-target="#purchaseModal" data-clickID={`${this.state.pokemonDataShow[key].id}`} onClick={this.purchaseModal}>
                                                    <button className="mt-0 ml-0 btn btn-outline-warning font-weight-bold" data-toggle="modal" data-target="#purchaseModal" data-clickID={`${this.state.pokemonDataShow[key].id}`} onClick={this.purchaseModal}><div data-toggle="modal" data-target="#purchaseModal" data-clickID={`${this.state.pokemonDataShow[key].id}`} onClick={this.purchaseModal} ><FontAwesomeIcon icon={faCartShopping} /></div></button>
                                                </div>

                                            </div>

                                        </div>
                                    </div>



                                )}

                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />





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

                    </div>

                    {/* <!-- Modal --> */}
                    <div class="modal fade" id="purchaseModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    {/* {console.log(this.state.pokemonDataShow[this.state.purchaseID].Attack)} */}
                                    <h5 class="modal-title" id="exampleModalLabel">????????????:{this.state.costPoint}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    ???????????? ?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">??????</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal" data-clickID={this.state.purchaseID} onClick={this.tradeOnce}>??????</button>
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