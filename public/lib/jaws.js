var rakamlar = {1:" bir", 2:" iki", 3:" üç", 4:" dört", 5:" beş", 6:" altı", 7:" yedi", 8:" sekiz", 9:" dokuz"} ;
var onlar = {0:"", 1:" on", 2:" yirmi", 3:" otuz", 4:" kırk", 5:" elli", 6:" altmış", 7:" yetmiş", 8:" seksen", 9:" doksan"} ;
var inciler = {1:" birinci", 2:" ikinci", 3:" üçüncü", 4:" dördüncü", 5:" beşinci", 6:" altıncı", 7:" yedinci", 8:" sekizinci", 9:" dokuzuncu", 10:" onuncu", 20:" yirminci", 30:" otuzuncu", 40:" kırkıncı", 50:" ellinci", 60:" altmışıncı", 70:" yetmişinci", 80:" sekseninci", 90:" doksanıncı", 100: "yüzüncü"} ;

var soruNo;

function bindJAWSFunctions()
{
    $('#jawsTekrarBak').bind("click",tekrarBakIsaretle) ;
    $('#jawsOncekiSoru').bind("click",oncekiSoru) ;
    $('#jawsSonrakiSoru').bind("click",sonrakiSoru) ;


    $('#jawsSecenekA').bind("click",secenekA) ;
    $('#jawsSecenekB').bind("click",secenekB) ;
    $('#jawsSecenekC').bind("click",secenekC) ;
    $('#jawsSecenekD').bind("click",secenekD) ;
    $('#jawsSecenekE').bind("click",secenekE) ;
    $('#jawsSecenekBos').bind("click",secenekBos) ;
    $('#jawsIncreaseFont').bind("click",increaseFont) ;
    $('#jawsDecreaseFont').bind("click",decreaseFont) ;

    $('#jawsModHepsi').bind("click",modeHespi) ;
    $('#jawsModBos').bind("click",modeBoslar) ;
    $('#jawsModTekrarBak').bind("click",modeTekrarBakilacaklar) ;
    $('#jawsModIsaretli').bind("click",modeIsaretlenenler) ;

    $('#jawsAnlikDurum').bind("click",getAnlikDurum) ;

    $('#SinavTamamlaModal').on('shown.bs.modal', function () {
        $('#tcKimlikConfirm').focus();
    })

    $('#jawsModSinaviSonlandir').bind("click",sinaviSonlandir) ;

    $('#tcKimlikConfirm').bind("keypress",sinavSonlandirOnay) ;

}




function updateBuffer()
{
//    alert("Lütfen Insert + Escape tuşları ile ekranı yenileyiniz.")
    $('#soruNumarasiDiv').focus();
}


function getAnlikDurum(e){
    e.preventDefault();

    var messageAnlikDurum = "";
    try {
        $("#anlikDurumA").click();
    } catch (e) {

    }

    setTimeout(function () {
        try {
            var kapatButton = $("#anlikDurumKapat");
            var currentTestAdi = $("#currentTestAdi").val();

            var ortalamaSure = getZaman($("#anlikDurumOrtalamaSure").text());
            var messageOrtalamaSure = ", Ortalama bir soru için harcanan süre, " + ortalamaSure[1] + " dakika, " + ortalamaSure[2] + " saniye";
            var toplamSoru = parseInt($('#anlikDurumToplamSoru-'+currentTestAdi).text());
            var cevaplananSoru = parseInt($('#anlikDurumCevaplananSoru-'+currentTestAdi).text());
            var kalanSoru = parseInt($('#anlikDurumKalanSoru-'+currentTestAdi).text());

            debugger;
            messageAnlikDurum = "Anlık durum" +
                ". Toplam soru sayısı " + getSayi(toplamSoru) +
                ". Cevaplanan soru sayısı " + getSayi(cevaplananSoru) +
                ". Kalan soru sayısı " + getSayi(kalanSoru) +
                messageOrtalamaSure;


            kapatButton.click();

        } catch (e) {

        }
        $('#anlikDurumDiv').html("<h6>" + messageAnlikDurum + "</h6><input type=\"hidden\" value=\""+currentTestAdi+"\" id=\"currentTestAdi\" />");
    }, 1500);

}



function sinaviSonlandir()
{
    $('#sinaviTamamlaButton').click();
}

function sinavSonlandirOnay (e){
    var text = $("#tcKimlikConfirm").val();
    if (e.keyCode <= 57 && e.keyCode >= 48 )
    {
        return true;
    }
    if (text.length > 0 && e.keyCode == 13 )
    {
        $("#sinaviSonlandir").click();
    }

    return false;
}

function modeHespi(e){
    e.preventDefault();
    location.href = "/adaycontroller/modechangemp?mode=HEPSI";
}
function modeBoslar(e){
    e.preventDefault();
    location.href = "/adaycontroller/modechangemp?mode=BOS_BIRAKILANLAR";
}
function modeTekrarBakilacaklar(e){
    e.preventDefault();
    location.href = "/adaycontroller/modechangemp?mode=TEKRAR_BAKILACAKLAR";
}
function modeIsaretlenenler(e){
    e.preventDefault();
    location.href = "/adaycontroller/modechangemp?mode=ISARETLENENLER";
}

function tekrarBakIsaretle(e){
    e.preventDefault();
    $("#tekrarBakCB").click();
}
function oncekiSoru(e){
    e.preventDefault();
    $("#slideOnceki").click();
    updateBuffer();
}
function sonrakiSoru(e){
    e.preventDefault();
    $("#slideSonraki").click();
    updateBuffer();
}


function secenekA(e){
    e.preventDefault();
    var aSecenegi = $("input[name=isaretlenenSecenek]")[0];

    if(!aSecenegi.checked)
    {
        aSecenegi.click();
    }
}
function secenekB(e){
    e.preventDefault();
    var bSecenegi = $("input[name=isaretlenenSecenek]")[1];
    if(!bSecenegi.checked)
    {
        bSecenegi.click();
    }
}
function secenekC(e){
    e.preventDefault();
    var cSecenegi = $("input[name=isaretlenenSecenek]")[2];
    if(!cSecenegi.checked)
    {
        cSecenegi.click();
    }
}
function secenekD(e){
    e.preventDefault();
    var dSecenegi = $("input[name=isaretlenenSecenek]")[3];
    if(!dSecenegi.checked)
    {
        dSecenegi.click();
    }
}
function secenekE(e){
    e.preventDefault();
    var eSecenegi = $("input[name=isaretlenenSecenek]")[4];
    if(!eSecenegi.checked)
    {
        eSecenegi.click();
    }
}
function secenekBos(e){
    e.preventDefault();
    var isaretlenenSecenek = $("input:checked[name=isaretlenenSecenek]")[0];
    if(isaretlenenSecenek != null)
    {
        isaretlenenSecenek.click();
    }
}
function increaseFont(e){
    e.preventDefault();
    $('#increaseFont').click();
}
function decreaseFont(e){
    e.preventDefault();
    $('#decreaseFont').click();
}


function getinci(soruNo)
{
    soruNo = (soruNo+"").trim();
    var soruNoCharArray = soruNo.split('');
    var inci = "";
    if(soruNoCharArray.length>=3)
    {
        var yuzlerBasamagi = soruNoCharArray[0];
        if(soruNo == 100)
        {
            return inciler[100];
        }
        else if(yuzlerBasamagi>1){
            inci += getRakam(yuzlerBasamagi);
        }
        inci += " yüz";
    }
    if(soruNoCharArray.length>=2)
    {
        var onlarBasamagi = soruNoCharArray[soruNoCharArray.length - 2];
        var birlerBasamagi = soruNoCharArray[soruNoCharArray.length - 1];

        if(birlerBasamagi==0)
        {
            inci += inciler[onlarBasamagi+birlerBasamagi]
        }
        else
        {
            inci += onlar[onlarBasamagi];
        }
    }
    if(soruNoCharArray.length>=1)
    {
        var birlerBasamagi = soruNoCharArray[soruNoCharArray.length - 1];

        if(birlerBasamagi>0)
        {
            inci += inciler[birlerBasamagi]
        }
    }
    return inci;
}

function getZaman(timeText)
{
    var splittedTimeText = timeText.split(":");
    var saat = splittedTimeText[0];
    var dakika = splittedTimeText[1];
    var saniye = splittedTimeText[2];

    return[getSayi(saat),getSayi(dakika),getSayi(saniye)];
}

function getSayi(sayi)
{

    if(sayi*1 == 0)
    {
        return "Sıfır";
    }else
    {
        sayi = (sayi + "").trim();
    }

    var sayiText = "";
    if(sayi.length>=3)
    {
        var yuzlerBasamagi = sayi[0];

        if(yuzlerBasamagi>1){
            sayiText += getRakam(yuzlerBasamagi);
        }
        sayiText += " yüz";
    }
    if(sayi.length>=2)
    {
        var onlarBasamagi = sayi[sayi.length - 2];
        var birlerBasamagi = sayi[sayi.length - 1];

        sayiText += onlar[onlarBasamagi];

    }
    if(sayi.length>=1)
    {
        var birlerBasamagi = sayi[sayi.length - 1];

        if(birlerBasamagi>0)
        {
            sayiText += rakamlar[birlerBasamagi]
        }
    }
    return sayiText;
}


function getRakam(rakam)
{
    return rakamlar[rakam];
}