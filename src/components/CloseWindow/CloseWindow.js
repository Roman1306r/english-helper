import { back } from "../../utils/utils"



const CloseWindow = ({setCloseWindow}) => {
    

    return <div className="close__window">
                <div className="close__window-body">
                    <h2>Close the application?</h2>
                    <div className="close__window-btns">
                            <button onClick={() => window.close()}>Yes</button>
                            <button onClick={() => back(setCloseWindow)}>No</button>
                    </div>
                </div>
            </div>
}

export default CloseWindow