var examHour = 1;
var examMinute = 30;
var numOfGenQuestions = 11;


//var questionText = 'Hikâyecilikte en eski tarz olan açıklama yolunu bırakmıştır. O, hikâyelerinde anlattığı halkımızı yakından tanımış, sorunlarını, düşüncelerini öğrenmiş, rahatça tasvir etmiştir. Bu değerlendir-meler, onun romancılığı için de geçerlidir. Eserlerinde halk konuşmalarının tüm güzelliğini sade bir dille vermiştir. Hikâyeleri arasında Otlakçı, romanları arasında ise Ayaşlı ve Kiracıları çok bilinmektedir.';
var questionText = 'Hikâyecilikte en eski tarz olan açıklama yolunu bırakmıştır. ';

var o1Text = 'A) Gözümde bir damla su, güçlü deniz olup taşıyor Çöllerde kalmış gibi yanıyor, yanıyorum';
var o2Text = 'B) Özlediğin hayatı buldun mu bilmem Gözlerinde hâlâ hüzün var gibi';
var o3Text = 'C) Nazlı yârdan kem haberler geliyor Dostlarım ağlıyor, düşman gülüyor';
var o4Text = 'D) Küçük bir çeşmeyim yurdumun Unutulmuş bir dağında';

var qArr = [];

function createQuestions(){
    for(var i=1;i<=numOfGenQuestions;i++){
       qArr[i] = {
            id: i,
            text : questionText  + " " + i,
            o1Text: o1Text + " " + i,
            o2Text: o2Text  + " " + i,
            o3Text: o3Text + " " + i,
            o4Text: o4Text + " " + i,
            answer: undefined,
            marked: false
       };
    }
}

function saveQuestion(){
    let qid = $("#qNumDiv").text();
    let q = qArr[parseInt(qid)];
    if(q){
        q.marked = $("#ismarked").is(':checked');
        q.answer = $("input[name=qValue]:checked").val();
    }
    return qid;
}
function loadQuestion(qid, focus){
    
    $('input[name="qValue"]').prop('checked', false);
    $('#ismarked').prop('checked', false);
    // $('#ismarked').removeAttr('checked');
    
    let q = qArr[qid];
    if(q){
        if(q.answer){
            $("input[name=qValue][value=" +q.answer + "]").prop('checked', true);
        }
        if(q.marked){
            $("#ismarked").prop('checked', q.marked);
        }
        
        $("#qNumDiv").text(q.id);
        $("#question").text(q.text);
        $("#oA").text(q.o1Text);
        $("#oB").text(q.o2Text);
        $("#oC").text(q.o3Text);
        $("#oD").text(q.o4Text);
        
        
        $("#ismarkedlabel").text("Soru " + q.id + " Tekrar Bakılacak Mı?");

        updateSummary(q.id);

        if(focus !== false){
            document.getElementById('qSummaryDiv').focus();
        }
    }
}


function updateSummary(qid){
    let q = qArr[qid];
    if(q){
        let sum = "Soru " + q.id + ", Cevaplanan Seçenek " + (q.answer ? q.answer : "Yok") + ", Tekrar bakılacak mı "+ (q.marked ? "Evet" : "Hayır");
        $("#qSummaryDiv").text(sum);
    }
}

function markQuestion(){
    let qid = saveQuestion();
    updateSummary(qid);
}

function answerQuestion(){
    var qid = saveQuestion();
    updateSummary(qid);
}

function nextQuestion(){
    saveQuestion();
    let id = $("#qNumDiv").text();
    loadQuestion(parseInt(id)+1);
}

function prevQuestion(){
    saveQuestion();
    let id = $("#qNumDiv").text();
    loadQuestion(parseInt(id)-1);
}



$(function () {


        $("#nextQuestion").on("click", nextQuestion);
        $("#prevQuestion").on("click", prevQuestion);
        $("#ismarked").on("click", markQuestion);
        $("#radioA").on("click", answerQuestion);
        $("#radioB").on("click", answerQuestion);
        $("#radioC").on("click", answerQuestion);
        $("#radioD").on("click", answerQuestion);


        createQuestions();

        saveQuestion();
        loadQuestion(1, false);


        setTimeout(function(){
            document.getElementById('pageTitleSpan').focus();
        },250)

});