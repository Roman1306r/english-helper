import './App.css';
import React, { useEffect, useState } from 'react';
import Editor from './components/Editor/Editor';
import Test from './components/Test/Test';
import Settings from './components/Settings/Settings';
import Loader from './components/Loader/Loader';
import Footer from "./components/Footer/Footer";
import ErrorPage from './components/ErrorPage/ErrorPage';
import Sidebar from './components/Sidebar/Sidebar';
import Translater from './components/Translater/Translater';
import { click, music, muted, loud } from './utils/audio';
import { open } from './utils/utils';
import CloseWindow from './components/CloseWindow/CloseWindow';
import { spareWords } from './data/data';




function App() {
  const [words, setWords] = useState([])
  const [isLoad, setIsLoad] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [settings, setSettings] = useState(false)
  const [testMode, setTestMode] = useState(false)
  const [translateMode, setTranslateMode] = useState(false)
  const [countQuestions, setCountQuestions] = useState(10)
  const [darkMode, setDarkMode] = useState(true)
  const [isRus, setIsRus] = useState(false)
  const [isMusic, setIsMusic] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [admin, setAdmin] = useState({})
  const [notifications, setNotifications] = useState(true)
  const [closeWindow, setCloseWindow] = useState(false)



  useEffect(() => {
      setTimeout(() => setIsLoad(false), 3000)
      document.addEventListener('keyup', (event) =>  event.key === 'Escape' && setCloseWindow(true))
  }, [])
  useEffect(() => {
      const getWords = async (e) => {
          try {
              let result = await fetch(
                  'http://localhost:5000/', {
                      method: "get",
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  })
              result = await result.json()
              setWords(result)
              localStorage.setItem('words', JSON.stringify(result))
          } catch (e) {
              setWords(JSON.parse(localStorage.getItem('words')))
              if(!localStorage.getItem('words')) setWords(spareWords)
              console.log(`Start your backend server... ${e}`)
          }
      }
      getWords()
  }, [editMode])
  const openRussianTest = () => {
        click.play()
      setIsRus(true)
      setTestMode(true)
  }
  function governMusic(event) {
    setIsMusic(event.target.checked)
    if(music.paused) {
        console.log('Music started...');
        music.loop = true
        music.volume = 0.5
        music.play()
    } else {
        music.pause()
    }
  }
  function governNotifications(event) {
    setNotifications(event.target.checked)
    if(notifications) {
        muted()
    } else {
        loud()
    }
}

  return !!words ? <div className={darkMode ? "App" : "App light"}>
                        <Sidebar click={click} admin={admin} setAdmin={setAdmin} setEditMode={setEditMode} length={words.length} setIsAuth={setIsAuth} isAuth={isAuth} />
                        <span className='App__link' onClick={() => open(setTestMode)} >Eng-Rus</span>
                        <span className='App__link' onClick={openRussianTest} >Rus-Eng</span>
                        <span className='App__link' onClick={() => open(setEditMode)} >Editor</span>
                        <span className='App__link' onClick={() => open(setTranslateMode)} >Translater</span>
                        <span className='App__link' onClick={() => open(setSettings)}  >Settings</span>


                        {closeWindow && <CloseWindow setCloseWindow={setCloseWindow} />}
                        {isLoad  && <Loader /> }
                        {editMode && <Editor setAdmin={setAdmin} setIsAuth={setIsAuth} isAuth={isAuth} setEditMode={setEditMode} />}
                        {translateMode && <Translater setTranslateMode={setTranslateMode} />}
                        {testMode && <Test setIsRus={setIsRus} isRus={isRus} setSettings={setSettings}  words={words} setEditMode={setEditMode}  setTestMode={setTestMode} countQuestions={countQuestions} setCountQuestions={setCountQuestions} />}
                        {settings && <Settings governNotifications={governNotifications} notifications={notifications} music={music} governMusic={governMusic} isMusic={isMusic} setIsMusic={setIsMusic} words={words} setDarkMode={setDarkMode} darkMode={darkMode} setSettings={setSettings} />}
                        <Footer />
                    </div> : <ErrorPage setEditMode={setEditMode} />
}
export default App;
