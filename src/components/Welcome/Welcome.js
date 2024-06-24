import { click } from "../../utils/audio"

const Welcome = ({start, setTestMode, countQuestions, setCountQuestions, setIsRus, isRus}) => {

    function close() {
        setTestMode(false)
        setIsRus(false)
        click.play()
    }
  
    return <div className="test__welcome">
                <a className="back" href="#" onClick={close}>&times;</a>
                <p>{isRus ? 'Пожалуйста, выберите количество слов. В тесте допускается только одна ошибка' : 'Please select the number of words. Only one error is allowed in a test'}</p>
                <div className="test__setting">

                    <input value={countQuestions} onChange={event => setCountQuestions(+event.target.value)} type="range" min="10" max="50" />
                    <span>{countQuestions}</span>
                </div>

                <a className="start" onClick={start} href="#">GO!</a>
            </div>

}

export default Welcome