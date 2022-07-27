import React, { Component } from 'react';
import $ from "jquery";
import './css/battle.css';
import pokeball from './image/Pokeball.png';
import dice from './image/dice_1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import anime from 'animejs/lib/anime.es.js';
import { Illustration, Ellipse, Shape, RoundedRect, useRender } from 'react-zdog';
import Zdog from 'zdog'
import Cookies from 'universal-cookie'

const cookies = new Cookies();


class battlepage extends Component {

    state = {
        member: [
            {account: "aaa", head:""}
        ],
        pokeList:[
            {id:1, pname: "", Attack: 1, imgPath: ""},
            {id:2, pname: "", Attack: 1, imgPath: ""},
            {id:3, pname: "", Attack: 1, imgPath: ""},
            {id:4, pname: "", Attack: 1, imgPath: ""},
            {id:5, pname: "", Attack: 1, imgPath: ""}
        ],
        computerList:[
            {id:1, pname: "", Attack: 1, imgPath: ""}
        ]
        
    }
    
    async componentDidMount() {
        if (cookies.get('token')) {
            // 玩家資訊
            var gamer = await axios.get(`http://127.0.0.1:8000/api/member/${cookies.get('token')}`);
            this.setState({ member: gamer.data });

            // 玩家的牌組
            var result = await axios.get(`http://127.0.0.1:8000/api/getTeam/${cookies.get('token')}`);
            this.setState({pokeList: result.data});

            var pList = this.state.pokeList
            if ( pList.length === 5) {
                for (var i = 0; i<pList.length; i++) {
                    // var pic_1 = require(`./pokemonMaster/images/${p[i].id}.png`)
                    $(`#p${i+1}`).html(
                        `<img src = '${pList[i].imgPath}' alt="" />
                        <br><span>${pList[i].pname}</span>
                        <br><span>Attack:</span>
                        <span id="p_atk">${pList[i].Attack}</span>` 
                    );

                    $(`#r${i+1}`).html(
                        `<span>${pList[i].pname}</span><br><span>Attack:</span>
                        <span id="p_atk">${pList[i].Attack}</span>
                        <img src = '${pList[i].imgPath}' alt="" />`
                    );

                }
            }else{
                alert('出戰隊伍數量不足，請補滿5張卡牌');
                window.location = "/member";
            }

            //電腦的牌組
            var outcome = await axios.get("http://localhost:8000/api/pokemon");
            this.setState({computerList: outcome.data});

            var cList = this.state.computerList;
            for (var i = 0; i<5; i++) {  
                var j = Math.floor(Math.random() * 151) +1;
                // var pic_2 = require(`./pokemonMaster/images/${c[j].id}.png`);
                $(`#h${i+1}`).html(
                    `<span>${cList[j].pname}</span>
                     <br><span>Attack:</span> 
                    <span id="c_atk">${cList[j].Attack}</span>
                    <img src = '${cList[j].imgPath}' alt="" />`
                )
            }
        }else{
            window.location = "/login";
            alert("尚未登入")
        }

        // 玩家的骰子
        const { Illustration, Group, Anchor, Rect, TAU, Ellipse } = Zdog;
        const element = document.querySelector('canvas');
        const illustration = new Illustration({
            element,
        });


        // anchor point used for the rotation
        const dice = new Anchor({
            addTo: illustration,
        });

        // group describing the faces through rounded rectangles
        const faces = new Group({
            addTo: dice,
        });
        // due to the considerable stroke, it is possible to fake the dice using four faces only
        const face = new Rect({
            addTo: faces,
            stroke: 50,
            width: 50,
            height: 50,
            color: 'hsl(5, 80%, 55%)',
            translate: {
                z: -25,
            },
        });

        // rotate the faces around the center
        face.copy({
            rotate: {
                x: TAU / 4,
            },
            translate: {
                y: 25,
            },
        });

        face.copy({
            rotate: {
                x: TAU / 4,
            },
            translate: {
                y: -25,
            },
        });

        face.copy({
            translate: {
                z: 25,
            },
        });

        // include the dots repeating as many shapes/groups as possible
        // ! when copying an element be sure to reset the rotation/translation of the copied shape
        const one = new Ellipse({
            addTo: dice,
            diameter: 15,
            stroke: false,
            fill: true,
            color: 'hsl(0, 0%, 100%)',
            translate: {
                z: 50,
            },
        });

        const two = new Group({
            addTo: dice,
            rotate: {
                x: TAU / 4,
            },
            translate: {
                y: 50,
            },
        });

        one.copy({
            addTo: two,
            translate: {
                y: 20,
            },
        });

        one.copy({
            addTo: two,
            translate: {
                y: -20,
            },
        });

        const three = new Group({
            addTo: dice,
            rotate: {
                y: TAU / 4,
            },
            translate: {
                x: 50,
            },
        });

        one.copy({
            addTo: three,
            translate: {
                z: 0,
            },
        });

        one.copy({
            addTo: three,
            translate: {
                x: 20,
                y: -20,
                z: 0,
            },
        });

        one.copy({
            addTo: three,
            translate: {
                x: -20,
                y: 20,
                z: 0,
            },
        });

        const four = new Group({
            addTo: dice,
            rotate: {
                y: TAU / 4,
            },
            translate: {
                x: -50,
            },
        });

        two.copyGraph({
            addTo: four,
            rotate: {
                x: 0,
            },
            translate: {
                x: 20,
                y: 0,
            },
        });

        two.copyGraph({
            addTo: four,
            rotate: {
                x: 0,
            },
            translate: {
                x: -20,
                y: 0,
            },
        });

        const five = new Group({
            addTo: dice,
            rotate: {
                x: TAU / 4,
            },
            translate: {
                y: -50,
            },
        });

        four.copyGraph({
            addTo: five,
            rotate: {
                y: 0,
            },
            translate: {
                x: 0,
            },
        });

        one.copy({
            addTo: five,
            translate: {
                z: 0,
            },
        });

        const six = new Group({
            addTo: dice,
            translate: {
                z: -50,
            },
        });

        two.copyGraph({
            addTo: six,
            rotate: {
                x: 0,
                z: TAU / 4,
            },
            translate: {
                x: 0,
                y: 0,
            },
        });

        four.copyGraph({
            addTo: six,
            rotate: {
                y: 0,
            },
            translate: {
                x: 0,
            },
        });

        // show the static illustration
        illustration.updateRenderGraph();
        // animation following a click on the button, using anime.js
        const button = document.querySelector('canvas');
        // object animated through anime.js
        const rotation = {
            x: 0,
            y: 0,
            z: 0,
        };

        // array describing the rotation necessary to highlight the difference faces
        const rotate = [
            {},
            {
                x: TAU / 4,
            },
            {
                y: TAU / 4,
            },
            {
                y: (TAU * 3) / 4,
            },
            {
                x: (TAU * 3) / 4,
            },
            {
                x: TAU / 2,
            },
        ];


        // 初始雙方血量
        var aiHp = 100;
        var aiHp01 = aiHp + '%';

        var gamerHp = 100;
        var gamerHp01 = gamerHp + '%'

        $('#AiBlood').css('width',aiHp01);
        $('#GamerBlood').css('width',gamerHp01);
        
        // 擲骰子
        button.addEventListener('click', () => {
                var randomN = Math.floor(Math.random() * 10);
                var p_point = Math.floor(Math.random()*rotate.length);
            
                const randomItem = rotate[p_point];
                // console.log(p_point);
                anime({
                    targets: rotation,
                    // ! increment the input rotation with a random number of additional rotations
                    x: randomItem.x + TAU * randomN,
                    y: randomItem.y + TAU * randomN,
                    z: TAU * randomN,
                    duration: 1500,
                    // while the object is being updated update the rotation of the dice
                    // ! remember to update the graphic with the updateRenderGraph() method
                    update() {
                        dice.rotate.x = rotation.x;
                        dice.rotate.y = rotation.y;
                        dice.rotate.z = rotation.z;
                        illustration.updateRenderGraph();
                    }
                });

                // 電腦的骰子
                var diceImg = [];
                diceImg[0] = require("./image/dice_1.png");
                diceImg[1] = require("./image/dice_2.png");
                diceImg[2] = require("./image/dice_3.png");
                diceImg[3] = require("./image/dice_4.png");
                diceImg[4] = require("./image/dice_5.png");
                diceImg[5] = require("./image/dice_6.png");

                // var p = Math.floor(Math.random() * diceImg.length);
                // $('#p_diceImg').attr('src', diceImg[p]);

                var c_point = Math.floor(Math.random() * diceImg.length);
                $('#c_diceImg').attr('src', diceImg[c_point]);

                // 畫面延遲
                function delay(n) {
                    return new Promise(function (resolve) {
                        setTimeout(resolve,n*1000);
                    })
                }

                async function attacking() {
                    
                    // 判斷雙方骰子點數
                    if ( p_point > c_point) {
                        
                        await delay(0.5);
                        $('#p_card').addClass('p_win');
                        await delay(1);
                        $('#c_card').addClass('c_lose');
                        
                        // 扣血量 = 攻擊方攻擊力的0.3倍
                        var n1 = $('#p_card').find('#p_atk').html();
                        aiHp = aiHp - (n1 * 0.3);
                        aiHp01 = aiHp + '%';
    
                        await delay(1);
                        $('#AiBlood').css('width',aiHp01);

                        await delay(2);
                        // 淨空場地
                        $('.battleCard').empty();
                        $('#p_card').removeClass('p_win');
                        $('#c_card').removeClass('c_lose');

                    }else if(p_point < c_point) {
                        
                        await delay(0.5);
                        $('#c_card').addClass('c_win');
                        await delay(1);
                        $('#p_card').addClass('p_lose');

                        // 效果同上
                        var n2 = $('#c_card').find('#c_atk').html();
                        gamerHp = gamerHp - (n2 * 0.3);
                        gamerHp01 = gamerHp + '%';
                        
                        await delay(1);
                        $('#GamerBlood').css('width',gamerHp01);
                        
                        await delay(2);
                        $('.battleCard').empty();
                        $('#c_card').removeClass('c_win');
                        $('#p_card').removeClass('p_lose');
                    }

                    // 判斷輸贏 ----> 當場面無卡牌時，判斷剩餘血量
                    if (!$('#p1').html() & !$('#p2').html() & !$('#p3').html()
                        & !$('#p4').html() & !$('#p5').html()) {

                        if (!$('.battleCard').html()) {

                            if (gamerHp > aiHp) {

                                // 玩家贏
                                window.location.href = '/youwin';
                            }else if(gamerHp < aiHp){

                                // 玩家輸
                                window.location.href = '/youlose';
                            }
                        }
                    }

                    if (aiHp <= 0) {
                        // 玩家贏
                        window.location.href = '/youwin';
                    }else if (gamerHp <= 0) {
                        // 玩家輸
                        window.location.href = '/youlose';
                    }
                    
                    
                }
                attacking();
                
            }
        );


        
        // $('.computerCard').html(`<img src= ${pokeCard} alt=""/>`);

        // $('.playerCard').html(`<span><img src= ${require("./pokemonMaster/images/001.png")} alt=""/>妙蛙種子</span>`);

    }

    // 設定
    showModal = () => {
        $('#exampleModal').modal('show')
    }

    // 出牌
    doPlay=()=> {
        $('.playercard').on('click', function () {
            // 如果放牌區是空的，就把牌丟出去
            // if(!$('#p_card').html()){
            //     $('#p_card').html($(this).html());
            //     $(this).css('display','none').empty();
            // }

            // 讓電腦的出牌順序跟玩家一樣
            if (!$('#c_card').html() && !$('#p_card').html()) {
                switch(this.id) {
                    case "p1" :
                        $('#p_card').html($('#r1').html());
                        $(this).css('display','none').empty();
                        $('#c_card').html($('#h1').html());
                        $('#c1').css('display','none');
                        break;
                    case "p2" :
                        $('#p_card').html($('#r2').html());
                        $(this).css('display','none').empty();
                        $('#c_card').html($('#h2').html());
                        $('#c2').css('display','none');
                        break;
                    case "p3" :
                        $('#p_card').html($('#r3').html());
                        $(this).css('display','none').empty();
                        $('#c_card').html($('#h3').html());
                        $('#c3').css('display','none');
                        break;
                    case "p4" :
                        $('#p_card').html($('#r4').html());
                        $(this).css('display','none').empty();
                        $('#c_card').html($('#h4').html());
                        $('#c4').css('display','none');
                        break;
                    case "p5" :
                        $('#p_card').html($('#r5').html());
                        $(this).css('display','none').empty();
                        $('#c_card').html($('#h5').html());
                        $('#c5').css('display','none');
                        break;
                    default:
                }
            }
            
        });
    }

    render() {
        return (
            <div id="backGroundDiv" className='battlebody'>
                {/* <!-- 功能表單BUTTON --> */}
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                    id="modalbtn">
                    <FontAwesomeIcon icon={faGear} />
                </button>
                {/* <!-- 功能表單內容 --> */}
                <div className="modal fade " id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
                        <div className="modal-content">
                            <div className="modal-header d-block text-center">
                                <h5 className="modal-title" id="exampleModalLabel">功能</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <a href='/homePage' className="btn btn-outline-danger btn-block">退出遊戲</a><br />
                                <a href='/start'className="btn btn-outline-danger btn-block">重新開始</a>
                            </div>
                            <div className="modal-footer">
                                <div>
                                    <h4>操作說明</h4>
                                    <ol>
                                        <li>滑鼠移至卡牌可放大檢視資訊</li>
                                        <li>點擊送出卡牌</li>
                                        <li>完成出牌後，滑鼠點擊<mark>右側</mark>骰子擲骰</li>
                                    </ol>

                                </div>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">回到遊戲</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- AI資訊 --> */}
                <div className="row" id="AiInfo">
                    <div className="gamerInfo col-2">火箭隊</div>
                    <div className="col-9">
                        <div className="progress ">
                            <div className="progress-bar bg-danger "  role="progressbar" aria-valuenow="100"
                                aria-valuemin="0" aria-valuemax="100" id="AiBlood" ></div>
                        </div>
                    </div>

                </div>
                {/* <!-- 電腦牌組 --> */}
                <div id="computerplayer">
                    <div className="comcard" id='c1'></div>
                    <div className="comcard" id='c2'></div>
                    <div className="comcard" id='c3'></div>
                    <div className="comcard" id='c4'></div>
                    <div className="comcard" id='c5'></div>
                </div>

                <div id="computerplayer_h">
                    <div className="comcard_h" id='h1'></div>
                    <div className="comcard_h" id='h2'></div>
                    <div className="comcard_h" id='h3'></div>
                    <div className="comcard_h" id='h4'></div>
                    <div className="comcard_h" id='h5'></div>
                </div>
                {/* <!-- 對戰區 --> */}
                <div className="battleGround">
                    {/* <!-- 球球 --> */}
                    <img id="pokeball" src={pokeball} className="img-fluid" alt='' />
                    {/* <!-- 骰子 --> */}
                    <div className="dice " id="c_dice">
                        <img src={dice} alt="" className="img-fluid" id="c_diceImg"/>
                    </div>
                                     
                    <div id="p_dice" className='myMOUSE' style={{ position: "absolute" }}>
                        <canvas width="120" height="120" id='canvas'></canvas>
                    </div>

                    {/* <!-- 出牌區 --> */}
                    <div id="battleCardDiv">
                        <div className="battleCard" id='c_card'></div>
                        <div className="battleCard" id='p_card'></div>
                    </div>

                </div >

                {/* <!-- 下方玩家牌組 --> */}
                <div  id="gameplayer" >
                    <div className="playercard myMOUSE" id="p1" onClick={this.doPlay}></div>
                    <div className="playercard myMOUSE" id="p2" onClick={this.doPlay}></div>
                    <div className="playercard myMOUSE" id="p3" onClick={this.doPlay}></div>
                    <div className="playercard myMOUSE" id="p4" onClick={this.doPlay}></div>
                    <div className="playercard myMOUSE" id="p5" onClick={this.doPlay}></div>
                </div >

                <div div id="gameplayer_r" >
                    <div className="playercard_r" id="r1"></div>
                    <div className="playercard_r" id="r2"></div>
                    <div className="playercard_r" id="r3"></div>
                    <div className="playercard_r" id="r4"></div>
                    <div className="playercard_r" id="r5"></div>
                </div >


                {/* <!-- 玩家資訊 --> */}
                < div className="row" id="GamerInfo" >

                    {/* <!-- 玩家名稱 --> */}
                    {this.state.member.map((item)=>(
                        < div className="gamerInfo col-2 " >
                            
                            玩家: <img src={item.head} alt="" /> 
                            {item.account}
                        </div >
                    ))}
                    
                    {/* <!-- 玩家血條 --> */}
                    <div div className="col-9" >
                        <div className="progress">
                            <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="100"
                                aria-valuemin="0" aria-valuemax="100" id="GamerBlood"></div>
                        </div>
                    </div>


                </div >

            </div >
        );
    }
}

export default battlepage;