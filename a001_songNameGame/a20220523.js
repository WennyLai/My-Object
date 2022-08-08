var express = require("express")
var app = express();
app.use(express.static("./public"));   // 請在主js 旁創造 public資料夾，並創建index.html (靜態網站)
app.listen(3001); 