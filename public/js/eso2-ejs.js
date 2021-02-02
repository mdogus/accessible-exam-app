var examHour = 1;
var examMinute = 30;
var numOfGenQuestions = 11;
var countdowntime = 1000 * 60 * 30;
//logs
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
		
        $("#oA").html(q.o1Text);
        $("#oB").html(q.o2Text);
        $("#oC").html(q.o3Text);
        $("#oD").html(q.o4Text);
		$("#oE").html(q.o5Text);
        $("#qAudio").attr("src", q.qAudioSrc);
        $("#oAudio").attr("src", q.oAudioSrc);
        
        //update summary
        let sum = "Soru " + q.id + " Tekrar bakılacak mı?";
        //$("#ismarkedlabel").text("Soru " + q.id + " Tekrar Bakılacak Mı?");
        $("#ismarkedlabel").attr("aria-label", sum);
        updateSummary(q.id);
		
		// Dismiss buttons as first and last questions loaded 
		if(qid === 1) {
			$("#prevQuestion").attr("disabled");
			$("#prevQuestion").attr("aria-disabled","true");
		} else if(qid === 10) {
			$("#nextQuestion").attr("disabled");
			$("#nextQuestion").attr("aria-disabled","true");
		} else {
			$("#prevQuestion").removeAttr("disabled");
			$("#prevQuestion").attr("aria-disabled","false");
			$("#nextQuestion").removeAttr("disabled");
			$("#nextQuestion").attr("aria-disabled","false");
		}
			
        document.getElementById('qSummaryDiv').focus();
    }
}

function updateSummary(qid) {
    let q = questionArr[qid];
    if (q) {
        let sum = "Soru " + q.id + ", Cevaplanan Seçenek: " + (q.answer ? q.answer : "Yok") + ", Tekrar bakılacak mı: " + (q.marked ? "Evet" : "Hayır");
        let label = "Soru " + q.id + ": Tekrar bakmak istiyorum.";
        let sumNotChecked = "Soru " + q.id + ", Cevaplanan Seçenek: " + "Yok" + ", Tekrar bakılacak mı: " + (q.marked ? "Evet" : "Hayır");
        var answer = q.answer;
		var answerLog = answer ? answer + " seçeneği işaretlendi." : "Seçim kaldırıldı.";
        isMarkedLog = "Soru " + q.id + " — Tekrar bakılacak mı: " + (q.marked ? "Evet" : "Hayır");
        
        if($("input[name='qValue']:radio").is(":checked")) {
			var data = { event: answerLog };
			logEvent(data);
            $("#ismarked").attr("aria-label", label);
            $("#qSummaryDiv").text(sum);
        } else {
            $("#ismarked").attr("aria-label", label);
            $("#qSummaryDiv").text(sumNotChecked);
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
    
    saveQuestion();
    let id = getCurrQuestionId();
    loadQuestion(parseInt(id) + 1);
	
	// Audio SRC
	var qid = id + 1;
	var q = questionArr[qid];
    $("#qAudio").removeAttr("src");
	$("#oAudio").removeAttr("src");
    $("#qAudio").attr("src", q.qAudioSrc);
	$("#oAudio").attr("src", q.oAudioSrc);
}

function prevQuestion() {
    saveQuestion();
    let id = getCurrQuestionId();
    loadQuestion(parseInt(id) - 1);
	
	// Audio SRC
	var qid = id - 1;
	var q = questionArr[qid];
    $("#qAudio").removeAttr("src");
	$("#oAudio").removeAttr("src");
    $("#qAudio").attr("src", q.qAudioSrc);
	$("#oAudio").attr("src", q.oAudioSrc);
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


function showMarkedQuestionsPage() {
    $(".page-title").css("display", "block");
	$("#remTimeDiv").css("padding-top","10px");
    $(".container").css("display", "none");
    $(".marked-questions-page").css("display", "block");
    $(".accessibility-page").css("display", "none");
    $("#accessibilityButtonDiv").css("display", "none");
    $(".hidden-accessibility").css("display", "none");
    
    document.getElementById('marked-questions-title').focus();
	
	$(".marked-questions-div").html("");
       
        var $ul = $("<ul>").appendTo($(".marked-questions-div"));
        questionArr.forEach(function (q) {
            if (q.marked) {
				var selectedQuestion = "Soru " + q.id;
				var data = { event: selectedQuestion + " düğmesine basıldı. " + selectedQuestion + " görüntülendi." };
                var $li = $('<li >').appendTo($ul);
                var $a = $('<a  role="button" href="#' + q.id + '" >').appendTo($li);
                $a.html("Soru " + q.id);

                $a.click((e) => {
					logEvent(data);
                    showExamPage();
                    loadQuestion($(e.target).html().split(" ")[1]);
                });
            }
        });
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
	$("#remTimeDiv").css("padding-top","10px");
    $(".container").css("display", "none");
    $(".marked-questions-page").css("display", "none");
    $(".accessibility-page").css("display", "block");
    $("#accessibilityButtonDiv").css("display", "none");
    $(".hidden-accessibility").css("display", "none");
	$("#accessibility-title").html("ERİŞİLEBİLİRLİK AYARLARI");
    document.getElementById('accessibility-title').focus();
}

var makeRadiosDeselectableByName = function(name) {
    $("input[type='radio']").click(function() {
        var previousValue = $(this).attr('previousValue');
        var name = $(this).attr('name');
        let qid = getCurrQuestionId();
		let q = questionArr[qid];
		var answer = q.answer;

        if (previousValue == 'checked') {
			var data = { event: "İşaretleme kaldırıldı: " + answer + " seçeneği" };
			logEvent(data);
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
    // Next question button
    $("#nextQuestion").click(() => {
        nextQuestion()
        
        var data = {
            event: "Sonraki Soru düğmesine basıldı. |" + qSummary
        }
        
        logEvent(data);
    });
	
	// Previous question button
    $("#prevQuestion").click(() =>  {
        prevQuestion();
        
        var data = {
            event: "Önceki Soru düğmesine basıldı. " + qSummary
        }
        
        logEvent(data);
    });
	
	// Mark the question
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

    // Save and load question
	saveQuestion();
    loadQuestion(1, false);

    setTimeout(function () {
        document.getElementById('pageTitleSpan').focus();
    }, 250)

    // Increase font size
    $("#increaseFont").click(function (e) {
        var fontSize = getFontSize();
		var newFontSize = fontSize + 2;
        changeFontSize(fontSize + 2);
        // resizeImagesAccordingToFontSize(fontSize);
		var data = { event: "Yazı Boyutu artırıldı: " + newFontSize };
		logEvent(data);
    });
	// Decrease font size
    $("#decreaseFont").click(function (e) {
        var fontSize = getFontSize();
		var newFontSize = fontSize - 2;
        changeFontSize(fontSize - 2);
        // resizeImagesAccordingToFontSize(fontSize);
		var data = { event: "Yazı Boyutu azaltıldı: " + newFontSize };
		logEvent(data);
    });
    
    //set font when page loaded
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
		let selectedThemeText = $('#themes').find(":selected").text();
        $("body").removeClass();
        $("body").addClass(selectedTheme);
		
		var data = { event: "Tema değiştirildi: " + selectedThemeText };
		logEvent(data);
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
		let selectedFontText = $('#fonts').find(":selected").html();
        $("#eso-cont").removeClass();
        $("#eso-cont").addClass(selectedFont);
        //$("#eso-cont").addClass("font_" + this.selectedIndex);
		
		var data = { event: "Yazı Tipi değiştirildi: " + selectedFontText };
		logEvent(data);
    });

    // Remaining time
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
    
    // key bind
	//Alt + S: Kalan süre
    $(document).keydown(function(event){
		if(event.altKey === true){
			if(event.keyCode == 69){
				var data = { event: "Kısayol (Alt + E) tuşuna basıldı. Erişilebilirlik Ayarları sayfası görüntülendi." };
				logEvent(data);
				showAccessibilityPage();
			}
		}
	});
    //Alt + S: Kalan süre
    $(document).keydown(function(event){
		if(event.altKey === true){
			if(event.keyCode == 83){
                //let timeAlert = $("#remainingTimeLabel").text();
				//$("<p role='alert'>$(timeAlert)</p>").appendTo(document.body);
			var data = { event: "Kısayol (Alt + S) tuşuna basıldı. Kalan süre okundu." };
			logEvent(data);
                $("#remainingTimeLabel").attr("role", "alert");
                setTimeout(function(){
                    $("#remainingTimeLabel").removeAttr("role");
                }, 100);
			}
		}
	});
    // Alt + G: Gözden geçir sayfası
    $(document).keydown(function(event){
        if(event.altKey === true){
            if(event.keyCode == 71){
				var data = { event: "Kısayol (Alt + G) tuşuna basıldı. Gözden Geçir sayfası görüntülendi." };
				logEvent(data);
				showMarkedQuestionsPage();
            }
        }
    });

                                 
    // Tekrar Bakılacak Sorular düğmesine basıldığında
    $("#markedQuestionsButton").click(function (e) {
        var data = { event: "Gözden Geçir düğmesine basıldı." };
        logEvent(data);
		showMarkedQuestionsPage();
    });
                                 
    // Erişilebilirlik düğmesi
    $("#accessibilityButton").click(function (e) {
		var data = { event: "Erişilebilirlik düğmesine basıldı." };    
        logEvent(data);
		showAccessibilityPage();
    });
	//Hidden accessibility button
                                 $("#hiddenAccessibilityButton").click(function (e) {
									 var data = { event: "Erişilebilirlik (hidden) düğmesine basıldı." };
                                     logEvent(data);
									 showAccessibilityPage();
                                 });

                                 
    // Soruyu dinle
    $("#listenQuestion").click(function (e) {
        //let q = questionArr[qid];
		let audio = document.getElementById("qAudio");
        var data;
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
        };
        audio.onpause = function() {
            $("#listenQuestion").attr("class", "listen");
            $("#listenQuestion").html("Soruyu Dinle");
        };
        audio.onended = function() {
            $("#listenQuestion").attr("class", "listen");
            $("#listenQuestion").html("Soruyu Dinle");
        };
            
        logEvent(data);
    });
    // Seçenekleri dinle
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
        };
        audioOptions.onpause = function() {
            $("#listenOptions").attr("class", "listen-options");
            $("#listenOptions").html("Seçenekleri Dinle");
        };
        audioOptions.onended = function() {
            $("#listenOptions").attr("class", "listen-options");
            $("#listenOptions").html("Seçenekleri Dinle");
        };
        
        logEvent(data);
    });
                                 
    // Sınava Dön düğmesine basıldığında
    $("#backToExamButton").click(function (e) {
		var data = { event: "Sınava Dön düğmesine basıldı (Gözden Geçir sayfasında)." };
		logEvent(data);
        showExamPage();
        document.getElementById('qSummaryDiv').focus();
    });
    //Erişilebilirlik sayfasında Sınava Dön düğmesine basıldığında
    $("#accPageBackToExamButton").click(function (e) {
        var data = { event: "Sınava Dön düğmesine basıldı (Erişilebilirlik Ayarları sayfasında)." };
		logEvent(data);
		showExamPage();
        document.getElementById('qSummaryDiv').focus();
    });

    //Sınavı Bitir düğmesine basıldığında
    /*$("#finishButton").click(function (e) {
        $(".page-title").css("display", "none");
        $(".container").css("display", "none");
        $(".marked-questions-page").css("display", "none");
        $(".finish-page").css("display", "block");

        document.getElementById('finish-span').focus();
    });*/
		
});

$(document).ready(() => {
	var dataDocReady = { event: "Sınav sayfası görüntülendi." };
	logEvent(dataDocReady);
	// Get the modal
        var modal = document.getElementById("finishExamModal");
        // Get the button that opens the modal
        var finishButton = document.getElementById("finishButton");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal
        $("#finishButton").click(() => {
			var data = { event: "Sınavı Bitir düğmesine basıldı. Modal görüntülendi: Sınavı bitirmek istediğinizden emin misiniz?" };
			logEvent(data);
            modal.style.display = "block";
			$(".container").attr("aria-hidden","true");
			
			$("#hiddenAccessibilityButton").attr("aria-hidden", "true");
			$("#radioA").attr("aria-hidden", "true");
			$("#radioB").attr("aria-hidden","true");
			$("#radioC").attr("aria-hidden","true");
			$("#radioD").attr("aria-hidden","true");
			$("#radioE").attr("aria-hidden","true");
			$("#ismarked").attr("aria-hidden","true");
			
			$("#hiddenAccessibilityButton").css("display", "none");
			$("#radioA").css("display", "none");
			$("#radioB").css("display", "none");
			$("#radioC").css("display", "none");
			$("#radioD").css("display", "none");
			$("#radioE").css("display", "none");
			$("#ismarked").css("display", "none");
			
            $("#finishExamModalLabel").focus();
        });
		
        // When the user clicks on No button, close the modal
        $("#modalNoButton").click(function() {
			var data = { event: "Hayır düğmesine basıldı. Modal kapatıldı." };
			logEvent(data);
            $("#finishExamModal").css("display","none");
			$(".container").attr("aria-hidden","false");
			
			$("#hiddenAccessibilityButton").attr("aria-hidden", "false");
			$("#radioA").attr("aria-hidden", "false");
			$("#radioB").attr("aria-hidden","false");
			$("#radioC").attr("aria-hidden","false");
			$("#radioD").attr("aria-hidden","false");
			$("#radioE").attr("aria-hidden","false");
			$("#ismarked").attr("aria-hidden","false");
			
			$("#hiddenAccessibilityButton").css("display", "block");
			$("#radioA").css("display", "block");
			$("#radioB").css("display", "block");
			$("#radioC").css("display", "block");
			$("#radioD").css("display", "block");
			$("#radioE").css("display", "block");
			$("#ismarked").css("display", "block");
			
			$("#finishButton").focus();
        });
		
		// When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            var data = { event: "Kapat (x) düğmesine basıldı. Modal kapatıldı." };
			logEvent(data);
			modal.style.display = "none";
			$(".container").attr("aria-hidden","false");
			
			$("#hiddenAccessibilityButton").attr("aria-hidden", "false");
			$("#radioA").attr("aria-hidden", "false");
			$("#radioB").attr("aria-hidden","false");
			$("#radioC").attr("aria-hidden","false");
			$("#radioD").attr("aria-hidden","false");
			$("#radioE").attr("aria-hidden","false");
			$("#ismarked").attr("aria-hidden","false");
			
			$("#hiddenAccessibilityButton").css("display", "block");
			$("#radioA").css("display", "block");
			$("#radioB").css("display", "block");
			$("#radioC").css("display", "block");
			$("#radioD").css("display", "block");
			$("#radioE").css("display", "block");
			$("#ismarked").css("display", "block");
			
			$("#finishButton").focus();
        }
		
		// When user clicks Yes button
		$("#modalYesButton").click(() => {
			var data = { event: "Evet düğmesine basıldı (Modal). Sınav tamamlandı." };
			logEvent(data);
			$("#finishExamModal").css("display","none");
			$(".page-title").css("display", "none");
			$(".container").css("display", "none");
			$(".marked-questions-page").css("display", "none");
			$(".finish-page").css("display", "block");

			document.getElementById('finish-span').focus();
		});


        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
});