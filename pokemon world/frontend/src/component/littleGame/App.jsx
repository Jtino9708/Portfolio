import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import axios from "axios";
import Cookies from 'universal-cookie'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
const cookies = new Cookies();


function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$ 0");
  
  const data = [
    {
      id: 1,
      question: <div className="dark">誰是<img src="./art/Dark.webp" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/015.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/248.png" height="100px"></img>,
          correct: true,
        },
        {
          text: <img src="./pokemon/020.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/022.png" height="100px"></img>,
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: <div className="dark">誰是<img src="./art/Dragon.webp" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/149.png" height="100px"></img>,
          correct: true,
        },
        {
          text: <img src="./pokemon/006.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/009.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/034.png" height="100px"></img>,
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: <div className="dark">誰是<img src="./art/Electric.webp" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/028.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/870.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/867.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/025.png" height="100px"></img>,
          correct: true,
        },
      ],
    },
    {
      id: 4,
      question: <div className="dark">誰是<img src="./art/Fairy.webp" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/872.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/878.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/869.png" height="100px"></img>,
          correct: true,
        },
        {
          text: <img src="./pokemon/891.png" height="100px"></img>,
          correct: false,
        },
      ],
    },
    {
      id: 5,
      question: <div className="dark">誰是<img src="./art/Fighting.webp" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/853.png" height="100px"></img>,
          correct: true,
        },
        {
          text: <img src="./pokemon/849.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/843.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/839.png" height="100px"></img>,
          correct: false,
        },
      ],
    },
    {
      id: 6,
      question: <div className="dark">誰是<img src="./art/Fire.webp" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/823.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/828.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/836.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/815.png" height="100px"></img>,
          correct: true,
        },
      ],
    },
    {
      id: 7,
      question: <div className="dark">誰是<img src="./art/Flying.webp" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/754.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/741.png" height="100px"></img>,
          correct: true,
        },
        {
          text: <img src="./pokemon/780.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/778.png" height="100px"></img>,
          correct: false,
        },
      ],
    },
    {
      id: 8,
      question: <div className="dark">誰是<img src="./art/Ghost.webp" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/727.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/738.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/732.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/724.png" height="100px"></img>,
          correct: true,
        },
      ],
    },
    {
      id: 9,
      question: <div className="dark">誰是<img src="./art/Grass.webp" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/713.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/711.png" height="100px"></img>,
          correct: true,
        },
        {
          text: <img src="./pokemon/719.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/721.png" height="100px"></img>,
          correct: false,
        },
      ],
    },
    {
      id: 10,
      question: <div className="dark">誰是<img src="./art/images.jpg" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/697.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/669.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/665.png" height="100px"></img>,
          correct: true,
        },
        {
          text: <img src="./pokemon/700.png" height="100px"></img>,
          correct: false,
        },
      ],
    },
    {
      id: 11,
      question: <div className="dark">誰是<img src="./art/Normal.webp" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/647.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/654.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/660.png" height="100px"></img>,
          correct: true,
        },
        {
          text: <img src="./pokemon/658.png" height="100px"></img>,
          correct: false,
        },
      ],
    },
    {
      id: 12,
      question: <div className="dark">誰是<img src="./art/poison.webp" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/590.png" height="100px"></img>,
          correct: true,
        },
        {
          text: <img src="./pokemon/630.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/632.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/641.png" height="100px"></img>,
          correct: false,
        },
      ],
    },
    {
      id: 13,
      question: <div className="dark">誰是<img src="./art/psychic.webp" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/586.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/584.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/573.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/579.png" height="100px"></img>,
          correct: true,
        },
      ],
    },
    {
      id: 14,
      question: <div className="dark">誰是<img src="./art/Rock.webp" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/563.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/571.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/567.png" height="100px"></img>,
          correct: true,
        },
        {
          text: <img src="./pokemon/569.png" height="100px"></img>,
          correct: false,
        },
      ],
    },
    {
      id: 15,
      question: <div className="dark">誰是<img src="./art/Water.webp" height="70px"></img></div>,
      answers: [
        {
          text: <img src="./pokemon/539.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/553.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/555.png" height="100px"></img>,
          correct: false,
        },
        {
          text: <img src="./pokemon/536.png" height="100px"></img>,
          correct: true,
        },
      ],
    },

  ];
  
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1,000" },
        { id: 6, amount: "$ 2,000" },
        { id: 7, amount: "$ 4,000" },
        { id: 8, amount: "$ 8,000" },
        { id: 9, amount: "$ 16,000" },
        { id: 10, amount: "$ 32,000" },
        { id: 11, amount: "$ 64,000" },
        { id: 12, amount: "$ 125,000" },
        { id: 13, amount: "$ 250,000" },
        { id: 14, amount: "$ 500,000" },
        { id: 15, amount: "$ 1,000,000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);




  return (
    <div className="app">
        <img className="title" src="./title.png" alt="title"></img>
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">You earned: {earned} <button type="bottun" className="btn btn-primary" onClick={async()=>{
                if(cookies.get('token')){
                  var tamp = '';
                  earned.split(' ')[1].split(',').map((val)=>{tamp+=val})
                  var addPoint = parseInt(tamp);
                  await axios.post("http://127.0.0.1:8000/api/updatePoint",{
                    'id':`${base64_decode(cookies.get('token'))}`,
                    "addPoint":addPoint
                  })
                  return window.location = "/homePage"
                }else{
                  return window.location = "/homePage"
                }
              }}>返回首頁</button></h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;