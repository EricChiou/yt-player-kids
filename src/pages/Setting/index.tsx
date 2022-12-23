import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import System from '@/store/system';
import Routes from '@/constants/routes';
import LockIcon from '@/icon/Lock';
import Clear from '@/icon/Clear';
import Check from '@/icon/Check';
import Back from '@/icon/Back';

import calico from '@/assets/images/calico.png';
import moomoo from '@/assets/images/moomoo.png';
import styles from './index.module.scss';
import Message from '@/components/Message';

const Lock: React.FC = () => {
  const buttonClass = 'inline-block m-0.5 w-12 h-12 bg-gray align-middle zoom-in-2';
  const navigate = useNavigate();
  const [showSetting, setShowSetting] = useState(!System.Get().lock);
  const [errorMsgCountDown, setErrorMsgCountDown] = useState(0);
  const [watchTime, setWatchTime] = useState(System.Get().prevTimer);
  const [question, setQuestion] = useState({
    firstNumber: 0,
    secondNumber: 0,
  });
  const [answer, setAnswer] = useState<{ firstNumber?: number, secondNumber?: number }>({});

  useLayoutEffect(() => setNewQuestion(), []);

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      setErrorMsgCountDown((countDown) => countDown > 0 ? countDown - 1 : countDown);
    }, 1000);

    return () => clearInterval(countDownInterval);
  }, []);

  function setNewQuestion() {
    const random = Math.floor(Math.random() * 100);
    let firstNumber = Math.floor(random / 10);
    let secondNumber = random % 10;
    firstNumber = firstNumber < 2 ? 2 : firstNumber;
    secondNumber = secondNumber < 2 ? 2 : secondNumber;
    setQuestion({ firstNumber, secondNumber });
  }

  function setNewAnswer(number: number) {
    answer.firstNumber !== undefined ?
      setAnswer({ firstNumber: answer.firstNumber, secondNumber: number }) :
      setAnswer({ firstNumber: number, secondNumber: answer.secondNumber });
  }

  function checkAnswer() {
    const ans = Number(`${answer.firstNumber ?? ''}${answer.secondNumber ?? ''}`);
    if (ans === question.firstNumber * question.secondNumber) {
      System.SetPrevTimer(watchTime);
      System.SetTimer(watchTime * 60 || -1);
      System.SetLock(false);
      navigate(Routes.HOME);
    } else {
      setErrorMsgCountDown(3);
      setNewQuestion();
    }
  }

  function back2Home() { navigate(Routes.HOME); }

  return (<>
    <div className="h-screen text-white text-center bg-red">
      {showSetting ? <>
        <div className="pt-20">
          <div>設定觀看時間： {watchTime} 分鐘</div>
          <input
            className={styles.slider}
            type="range"
            min="0"
            max="120"
            value={watchTime}
            onChange={(e) => setWatchTime(Number(e.target.value))}
          ></input>
        </div>
        <div className="p-4">
          <span>{question.firstNumber} X {question.secondNumber} =</span>
          &nbsp;<span className="underline">{answer.firstNumber ?? '_'}</span>
          &nbsp;<span className="underline">{answer.secondNumber ?? '_'}</span>
        </div>
        <div className="text-black">
          <button className={buttonClass} onClick={() => setNewAnswer(1)}>1</button>
          <button className={buttonClass} onClick={() => setNewAnswer(2)}>2</button>
          <button className={buttonClass} onClick={() => setNewAnswer(3)}>3</button>
          <br></br>
          <button className={buttonClass} onClick={() => setNewAnswer(4)}>4</button>
          <button className={buttonClass} onClick={() => setNewAnswer(5)}>5</button>
          <button className={buttonClass} onClick={() => setNewAnswer(6)}>6</button>
          <br></br>
          <button className={buttonClass} onClick={() => setNewAnswer(7)}>7</button>
          <button className={buttonClass} onClick={() => setNewAnswer(8)}>8</button>
          <button className={buttonClass} onClick={() => setNewAnswer(9)}>9</button>
          <br></br>
          <button className={buttonClass} onClick={() => setAnswer({})}>
            <Clear className="inline"></Clear>
          </button>
          <button className={buttonClass} onClick={() => setNewAnswer(0)}>0</button>
          <button className={buttonClass} onClick={checkAnswer}>
            <Check className="inline"></Check>
          </button>
        </div>
        <div className="mb-2 h-6">{errorMsgCountDown ? '答案錯囉！' : null}</div>
        <div>
          {!System.Get().lock ?
            <button className="px-4 py-1 text-black bg-gray rounded-full zoom-in-2" onClick={back2Home}>取消</button> :
            null
          }
        </div>
      </> : <>
        <div className="inline-block h-[calc(100%-2rem)] align-middle"></div>
        <img className={`${styles.animation} inline-block align-middle`} src={moomoo}></img>
        <img className={`${styles.animationReverse} inline-block align-middle`} src={calico}></img>
        <div>
          時間到囉！
          <button className="float-right p-1" onClick={() => setShowSetting(true)}>
            <LockIcon></LockIcon>
          </button>
        </div>
      </>}
      {!System.Get().lock ?
        <button className="fixed top-0 left-0 p-1" onClick={back2Home}>
          <Back></Back>
        </button> :
        null
      }
    </div>
  </>);
};

export default Lock;
