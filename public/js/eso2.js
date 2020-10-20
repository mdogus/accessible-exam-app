var examHour = 1;
var examMinute = 30;
var numOfGenQuestions = 11;
var countdowntime = 1000 * 60 * 60;

// var questionText = 'Hikâyecilikte en eski tarz olan açıklama yolunu bırakmıştır. O, hikâyelerinde anlattığı halkımızı yakından tanımış, sorunlarını, düşüncelerini öğrenmiş, rahatça tasvir etmiştir. Bu değerlendir-meler, onun romancılığı için de geçerlidir. Eserlerinde halk konuşmalarının tüm güzelliğini sade bir dille vermiştir. Hikâyeleri arasında Otlakçı, romanları arasında ise Ayaşlı ve Kiracıları çok bilinmektedir.';
// // var questionText = 'Hikâyecilikte en eski tarz olan açıklama yolunu bırakmıştır. ';

// var o1Text = 'A) Gözümde bir damla su, güçlü deniz olup taşıyor Çöllerde kalmış gibi yanıyor, yanıyorum';
// var o2Text = 'B) Özlediğin hayatı buldun mu bilmem Gözlerinde hâlâ hüzün var gibi';
// var o3Text = 'C) Nazlı yârdan kem haberler geliyor Dostlarım ağlıyor, düşman gülüyor';
// var o4Text = 'D) Küçük bir çeşmeyim yurdumun Unutulmuş bir dağında';

// var qArr = [];

// function createQuestions() {
//     for (var i = 1; i <= numOfGenQuestions; i++) {
//         qArr[i] = {
//             id: i,
//             text: questionText + " " + i,
//             o1Text: o1Text + " " + i,
//             o2Text: o2Text + " " + i,
//             o3Text: o3Text + " " + i,
//             o4Text: o4Text + " " + i,
//             answer: undefined,
//             marked: false
//         };
//     }
// }

function getCurrQuestionId(){
    let qNumText = $("#qNumDiv").text();
    return parseInt(qNumText.split(' ')[1]);
}

function saveQuestion() {
    let qid = getCurrQuestionId();
    let q = qArr[qid];
    if (q) {
        q.marked = $("#ismarked").is(':checked');
        q.answer = $("input[name=qValue]:checked").val();
    }
    return qid;
}

function loadQuestion(qid, focus) {

    $('input[name="qValue"]').prop('checked', false);
    $('#ismarked').prop('checked', false);
    // $('#ismarked').removeAttr('checked');

    let q = qArr[qid];
    if (q) {
        if (q.answer) {
            $("input[name=qValue][value=" + q.answer + "]").prop('checked', true);
        }
        if (q.marked) {
            $("#ismarked").prop('checked', q.marked);
        }

        $("#qNumDiv").text("Soru "+q.id);
        $("#question").html(q.text);
        $("#oA").text(q.o1Text);
        $("#oB").text(q.o2Text);
        $("#oC").text(q.o3Text);
        $("#oD").text(q.o4Text);

        //update summary
        let sum = "Soru " + q.id + " Tekrar Bakılacak Mı?";
        //$("#ismarkedlabel").text("Soru " + q.id + " Tekrar Bakılacak Mı?");
        $("#ismarkedlabel").attr("aria-label", sum);
        updateSummary(q.id);

        if (focus !== false) {
            document.getElementById('qSummaryDiv').focus();
        }
    }
}

function updateSummary(qid) {
    let q = qArr[qid];
    if (q) {
        let sum = "Soru " + q.id + ", Cevaplanan Seçenek: " + (q.answer ? q.answer : "Yok") + ", Tekrar bakılacak mı: " + (q.marked ? "Evet" : "Hayır");
        $("#qSummaryDiv").text(sum);
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

var fontSize = 13;
function changeFontSize(fontSize) {
    console.log("cfs: " + fontSize);
    if (fontSize <= 36 && fontSize >= 14) {
        $('#eso-cont').css("font-size", fontSize + "px");
        $('#eso-cont').css("line-height", (fontSize * 1.4) + "px");

        $('#eso-cont .question-number').css("font-size", fontSize * 1.5 + "px");
        $('#eso-cont .question-number').css("line-height", (fontSize * 1.5 * 1.4) + "px");

        $('#eso-cont input[type=button]').css("font-size", fontSize + "px");
        $('#eso-cont input[type=button]').css("line-height", (fontSize * 1.4) + "px");

        $('#eso-cont button img').css("width", fontSize * 1.2 + "px");

        $('#eso-cont select').css("font-size", (fontSize) + "px");
        $('#eso-cont select').css("line-height", (fontSize * 1.4) + "px");

        $('#fontSize').html(fontSize + " px");
    }
}

function getFontSize() {
    var fontText = $("#fontSize").text();
    if (fontText == "") {
        fontText = 14;
    }
    return parseInt(fontText);
}


function showMarkedQuesitionsPage() {
    $(".page-title").css("display", "none");
    $(".container").css("display", "none");
    $(".marked-questions-page").css("display", "block");
    
    if (focus == false) {
        document.getElementByClassName('marked-questions-page').focus();
    }
}

function showExamPage() {
    $(".page-title").css("display", "block");
    $(".container").css("display", "block");
    $(".marked-questions-page").css("display", "none");
    
    document.getElementById('qSummaryDiv').focus();
}

$(function () {


    $("#nextQuestion").on("click", nextQuestion);
    $("#prevQuestion").on("click", prevQuestion);
    $("#ismarked").on("click", markQuestion);
    $("#radioA").on("click", answerQuestion);
    $("#radioB").on("click", answerQuestion);
    $("#radioC").on("click", answerQuestion);
    $("#radioD").on("click", answerQuestion);


    // createQuestions();

    saveQuestion();
    loadQuestion(1, false);


    setTimeout(function () {
        document.getElementById('pageTitleSpan').focus();
    }, 250)



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

    //select font
    $('#fonts').change(function () {
        $("#eso-cont").removeClass();
        $("#eso-cont").addClass("font_" + this.selectedIndex);
    });

    //theme
    $('#themes').change(function () {
        let selectedTheme = $('#themes').find(":selected").val();
        $("body").removeClass();
        $("body").addClass(selectedTheme);
    });


    setInterval(() => {
        countdowntime -= 1000;
        var minutes = Math.floor((countdowntime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((countdowntime % (1000 * 60)) / 1000);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        $("#remainingTime").html("KALAN SÜRE " + minutes + ":" + seconds);
        $("#remainingTimeLabel").html("Kalan Süre: " + minutes + " dakika, " + seconds + "saniye");

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
                qArr.forEach(function (q) {
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
        qArr.forEach(function (q) {
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
    
    //Sınava Dön düğmesine basıldığında
    $("#backToExamButton").click(function (e) {
        showExamPage();
    });

    //Sınavı Bitir düğmesine basıldığında
    $("#finishButton").click(function (e) {
        $(".container").css("display", "none");
        $(".marked-questions-page").css("display", "none");
        $(".finish-page").css("display", "block");

        document.getElementById('finish-span').focus();
    });
});
