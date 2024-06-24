import clickAudio from './../assets/click.mp3'
import rightAudio from './../assets/right.mp3';
import wrongAudio from './../assets/wrong.mp3';
import winnerAudio from './../assets/winner.mp3';
import audio from './../assets/fon.mp3';



let click = new Audio(clickAudio)
let right = new Audio(rightAudio)
let wrong = new Audio(wrongAudio)
let winner = new Audio(winnerAudio)
let music = new Audio(audio)
music.loop = true


function muted() {
    click.volume = 0
    right.volume = 0
    wrong.volume = 0
    winner.volume = 0
}
function loud() {
    click.volume = 1
    right.volume = 1
    wrong.volume = 1
    winner.volume = 1
}




export {click, music, right, wrong, winner, muted, loud}