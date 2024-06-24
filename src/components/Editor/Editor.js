import { useState } from "react";
import { LuPenLine } from "react-icons/lu";
import { BsDatabaseFill  } from "react-icons/bs";
import { BiLoader  } from "react-icons/bi";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { BsDatabaseFillCheck   } from "react-icons/bs";
import Auth from "../Auth/Auth";
import { back } from "../../utils/utils";
import { right, wrong } from "../../utils/audio";


const Editor = ({setEditMode, setIsAuth, isAuth, setAdmin}) => {

    const [eng, setEng] = useState('')
    const [rus, setRus] = useState('')
    const [load, setLoad] = useState(false)
    const [isOk, setIsOk] = useState(false)

   




    async function submitFormWithNewWord(event) {
        event.preventDefault()
        setLoad(true)
        try {
            if(eng.length >= 1 && rus.length >= 1 && typeof eng === 'string' && typeof rus === 'string') {
                let result = await fetch(
                    'http://localhost:5000/register', {
                        method: "post",
                        body: JSON.stringify({rus, eng}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                result = await result.json();
                if (result) {
                    setTimeout(() => setLoad(false))
                    setIsOk(true)
                    setEng("");
                    setRus("");
                    right.play()
                    setTimeout(() => setIsOk(false), 1500)
                } 
            } else {
                wrong.play()
            }
            setTimeout(() => setLoad(false), 2500)
        } catch (e) {
            wrong.play()
            console.log(`Check backend server or VPN: ${e}`)
            setTimeout(() => setLoad(false), 2500)
        }
    }





    return <>
        {!isAuth
            ? <Auth setAdmin={setAdmin} setEditMode={setEditMode} setIsAuth={setIsAuth} isAuth={isAuth} />
            : <form onSubmit={event => submitFormWithNewWord(event)} className="editor">
                <a className="back" href="#" onClick={() => back(setEditMode)}>&times;</a>
                <p>Please enter the English word and its translation below</p>
                <div className="editor__fields">
                    <div className="editor__field">
                        <LuPenLine className="editor__field-icon"/>
                        <input autoFocus value={eng} onChange={(event) => setEng(event.target.value)}
                               placeholder="english"/>
                    </div>
                    <div className="editor__field">
                        <LuPenLine className="editor__field-icon"/>
                        <input value={rus} onChange={(event) => setRus(event.target.value)} placeholder="russian"/>
                    </div>
                </div>
                {isOk && <><RiArrowDownDoubleFill className="editor__ok"/><BsDatabaseFillCheck className="database" /></>}
                <button className="editor__allow">{load ?  <BiLoader className="editor__loader" /> : <BsDatabaseFill />}  add to Database</button>
            </form>
            }
        </>

}

export default Editor;