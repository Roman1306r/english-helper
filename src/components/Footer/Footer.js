import {stack} from "../../data/stack";
import { click } from "../../utils/audio";



const Footer = () => {

    return <footer className="footer">
                <div className="footer__stack">{stack.map((s) =><a onClick={() => click.play()} key={s?.id} title={s?.title} href={s?.link} target="_blank" >{s?.icon}</a>)}</div>
                <div style={{whiteSpace: 'nowrap'}}>© All rights reserved. {new Date().getFullYear()}</div>
            </footer>

}

export default Footer;