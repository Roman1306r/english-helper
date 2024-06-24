import { MdOutlineWifiTetheringErrorRounded } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { BiLoaderCircle } from "react-icons/bi";
import { useState } from "react";
import { click } from "../../utils/audio";



const ErrorPage = ({setEditMode}) => {
    const [load, setLoad] = useState(false)
   

    function establishLink(event) {
        click.play()
        event.preventDefault()
        setLoad(true)
        setEditMode(true)
        setTimeout(() => {
            setEditMode(false)
            setLoad(false)
        }, 1000)
    }
  
    return <div className="error__page">
                <div>
                    <div className="error__icon">
                        <MdOutlineWifiTetheringErrorRounded />
                    </div>
                    <div className="error__text">
                        <h2>Oops! Something went wrong</h2>
                        <ul>
                            <li>Check your VPN</li>
                            <li>Check your database connection</li>
                            <li>Check your internet connection</li>
                        </ul>
                    </div>
                 </div>               
                <button onClick={establishLink} className="error__btn">{load ? <BiLoaderCircle className="editor__loader" /> : <FiLink />}</button>
            </div>
}

export default ErrorPage