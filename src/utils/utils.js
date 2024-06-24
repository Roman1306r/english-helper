import { click, right} from "./audio"

export function getRandomWordOutBase(words) {
    let randomIndex = Math.floor(Math.random() * words.length)
    return words.find((b, i) => i == randomIndex)
}

export function chooiseAnswer(event, setChooised) {
    event.preventDefault()
    click.play()
    Array.from(event.target.parentElement.children).forEach(item => item.className = '')
    if( event.target.className == 'active')  event.target.className = ''
    else  event.target.className = 'active'
    setChooised(event.target.getAttribute('id'))
}

export function getRightAndWrongAnswer(foundedWord, words, setArrayAnswers) {
    let i = 0
    let arr = [foundedWord._id]
    while (i < 4) {
        let nextAnswer = getRandomWordOutBase(words)

        if(!arr.includes(nextAnswer._id)) {
            arr.push(nextAnswer._id)
            setArrayAnswers(s => [...s, nextAnswer])
            i++
        }
    }
}

export function reverseTranslater(setIsReversed, setValue, setTranslated, middleWare) {
    setIsReversed((state) => { 
        let next = !state
        if(next) {
            setValue(middleWare.translated)
            setTranslated(middleWare.value)
        } else {
            setValue(middleWare.value)
            setTranslated(middleWare.translated)
        }
        return next
    })  
    click.play()
}

export function copy(translated, setOk) {
    navigator.clipboard.writeText(translated).then(() => {
        setOk(true)
        right.play()
        setTimeout(() => setOk(false), 1500)
    })  
}


export function back(fn) {
    fn(false)
    click.play()
}
export function open(fn) {
    fn(true)
    click.play()
}



