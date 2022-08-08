
var songList_filename = "../song/songlist.txt";
var song_folder = "../song/";



{/* <source id="source" src="#" type="audio/mpeg"></source>
var tag = document.createElement("p");
var text = document.createTextNode("Tutorix is the best e-learning platform");
tag.appendChild(text);
var element = document.getElementById("new");
element.appendChild(tag); */}


Promise.all([
    fetch(songList_filename).then(x => x.text()),

]).then((sampleResp) => {
    // console.log(sampleResp);
    var aa = sampleResp[0].split('\r\n');
    var bb = sampleResp[0].split('.mp3\r\n');

    for (let i = 0; i < bb.length; i++) {
        songList.innerHTML += '<a href ="#" title="'+bb[i]+'" onclick="changeSong(\'' + aa[i] + '\',\'' + bb[i] + '\')">' + bb[i] + '</br></a>';
    }
})
function changeSong(songFilename, songName) {
    audio_song.innerHTML = '<source src="' + song_folder + songFilename + '" type="audio/mpeg">';
    audio_song.load();
    audio_song.play();
    h2_nowplaying_title.innerText = "現正播放 : " + songName;
}
