
// for page2 //
var qNumber = 0;
var qTotal = 10;       // total question
var qTime = 0;
var qLevel = {
    easy: 15,
    normal: 10,
    hard: 5,
    hell: 3
}
var ds = 0.05;
var id_bar = 0;
var loadingBar = 0;
var songList_filename = "../song/songlist.txt";
var song_folder = "../song/";
var choices = 4;
var answer_choose = -1;
var totalCorrect = 0;
var correct_ans_sound = "../sound/correct.mp3";
var wrong_ans_sound = "../sound/wrong.mp3";
// var songFilename=0;
// var songName=0;
var load_file = Promise.all([
    fetch(songList_filename).then(x => x.text()),

]).then((sampleResp) => {
    // console.log(sampleResp);
    var songFilename = sampleResp[0].split('\r\n');
    var songName = sampleResp[0].split('.mp3\r\n');
    return [songFilename, songName]
})


var getTestMode_Page1 = function () {
    document.getElementById('article').innerHTML =
        `<div class="div_rule_bag">
                <div class="rule_title font-title"> 規則說明 </div>
                <div class="rule_context font-title">
                接下來會從歌單隨機播放${qTotal}首音樂片段，請在時限內選擇正確答案，難度根據音樂長度分成: <br />
                <table>
                    <tr>
                        <th> &nbsp;Easy   &nbsp; &nbsp;</th>
                        <th>${qLevel.easy} s</th>
                    </tr>
                    <tr>
                        <td> &nbsp;Normal  &nbsp; &nbsp;</td>
                        <td>${qLevel.normal} s </td>
                    </tr>
                    <tr>
                        <td> &nbsp;hard   &nbsp; &nbsp;</td>
                        <td>${qLevel.hard} s </td>
                    </tr>
                </table>
                選好難度就可以開始囉~~
                </div>
            </div>

             <div class="div_buttonBag">
                <div id="easy_button" class="playMode_button playMode_button_picked font-title">
                    <p>Easy</p>
                </div>
                <div id="normal_button" class="playMode_button font-title radio_group">
                    <p>Normal</p>
                </div>
                <div id="hard_button" class="playMode_button font-title radio_group">
                    <p>Hard</p>
                </div>
                <div id="start_button" class="playMode_button font-title radio_group">
                    <p>Start</p>
                </div>
            </div>`;
    document.getElementById('aside').innerHTML =
        `<div id="div_songList_title">
                <span id="span_scoreboard" class="font-title"> 我是計分板 </span>
               </div>
               <div id="songList"></div>`;



    // switch mode bar color
    document.getElementById('mode1').style.backgroundColor = 'transparent';
    document.getElementById('mode2').style.backgroundColor = 'var(--bg-color-100)';




}


var getTestMode_Page2 = function () {
    document.getElementById('article').innerHTML =
        `<div class="div_title_bag">
        <span id="question_title" class="font-title"> </span>
        <span id="time_left_title" class="font-title"> 剩餘時間: </span>   
        </div>
        <div id="myProgress">
            <div id="myBar"></div>
        </div>
        <audio style="width: 100% ;" id="audio_song" >   </audio>
        <div class="volume_bag">
            <i class="volume_icon fa-solid fa-volume-low"></i>
            <input type="range" id="volume" name="volume" min="0" max="1" value="0.1" step="0.01">
        </div>
        <div class="answer_bag">

        </div>
        <div class="result">
        <img />
        <audio  " id="audio_result" >   </audio>
        </div>
        `;

    document.getElementById('aside').innerHTML =
        `<div id="div_songList_title">
        <span id="span_scoreboard" class="font-title"> 我是計分板 </span>
    </div>
    <div id="songList"></div>`;


    for (let ii = 0; ii < choices; ii++) {
        document.getElementsByClassName("answer_bag")[0].innerHTML +=
            `<button class="answer_selection" value="${ii}"> </button>`
    }

}


var getTestMode_Page3 = function () {
    var congradulationWord = function () {
        if (totalCorrect <= qTotal * 0.3) { return "再回去練練吧，小廢物" }
        else if (totalCorrect <= qTotal * 0.6) { return "勉強還行啦" }
        else if (totalCorrect <= qTotal * 0.9) { return "唉呦!不錯喔" }
        else { return "恭喜!你已經是優秀的猜歌達人了!" }
    }();

    document.getElementById('article').innerHTML =
        `<div class="div_title_bag">
            <div class="rule_title font-title"> 成績結算 </div>
            <div class="rule_context font-title">
            全部${qTotal}題，你總共答對${totalCorrect}題
            <br/>
            ${congradulationWord}
            </div>
        </div>

         <div class="div_buttonBag">
            <div id="again_button" class="playMode_button  font-title">
                <p>再來一次</p>
            </div>
            <div id="change_button" class="playMode_button font-title radio_group">
                <p>調整難度</p>
            </div>
            <div id="mode_button" class="playMode_button font-title radio_group">
                <p>回播放器</p>
            </div>
            <div id="hell_button" class="playMode_button font-title radio_group">
                <p>地獄難度</p>
            </div>
            

        </div>

        `;


    // margin depend on buttons 
    // if (1) {
    //     var button_total = document.querySelectorAll(".div_buttonBag>div").length;
    //     document.querySelector(".playMode_button:first-child").style.marginLeft = ``;
    // }
}


var get_page1_Listener = function () {


    //-----------------lower for  easy 、 Normal 、hard-------------------------------------


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
    var easy_button_state = true;
    var normal_button_state = false;
    var hard_button_state = false;

    function set_qTime() {
        qTime = easy_button_state ? qLevel.easy : qTime;
        qTime = normal_button_state ? qLevel.normal : qTime;
        qTime = hard_button_state ? qLevel.hard : qTime;
    }
    set_qTime();





    //    id:audio_song  play next by random_list
    function audio_song_hard_button() {
        if (random_list) changeSong(random_list.pop());
    }


    //   let all button jump off
    function testMode_removeAll() {
        if (easy_button_state) { easy_button_state = false };
        if (normal_button_state) { normal_button_state = false; };
        if (hard_button_state) { hard_button_state = false; };

        button_picked(easy_button, false);
        button_picked(normal_button, false);
        button_picked(hard_button, false);
    }


    // random_button.addEventListener('click', function () {
    //     var random_number = Math.floor(Math.random() * songFilename.length);
    //     changeSong(random_number);
    // })


    easy_button.addEventListener('click', function (e) {
        if (easy_button_state == false) {
            testMode_removeAll()
            easy_button_state = !easy_button_state;
            button_picked(this, easy_button_state);
            set_qTime()
        };
    })

    normal_button.addEventListener('click', function (e) {
        if (normal_button_state == false) {
            testMode_removeAll()
            normal_button_state = !normal_button_state;
            button_picked(this, normal_button_state);
            set_qTime()
        };
    })


    hard_button.addEventListener('click', function (e) {
        if (hard_button_state == false) {
            testMode_removeAll()
            hard_button_state = !hard_button_state;
            button_picked(this, hard_button_state);
            set_qTime()
            //  create random_list
            // random_list = []
            // for (ii = 0; ii < songFilename.length; ii++) {
            //     random_list.splice(Math.floor(Math.random() * ii + 1), 0, ii);
            // }
        };
    })

    document.getElementById('start_button').addEventListener('click', testMode_P2);
}

var get_page2_Listener = function () {
    // volume control
    volume.addEventListener('change', function (e) {
        audio_song.volume = e.target.value;
    })

    // answer choose
    get_answer_selection = document.getElementsByClassName("answer_selection");
    for (let ii = 0; ii < get_answer_selection.length; ii++) {
        get_answer_selection[ii].addEventListener('click', function (e) {
            answer_choose = e.target.value;
        })
    }
}


//-----------------------------lower for loadingbar------------------------------------------------//

var run_page2 = function () {
    id_bar = 0;
    loadingBar = 0;
    qNumber = 0;
    totalCorrect = 0;
    var songFilename = 0;
    var songName = 0;
    var answer_bag_data = [];
    (async function () {

        [songFilename, songName] = await load_file;


        // answer bag
        // randon array 1 to n
        function get_random_list(list_name) {
            var random_list = list_name.map((elm, idx) => idx);
            for (let i = random_list.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [random_list[i], random_list[j]] = [random_list[j], random_list[i]];
            }
            return random_list

        }

        // let random_list前 n 為 答案，創造題庫
        var random_list = get_random_list(songName);
        for (let ii = 0; ii < qTotal; ii++) {
            var answer_one = random_list[ii];
            var answer_list = get_random_list(random_list)
            var correct_slection = Math.floor(Math.random() * choices);
            if (answer_list.indexOf(answer_one) > choices) { answer_list[correct_slection] = answer_one; }
            answer_bag_data = [...answer_bag_data, [...answer_list.slice(0, choices), correct_slection]];
        }
        console.log(answer_bag_data)
        question_start(qTime);

    })()


    function question_start(totalSecond = 10) {
        // for bar  
        loadingBar = 1;
        var elem = document.getElementById("myBar");
        var width = 0;
        var time_left = totalSecond;
        answer_choose = -1;
        qNumber++;


        //  output Q number and answer
        question_title.innerHTML = `Q${qNumber}`;

        get_answer_selection = document.getElementsByClassName("answer_selection");
        for (let ii = 0; ii < get_answer_selection.length; ii++) {
            get_answer_selection[ii].classList.remove("correct_ans");
            get_answer_selection[ii].innerText = songName[answer_bag_data[qNumber - 1][ii]];
        }

        //  正確答案位置
        var correct_index = answer_bag_data[qNumber - 1][choices];
        console.log(correct_index)
        get_answer_selection[correct_index].classList.add("correct_ans")
        // console.log(songFilename)



        // play music

        var id = answer_bag_data[qNumber - 1][correct_index];
        // console.log(id)
        // console.log('<source src="' + song_folder + songName[id] + '" type="audio/mpeg">')
        audio_song.innerHTML = '<source src="' + song_folder + songFilename[id] + '" type="audio/mpeg">';
        audio_song.load();


        // change start timing
        audio_song.onloadedmetadata = function () {
            audio_song.currentTime = Math.random() * (audio_song.duration - qTime);

            // set default volume
            audio_song.volume = volume.value;
            audio_song.play();



            // loading bar
            id_bar = setInterval(frame, ds * 1000);
            function frame() {
                var title = document.getElementById('time_left_title');
                if (title) {
                    width += 100 / (totalSecond / ds);
                    console.log()
                    time_left -= ds;
                    elem.style.width = width + "%";
                    title.innerHTML = "剩餘時間: " + time_left.toFixed(2) + " s";


                    if (width >= 100 || answer_choose != -1) {
                        question_result();
                    }
                }
                else {
                    console.log('bar lose');
                    clearInterval(id_bar);
                    loadingBar = 0;
                }




            }


        };





        function question_result() {
            // test3.removeEventListener('click',question_result);
            clearInterval(id_bar);
            loadingBar = 0;

            // show answer and sound
            if (answer_choose == correct_index) {
                var color_style = "white";
                var before_text = " ( O )";
                var sound_src = correct_ans_sound;
                totalCorrect += 1;
            }
            else {
                var color_style = "#FFFFFF77";
                var before_text = " ( X )";
                var sound_src = wrong_ans_sound;
            }


            songList.innerHTML +=
                `<span style="color:${color_style}" class="font-title">
                ${before_text} 第${qNumber}題答案是${songName[answer_bag_data[qNumber - 1][correct_index]]} 
            </span><br/> `;
            audio_result.innerHTML = `<source src=${sound_src} type="audio/mpeg">`;
            audio_result.volume = volume.value;
            audio_result.load();
            audio_result.play();

            if (qNumber == qTotal) {
                setTimeout(testMode_P3, 2000);
            }
            else {

                setTimeout(() => question_start(qTime), 2000);

            }

        }

    }




}





var get_page3_Listener = function () {
    var get_playMode_button = document.getElementsByClassName('playMode_button');
    for (let i = 0; i < get_playMode_button.length; i++) {
        // get_playMode_button[i].addEventListener('mousedown',() => {get_playMode_button[i].classList.add('playMode_button_picked');})
        get_playMode_button[i].addEventListener('click', () => {
            get_playMode_button[i].classList.add('playMode_button_click');
            setTimeout(() => get_playMode_button[i].classList.remove('playMode_button_click'), 100);
        })
    }


    document.getElementById('again_button').addEventListener('click', testMode_P2);
    document.getElementById('change_button').addEventListener('click', testMode_P1);
    document.getElementById('mode_button').addEventListener('click', playMode);



    hell_button.addEventListener("click", function () {
        qTime = qLevel.hell;
        testMode_P2();
    })

}

















var testMode_P1 = function () {
    if (document.getElementById('mode1')) {
        document.getElementById('mode1').addEventListener('click', playMode)
    }

    getTestMode_Page1();
    get_page1_Listener();
}

var testMode_P2 = function () {
    getTestMode_Page2();
    get_page2_Listener();
    run_page2();
}


var testMode_P3 = function () {
    getTestMode_Page3();
    get_page3_Listener();
}




document.getElementById('mode2').addEventListener('click', testMode_P1);
// document.getElementById('start_button').addEventListener('click', testMode_P2);




// window.onload = getTestMode_Page1;