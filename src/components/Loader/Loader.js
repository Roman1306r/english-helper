import s from './Loader.module.css'
import logo from './../../assets/logo.png'



const Loader = (props) => {

    
    return <div className={s.loader__screen}>
                <div className={s.book}>
                    <div className={s.inner}>
                        <div className={s.left}></div>
                        <div className={s.middle}></div>
                        <div className={s.right}></div>
                    </div>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <h2 className={s.loader__title}>English <img src={logo} alt='logo' /> Helper</h2> 
                <p className={s.info}>Please wait, loading...</p>
            </div>

}

export default Loader