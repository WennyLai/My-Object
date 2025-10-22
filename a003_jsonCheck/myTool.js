getAllProperties = () =>{

    let rawObject = ""
    try {
        rawObject = JSON.parse(txtInput.value)    
    } catch (error) {
        window.alert("你是不是亂輸，壞掉了啦")
    }

    txtOutput.value = "";
    
    writePropertyName(rawObject)
}




stringToCode = (object) => {
	try {
        txtInput.value = eval(txtInput.value)   
    } catch (error) {
        window.alert("你是不是亂輸，壞掉了啦")
    }
	
}


writePropertyName = (objectNode) => {

    if (!isObject(objectNode)){
        // 如果不是物件，結束
        return
    }
    else if (isArray(objectNode)){
        // 如果是陣列，繼續下去
        objectNode.forEach(item =>{
            writePropertyName(item)
        })
        return
    }

    // 如果是普通陣列
    Object.keys(objectNode).forEach(key =>{
        txtOutput.value += key + '\r\n'    // 寫下來
        writePropertyName(objectNode[key])   // 看下面還有沒有
    })
}

// 是不是物件
isObject = (variable) => {
    return typeof variable === 'object' && variable !== null;
}

// 是不是陣列
isArray = (variable) => {

    if (Array?.isArray){
        return Object.prototype.toString.call(variable) === '[object Array]';
    }
    else{
        return Array.isArray(variable);
    }
}

// 清空資料
clearValue = () => {
    txtInput.value = ""
}

// 給範例
showExample = () => {
    let testObject = {
        a1:"1",
        a2:"2",
        a3:"2",
        a4:"4",
        a5:[
            {b1:"555"},
            {b2:"555"},
            {b3:"555",b4:{
                C1:"1231",
                C2:"131",
                C3:"231",
            }},
        ],
        a6:[1,2,3,4,5],
    }
    txtInput.value = JSON.stringify(testObject)

}

// 自己多包一層(蛤?)
showExample2 = () => {
    let testObject = {
        a1:"1",
        a2:"2",
        a3:"2",
        a4:"4",
        a5:[
            {b1:"555"},
            {b2:"555"},
            {b3:"555",b4:{
                C1:"1231",
                C2:"131",
                C3:"231",
            }},
        ],
        a6:[1,2,3,4,5],
    }
	
	try {
        txtInput.value = txtInput.value == "" ?  bindOneLayer(JSON.stringify(testObject)) : bindOneLayer(txtInput.value)  
    } catch (error) {
		console.log(error)
        txtInput.value = JSON.stringify(testObject)
    }
}


bindOneLayer = (str) => {
	return "\"" + str.replace(/\\/g,"\\\\").replace(/\"/g,"\\\"") + "\""
}
