import { useState } from "react";
import {BiLoader} from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { IoIosPerson } from "react-icons/io";
import { MdKey } from "react-icons/md";
import { back } from "../../utils/utils";
import { right, wrong } from "../../utils/audio";


const Auth = ({setIsAuth, setAdmin, setEditMode}) => {


    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [load, setLoad] = useState(false)
    const [isError, setIsError] = useState(false)



    async function auth() {
        try {
            if(login.length >= 1 && password.length >= 1) {
                let result = await fetch(
                    'http://localhost:5000/auth', {
                        method: "get",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                result = await result.json()
                return result
            }
        } catch (e) {
            console.log(`Start your backend server... ${e}`)
        }
    }
    async function singIn(event) {
        event.preventDefault()
        setLoad(true)
        try {
            let [data] = await auth()
            let loginDB = data.login
            let passwordDB = data.password
            if(password === passwordDB && login === loginDB) {
                setIsAuth(true)
                setAdmin(data)
                setLogin('')
                setPassword('')
                setIsError(false)
                right.play()
            } else {
                setIsError(true)
                setLogin('')
                setPassword('')
                wrong.play()
            }
            setTimeout(() => setLoad(false), 1500)
        } catch (e) {
            wrong.play()
            console.log(e)
            setTimeout(() => setLoad(false), 1500)
        }
    }




    return <>
        <form onSubmit={singIn} className="editor">
            <a className="back" href="#" onClick={() => back(setEditMode)}>&times;</a>
            <p className={isError ? 'error' : ''}>{isError ? 'INCORRECT PASSWORD OR LOGIN' : 'ADMINISTRATOR ACCOUNT'}</p>
            <div className="editor__fields">
                <div className="editor__field">
                    <IoIosPerson className="editor__field-icon"/>
                    <input autoFocus value={login} onChange={(event) => setLogin(event.target.value)}
                           placeholder="login"/>
                </div>
                <div className="editor__field">
                    <MdKey className="editor__field-icon"/>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="password"/>
                </div>
            </div>
            <button className="editor__allow">{load ? <BiLoader className="editor__loader" /> : <CiLogin />} sign in</button>
        </form>
    </>

}

export default Auth;