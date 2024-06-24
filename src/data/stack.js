import { BiLogoMongodb } from "react-icons/bi";
import { FaNodeJs } from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import { SiExpress } from "react-icons/si";

export const stack = [
    {
        id: 1,
        title: 'React',
        icon: <FaReact />,
        link: 'https://reactjs.org'
    },
    {
        id: 2,
        title: 'Node JS',
        icon: <FaNodeJs />,
        link: 'https://nodejs.org/en'
    },
    {
        id: 3,
        title: 'Express',
        icon: <SiExpress />,
        link: 'https://expressjs.com/ru/'
    },
    {
        id: 4,
        title: 'Mongo DB',
        icon: <BiLogoMongodb />,
        link: 'https://www.mongodb.com/'
    }
]