var markId = "markButton";
var examHour = 1;
var examMinute = 30;
var numOfGenQuestions = 44;

var questionText = ' Yazarın hikâyelerindeki karakterler, çoğunlukla zor koşullar altında yaşayan insanlardır. O, var olma '+
'mücadelesi içindeki bu karakterleri, güçlü bir gözlem yeteneğine ve içgörüye dayanarak son derece '+
'kanlı canlı biçimde betimler. Hatta yakın arkadaşı olan Cemal Süreya, onun hikâyelerindeki kişiler '+
'için şöyle der: “Onun kişilerine iğne batırsan kan çıkar.” ';

var o1Text = 'A) Gözümde bir damla su, deniz olup taşıyor Çöllerde kalmış gibi yanıyor, yanıyorum';
var o2Text = 'B) Özlediğin hayatı buldun mu bilmem Gözlerinde hâlâ hüzün var gibi';
var o3Text = 'C) Nazlı yârdan kem haberler geliyor Dostlarım ağlıyor, düşman gülüyor';
var o4Text = 'D) Küçük bir çeşmeyim yurdumun Unutulmuş bir dağında';

function createQuestions(){
    
    var $qdiv = $("#questions-div")
    $qdiv.html("");

    for(var i=1;i<=numOfGenQuestions;i++){
        var $h3 = $("<h3>").appendTo($qdiv);
        $h3.html("Soru "+i);
        var $section = $("<section>").appendTo($qdiv);
        
        var $div1 = $("<div>").appendTo($section);
        var $h4 = $("<h4>").appendTo($div1);
        $h4.html("Soru "+i);
        var $p = $("<p>").appendTo($div1);
        $p.html(questionText);
        
        var $div2 = $('<div class="eso-options"   >').appendTo($section);
        var $input1 = $('<input type="radio" name="q'+i+'" id="q'+i+'-o1"  >').appendTo($div2);
        var $label1 = $('<label for="q'+i+'-o1" >').appendTo($div2);
        $label1.html(o1Text);
        var $input2 = $('<input type="radio" name="q'+i+'" id="q'+i+'-o2"  >').appendTo($div2);
        var $label2 = $('<label for="q'+i+'-o2" >').appendTo($div2);
        $label2.html(o2Text);
        var $input3 = $('<input type="radio" name="q'+i+'" id="q'+i+'-o3"  >').appendTo($div2);
        var $label3 = $('<label for="q'+i+'-o3" >').appendTo($div2);
        $label3.html(o3Text);
        var $input4 = $('<input type="radio" name="q'+i+'" id="q'+i+'-o4"  >').appendTo($div2);
        var $label4 = $('<label for="q'+i+'-o4" >').appendTo($div2);
        $label4.html(o4Text);
    }

}


function resizeJquerySteps() {
    // $('.wizard .content, .wizard .steps').animate({ height: $('.body.current').outerHeight() - 10 }, "slow");
    // var headerHeight = 280;
    var headerHeight = parseInt($('.eso-header').outerHeight());
    headerHeight += parseInt($('#eso-menu-tabs .ui-tabs-nav').outerHeight());
    headerHeight += parseInt($('#questions-div .actions').outerHeight());
    headerHeight += 50;
    $('.wizard .content, .wizard .steps').animate({ height: ($(window).height() - headerHeight)+"px" }, "slow");
    $('#empty-questions, #marked-questions').animate({ "max-height": ($(window).height() - headerHeight)+"px" }, "slow");


}

$(window).resize(resizeJquerySteps);


function setMarkButtonValue() {
    var isMarked = $("section.current.body ").attr("marked")
    $("#" + markId).prop("checked", isMarked === "true" ? true : false);
    $("#" + markId).checkboxradio("refresh");
}

$(function () {


    var remainingTime = examHour * 60 * 60 + examMinute * 60;

    var clock = $('.eso-countup').FlipClock({
        // ... your options here
        clockFace: 'MinuteCounter',
        autoPlay: false
    });

    var clock = $('.eso-countdown').FlipClock(remainingTime, {
        countdown: true,
        clockFace: 'MinuteCounter',
        autoPlay: false
    });

    //soruları html dosyasından anasayfaya yükle
    $("#questions-div").load("questions.html", function () {
        //menüyü tab olarak oluştur

        createQuestions();

        $('#eso-menu-tabs').tabs({
            activate: function (event, ui) {
                var tabid = ui.newPanel.attr("id");

                //işareti sorular tabı seçilmisse
                if(tabid == "marked-questions"){
                    var $markedQues = $("#marked-questions");
                    $markedQues.html("");
                    var $ul = $("<ul>").appendTo($markedQues);
                    
                    $("section[marked=true]").each(function(){
                        var linkId = $(this).attr("aria-labelledby");
                        var $li = $("<li>").appendTo($ul);
                        var $a = $('<a href="#'+linkId+'" >').appendTo($li);
                        $a.html($("#"+linkId).html());
                        
                        // "questions-div-t-"
                        $a.click(()=>{
                            $( "#eso-menu-tabs" ).tabs({ active: 0 });
                            var tmparr = linkId.split("-");
                            var qNum = parseInt(tmparr[tmparr.length-1]);
                            console.log(qNum);
                            $("#questions-div").steps("goto", qNum);
                        });
                    });
                }
                
                //boş sorular tabı seçilmisse
                if(tabid == "empty-questions"){
                    var a = []; 
                    $("section input[type=radio]").each((e, el)=>{ a.push($(el).attr("name"))})
                    a = jQuery.unique(a);

                    
                    var $emptyQues = $("#empty-questions");
                    $emptyQues.html("");
                    var $ul = $("<ul>").appendTo($emptyQues);
                    
                    $.each(a, function(index, qid){
                        $radiogroup = $("input[name="+qid+"]");
                        if(!$radiogroup.is(":checked")){
                            
                            var $section = $radiogroup.parent().parent();
                            var linkId = $section.attr("aria-labelledby");
                            var $li = $("<li>").appendTo($ul);
                            var $a = $('<a href="#'+linkId+'" >').appendTo($li);

                            $a.html($("#"+linkId).html());
                            
                            // "questions-div-t-"
                            $a.click(()=>{
                                $( "#eso-menu-tabs" ).tabs({ active: 0 });
                                var tmparr = linkId.split("-");
                                var qNum = parseInt(tmparr[tmparr.length-1]);
                                console.log(qNum);
                                $("#questions-div").steps("goto", qNum);
                            });
                        }
                    });


                }

            }
        });


        //soruları adım haline getir
        $("#questions-div").steps({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            autoFocus: true,
            stepsOrientation:"vertical",
            enableAllSteps: true,
            labels: {
                current: "Adım:",
                pagination: "Sayfalama",
                finish: "Bitir",
                next: "Sonraki",
                previous: "Önceki",
                loading: "Yükleniyor ..."
            },
            onStepChanged: function (event, currentIndex, priorIndex) {
                resizeJquerySteps();

                setMarkButtonValue();

            },
            onInit: function (event, currentIndex, priorIndex) {
                resizeJquerySteps();
            }
        });

        //soru seçeneklerini jquery radio yap
        $(".eso-options input").checkboxradio();


        //işaretle butonu ekle

        var $input = $('<li><label id="' + markId + 'Label" for="' + markId + '">İşaretle</label><input type="checkbox" name="" id="' + markId + '"></li>');
        $input.prependTo($('ul[aria-label=Sayfalama]'));
        $("#" + markId).checkboxradio().click(function (event) {
            $("section.current.body ").attr("marked", $(this).is(":checked"));
        });


        //font size
        jQuery(document).ready(function($) {
            $('#eso-cont').fontsizes({ 
                fontSizes: ['100%', '125%', '150%', '200%', '250%'],
                menuContainer: $('#font-size-menu'),
                includeChildren: ['h1', 'h2', 'h3', 'h4', 'h5']
                });
        });

    });



});