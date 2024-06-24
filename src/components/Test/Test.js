import { useEffect, useRef, useState } from "react";
import PopUp from "../PopUp/PopUp";
import { TbShieldCheckFilled } from "react-icons/tb";
import Welcome from "../Welcome/Welcome";
import Statistics from "../Statistics/Statistics";
import {getRandomWordOutBase, chooiseAnswer, getRightAndWrongAnswer} from "../../utils/utils";
import { click, right, wrong } from "../../utils/audio";


const Test = ({setTestMode, words, countQuestions, setCountQuestions, setSettings, setEditMode, setIsRus, isRus}) => {


    const [welcome, setWelcome] = useState(true)
    const [isEndTest, setIsEndTest] = useState(false)
    const [statistics, setStatistics] = useState({isRepeat: false, correct: 0, incorrect: 0})
    const [englishWord, setEnglishWord] = useState({})
    const [arrayAnswers, setArrayAnswers] = useState([])
    const [chooised, setChooised] = useState(null)
    const [count, setCount] = useState(0)
    const [popUp, setPopUp] = useState({status: false, isRight: false})
    const [incorrect, setIncorrect] = useState([])
    const containerBtns = useRef(null)
    


    useEffect(() => {
        if(count > 0) {
            setArrayAnswers(s => { 
                s.splice(Math.floor(Math.random() * 4), 1, englishWord)
                return [...s]
            })
        }  
    }, [count])


    function start() {
      if(count === 0) click.play()   
      let foundedWord = getRandomWordOutBase(words)
      setEnglishWord(foundedWord)
      setWelcome(false)
      getRightAndWrongAnswer(foundedWord, words, setArrayAnswers)
      setCount(count => count += 1)
    }


    function checkTranslete(event) {
        event.preventDefault()
        if(count > countQuestions - 1 && chooised === englishWord._id) {
            setStatistics({isRepeat: false, correct: 0, incorrect: 0 })
            setIsEndTest(true)        
        }
        if(chooised === englishWord._id) {
            if(count < countQuestions) right.play()
            setStatistics({...statistics, isRepeat: false, correct: statistics.correct += 1})
            if(count !== countQuestions) setPopUp({status: true, isRight: true})
            setEnglishWord({})
            setArrayAnswers([])
            setChooised(null)
            Array.from(containerBtns.current.children).forEach(item => item.className = '')
            start()
        } else if (chooised == null) {
            click.play()
            return           
        } else {
            wrong.play()
            setPopUp({status: true, isRight: false})
            let incorrectItem = Array.from(containerBtns.current.children).find(item => item.getAttribute('id')  == chooised)
            incorrectItem.setAttribute('style', "background-color: #992626; box-shadow: 0px 1px #992626")
            if(!statistics.isRepeat) {
                setStatistics({...statistics, isRepeat: true, incorrect: statistics.incorrect += 1})
                setIncorrect([...incorrect, [words.find(o => o._id === englishWord._id), words.find(o => o._id === chooised)]])
            } 
            setTimeout(() => incorrectItem.removeAttribute('style'), 1000)
        }
        setTimeout(() => setPopUp({status: false, isRight: false}), 1000)
    }
    function again() {
        click.play()
        setIsEndTest(false)
        setStatistics({isRepeat: false, correct: 0, incorrect: 0 })
        setEnglishWord({})
        setArrayAnswers([])
        setChooised(null)
        setCount(0)
        setPopUp({status: false, isRight: false})
        setWelcome(true)
        setIncorrect([])
    }

  
    

    return <div className="test">
               {popUp.status && <PopUp popUp={popUp}  />} 
                {welcome && <Welcome isRus={isRus} setIsRus={setIsRus} start={start} setTestMode={setTestMode} countQuestions={countQuestions} setCountQuestions={setCountQuestions} />}
                {isEndTest && <Statistics isRus={isRus} incorrect={incorrect} setIsRus={setIsRus} again={again} setEditMode={setEditMode} setSettings={setSettings} statistics={statistics} setTestMode={setTestMode} setStatistics={setStatistics} />}
                
                <div className="test__counter"><span>{count}</span> | <span>{countQuestions}</span></div>
                <h1>{isRus ? englishWord.rus : englishWord.eng}</h1>
                <div ref={containerBtns} className="test__fields">
                    {arrayAnswers.map(ans => <button onClick={event => chooiseAnswer(event, setChooised)} id={ans._id} key={ans._id}>{!isRus ? ans.rus : ans.eng}</button>)}
                </div>
                <button onClick={(event) => checkTranslete(event)} className="test__allow"><TbShieldCheckFilled />  Check</button>
           </div>
}

export default Test;