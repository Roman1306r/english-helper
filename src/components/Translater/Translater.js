import {useState, useId } from "react"
import { translate } from "../../utils/api"
import { MdKeyboardAlt } from "react-icons/md";
import { SiGoogletranslate } from "react-icons/si";
import { BiLoader  } from "react-icons/bi";
import { IoMdSwap } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import { back, copy, reverseTranslater } from "../../utils/utils";
import { IoMdArrowRoundForward } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { click, right, wrong } from "../../utils/audio";




const Translater = ({setTranslateMode}) => {
    const [value, setValue] = useState('')
    const [translated, setTranslated] = useState('')
    const [load, setLoad] = useState(false)
    const [middleWare, setMiddleWare] = useState({})
    const [isReversed, setIsReversed] = useState(false)
    const [ok, setOk] = useState(false)
    const fTA = useId()
    const sTA = useId()





    async function translateText(event) {
        event.preventDefault()
        setTranslated('')
        setLoad(true)
        try {
            if(value) {
                let [response] = await translate(value, isReversed)
                setTranslated(response.translatedText)
                setMiddleWare({value, translated: response.translatedText})
                right.play()
            } else {
                setTranslated('The field of input empty ...')
                setTimeout(() => setTranslated(''), 2500)
                wrong.play()
            }
            console.clear();
        } catch (error) {
            wrong.play()
            // Error handling is already in the api.js file
        } finally {
            setTimeout(() => setLoad(false), 1000)
        }
    }





    return <div className="settings translater">
                <a className="back" href="#" onClick={() => back(setTranslateMode)}>&times;</a>
                <h2>Translater</h2>
                <div className="translater__btns ">
                        <button title="check limit"><a onClick={() => click.play()} style={{display: 'flex'}} target="_blank" href="https://rapidapi.com/"><FaEye /></a></button>
                        <button onClick={() => reverseTranslater(setIsReversed, setValue, setTranslated, middleWare)} title="Swap" ><IoMdSwap /></button>
                        <button onClick={() => copy(translated, setOk)} title="Copy" ><FaCopy /></button>
                </div>
                <div className="translater__container">
                    <div className="translater__column">
                        <label htmlFor={fTA}>{isReversed ? 'Russian' : 'English'}</label>
                        <MdKeyboardAlt className="editor__field-icon ta" />
                        <textarea
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                            id={fTA}
                            autoFocus
                            name="request"
                            rows={6}
                            cols={40}
                            maxLength={5000}
                        />
                    </div>
                    <IoMdArrowRoundForward className="translator__middlearrow" style={{marginTop: '50px', fontSize: '30px'}} />
                    <div className="translater__column">
                        <label htmlFor={sTA}>{isReversed ? 'English' : 'Russian'}</label>
                        {ok ? <FaCircleCheck className="editor__field-icon ta" /> : <SiGoogletranslate className="editor__field-icon ta" />}

                        <textarea
                            id={sTA}
                            name="answer"
                            rows={6}
                            cols={40}
                            readOnly
                            value={translated}
                        />
                    </div>
                </div>
                <button className="editor__allow" onClick={translateText}>{load ? <BiLoader className="editor__loader" /> : <SiGoogletranslate />} translate</button>

    </div>

}

export default Translater