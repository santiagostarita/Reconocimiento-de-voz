{/* <Pequeño ejemplo de reconocimiento de Voz en Javascript Vanilla, pulsando sobre el botón hablar transcribe lo dicho y texto y luego lo modula>
<Reconocimiento de voz>
Copyright (C) <2020>  <Santiago Starita santiagostarita@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.  */}

const btn = document.querySelector(".talk");
const cont = document.querySelector(".texto");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const Recognition = new SpeechRecognition();
Recognition.lang = "es-AR"

const saludos = [
    "Buenos dias",
    "En que puedo ayudarte?",
    "Hola, como estás?"
];

Recognition.onstart = function() {
    console.log('Voz activada');
    };

Recognition.onerror = function(event) {
    const msj = 'Error: ' + event.error
    console.log(msj);
    cont.textContent = msj;
    readOutLoud("No has dicho nada");
    };

Recognition.onspeechend = function() {
    Recognition.stop();
    console.log("Detenido");
    };

Recognition.onresult = function(event){

const current = event.resultIndex;
const transcript = event.results[current][0].transcript;
cont.textContent = transcript;
readOutLoud(transcript);
};

btn.addEventListener("click", () =>{
    Recognition.start();
});

cont.addEventListener("click", () =>{
    cont.textContent = "";
});

function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();
    (message.toLowerCase().includes("hola")) ? speech.text = saludos[Math.floor(Math.random() * saludos.length)] : speech.text = message;
    speech.volume = .6;
    speech.rate = .6;
    speech.pitch = 1;
    console.log(message);
    window.speechSynthesis.speak(speech);
};