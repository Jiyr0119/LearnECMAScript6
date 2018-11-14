/* 
倒计时方法
id 倒计时的唯一标识
time 倒计时秒数
isTimestamp 是否需要减去当前系统时间 isTimestamp = 1 减掉 isTimestamp = 0 不检
endText:倒计时结束后显示什么，可以显示任意内容。
callback 倒计时时间>0 时回调
endCallback 倒计时结束后回调
*/
function addTimer(id, time, isTimestamp, endText, callback, endCallback) {
    var timestamp, oldTimestamp;
    if (isTimestamp == 1) {
        timestamp = Math.round((new Date()).getTime() / 1000)
        oldTimestamp = time
        time = time - timestamp
    }

    console.log(id, time)
    var timer = setInterval(function() {
        if (time > 0) {
            if (isTimestamp == 1) {
                timestamp = Math.round((new Date()).getTime() / 1000)
                time = oldTimestamp - timestamp
            }
            var d = parseInt(time / 60 / 60 / 24, 10); //计算剩余的天数 
            var h = parseInt(time / 60 / 60 % 24, 10); //计算剩余的小时数 
            var m = parseInt(time / 60 % 60, 10); //计算剩余的分钟数 
            var s = parseInt(time % 60, 10); //计算剩余的秒数
            d = checkTime(d);
            h = checkTime(h);
            m = checkTime(m);
            s = checkTime(s);
            if (d == '00') {
                $("#" + id + "").find('.d-box').hide()
            }
            if (h == '00') {
                $("#" + id + "").find('.h-box').hide()
            }
            if (m == '00') {
                $("#" + id + "").find('.m-box').hide()
            }
            $("#" + id + "").find('.d').html(d)
            $("#" + id + "").find('.h').html(h)
            $("#" + id + "").find('.m').html(m)
            $("#" + id + "").find('.s').html(s)
            var timeObj = {
                d: d,
                h: h,
                m: m,
                s: s,
                time: time
            }
            callback(timeObj)
                --time;
        } else if (time == 0) {
            clearInterval(timer);
            if (endText != '') {
                $("#" + id + "").html(endText)
            }
            var s = parseInt(time % 60, 10); //计算剩余的秒数
            s = checkTime(s);
            $("#" + id + "").find('.s').html(s)
            endCallback()
        }
    }, 1000);

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
}