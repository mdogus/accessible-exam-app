//Audio
$(function() {
    $("#listenQuestion").click(function (e) {
        var audio = document.getElementById("qAudio");
        var isPlaying = false;
        
        
        
        if (this.className == "pause") {
            $("#listenQuestion").attr("class", "listen");
            $("#listenQuestion").html("Soruyu Dinle");
            audio.pause();
        } else {
            $("#listenQuestion").attr("class", "pause");
            $("#listenQuestion").html("Durdur");
            audio.play();
        }
        /*
        if (isPlaying) {
            $("#listenQuestion").html("Soruyu Dinle");
            audio.pause();
        } else {
            $("#listenQuestion").html("Durdur");
            audio.play();
        }*/
        audio.onplaying = function() {
            //isPlaying = true;
            $("#listenQuestion").attr("class", "pause");
            $("#listenQuestion").html("Durdur");
        }
        audio.onpause = function() {
            //isPlaying = false;
            $("#listenQuestion").attr("class", "listen");
            $("#listenQuestion").html("Soruyu Dinle");
        }
        audio.onended = function() {
            //isPlaying = false;
            $("#listenQuestion").attr("class", "listen");
            $("#listenQuestion").html("Soruyu Dinle");
        }
    });
    //Listen option
    $("#listenOption").click(function (e) {
        var audio = document.getElementById("oAudio");
        
        if (this.className == "pause") {
            $("#listenOption").attr("class", "listen");
            $("#listenOption").html("Soruyu Dinle");
            audio.pause();
        } else {
            $("#listenOption").attr("class", "pause");
            $("#listenOption").html("Durdur");
            audio.play();
        }
        
        audio.onplaying = function() {
            $("#listenOption").attr("class", "pause");
            $("#listenOption").html("Durdur");
        }
        audio.onpause = function() {
            $("#").attr("class", "listen");
            $("#listenOption").html("Soruyu Dinle");
        }
        audio.onended = function() {
            $("#listenOption").attr("class", "listen");
            $("#listenOption").html("Soruyu Dinle");
        }
    });
});
