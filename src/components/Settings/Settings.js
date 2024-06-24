import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import watch from './../../assets/watch.gif'
import contact from './../../assets/contact.gif'
import { click } from "../../utils/audio";
import { back } from "../../utils/utils";
import { IoNotifications } from "react-icons/io5";
import { IoNotificationsOffSharp } from "react-icons/io5";




const Settings = ({setSettings, darkMode, setDarkMode, words, isMusic, governMusic, notifications, governNotifications}) => {



    function switchTheme(event) {
        setDarkMode(event.target.checked)
        click.play()
    }




    return <div className="settings">
                <a className="back" href="#" onClick={() => back(setSettings)}>&times;</a>
                <h2>Settings</h2>
                <div className="settings__container">
                    <p>Hello, thank you for using my project. Here you can test your English knowledge by taking tests. In the
                        test you have to choose the correct options. You can also use a translator. The database of words is constantly updated. Have a nice
                        decision!</p>
                    <p>All quantity word: <span style={{color: '#00a889'}}>{words.length}</span></p>
                    <div className="theme" style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
                        <p style={{display: 'flex', alignItems: 'center', gap: '30px'}}>Change theme to {darkMode ? <>light <img src={watch} width="40" /></> : <>dark <img src={watch} width="40" /></>}</p>
                        <label className="switch">
                            <input type="checkbox" checked={darkMode} onChange={event =>  switchTheme(event)}/>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
                        <p style={{display: 'flex', alignItems: 'center', gap: '20px'}}>Music {isMusic ? <FaPause/> : <FaPlay/>}</p>
                        <label className="switch">
                            <input type="checkbox" checked={isMusic} onChange={governMusic}/>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
                        <p style={{display: 'flex', alignItems: 'center', gap: '20px'}}>Notifications {notifications ? <IoNotifications/> : <IoNotificationsOffSharp/>}</p>
                        <label className="switch">
                            <input type="checkbox" checked={notifications} onChange={governNotifications}/>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <p style={{display: 'flex', alignItems: 'center', gap: '30px'}}>Contact the developer   <a  style={{display: 'flex', alignItems: 'center', gap: '30px'}} title="github" target="_blank" href="https://github.com/Roman1306r"><img src={contact} width="40" /></a></p>
                </div>
    </div>

}

export default Settings