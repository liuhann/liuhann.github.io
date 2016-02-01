function getClickFunc(actionStr,recorderIndex){
    return function(){
        if(console&&console.log){
            console.log(actionStr+"_"+recorderIndex);    
        }
        try{
            jsBridge.send(actionStr+"_"+recorderIndex);
        }catch(e){
            //console.log(e);
        }

    };
}

/**
 * isStudent:0,老师 1,学生
 * haveSubmit:0,未提交，1，已提交
 * recordSounds：录音文件数组
 * comments：对应每一个录音文件的评论的数组。一个录音对应一个评论，评论内部结构不管。或者直接传空对象表示有都可以[{},{}]
 */
/*var initParam = {
    isStudent: 0,
    haveSubmit:0,
    recordSounds: [],
    comments: []
}
*/
function initRecordPage(initJson) {
    if(!initJson)return;
    var recorderComponents=$(".record_icons");
    for(var i=0;i<recorderComponents.length;i++){
        var component=recorderComponents[i];
        var imgBtns=$(component).find("button");
        imgBtns.off("click");
        imgBtns.hide();
        if(initJson.isStudent){//学生
            if(initJson.haveSubmit){//已，无需再录音
                $(imgBtns[1]).show().on("click",getClickFunc("record",i));
            }else{
                $(imgBtns[0]).show().on("click",getClickFunc("record",i));
                if(!initJson.recordSounds[i]){//未提交，无录音可检查
                    $(imgBtns[1]).show().on("click",getClickFunc("play",i));;
                }
            }
        }else{//老师
            $(imgBtns[1]).show().on("click",getClickFunc("play",i));
            $(imgBtns[2]).show().on("click",getClickFunc("comments",i));
        }
    }
}
var recordIconActions=["record","play","comments","view"];
/**
*指定显示第n题的第m个图标是否显示或者隐藏。都从0开始
*[
*    {
*      recorderIndex:0, //录音标号，题号
*      iconIndex:0，//图标0,录音，1，播放，2评论
*      show:0     //是否显示，0,隐藏，1显示
*    }，
*    {
*      recorderIndex:1, //录音标号，题号
*      iconIndex:0，//图标0,录音，1，播放，2评论
*      show:0     //是否显示，0,隐藏，1显示
*    }
*]
*/
function showOrHideBtn(uiArr) {
    if(!uiArr)return;
    if(!(uiArr instanceof Array))return;
    var recorderComponents=$(".record_icons");
    for(var i=0;i<uiArr.length;i++){
        var uiSetObj=uiArr[i];
        if(!uiSetObj)continue;
        var myComponent=recorderComponents[uiSetObj.recorderIndex];
        if(myComponent){
            var imgBtns=$(myComponent).find("button");
            var myImgBtn=imgBtns[uiSetObj.iconIndex];
            if(myImgBtn){
                if(uiSetObj.show){
                    $(myImgBtn).show();
                    $(myImgBtn).off("click");
                    $(myImgBtn).on("click",getClickFunc(recordIconActions[uiSetObj.iconIndex],uiSetObj.recorderIndex));
                }else{
                    $(myImgBtn).hide();
                }
            }
        }

    }
}
/**
*指定显示第n题的第m个图标是否显示或者隐藏。都从0开始
*[
*    {
*      recorderIndex:0, //录音标号，题号
*      isStudent:0，//是否学生
*      state:0     //状态：0=未录音;1=已录音未评论;2=已录音已评论
*    }
*]
*/
function showOrHideBtnByState(uiArr) {
    if(!uiArr)return;
    if(!(uiArr instanceof Array))return;
    var recorderComponents=$(".record_icons");
    for(var i=0;i<uiArr.length;i++){
        var uiSetObj=uiArr[i];
        if(!uiSetObj)continue;
        var myComponent=recorderComponents[uiSetObj.recorderIndex];
        if(myComponent){
            var imgBtns=$(myComponent).find("button");
            imgBtns.off("click");
            imgBtns.hide();
            if(uiSetObj.isStudent){
                if(0==uiSetObj.state){//未录音
                    $(imgBtns[0]).show().on("click",getClickFunc("record",uiSetObj.recorderIndex));
                }else if(1==uiSetObj.state){//已录音未评论
                    $(imgBtns[0]).show().on("click",getClickFunc("record",uiSetObj.recorderIndex));
                    $(imgBtns[1]).show().on("click",getClickFunc("play",uiSetObj.recorderIndex));
                }else if(2==uiSetObj.state){
                    $(imgBtns[0]).show().on("click",getClickFunc("record",uiSetObj.recorderIndex));
                    $(imgBtns[1]).show().on("click",getClickFunc("play",uiSetObj.recorderIndex));
                    $(imgBtns[3]).show().on("click",getClickFunc("view",uiSetObj.recorderIndex));
                }
            }else{
                if(0==uiSetObj.state){//未录音
                }else if(1==uiSetObj.state){//已录音未评论
                    $(imgBtns[1]).show().on("click",getClickFunc("play",uiSetObj.recorderIndex));
                    $(imgBtns[2]).show().on("click",getClickFunc("comments",uiSetObj.recorderIndex));
                }else if(2==uiSetObj.state){
                    $(imgBtns[1]).show().on("click",getClickFunc("play",uiSetObj.recorderIndex));
                    $(imgBtns[2]).show().on("click",getClickFunc("comments",uiSetObj.recorderIndex));
                }
            }
        }

    }
}

/**
*当前页面有几道听力题{"recNum":total,"iconNum":3};
*/
function getRecordersNumAndIconsNum(){
    var recorderComponents=$(".record_icons");
    var total=recorderComponents.length;
    return JSON.stringify({"recNum":total,"iconNum":4});
}
