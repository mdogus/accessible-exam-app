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
    
    //Listen options
    $("#listenOptions").click(function (e) {
        var audioOptions = document.getElementById("oAudio");
        
        if (this.className == "pause-options") {
            $("#listenOptions").attr("class", "listen-options");
            $("#listenOptions").html("Seçenekleri Dinle");
            audioOptions.pause();
        } else {
            $("#listenOptions").attr("class", "pause-options");
            $("#listenOptions").html("Durdur");
            audioOptions.play();
        }
        
        audioOptions.onplaying = function() {
            $("#listenOptions").attr("class", "pause-options");
            $("#listenOptions").html("Durdur");
        }
        audioOptions.onpause = function() {
            $("#listenOptions").attr("class", "listen-options");
            $("#listenOptions").html("Seçenekleri Dinle");
        }
        audioOptions.onended = function() {
            $("#listenOptions").attr("class", "listen-options");
            $("#listenOptions").html("Seçenekleri Dinle");
        }
    });
});

