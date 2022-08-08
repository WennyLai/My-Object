var id = 0;
var id2 = 0;
var loadingBar = 0;
function question_start(totalSecond = 10) {
  if (loadingBar == 0) {
    loadingBar = 1;
    var elem = document.getElementById("myBar");
    var width = 0;
    var time_left = totalSecond;
    var ds = 0.05;


   id2 =setTimeout(() => {alert('you lose')},10000);



     id = setInterval(frame, ds*1000);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        loadingBar = 0;
      } else {
        var title = document.getElementById('time_left_title');
        width += 100/(totalSecond/ds);
        time_left -= ds ;
        elem.style.width = width + "%";
        title.innerHTML = "剩餘時間: " + time_left.toFixed(2)  + " s";  
      }
    }
  }
}