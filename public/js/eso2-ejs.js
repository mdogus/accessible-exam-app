var examHour = 1;
var examMinute = 30;
var numOfGenQuestions = 11;
var countdowntime = 1000 * 60 * 30;

var qSummary = "";
var isMarkedLog = "";

function getCurrQuestionId(){
    let qNumText = $("#qNumDiv").text();
    return parseInt(qNumText.split(' ')[1]);
}

function saveQuestion() {
    let qid = getCurrQuestionId();
    let q = questionArr[qid];
    if (q) {
        let sum = "Soru " + q.id + ", Cevaplanan Seçenek: " + (q.answer ? q.answer : "Yok") + ", Tekrar bakılacak mı: " + (q.marked ? "Evet" : "Hayır");
        
        q.marked = $("#ismarked").is(':checked');
        q.answer = $("input[name=qValue]:checked").val();
        
        qSummary = sum;
    }
    return qid;
}

function loadQuestion(qid, focus) {

    $('input[name="qValue"]').prop('checked', false);
    $('#ismarked').prop('checked', false);
    // $('#ismarked').removeAttr('checked');

    let q = questionArr[qid];
    if (q) {
        if (q.answer) {
            $("input[name=qValue][value=" + q.answer + "]").prop('checked', true);
        }
        if (q.marked) {
            $("#ismarked").prop('checked', q.marked);
        }

        $("#qNumDiv").text("Soru " + q.id);
        $("#question").html(q.text);
        $("#oA").text(q.o1Text);
        $("#oB").text(q.o2Text);
        $("#oC").text(q.o3Text);
        $("#oD").text(q.o4Text);
        $("#qAudio").attr("src", q.qAudioSrc);
        $("#oAudio").attr("src", q.oAudioSrc);
        
        //update summary
        let sum = "Soru " + q.id + " Tekrar Bakılacak Mı?";
        //$("#ismarkedlabel").text("Soru " + q.id + " Tekrar Bakılacak Mı?");
        $("#ismarkedlabel").attr("aria-label", sum);
        updateSummary(q.id);

        document.getElementById('qSummaryDiv').focus();
    }
}

function updateSummary(qid) {
    let q = questionArr[qid];
    if (q) {
        let sum = "Soru " + q.id + ", Cevaplanan Seçenek: " + (q.answer ? q.answer : "Yok") + ", Tekrar bakılacak mı: " + (q.marked ? "Evet" : "Hayır");
        let label = "Soru " + q.id + ": Tekrar bakılacak";
        let sumNotChecked = "Soru " + q.id + ", Cevaplanan Seçenek: " + "Yok" + ", Tekrar bakılacak mı: " + (q.marked ? "Evet" : "Hayır");
        
        isMarkedLog = "Soru " + q.id + " — Tekrar bakılacak mı: " + (q.marked ? "Evet" : "Hayır");
        
        if($("input[name='qValue']:radio").is(":checked")) {
            $("#ismarked").attr("aria-label", label);
            $("#qSummaryDiv").text(sum);
            //qSummary = sum;
        } else {
            $("#ismarked").attr("aria-label", label);
            $("#qSummaryDiv").text(sumNotChecked);
            //qSummary = sumNotChecked;
        }
    }
}

function markQuestion() {
    let qid = saveQuestion();
    updateSummary(qid);
}

function answerQuestion() {
    var qid = saveQuestion();
    updateSummary(qid);
}

function nextQuestion() {
    /*let msj = '[15-Eki-2020, Per; 13:29:14] Sonraki soruya gidildi.';
    eventTracker(msj);*/
    saveQuestion();
    let id = getCurrQuestionId();
    loadQuestion(parseInt(id) + 1);
}

function prevQuestion() {
    saveQuestion();
    let id = getCurrQuestionId();
    loadQuestion(parseInt(id) - 1);
}

var fontSize = 16;
function changeFontSize(fontSize) {
    console.log("cfs: " + fontSize);
    if (fontSize <= 36 && fontSize >= 16) {
        $('#eso-cont').css("font-size", fontSize + "px");
        $('#eso-cont').css("line-height", (fontSize * 1.4) + "px");

        $('#eso-cont .question-number').css("font-size", fontSize * 1.5 + "px");
        $('#eso-cont .question-number').css("line-height", (fontSize * 1.5 * 1.4) + "px");
        
        $('#eso-cont .remaining-time').css("font-size", fontSize * 1.5 + "px");
        $('#eso-cont .remaining-time').css("line-height", (fontSize * 1.5 * 1.4) + "px");

        $('#eso-cont input[type=button]').css("font-size", fontSize + "px");
        $('#eso-cont input[type=button]').css("line-height", (fontSize * 1.4) + "px");

        $('#eso-cont button img').css("width", fontSize * 1.2 + "px");
        
        $('#eso-cont button').css("font-size", fontSize + "px");
        $('#eso-cont').css("line-height", (fontSize * 1.4) + "px");

        $('#eso-cont select').css("font-size", (fontSize) + "px");
        $('#eso-cont select').css("line-height", (fontSize * 1.4) + "px");

        $('#fontSize').html(fontSize + " px");
    }
}

function getFontSize() {
    var fontText = $("#fontSize").text();
    if (fontText == "") {
        fontText = 16;
    }
    return parseInt(fontText);
}


function showMarkedQuesitionsPage() {
    $(".page-title").css("display", "block");
    $(".container").css("display", "none");
    $(".marked-questions-page").css("display", "block");
    $(".accessibility-page").css("display", "none");
    $("#accessibilityButtonDiv").css("display", "none");
    $(".hidden-accessibility").css("display", "none");
    
    document.getElementById('marked-questions-title').focus();
}

function showExamPage() {
    $(".page-title").css("display", "block");
    $(".container").css("display", "block");
    $(".marked-questions-page").css("display", "none");
    $(".accessibility-page").css("display", "none");
    $("#accessibilityButtonDiv").css("display", "block");
    $(".hidden-accessibility").css("display", "block");
    
    document.getElementById('qSummaryDiv').focus();
}
//show accessibility page
function showAccessibilityPage() {
    $(".page-title").css("display", "block");
    $(".container").css("display", "none");
    $(".marked-questions-page").css("display", "none");
    $(".accessibility-page").css("display", "block");
    $("#accessibilityButtonDiv").css("display", "none");
    $(".hidden-accessibility").css("display", "none");
    
    document.getElementById('accessibility-title').focus();
}

var makeRadiosDeselectableByName = function(name) {
    $("input[type='radio']").click(function() {
        var previousValue = $(this).attr('previousValue');
        var name = $(this).attr('name');
        let qid = getCurrQuestionId();

        if (previousValue == 'checked') {
            $(this).removeAttr('checked');
            $(this).attr('previousValue', false);
            $(this).prop("checked", false);
            updateSummary(qid);
        } else {
            $("input[name="+name+"]:radio").attr('previousValue', false);
            $(this).attr('previousValue', 'checked');
            answerQuestion();
        }
    });
};
$(document).ready(() => {
    makeRadiosDeselectableByName("qValue");
});

function logEvent(data) {
    $.ajax({
        type: "POST",
        url: "/log",
        data: data
        /*success: function(response) {
            console.log(response);
            //alert(response);
        }*/
    });
}

$(function () {
    //log
    $("#nextQuestion").click(() => {
        nextQuestion()
        
        var data = {
            event: "Sonraki Soru düğmesine basıldı. " + qSummary
        }
        
        logEvent(data);
    });
    $("#prevQuestion").click(() =>  {
        prevQuestion();
        
        var data = {
            event: "Önceki Soru düğmesine basıldı. " + qSummary
        }
        
        logEvent(data);
    });
    $("#ismarked").click(() => {
        markQuestion();
        
        var data = {
            event: "Tekrar Bak düğmesi işaretlendi. " + isMarkedLog
        }
        
        logEvent(data);
    });
    //Option radios
    //$("#radioA").on("click", answerQuestion);
    //$("#radioB").on("click", answerQuestion);
    //$("#radioC").on("click", answerQuestion);
    //$("#radioD").on("click", answerQuestion);
    //$("#radioE").on("click", answerQuestion);


    // createQuestions();

    saveQuestion();
    loadQuestion(1, false);


    setTimeout(function () {
        document.getElementById('pageTitleSpan').focus();
    }, 250)


    //Font size
    $("#increaseFont").click(function (e) {
        var fontSize = getFontSize();
        changeFontSize(fontSize + 2);
        // resizeImagesAccordingToFontSize(fontSize);
    });

    $("#decreaseFont").click(function (e) {
        var fontSize = getFontSize();
        changeFontSize(fontSize - 2);
        // resizeImagesAccordingToFontSize(fontSize);
    });
    
    //set fotn when page loaded
    $(document).ready(() => {
        let selectedFontSize = $('#pFontSize').html();
        let fontSize = parseInt(selectedFontSize);
        $('#eso-cont').css("font-size", fontSize + "px");
        $('#eso-cont').css("line-height", (fontSize * 1.4) + "px");

        $('#eso-cont .question-number').css("font-size", fontSize * 1.5 + "px");
        $('#eso-cont .question-number').css("line-height", (fontSize * 1.5 * 1.4) + "px");
        
        $('#eso-cont .remaining-time').css("font-size", fontSize * 1.5 + "px");
        $('#eso-cont .remaining-time').css("line-height", (fontSize * 1.5 * 1.4) + "px");

        $('#eso-cont input[type=button]').css("font-size", fontSize + "px");
        $('#eso-cont input[type=button]').css("line-height", (fontSize * 1.4) + "px");

        $('#eso-cont button img').css("width", fontSize * 1.2 + "px");
        
        $('#eso-cont button').css("font-size", fontSize + "px");
        $('#eso-cont').css("line-height", (fontSize * 1.4) + "px");

        $('#eso-cont select').css("font-size", (fontSize) + "px");
        $('#eso-cont select').css("line-height", (fontSize * 1.4) + "px");

        $('#fontSize').html(fontSize + " px");
    });
    
    //theme
    $(document).ready(() => {
        let selectedTheme = $('#pTheme').html();
        $("body").removeClass();
        $("body").addClass(selectedTheme);
        $('#themes').find('option[value=' + selectedTheme + ']').prop("selected", true);
    });
    $('#themes').change(function () {
        let selectedTheme = $('#themes').find(":selected").val();
        $("body").removeClass();
        $("body").addClass(selectedTheme);
    });
    
    //select font
    $(document).ready(() => {
        let selectedFont = $('#pFont').text();
        $("#eso-cont").removeClass();
        $("#eso-cont").addClass(selectedFont);
        $('#fonts').find('option[value=' + selectedFont + ']').prop("selected", true);
    });
    $('#fonts').change(function () {
        let selectedFont = $('#fonts').find(":selected").val();
        $("#eso-cont").removeClass();
        $("#eso-cont").addClass(selectedFont);
        //$("#eso-cont").addClass("font_" + this.selectedIndex);
    });

    setInterval(() => {
        countdowntime -= 1000;
        var minutes = Math.floor((countdowntime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((countdowntime % (1000 * 60)) / 1000);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        $("#remainingTime").html('KALAN SÜRE ');
        $("#remainingTimeSpan").html(minutes + ':' + seconds);
        $("#remainingTimeSpan").attr("class", "remaining-time");
        $("#remainingTimeLabel").html("Kalan Süre: " + minutes + " dakika, " + seconds + " saniye");

    }, 1000);
    
    //key bind
    //Alt + S: Kalan süre
    $(document).keydown(function(event){
		//console.log(event.keyCode);
		if(event.altKey === true){
			if(event.keyCode == 83){
                //let timeAlert = $("#remainingTimeLabel").text();
				//$("<p role='alert'>$(timeAlert)</p>").appendTo(document.body);
                $("#remainingTimeLabel").attr("role", "alert");
                setTimeout(function(){
                    $("#remainingTimeLabel").removeAttr("role");
                }, 100);
				//alert($("#remainingTimeLabel").text());
			}
		}
	});
    //Alt + T: Tekrar bakılacak sorular
    $(document).keydown(function(event){
        if(event.altKey === true){
            if(event.keyCode == 84){
                $(".container").css("display", "none");
                $(".marked-questions-page").css("display", "block");

                $(".marked-questions-div").html("");

                document.getElementById('marked-questions-title').focus();


                var $ul = $("<ul>").appendTo($(".marked-questions-div"));
                questionArr.forEach(function (q) {
                    if (q.marked) {

                        var $li = $('<li >').appendTo($ul);
                        var $a = $('<a  role="button" href="#' + q.id + '" >').appendTo($li);
                        $a.html("Soru " + q.id);

                        $a.click((e) => {
                            showExamPage();
                            loadQuestion($(e.target).html().split(" ")[1]);
                        });
                    }
                });
                showMarkedQuesitionsPage();
            }
        }
    });

                                 
    //Tekrar Bakılacak Sorular düğmesine basıldığında
    $("#markedQuestionsButton").click(function (e) {
        $(".container").css("display", "none");
        $(".marked-questions-page").css("display", "block");

        $(".marked-questions-div").html("");

        document.getElementById('marked-questions-title').focus();
        
        var $ul = $("<ul>").appendTo($(".marked-questions-div"));
        questionArr.forEach(function (q) {
            if (q.marked) {

                var $li = $('<li >').appendTo($ul);
                var $a = $('<a  role="button" href="#' + q.id + '" >').appendTo($li);
                $a.html("Soru " + q.id);

                $a.click((e) => {
                    showExamPage();
                    loadQuestion($(e.target).html().split(" ")[1]);
                });
            }
        });


        showMarkedQuesitionsPage();
    });
                                 
    //Erişilebilirlik düğmesi
    $("#accessibilityButton").click(function (e) {
        $(".page-title").css("display", "block");
        $(".container").css("display", "none");
        $(".accessibility-page").css("display", "block");
        $("#accessibilityButtonDiv").css("display", "none");
        $(".hidden-accessibility").css("display", "none");
            
        $("#accessibility-title").html("ERİŞİLEBİLİRLİK AYARLARI");
        document.getElementById('accessibility-title').focus();
            
        showAccessibilityPage();
    });
                                 //Hidden accessibility button
                                 $(".hidden-accessibility").click(function (e) {
                                     $(".page-title").css("display", "block");
                                     $(".container").css("display", "none");
                                     $(".accessibility-page").css("display", "block");
                                     $("#accessibilityButtonDiv").css("display", "none");
                                     $(".hidden-accessibility").css("display", "none");
                                         
                                     $("#accessibility-title").html("ERİŞİLEBİLİRLİK AYARLARI");
                                     document.getElementById('accessibility-title').focus();
                                         
                                     showAccessibilityPage();
                                 });
                                 
    //Soruyu dinle
    $("#listenQuestion").click(function (e) {
        let audio = document.getElementById("qAudio");
            
        if (this.className == "pause") {
            $("#listenQuestion").attr("class", "listen");
            $("#listenQuestion").html("Soruyu Dinle");
            audio.pause();
            
            data = { event: "Soruyu Dinle durduruldu." };
        } else {
            $("#listenQuestion").attr("class", "pause");
            $("#listenQuestion").html("Durdur");
            audio.play();
            
            data = { event: "Soruyu Dinle düğmesine basıldı." };
        }
        
        audio.onplaying = function() {
            $("#listenQuestion").attr("class", "pause");
            $("#listenQuestion").html("Durdur");
        }
        audio.onpause = function() {
            $("#listenQuestion").attr("class", "listen");
            $("#listenQuestion").html("Soruyu Dinle");
        }
        audio.onended = function() {
            $("#listenQuestion").attr("class", "listen");
            $("#listenQuestion").html("Soruyu Dinle");
        }
            
        logEvent(data);
    });
    //Seçenekleri dinle
    $("#listenOptions").click(function (e) {
        var audioOptions = document.getElementById("oAudio");
        var data;
        
        if (this.className == "pause-options") {
            $("#listenOptions").attr("class", "listen-options");
            $("#listenOptions").html("Seçenekleri Dinle");
            audioOptions.pause();
            
            data = { event: "Seçenekleri Dinle durduruldu." };
        } else {
            $("#listenOptions").attr("class", "pause-options");
            $("#listenOptions").html("Durdur");
            audioOptions.play();
            
            data = { event: "Seçenekleri Dinle düğmesine basıldı." };
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
        
        logEvent(data);
    });
                                 
    //Sınava Dön düğmesine basıldığında
    $("#backToExamButton").click(function (e) {
        showExamPage();
        document.getElementById('qSummaryDiv').focus();
    });
    //Erişilebilirlik sayfasında Sınava Dön düğmesine basıldığında
    $("#accPageBackToExamButton").click(function (e) {
        showExamPage();
        document.getElementById('qSummaryDiv').focus();
    });

    //Sınavı Bitir düğmesine basıldığında
    $("#finishButton").click(function (e) {
        $(".page-title").css("display", "none");
        $(".container").css("display", "none");
        $(".marked-questions-page").css("display", "none");
        $(".finish-page").css("display", "block");

        document.getElementById('finish-span').focus();
    });
});


