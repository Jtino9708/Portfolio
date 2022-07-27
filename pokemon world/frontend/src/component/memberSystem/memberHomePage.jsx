import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie'
import {decode as base64_decode, encode as base64_encode} from 'base-64';

const cookies = new Cookies();

class memberHomePage extends Component {
    
    constructor(props){
        super(props);
        if(!cookies.get('token')){
            window.location = "/homePage";
        }
        this.state = { 
            memberId:"",
            point:0,
            account:'',
            email:'',
            headSelected:'',
            headSelectedTemp:'',
            totalCards:[
                // {id:1,pname:'妙花種子1',type0:'一般',type1:'火',imgPath:'/img/001.png'},
                // {id:2,pname:'妙花種子2',type0:'水',type1:'草',imgPath:'/img/001.png'},
                // {id:3,pname:'妙花種子3',type0:'電',type1:'冰',imgPath:'/img/001.png'},
                // {id:4,pname:'妙花種子4',type0:'格鬥',type1:'毒',imgPath:'/img/001.png'},
                // {id:5,pname:'妙花種子5',type0:'地面',type1:'飛行',imgPath:'/img/001.png'},
                // {id:6,pname:'妙花種子6',type0:'超能力',type1:'蟲',imgPath:'/img/001.png'},
                // {id:7,pname:'妙花種子7',type0:'岩石',type1:'幽靈',imgPath:'/img/001.png'},
                // {id:8,pname:'妙花種子8',type0:'龍',type1:'惡',imgPath:'/img/001.png'},
                // {id:9,pname:'妙花種子9',type0:'鋼',type1:'妖精',imgPath:'/img/001.png'}
            ],//由後端提供玩家所擁有的寶可夢
            totalCardsShow:[
                // {id:1,pname:'妙花種子1',type0:'一般',type1:'火',imgPath:'/img/001.png'},
                // {id:2,pname:'妙花種子2',type0:'水',type1:'草',imgPath:'/img/001.png'},
                // {id:3,pname:'妙花種子3',type0:'電',type1:'冰',imgPath:'/img/001.png'},
                // {id:4,pname:'妙花種子4',type0:'格鬥',type1:'毒',imgPath:'/img/001.png'},
                // {id:5,pname:'妙花種子5',type0:'地面',type1:'飛行',imgPath:'/img/001.png'},
                // {id:6,pname:'妙花種子6',type0:'超能力',type1:'蟲',imgPath:'/img/001.png'},
                // {id:7,pname:'妙花種子7',type0:'岩石',type1:'幽靈',imgPath:'/img/001.png'},
                // {id:8,pname:'妙花種子8',type0:'龍',type1:'惡',imgPath:'/img/001.png'},
                // {id:9,pname:'妙花種子9',type0:'鋼',type1:'妖精',imgPath:'/img/001.png'}
            ],//輸出顯示的寶可夢
            team:[[],[],[],[],[],[],[],[],[],[]],//玩家隊伍
            teamActive:'0',
            monsterOnSelect:'0',
            teamOnSelect:'0',
            deleteSelect:[],
            deleteSelectButton:['選擇','選擇','選擇','選擇','選擇']
        }
        //this.getMember();
        //console.log('123456');
    }

    
    async componentDidMount(){
        try {
            let member = await axios.get(`http://127.0.0.1:8000/api/member/${cookies.get('token')}`);
            this.state.memberId = member.data[0].memberId;
            this.state.account = member.data[0].account;
            this.state.point = member.data[0].point;
            this.state.totalCards = member.data[0].totalcards;
            this.state.totalCardsShow = member.data[0].totalcards;
            this.state.headSelected = member.data[0].head;
            this.state.headSelectedTemp = member.data[0].head;
            this.state.team = member.data[0].team;
            this.state.teamActive = member.data[0].teamActive;
            this.state.email = member.data[0].email;
            this.setState({});
            //console.log(this.state);
        } catch (error) {
            console.log(error);
        }
    }
    //navebar
    logOut=()=>{
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
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ left:'auto',right:0}}>
                        <a className="dropdown-item" href="/member">會員頁</a>
                        <a className="dropdown-item" href={"/newPassword/"+base64_encode(this.state.email)}>修改密碼</a>
                        <button className="dropdown-item" type="button" onClick={this.logOut}>登出</button>
                    </div>
                </div>
            )
        }
    }

    //選擇隊伍
    teamClickActive=(item)=>{
        //console.log(this.state.teamActive);
        if(item==parseInt(this.state.teamActive)){
            return <button type='button' className='btn btn-danger mx-5 mb-2' data-team={item}>出戰中</button>
        }else{
            return <button type='button' className='btn btn-danger mx-5 mb-2' onClick={this.changTeamActive} data-team={item}>出戰</button>
        }
    }
    changTeamActive =async (props)=>{
        //console.log(props.target.getAttribute("data-team"));
        this.state.teamActive = props.target.getAttribute("data-team");
        let temp = {
            memberId : this.state.memberId,
            teamActive : this.state.teamActive,
            headSelected : this.state.headSelected,
            team : this.state.team
        };
        //console.log(temp);
        let resalt = await axios.post("http://127.0.0.1:8000/api/update",temp);
        this.setState({});
    }

    //頭像選擇
    selectHead = (props) =>{
        this.state.headSelectedTemp=props.target.getAttribute('data-headselected');
        this.setState({});
    }

    //重至headSelectedTemp
    headSelectedTempReflash = () => {
        this.state.headSelectedTemp=this.state.headSelected;
        this.setState({});
    }

    //頭像變更確定
    headConfirm = async() => {
        this.state.headSelected = this.state.headSelectedTemp;
        let temp = {
            memberId : this.state.memberId,
            teamActive : this.state.teamActive,
            headSelected : this.state.headSelected,
            team : this.state.team
        };
        //console.log(temp);
        let resalt = await axios.post("http://127.0.0.1:8000/api/update",temp);
        this.setState({});
    }

    //是否有第二屬性
    type1IsSet = (item) =>{
        if(item.type1){
            return <span className='px-2 ml-2 text-light' style={{'backgroundColor':'#27153E'}}>{item.type1}</span>
        }
    }

    //牌庫中目前要選取加入的腳色id
    monsterSelect=(props)=>{
        //console.log(props.target.getAttribute('data-monsterid'));
        this.state.monsterOnSelect = props.target.getAttribute('data-monsterid');
        this.setState({});
    }

    //牌庫中目前要選取加入的隊伍
    teamSelect=(props)=>{
        //console.log(props.target.getAttribute('data-teamid'));
        this.state.teamOnSelect = props.target.getAttribute('data-teamid');
        this.setState({});
    }

    //由id抓取目標寶可夢屬性
    getMonster = (x) =>{
        let monster = {};
        this.state.totalCards.map((item,index)=>{
            if(item.id == x){
                monster = item;
            }
        })
        return monster
    }

    //是否滿員 如果滿員輸出'隊伍已滿'  如果沒滿增加選擇的牌並顯示
    isFull = (x) =>{
        //console.log(this.state.team[x].includes(parseInt(this.state.monsterOnSelect)));
        if(this.state.team[x].includes(parseInt(this.state.monsterOnSelect))){
            return <div><h1>隊伍已擁有</h1><button type='button' className='btn btn-danger' data-dismiss="modal">確定</button></div>
        }
        if(this.state.team[x].length<5){
            return(
            <div>
            <div className='mt-4 d-flex flex-wrap'>
                {this.state.team[this.state.teamOnSelect].map((item,index)=>
                    <div className='card bg-info mx-1 mb-3' style={{width:150}} key={index}>
                        <img className="card-img-top  p-2" src={this.getMonster(item).imgPath} alt="Card image" />
                        <div className='card-body text-center'>
                            <p>{this.getMonster(item).pname}</p><br />
                            <span className='px-2 mr-1 text-light' style={{'backgroundColor':'#27153E'}}>{this.getMonster(item).type0}</span>
                            {this.type1IsSet(this.getMonster(item))}
                        </div>
                    </div>
                )}
                <div className='card bg-info mx-1 mb-3' style={{width:150}}>
                    <img className="card-img-top  p-2" src={this.getMonster(this.state.monsterOnSelect).imgPath} alt="Card image" />
                    <div className='card-body text-center'>
                        <p>{this.getMonster(this.state.monsterOnSelect).pname}</p><br />
                        <span className='px-2 mr-1 text-light' style={{'backgroundColor':'#27153E'}}>{this.getMonster(this.state.monsterOnSelect).type0}</span>
                        {this.type1IsSet(this.getMonster(this.state.monsterOnSelect))}

                    </div>
                </div>
            </div>
            <div className='modal-footer'>
                <button type='button' className='btn btn-danger' onClick={this.addtInTeam} data-dismiss="modal">確定</button>
                <button type='button' className='btn btn-danger' data-dismiss="modal">取消</button>
            </div>
            </div>
            )
        }else{
            return <div><h1>隊伍已滿</h1><button type='button' className='btn btn-danger' data-dismiss="modal">確定</button></div>
        }
    }

    //確定加入隊伍
    addtInTeam= async()=>{
        this.state.team[this.state.teamOnSelect].push(parseInt(this.state.monsterOnSelect));
        //console.log(this.state.team);
        let temp = {
            memberId : this.state.memberId,
            teamActive : this.state.teamActive,
            headSelected : this.state.headSelected,
            team : this.state.team
        };
        //console.log(temp);
        let resalt = await axios.post("http://127.0.0.1:8000/api/update",temp);
        this.setState({});
    }

    //牌庫篩選器
    libaryShow=(props)=>{
        //console.log(props.target.getAttribute('data-props'));
        if(props.target.getAttribute('data-props')=='全部'){
            this.state.totalCardsShow=this.state.totalCards;
            //console.log(this.state.totalCardsShow);
            this.setState({});
        }else{
            //console.log('ok')
            this.state.totalCardsShow=[];
            for(let i=0;i<this.state.totalCards.length;i++){
                if(this.state.totalCards[i].type0 == props.target.getAttribute('data-props') || 
                this.state.totalCards[i].type1 == props.target.getAttribute('data-props')){
                    this.state.totalCardsShow.push(this.state.totalCards[i]);
                }
            }
            this.setState({});
        }
    }

    // 顯示個別隊伍
    teamShow = (props,index)=>{
        //console.log(props)
        if(props.length != 0){
            return (
                <div className='text-center border border-info my-2' key={index}>
                    <h3 className='text-light'>隊伍{index+1}</h3>
                    <div className='mt-4 d-flex flex-wrap'>
                        {props.map((item,index)=>
                            <div className='card mx-1 mb-3' style={{width:150 ,'backgroundColor':'#332048'}} key={index}>
                                <img className="card-img-top  p-2" src={this.getMonster(item).imgPath} alt="Card image" />
                                <div className='card-body text-center'>
                                    <p className='text-light'>{this.getMonster(item).pname}</p><br />
                                    <span className='px-2 mr-1 text-light' style={{'backgroundColor':'#27153E'}}>{this.getMonster(item).type0}</span>
                                    {this.type1IsSet(this.getMonster(item))}
                                </div>
                            </div>
                        )}
                    </div>
                    <button type='button' className='btn btn-danger mx-5 mb-2' data-toggle="modal" data-target=".teamEdit" onClick={this.teamSelectToEdit} data-teamid={index}>編輯</button>
                    <button type='button' className='btn btn-danger mx-5 mb-2' onClick={this.deleteTeam} data-team={index}>刪除</button>
                    {this.teamClickActive(index)}
                </div>
            )
        }
        
    }

    //點擊隊伍中的編輯按鈕

    teamSelectToEdit=(props)=>{
        //console.log(props.target.getAttribute('data-teamid'));
        this.state.deleteSelect=[];
        this.state.deleteSelectButton=['選擇','選擇','選擇','選擇','選擇'];
        this.state.teamOnSelect = props.target.getAttribute('data-teamid');
        this.setState({});
    }


    //刪除用checkBox
    deleteCeck = (item)=>{
        let temp = parseInt(item.target.value);
        let index =parseInt(item.target.getAttribute('data-index'));
        if(this.state.deleteSelectButton[index] == '選擇'){
            this.state.deleteSelect.push(temp);
            this.state.deleteSelectButton[index] = '選擇中';
            this.setState({});
        }else{
            let repeat = this.state.deleteSelect.indexOf(item.target.value);
            this.state.deleteSelect.splice(repeat,1);
            this.state.deleteSelectButton[index] = '選擇';
            this.setState({});
        }
        //console.log(this.state.deleteSelect);
        //console.log(item.target);
    }

    //確認刪除已選擇卡片
    deleteInTeam = async()=>{
        for(let i=0;i<this.state.deleteSelect.length;i++){
            let select = this.state.team[parseInt(this.state.teamOnSelect)].indexOf(this.state.deleteSelect[i]);
            this.state.team[parseInt(this.state.teamOnSelect)].splice(select,1);
        }
        let temp = {
            memberId : this.state.memberId,
            teamActive : this.state.teamActive,
            headSelected : this.state.headSelected,
            team : this.state.team
        };
        //console.log(temp);
        let resalt = await axios.post("http://127.0.0.1:8000/api/update",temp);
        this.setState({});
    }

    //刪除隊伍
    deleteTeam = async(props) =>{
        let team = props.target.getAttribute('data-team');
        this.state.team[team] = [];
        let temp = {
            memberId : this.state.memberId,
            teamActive : this.state.teamActive,
            headSelected : this.state.headSelected,
            team : this.state.team
        };
        //console.log(temp);
        let resalt = await axios.post("http://127.0.0.1:8000/api/update",temp);
        this.setState({});
    }

    render() { 
        
        return (
            <div style={{'backgroundColor':'#25244b'}}>
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
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-8 backgroundAnimation">
                            {/* 頭像和資訊欄*/}
                            <div className="row">
                                <div className='col'>
                                    <img src={this.state.headSelected} className='ml-5 mt-3 rounded' type='button' data-toggle="modal" data-target="#selectHead" style={{width:300,height:300}}/>
                                </div>
                                <div className='col m-5' style={{border:"2px solid #405361"}}>
                                    <div className='my-5'>
                                        <h1 className='text-light'>會員帳號: {this.state.account}</h1>
                                        <h1 className='text-light'>擁有點數: {this.state.point}</h1>
                                        <h1 className='text-light'>擁有卡片數: {this.state.totalCards.length}</h1>
                                    </div>
                                </div>
                            </div>
                            {/* 牌庫與隊伍 */}
                            <ul className="nav nav-tabs nav-justified mt-3">
                                <li className="nav-item">
                                    <a className="nav-link text-light active" data-toggle="tab" href="#cardLibrary" style={{'backgroundColor':'#191840'}}>牌庫</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" data-toggle="tab" href="#teams" style={{'backgroundColor':'#33334F'}}>隊伍</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                {/* 牌庫 */}
                                <div id="cardLibrary" className="container tab-pane active text-center"><br />
                                    <button type='button' className='btn text-light' style={{width:500,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'全部'}>全部</button>
                                    <div className='row mt-3'>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'一般'}>一般</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'火'}>火</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'水'}>水</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'草'}>草</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'電'}>電</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'冰'}>冰</button></div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'格鬥'}>格鬥</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'毒'}>毒</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'地面'}>地面</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'飛行'}>飛行</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'超能力'}>超能力</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'蟲'}>蟲</button></div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'岩石'}>岩石</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'幽靈'}>幽靈</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'龍'}>龍</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'惡'}>惡</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'鋼'}>鋼</button></div>
                                        <div className='col text-center'><button type='button' className='btn text-light' style={{width:100,'backgroundColor':'#494869'}} onClick={this.libaryShow} data-props={'妖精'}>妖精</button></div>
                                    </div>
                                    <div className='mt-5 d-flex flex-wrap'>
                                        {this.state.totalCardsShow.map((item,index)=>
                                            <div className='card mx-1 mb-3' style={{width:200,'backgroundColor':'#332048'}} key={index}>
                                                <img className="card-img-top  p-2" src={item.imgPath} alt="Card image" onClick={()=>{window.location=`/singleDexPage/${item.id}`}}/>
                                                <div className='card-body text-center'>
                                                    <h3 className='text-light' onClick={()=>{window.location=`/singleDexPage/${item.id}`}}>{item.pname}</h3><br />
                                                    <span className='px-2 mr-2 text-light' style={{'backgroundColor':'#27153E'}}>{item.type0}</span>
                                                    {this.type1IsSet(item)}
                                                </div>
                                                <div className='card-foot text-center'>
                                                    <button type='button' className="btn mb-2 text-light" style={{'backgroundColor':'#494869'}} data-toggle="modal" data-target=".addInTeam" onClick={this.monsterSelect} data-monsterid={`${item.id}`}>加入隊伍</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* 隊伍 */}
                                <div id="teams" className="container tab-pane fade"><br />
                                    {this.state.team.map((item,index)=>
                                        <div key={index}>
                                            {this.teamShow(item,index)}
                                        </div>
                                    )}
                                </div>                                
                            </div>
                            <div className=''>
                                <link href="https://fonts.googleapis.com/css?family=Roboto:100" rel="stylesheet"></link>
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
                        <div className="col"></div>
                    </div>
                </div>
                {/* 選擇頭像 */}
                <div className="modal fade" id="selectHead" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">選擇頭像</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body d-flex bg-info">
                            <div className='pr-5'><img src={this.state.headSelectedTemp} className='ml-5 mt-3 ' type='button' data-toggle="modal" data-target="#selectHead" style={{width:200,height:200}}/></div>
                            <div className='d-flex flex-wrap'>
                                {this.state.totalCards.map((item,index)=>{
                                    return <img src={item.imgPath} key={index} className='m-2 ' type='button' onClick={this.selectHead} data-headselected={item.imgPath} style={{width:75,height:75}}/>
                                })}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.headSelectedTempReflash} data-dismiss="modal">取消</button>
                            <button type="button" className="btn btn-primary"  onClick={this.headConfirm} data-dismiss="modal">確定</button>
                        </div>
                        </div>
                    </div>
                </div>
                {/* 加入隊伍選擇 */}
                <div className="modal fade addInTeam" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content text-center">
                            <h3>選擇隊伍</h3>
                                {this.state.team.map((item,index)=>
                                    <div key={index}>
                                        <button className='btn btn-secondary my-2' data-toggle="modal" data-target=".teamCheck" onClick={this.teamSelect} data-teamid={`${index}`}>隊伍{index+1}  {item.length}/5</button><br />
                                        <div className="modal fade teamCheck" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div className='text-center'>
                                                        <h3>隊伍{parseInt(this.state.teamOnSelect)+1}</h3><hr />
                                                    </div>
                                                    <div className='modal-body'>{this.isFull(this.state.teamOnSelect)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                {/* 隊伍編輯 */}
                <div className="modal fade teamEdit" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header"><h3>隊伍{parseInt(this.state.teamOnSelect)+1}</h3></div>
                            <div className='mt-4 d-flex flex-wrap'>
                                {this.state.team[this.state.teamOnSelect].map((item,index)=>
                                    <div className='card bg-info mx-1 mb-3' style={{width:150}} key={index}>
                                        <img className="card-img-top  p-2" src={this.getMonster(item).imgPath} alt="Card image" />
                                        <div className='card-body text-center'>
                                            <p>{this.getMonster(item).pname}</p><br />
                                            <span className='px-2 mr-1 text-light'style={{'backgroundColor':'#27153E'}}>{this.getMonster(item).type0}</span>
                                            {this.type1IsSet(this.getMonster(item))}
                                        </div>
                                        <div className="card-footer text-center">
                                            <button className='btn btn-success' type='button' value={item} onClick={this.deleteCeck} data-index={index}>{this.state.deleteSelectButton[index]}</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-danger' data-dismiss="modal" onClick={this.deleteInTeam}>刪除</button>
                                <button type='button' className='btn btn-danger' data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default memberHomePage;