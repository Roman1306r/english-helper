import { GiCheckMark } from "react-icons/gi";


const PopUp = ({popUp}) => {
    return <div className={popUp.isRight ? 'popup' : 'popup red'}>
                 {popUp.isRight && <GiCheckMark />}
            </div>
}

export default PopUp