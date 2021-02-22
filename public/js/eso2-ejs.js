//cd Documents/eso/thawing-bayou-91800
var examHour = 1;
var examMinute = 30;
var numOfGenQuestions = 11;
var countdowntime = 1000 * 60 * 30;
var qSummary;
// alert text
var alertQSummaryText;
// counts
var markedQuestionsCount = 0;
var unansweredQuestionsCount = 0;
// Timers
var qTimer;
var qTimerValue = 0;
var examTimer;
var examTimerValue = 0;
// mean
var nextQCount = 0;
var qTimerValueSum = 0;

function getCurrQuestionId(){
    let qNumText = $("#qNumDiv").text();
    return parseInt(qNumText.split(' ')[1]);
}

function getCurrentQuestion() {
	var id = getCurrQuestionId();
	var q = questionArr[id];
	return q;
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
	// question timer
	setInterval(() => {
		qTimerValue += 1000;
        var minutes = Math.floor((qTimerValue % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((qTimerValue % (1000 * 60)) / 1000);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
		
        qTimer = minutes + ':' + seconds;

    }, 1000);
    
	// Display question
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
        let sumNotChecked = "Soru " + q.id + ", Cevaplanan Seçenek: Yok, Tekrar bakılacak mı: " + (q.marked ? "Evet" : "Hayır");
		var answerCheckedLog = q.answer + " seçeneği işaretlendi. (" + qTimer + ")";
        //var isMarkedLog = "Soru " + q.id + ": Tekrar bakılacak mı: " + (q.marked ? "Evet" : "Hayır");
        
        if ($("input[name='qValue']:radio").is(":checked")) {
			logEvent(answerCheckedLog);
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
	
	var qTimerMean;
	nextQCount += 1;
	qTimerValueSum += qTimerValue;
	var meanValue = qTimerValueSum / nextQCount;
	var minutes = Math.floor((meanValue % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((meanValue % (1000 * 60)) / 1000);
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	qTimerMean = minutes + ':' + seconds;
	var nextQuestionLog = "Sonraki Soru düğmesine basıldı: Soru " + (id + 1) + " görüntülendi. (Ortalama: " + qTimerMean + ")";
	var summaryLog = "Özet: " + qSummary + ", Harcanan Süre: " + qTimer;
    logEvent(nextQuestionLog);
	logEvent(summaryLog);
	qTimerValue = 0;
}

function prevQuestion() {
    saveQuestion();
    let id = getCurrQuestionId();
    loadQuestion(parseInt(id) - 1);
	
	var prevQuestionLog = "Önceki Soru düğmesine basıldı: Soru " + (id + 1) + " görüntülendi.";
	var summaryLog = "Özet: " + qSummary + ", Harcanan Süre: " + qTimer;
    logEvent(prevQuestionLog);
	logEvent(summaryLog);
	qTimerValue = 0;
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
	
	//$(".marked-questions-div").html("");
	//$(".unanswered-questions-div").html("");
	listMarkedQuestions();
	listUnansweredQuestions();
	if(markedQuestionsCount === 0) {
		$(".marked-questions-div").html("Tekrar bakılacak soru bulunmamaktadır.");
	}
	if(unansweredQuestionsCount === 0) {
		$(".unanswered-questions-div").html("Cevaplanmayan soru bulunmamaktadır.");
	}
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
// List marked questions
function listMarkedQuestions() {
	markedQuestionsCount = 0;
	$(".marked-questions-div").html("");
	var $ul = $("<ul>").appendTo($(".marked-questions-div"));
	questionArr.forEach(function (q) {
            if (q.marked) {
				markedQuestionsCount += 1;
				var selectedMarkedQuestion = "Soru " + q.id;
				var selectedMarkedQuestionLog = "Tekrar Bakılacak Sorular: " + selectedMarkedQuestion + " düğmesine basıldı. " + selectedMarkedQuestion + " görüntülendi. (" + qTimer + ")";
                var $li = $('<li>').appendTo($ul);
                var $a = $('<a  role="button" href="#' + q.id + '">').appendTo($li);
                $a.html("Soru " + q.id);

                $a.click((e) => {
					logEvent(selectedMarkedQuestionLog);
                    showExamPage();
                    loadQuestion($(e.target).html().split(" ")[1]);
                });
            }
        });
}// List unanswered questions
function listUnansweredQuestions() {
	unansweredQuestionsCount = 0;
	$(".unanswered-questions-div").html("");
	var $ul = $("<ul>").appendTo($(".unanswered-questions-div"));
	questionArr.forEach(function (q) {
			if (!q.answer) {
				unansweredQuestionsCount += 1;
				var selectedUnansweredQuestion = "Soru " + q.id;
				var selectedUnansweredQuestionLog = "Cevaplanmamış Sorular: " + selectedUnansweredQuestion + " düğmesine basıldı. " + selectedUnansweredQuestion + " görüntülendi. (" + qTimer + ")";
				var $li = $('<li>').appendTo($ul);
                var $a = $('<a  role="button" href="#' + q.id + '">').appendTo($li);
                $a.html("Soru " + q.id);

                $a.click((e) => {
					logEvent(selectedUnansweredQuestionLog);
                    showExamPage();
                    loadQuestion($(e.target).html().split(" ")[1]);
                });
            }
        });
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
		let q = getCurrentQuestion();
		var answerNotCheckedLog = q.answer + " seçeneğinin işareti kaldırıldı. (" + qTimer + ")";

        if (previousValue == 'checked') {
			if(typeof (q.answer) !== "undefined") {
				logEvent(answerNotCheckedLog);
			}
			$(this).removeAttr('checked');
            $(this).attr('previousValue', false);
            $(this).prop("checked", false);
            q.answer = undefined;
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

function logEvent(event) {
    var data = { event: event };
	
	$.ajax({
        type: "POST",
        url: "/exam",
        data: data
        /*success: function(response) {
            console.log(response);
            //alert(response);
        }*/
    });
}

$(function () {
	// Alerts
	$("#alertQSummaryDiv").hide();
	$("#alertRemainingTimeDiv").hide();
	
	// Exam timer
    setInterval(() => {
		examTimerValue += 1000;
        var minutes = Math.floor((examTimerValue % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((examTimerValue % (1000 * 60)) / 1000);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
		
        examTimer = minutes + ':' + seconds;

    }, 1000);
	
	// Next question button
    $("#nextQuestion").click(() => {
        nextQuestion()
    });
	
	// Previous question button
    $("#prevQuestion").click(() =>  {
        prevQuestion();
    });
	
	// Mark the question
    $("#ismarked").click(() => {
        markQuestion();
		var q = getCurrentQuestion();
		var isMarkedLog = "Soru " + q.id + ": Tekrar bakılacak mı: " + (q.marked ? "Evet" : "Hayır") + ", (" + qTimer + ")";
        
        logEvent("Tekrar Bak düğmesi işaretlendi. " + isMarkedLog);
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
		var newFontSize;
        changeFontSize(fontSize + 2);
        // resizeImagesAccordingToFontSize(fontSize);
		if (fontSize < 36) {
			newFontSize = fontSize + 2;
		} else if (fontSize == 36) {
			newFontSize = 36;
		}
		var increaseFontSizeLog = "Yazı Boyutu artırıldı: " + newFontSize + ", (" + qTimer + ")";
		logEvent(increaseFontSizeLog);
    });
	// Decrease font size
    $("#decreaseFont").click(function (e) {
        var fontSize = getFontSize();
		var newFontSize;
        changeFontSize(fontSize - 2);
        // resizeImagesAccordingToFontSize(fontSize);
		if (fontSize > 16) {
			newFontSize = fontSize - 2;
		} else if (fontSize == 16) {
			newFontSize = 16;
		}
		var decreaseFontSizeLog = "Yazı Boyutu azaltıldı: " + newFontSize + ", (" + qTimer + ")";
		logEvent(decreaseFontSizeLog);
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
    
    // theme
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
		
		var selectedThemeLog = "Tema değiştirildi: " + selectedThemeText + ", (" + qTimer + ")";
		logEvent(selectedThemeLog);
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
		
		var selectedFontLog = "Yazı Tipi değiştirildi: " + selectedFontText + ", (" + qTimer + ")";
		logEvent(selectedFontLog);
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
	// Alt + E: Erişilebilirlik ayarları
    $(document).keydown(function(event) {
		if (event.altKey === true){
			if (event.keyCode == 69){
				var shortcutAltPlusELog = "Alt + E kısayol tuşuna basıldı. Erişilebilirlik Ayarları sayfası görüntülendi. (" + qTimer + ")";
				logEvent(shortcutAltPlusELog);
				showAccessibilityPage();
			}
		}
	});
	// Alt + S: Soru özeti
    $(document).keydown(function(event) {
		if (event.altKey === true) {
			if (event.keyCode == 83) {
				var shortcutAltPlusSLog = "Alt + S kısayol tuşuna basıldı. Soru özeti okundu. (" + qTimer + ")";
				logEvent(shortcutAltPlusSLog);
				var text = $("#qSummaryDiv").text();
				$("#alertQSummaryDiv").show().text(text);
				//$("#alertQSummaryDiv").attr("tabindex","0");
				$("#alertQSummaryDiv").delay(100).slideUp();
			}
		}
	});
    // Alt + K: Kalan süre
    $(document).keydown(function(event){
		if(event.altKey === true) {
			if(event.keyCode == 75) {
				var shortcutAltPlusKLog = "Alt + K kısayol tuşuna basıldı. Kalan süre okundu. (" + qTimer + ")";
				logEvent(shortcutAltPlusKLog);
				var text = $("#remainingTimeLabel").text();
				$("#alertRemainingTimeDiv").show().text(text);
				$("#alertRemainingTimeDiv").attr("tabindex","0");
				$("#alertRemainingTimeDiv").delay(100).slideUp();
			}
		}
	});
    // Alt + G: Gözden geçir sayfası
    $(document).keydown(function(event){
        if(event.altKey === true){
            if(event.keyCode == 71){
				var shortcutAltPlusGLog = "Alt + G tuşuna basıldı. Gözden Geçir sayfası görüntülendi. (" + qTimer + ")";
				logEvent(shortcutAltPlusGLog);
				showMarkedQuestionsPage();
            }
        }
    });
	
	// Keyboard events
	if ($("#remainingTimeLabel").focus()) {
		$("#remainingTimeLabel").keydown((event) => {
			console.log(event.keyCode);
			var remainingTimeLabelKeyDownLog = "Kalan süre okundu (Tab tuşu ile).";
			//logEvent(remainingTimeLabelKeyDownLog);
		});
		//var remainingTimeLabelArrowKeyDownLog = "Kalan süre okundu (Arrow tuşu ile).";
		//logEvent(remainingTimeLabelArrowKeyDownLog);
	}
                                 
    // Tekrar Bakılacak Sorular düğmesine basıldığında
    $("#markedQuestionsButton").click(function (e) {
        var markedQuestionsButtonLog = "Gözden Geçir düğmesine basıldı. (" + qTimer + ")";
        logEvent(markedQuestionsButtonLog);
		showMarkedQuestionsPage();
    });
                                 
    // Erişilebilirlik düğmesi
    $("#accessibilityButton").click(function (e) {
		var accessibilityButtonLog = "Erişilebilirlik düğmesine basıldı. (" + qTimer + ")";
        logEvent(accessibilityButtonLog);
		showAccessibilityPage();
    });
	//Hidden accessibility button
                                 $("#hiddenAccessibilityButton").click(function (e) {
									 var hiddenAccessibilityButtonLog = "Erişilebilirlik (hidden) düğmesine basıldı. (" + qTimer + ")";
                                     logEvent(hiddenAccessibilityButtonLog);
									 showAccessibilityPage();
                                 });

    // Soruyu dinle
    $("#listenQuestion").click(function (e) {
        
		let audio = document.getElementById("qAudio");
        if (this.className == "pause") {
            $("#listenQuestion").attr("class", "listen");
            $("#listenQuestion").html("Soruyu Dinle");
            audio.pause();
            
            var listenQuestionPausedLog = "Soruyu Dinle durduruldu. (" + qTimer + ")";
			logEvent(listenQuestionPausedLog);
        } else {
            $("#listenQuestion").attr("class", "pause");
            $("#listenQuestion").html("Durdur");
			audio.play();
            
            var listenQuestionPlayedLog = "Soruyu Dinle düğmesine basıldı. (" + qTimer + ")";
			logEvent(listenQuestionPlayedLog);
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
            
    });
    // Seçenekleri dinle
    $("#listenOptions").click(function (e) {
        var audioOptions = document.getElementById("oAudio");
        
        if (this.className == "pause-options") {
            $("#listenOptions").attr("class", "listen-options");
            $("#listenOptions").html("Seçenekleri Dinle");
            audioOptions.pause();
            
            var listenOptionsPausedLog = "Seçenekleri Dinle durduruldu. (" + qTimer + ")";
			logEvent(listenOptionsPausedLog);
        } else {
            $("#listenOptions").attr("class", "pause-options");
            $("#listenOptions").html("Durdur");
            audioOptions.play();
            
            var listenOptionsPlayedLog = "Seçenekleri Dinle düğmesine basıldı. (" + qTimer + ")";
			logEvent(listenOptionsPlayedLog);
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
    });
                                 
    // Sınava Dön düğmesine basıldığında
    $("#backToExamButton").click(function (e) {
		var backToExamButtonLog = "Sınava Dön düğmesine basıldı (Gözden Geçir sayfasında). (" + qTimer + ")";
		logEvent(backToExamButtonLog);
        showExamPage();
        document.getElementById('qSummaryDiv').focus();
    });
    //Erişilebilirlik sayfasında Sınava Dön düğmesine basıldığında
    $("#accPageBackToExamButton").click(function (e) {
        var accPageBackToExamButtonLog = "Sınava Dön düğmesine basıldı (Erişilebilirlik Ayarları sayfasında). (" + qTimer + ")";
		logEvent(accPageBackToExamButtonLog);
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
	var examPageReadyLog = "Sınav sayfası görüntülendi.";
	logEvent(examPageReadyLog);
	// Get the modal
        var modal = document.getElementById("finishExamModal");
        // Get the button that opens the modal
        var finishButton = document.getElementById("finishButton");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal
        $("#finishButton").click(() => {
			var finishButtonLog = "Sınavı Bitir düğmesine basıldı. Modal görüntülendi: Sınavı bitirmek istediğinizden emin misiniz? (" + qTimer + ")";
			logEvent(finishButtonLog);
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
			var modalNoButtonLog = "Hayır düğmesine basıldı. Modal kapatıldı. (" + qTimer + ")";
			logEvent(modalNoButtonLog);
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
            var modalCloseButtonLog = "Kapat (x) düğmesine basıldı. Modal kapatıldı. (" + qTimer + ")";
			logEvent(modalCloseButtonLog);
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
			var modalYesLog = "Evet düğmesine basıldı (Modal). Sınav tamamlandı. (" + qTimer + ")";
			var examTimerLog = "Sınav tamamlama süresi: " + examTimer;
			var summaryLog = "Özet: " + (qSummary ? qSummary : "Yok") + ", Harcanan Süre: " + qTimer;
			logEvent(modalYesLog);
			logEvent(summaryLog);
			logEvent(examTimerLog);
			$("#finishExamModal").css("display","none");
			$(".page-title").css("display", "none");
			$(".container").css("display", "none");
			$(".marked-questions-page").css("display", "none");
			$(".finish-page").css("display", "block");
			$("#finish-span").html("Sınav tamamlandı. Katılımınız için teşekkür ederiz.<br>Sınavı tamamlama süreniz: " + examTimer);

			document.getElementById('finish-span').focus();
		});


        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
	
	$("#backToHomePageButton").click(() => {
		window.location.href = "/";
		var backToHomePageButtonLog = "Ana Sayfa'ya Dön düğmesine basıldı.";
		logEvent(backToHomePageButtonLog);
	});
});
