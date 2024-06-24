import { useState } from "react";
import enter from './../../assets/enter.gif'
import exit from './../../assets/exit.gif'
import Admin from "./Admin";



const Sidebar = ({setIsAuth, isAuth, length, setEditMode, setAdmin, admin, click}) => {

    const [show, setIsShow] = useState(false)
    function exitFn() {
        setIsAuth(false)
        setAdmin({})
        click.play()
    }
    function singIn() {
        setEditMode(true)
        click.play()
    }

    return <div className="sidebar">
                <div onMouseOver={() => setIsShow(true)} onMouseOut={() => setIsShow(false)} className="sidebar__auth">
                    <div className="sidebar__icon">
                        <img src={!isAuth ? enter : exit} alt="login" />
                    </div>
                    {show && <div className="sidebar__popup">
                        <p style={{borderBottom: '1px solid grey', padding: '10px 0', margin: '10px 0'}}>{isAuth ? <Admin admin={admin} length={length} /> : 'You are not authorized, please log in!'}</p>
                        {!isAuth 
                        ? <button onClick={singIn} className="sidebar__btn">enter</button>
                        : <button onClick={exitFn} className="sidebar__btn">exit</button>}
                    </div>}  
                </div>
                <div className="sidebar__string">
                    <p>
                        {isAuth ?  `Hi, ${admin.login}. Your MongoDB contain ${length} words. You can add new words with help 'editor'.` : "Hi, you can add new words. Sing in or write developer project."}
                    </p>
                </div>            
            </div>
    
}

export default Sidebar;