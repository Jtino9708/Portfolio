import React, { Component } from 'react';
import Axios from 'axios';
import './css/lose.css';
// import anime from'https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js';
import $ from "jquery";
import anime from "animejs/lib/anime.es.js"


class losepage extends Component {
    state = {}

componentDidMount(){
    // Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.ml3',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
}


    render() {
        return (
            <div class="row" id='losebody'>
                
                <div class="col-7">
                    <h1 className="yellowword mt-3" >Card Battle</h1>
                
                    <h1 class="ml3">DEFEAT</h1>

                    <div class="d-flex justify-content-center" id="btns">
                    <a href="/start" className="btn btn-outline-dark btn-lg resultbtn " >再來一場</a>
                        <a href="/homepage" className="btn btn-outline-dark btn-lg resultbtn">回到首頁</a>
                    </div>

                </div>
                <div class="col-5">                </div>


            </div>
        );
    }
}

export default losepage;
