import React, { Component } from 'react';
import Axios from 'axios';
import './css/start.css';
import $ from "jquery";
import anime from "animejs/lib/anime.es.js"
import Cookies from 'universal-cookie'

const cookies = new Cookies();


class startpage extends Component {
    state = {}
    componentDidMount() {


        $('#rule').on('click', function () {
            $('#exampleModal').modal("show");
        })

        // Wrap every letter in a span
        var textWrapper = document.querySelector('.ml2');
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline()
            .add({
                targets: '.ml2 .letter',
                translateX: [40, 0],
                translateZ: 0,
                opacity: [0, 1],
                easing: "easeOutExpo",
                duration: 1200,
                delay: (el, i) => 500 + 150 * i
            })

    }

    isLogin() {
        if (cookies.get('token')) {
            return (
                <div>
                    <a href='/member' className="btn btn-outline-warning m-2">編輯隊伍</a>
                </div>
            )
        }
    }

    checkLogin() {
        if (cookies.get('token')) {
            window.location.href = "/battle";
        }else{
            alert("尚未登入");
            window.location.href = "/login";
        }
    }

    render() {
        return (
            <div>
                <audio src='audio/Title_Screen.mp3' autoPlay loop></audio>
                {/* <!-- 主畫面 --> */}
                <div className="pt-4" id="startbody">
                    <h1 className="yellowword" >PoKéMoN</h1>
                    <h1 className="ml2">
                        CARD BATTLE
                    </h1>
                    <br /><br /><br />
                    <div>
                        <a href="#" id="start" onClick={this.checkLogin}>
                            Game Start
                        </a>
                        <br /><br />
                    </div>
                    <br /><br />

                    <div class="d-flex justify-content-center" id="btns">
                        <div href="#" id="rule" className='btn btn-warning m-2' role="button" aria-pressed="true">
                            遊戲說明

                        </div>
                        
                       {this.isLogin()}
                    </div>


                    <div>

                    </div>

                    {/* <!-- 說明modal --> */}
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">規則說明</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body" id="mlbody">
                                    遊戲開始前，玩家可至會員中心編輯出戰隊伍
                                    <li>遊戲開始時，雙方各有五張手牌</li>
                                    <li>在每一回合中，玩家選定手牌後，點擊送出</li>
                                    <li>完成出牌後，再點擊骰子擲骰</li>
                                    <li>骰子點數大的一方即可獲得攻擊權，攻擊力取決於選出的卡牌</li>
                                    <li>攻擊完成後，新回合開始</li>
                                    <li>五回合結束後，血量剩餘較高者即為勝利。</li>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default startpage;