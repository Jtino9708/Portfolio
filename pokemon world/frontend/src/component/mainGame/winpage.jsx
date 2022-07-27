import React, { Component } from 'react';
import Axios from 'axios';
import './css/win.css'
// import anime from 'https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js';
import $ from "jquery";
import anime from "animejs/lib/anime.es.js"


class winpage extends Component {
    state = {}
    componentDidMount() {

        var ml4 = {};
        ml4.opacityIn = [0, 1];
        ml4.scaleIn = [0.2, 1];
        ml4.scaleOut = 3;
        ml4.durationIn = 800;
        ml4.durationOut = 600;
        ml4.delay = 500;

        anime.timeline({ loop: true })
            .add({
                targets: '.ml4 .letters-1',
                opacity: ml4.opacityIn,
                scale: ml4.scaleIn,
                duration: ml4.durationIn
            }).add({
                targets: '.ml4 .letters-1',
                opacity: 0,
                scale: ml4.scaleOut,
                duration: ml4.durationOut,
                easing: "easeInExpo",
                delay: ml4.delay
            }).add({
                targets: '.ml4',
                opacity: 0,
                duration: 500,
                delay: 500
            });


    }





    render() {
        return (
            <div class="row" id='winbody'>

                <div class="col-7">
                    <h1 className="yellowword mt-3" >Card Battle</h1>

                    <h1 class="ml4">
                        <span class="letters letters-1">VICTORY</span>
                    </h1>

                    <div class="d-flex justify-content-center" id="btns">
                        <a href="/start" className="btn btn-outline-dark btn-lg resultbtn " >再來一場</a>
                        <a href="/homepage" className="btn btn-outline-dark btn-lg resultbtn">回到首頁</a>
                    </div>

                </div>
                <div class="col-5"></div>



            </div>
        );
    }
}

export default winpage;