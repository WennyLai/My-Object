
var songList_filename = "../song/songlist.txt";
var song_folder = "../song/";

var getPlayModePage = function () {
    document.getElementById('article').innerHTML =
            `<div class="div_nowplaying_title">
                <canvas id="cdPlayer" width="200" height="200"></canvas>
                <span id="span_nowplaying_title" class="font-title"> 現正撥放: </span>
            </div>
            <audio style="width: 100% ;" id="audio_song" controls muted>
            </audio>
            <div class="div_buttonBag">
                <div id="random_button" class="playMode_button font-title">
                    <p>隨機點歌</p>
                </div>
                <div id="repeat_button" class="playMode_button font-title radio_group">
                    <p>單曲循環</p>
                </div>
                <div id="continueAhead_button" class="playMode_button font-title radio_group">
                    <p>歌單循環</p>
                </div>
                <div id="continueRandom_button" class="playMode_button font-title radio_group">
                    <p>隨機循環</p>
                </div>
            </div>`;


}

document.getElementById('mode1').style.backgroundColor = 'var(--font-color)';
document.getElementById('mode2').style.backgroundColor = 'transparent';




window.onload = getPlayModePage();
document.getElementById('mode1').addEventListener('click', getPlayModePage);


var song_nowplaying_id = 0;
var songFilename = 0;
var songName = 0;
var random_list = [];

Promise.all([
    fetch(songList_filename).then(x => x.text()),

]).then((sampleResp) => {
    // console.log(sampleResp);
    songFilename = sampleResp[0].split('\r\n');
    songName = sampleResp[0].split('.mp3\r\n');

    for (let i = 0; i < songName.length; i++) {
        // songList.innerHTML += '<a href ="#" title="'+songName[i]+'" onclick="changeSong(\'' + songFilename[i] + '\',\'' + songName[i] + '\')">' + songName[i] + '</br></a>';
        songList.innerHTML += '<a href ="#" title="' + songName[i] + '" onclick="changeSong(' + i + ')">' + songName[i] + '</br></a>';

    }
})


//   select list to order song
function changeSong(id) {
    song_nowplaying_id = id;
    // console.log(id)
    // console.log('<source src="' + song_folder + songName[id] + '" type="audio/mpeg">')
    audio_song.innerHTML = '<source src="' + song_folder + songFilename[id] + '" type="audio/mpeg">';

    audio_song.load();
    audio_song.play();
    span_nowplaying_title.innerHTML = "現正播放 : <br><br>" + songName[id];
}


//---------------------lower for canvas CDplayer--------------------------------------

// get canvas.-----------------------------
let get_cdPlayer = document.getElementById('cdPlayer');
let pencil_cdPlayer = get_cdPlayer.getContext('2d');

// draw circle
var cdX = 100;
var cdY = 100;
var cdRadius = 70;

var drawCd = () => {
    pencil_cdPlayer.beginPath();
    pencil_cdPlayer.arc(cdX, cdY,
        cdRadius, 0, Math.PI * 2, true);
    pencil_cdPlayer.strokeStyle = 'orange';
    pencil_cdPlayer.stroke();

    pencil_cdPlayer.beginPath();
    pencil_cdPlayer.arc(cdX, cdY,
        cdRadius * 0.8, 0, Math.PI * 2, true);
    pencil_cdPlayer.fillStyle = 'orange';
    pencil_cdPlayer.fill();

    pencil_cdPlayer.beginPath();
    pencil_cdPlayer.arc(cdX, cdY,
        cdRadius * 0.1, 0, Math.PI * 2, true);
    pencil_cdPlayer.fillStyle = '#777777';
    pencil_cdPlayer.fill();

}
drawCd();

// let circle rotate(not real just imagine)
var randomAngle1 = Math.PI * 1;
var randomAngle2 = Math.PI * 1.9;
var rotateCd = () => {
    randomAngle1 += Math.random() * Math.PI * 0.05 - Math.PI * 0.025;
    randomAngle2 += Math.random() * Math.PI * 0.05 - Math.PI * 0.025;
    if (randomAngle1 <= Math.PI * 0.8) { randomAngle1 = Math.PI * 0.8 };
    if (randomAngle1 >= Math.PI * 1.2) { randomAngle1 = Math.PI * 1.2 };
    if (randomAngle2 <= Math.PI * 1.7) { randomAngle2 = Math.PI * 1.7 };
    if (randomAngle2 >= Math.PI * 2.1) { randomAngle2 = Math.PI * 2.1 };


    pencil_cdPlayer.beginPath();
    pencil_cdPlayer.arc(cdX, cdY,
        cdRadius * 0.8, randomAngle1, randomAngle1 - Math.PI * 0.2, false);
    pencil_cdPlayer.strokeStyle = 'black';
    pencil_cdPlayer.stroke();


    pencil_cdPlayer.beginPath();
    pencil_cdPlayer.arc(cdX, cdY,
        cdRadius * 0.7, randomAngle2, randomAngle2 - Math.PI * 0.2, true);
    pencil_cdPlayer.strokeStyle = 'black';
    pencil_cdPlayer.stroke();

    pencil_cdPlayer.beginPath();
    pencil_cdPlayer.arc(cdX, cdY,
        cdRadius * 0.6, randomAngle2, randomAngle2 - Math.PI * 0.2, true);
    pencil_cdPlayer.strokeStyle = 'black';
    pencil_cdPlayer.stroke();


}
//  Loop , start , stop;
var cdLoop;
var animate = () => { pencil_cdPlayer.clearRect(0, 0, get_cdPlayer.width, get_cdPlayer.height); drawCd(); rotateCd(); }

document.getElementById('audio_song').addEventListener('playing', function () {
    clearInterval(cdLoop); cdLoop = setInterval(animate, 200);
}, false);

document.getElementById('audio_song').addEventListener('pause', function () {
    clearInterval(cdLoop); drawCd();
}, false);


//-----------------lower for  audio loop 、 random 、 continue-------------------------------------
// class Radio_button {
//     constructor(state = false, addFunction , removeFunction) {
//       this.state = state;
//       this.addFunction = addFunction;
//       this.removeFunction =removeFunction;
//     }
//   }

//   let every playMode_button be clicked

var get_playMode_button = document.getElementsByClassName('playMode_button');
for (let i = 0; i < get_playMode_button.length; i++) {
    // get_playMode_button[i].addEventListener('mousedown',() => {get_playMode_button[i].classList.add('playMode_button_picked');})
    get_playMode_button[i].addEventListener('click', () => {
        get_playMode_button[i].classList.add('playMode_button_click');
        setTimeout(() => get_playMode_button[i].classList.remove('playMode_button_click'), 100);
    })
}


//     playMode_button  become dark or not
function button_picked(element, state) {
    // var get_radio_group = Array.from(document.getElementsByClassName('radio_group'));
    // for (let ii of get_radio_group ){ element.classList.remove('playMode_button_picked') };
    if (state) { element.classList.add('playMode_button_picked'); } else { element.classList.remove('playMode_button_picked'); }
}



//-------------   lower for 3 radio button  
var repeat_button_state = false;
var continueAhead_button_state = false;
var continueRandom_button_state = false;


//     id:audio_song  restart music
function audio_song_repeat() {
    audio_song.load();
    audio_song.play();
}

//    id:audio_song  play next by index
function audio_song_continueAhead() {
    if (song_nowplaying_id + 1 < songFilename.length) changeSong(song_nowplaying_id + 1);
}

//    id:audio_song  play next by random_list
function audio_song_continueRandom() {
    if (random_list) changeSong(random_list.pop());
}


//
function playMode_removeAll() {
    if (repeat_button_state) { repeat_button_state = false; audio_song.removeEventListener('ended', audio_song_repeat) };
    if (continueAhead_button_state) { continueAhead_button_state = false; audio_song.removeEventListener('ended', audio_song_continueAhead) };
    if (continueRandom_button_state) { continueRandom_button_state = false; audio_song.removeEventListener('ended', audio_song_continueRandom) };

    button_picked(repeat_button, false);
    button_picked(continueAhead_button, false);
    button_picked(continueRandom_button, false);

}


random_button.addEventListener('click', function () {
    var random_number = Math.floor(Math.random() * songFilename.length);
    changeSong(random_number);
})


repeat_button.addEventListener('click', function (e) {
    if (repeat_button_state == false) { playMode_removeAll() };
    repeat_button_state = !repeat_button_state;
    button_picked(this, repeat_button_state);
    if (repeat_button_state) { audio_song.addEventListener('ended', audio_song_repeat) }
    else { audio_song.removeEventListener('ended', audio_song_repeat) }

})

continueAhead_button.addEventListener('click', function (e) {
    if (continueAhead_button_state == false) { playMode_removeAll() };
    continueAhead_button_state = !continueAhead_button_state;
    button_picked(this, continueAhead_button_state);
    if (continueAhead_button_state) { audio_song.addEventListener('ended', audio_song_continueAhead) }
    else { audio_song.removeEventListener('ended', audio_song_continueAhead) }
})


continueRandom_button.addEventListener('click', function (e) {
    if (continueRandom_button_state == false) { playMode_removeAll() };
    continueRandom_button_state = !continueRandom_button_state;
    button_picked(this, continueRandom_button_state);

    //  create random_list
    random_list = []
    for (ii = 0; ii < songFilename.length; ii++) {
        random_list.splice(Math.floor(Math.random() * ii + 1), 0, ii);
    }

    if (continueRandom_button_state) { audio_song.addEventListener('ended', audio_song_continueRandom) }
    else { audio_song.removeEventListener('ended', audio_song_continueRandom) }
})





// function ok() {
//     var test = Array.from(document.getElementsByClassName('playMode_button'));
//     var test2 = document.getElementsByClassName('playMode_button');
//     console.log(test)
//     console.log(test2)
// }



{/* <source id="source" src="#" type="audio/mpeg"></source>
var tag = document.createElement("p");
var text = document.createTextNode("Tutorix is the best e-learning platform");
tag.appendChild(text);
var element = document.getElementById("new");
element.appendChild(tag); */}