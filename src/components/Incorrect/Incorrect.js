import { back } from "../../utils/utils"






const Incorrect = ({setMistakes, incorrect, isRus}) => {

   
    


    return <div className="statistics mistake">
                <a className="back" href="#" onClick={() => back(setMistakes)}>&times;</a>
                <p>Unfortunately, you made mistakes. Here you can see the correct translation and remember the translation</p>
                <table>
                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th colSpan="2" scope="col">Right translete</th>
                        <th scope="col">Wrong (you translete)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incorrect.map((arr, index) => {
                            return <tr key={index}>
                                <th data-label="ID" scope="row">{arr[0]._id}</th>
                                <td data-label="right">{isRus ? arr[0].rus : arr[0].eng}</td>
                                <td data-label="right" style={{color: '#00a889'}}>{isRus ? arr[0].eng : arr[0].rus}</td>
                                <td data-label="Wrong" style={{color: '#992626'}}>{isRus ? arr[1].eng : arr[1].rus}</td>
                            </tr>
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                        <th scope="row" colSpan="3">Amount</th>
                        <td>{incorrect.length}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

}






export default Incorrect