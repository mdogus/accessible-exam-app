//Audio
$(function() {
    $("#listenQuestion").click(function (e) {
        var audio = document.getElementById("qAudio");
        var isPlaying = false;
        
        
        
        if (this.className == "is-playing") {
            $("#listenQuestion").attr("class", "listen");
            $("#listenQuestion").html("Soruyu Dinle");
            audio.pause();
        } else {
            $("#listenQuestion").attr("class", "is-playing listen");
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
            $("#listenQuestion").attr("class", "is-playing pause");
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
});
