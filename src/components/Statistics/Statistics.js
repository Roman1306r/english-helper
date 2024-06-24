import { useEffect, useState } from "react"
import { FaSmile } from "react-icons/fa";
import { TbMoodConfuzedFilled } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { BsRepeat } from "react-icons/bs";
import { FaPencilRuler } from "react-icons/fa";
import { SiReadthedocs } from "react-icons/si";
import Incorrect from "../Incorrect/Incorrect";
import { GrClose } from "react-icons/gr";
import { click, wrong, winner } from "../../utils/audio";


const Statistics = ({statistics, setTestMode, setStatistics, setEditMode, setSettings, again, setIsRus, incorrect, isRus}) => {

    const [mistakes, setMistakes] = useState(false)
    const [note, setNote] = useState(false)
 
    useEffect(() => {
        setStatistics({
            correct: statistics.correct - statistics.incorrect,
            incorrect: statistics.incorrect
        })
        statistics.incorrect > 1 ? wrong.play() : winner.play()
    }, [])
    const goToSettings = () => {
        setTestMode(false)
        setIsRus(false)
        setSettings(true)
        click.play()
    }
    const goToEditor = () => {
        setTestMode(false)
        setEditMode(true)
        setIsRus(false)
        click.play()
    }
    function close() {
        setTestMode(false)
        setIsRus(false)
        click.play()
    }
    const showMistakes = () => {
        if(incorrect.length < 1){
            setNote(true)
            setTimeout(() => setNote(false), 2000)
            alert("You're great, no mistakes!")
            wrong.play()
        } else {
            click.play()
            setMistakes(true)
        }   
    }


    return <div className="statistics">
                {mistakes 
                ? <Incorrect isRus={isRus} incorrect={incorrect} setMistakes={setMistakes} />
                : <>
                    <a className="back" href="#" onClick={close}>&times;</a>
                    <h2>{statistics.incorrect > 1 ? <><TbMoodConfuzedFilled style={{color: '#5f3030'}} /> Failed</> : <><FaSmile style={{color: '#00a889'}} /> Passed</>}</h2>
                    <p style={{color: '#00a889'}}>Correct: {statistics.correct}</p>
                    <p style={{color: '#5f3030'}}>Incorrect: {statistics.incorrect}</p>
                    <div className="statistics__btn">
                        <button title="Open settings" onClick={goToSettings}><FiSettings /></button>
                        <button title="Start text again" onClick={() => again()}><BsRepeat /></button>
                        <button title="Open  editor" onClick={goToEditor}><FaPencilRuler /></button>
                        <button title="Show mistakes" onClick={showMistakes}>{note ? <GrClose /> : <SiReadthedocs /> } </button>
                    </div>
                </>
                }
                
            </div>

}

export default Statistics