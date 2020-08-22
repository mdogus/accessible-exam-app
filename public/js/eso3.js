        Number.prototype.toHHMMSS = function () {
            sec_numb = parseInt(this);
            var hours = Math.floor(sec_numb / 3600);
            var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
            var seconds = sec_numb - (hours * 3600) - (minutes * 60);

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var time = hours + ':' + minutes + ':' + seconds;
            return time;
        }

        Number.prototype.toHHMM = function () {
            sec_numb = parseInt(this);
            var hours = Math.floor(sec_numb / 3600);
            var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            var time = hours + ':' + minutes;
            return time;
        }

        Number.prototype.toDakkaSaniye = function () {
            sec_numb = parseInt(this);

            var minutes = Math.floor(sec_numb / 60);
            var seconds = sec_numb % 60;

            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            return minutes + "<span style='font-size: 15px'>:" + seconds+"</span>";
        }

        Number.prototype.toDakka = function () {
            sec_numb = parseInt(this);

            if (sec_numb >= 60) {
                var minutes = Math.floor(sec_numb / 60);

                return minutes + ' dk';
            }
            else {
                return sec_numb + ' sn';
            }
        };

        function centerTheModal()
        {
            var modalLeft = ($(window).width() - $('.modal').width()) / 2;
            $('.modal').css("left",modalLeft);
        }

        function initModal() {
            var callCompleted = true; //(to prevent doubleclick) used for disabling ajax call again while it didn't finish the previus call

            // Support for AJAX loaded modal window.
            // Focuses on first input textbox after it loads the window.
            $('[data-toggle="modal"]').click(function (e) {
                e.preventDefault();
                var url = $(this).attr('href');

                if (url == null) {
                    return;
                }

                if (url.indexOf('#') == 0) {
                    $(url).modal('open');
                } else {
                    if (!callCompleted)
                        return;

                    callCompleted = false;
                    $.get(url, { "_":$.now() },
                            function (data) {
                                // centralize when a modal is shown
                                var modalWidth = 1060;
                                var modalLeft = ($(window).width() - modalWidth) / 2;
                                var modal = $('<div class="modal hide fade" data-backdrop="static" style=" transition: opacity 0.2s linear, top 0.2s ease-out; left: ' + modalLeft  +'px;">' + data + '</div>').modal();
                                modal.on('hidden', function () {
                                    modal.detach();
                                });

                                callCompleted = true;
                            }).success(function () {
                                $('input:text:visible:first').focus();
                            }).error(function () {
                                window.location.reload();
                            });
                }
            });
        }
        $(document).ready(function () {
                        initModal();
                        // centralize when a modal is shown
            $('.modal').on('show.bs.modal', function ()
                {
                    var modal = $(this);
                    modal.css("left", Math.max(0, ($(window).width() - modal.width()) / 2));
                }
            );
        });

        function showWaitDialog(text)
        {
            $("#waitDialogText").html(text);
            $("#pleaseWaitDialog").modal();
        }

        function openHomePage()
        {
            if(true)
            {
                window.location.href = "/";
            }
            else
            {
                window.location.href = "";
            }
        }

        function hideWaitDialog()
        {
            $('#pleaseWaitDialog').modal('hide');
        }

        function getFontSize() {
            var fontText = $("#fontSize").text();
            if(fontText == "")
            {
                fontText = 18;
            }
            return parseInt(fontText);
        }
        
function tekrarBak() {
    var url = "/adaycontroller/tekrarbakilacakolarakisaretle?tekrarBak=" + $("#tekrarBakCB").is(":checked");

    $.get(url, { "_":$.now() }, function (data) {
        afterResponse();
    })
            .error(function () {
                reloadCurrentSoru()
            });
}

function anaGorunum() {
    location.href = "/adaycontroller/modechange?mode=HEPSI&soruId=" + getSoruId() + "&highlights=" + getHighlights() + "&fontSize=" + getFontSize() + "&elenenSecenekler=" + getElenenSecenekler();
}

function reloadCurrentSoru() {
    location.href = "/adaycontroller/reopencurrentsoru";
}

function getSoruId() {
    var soruId = $("#soruId").val();
    if (soruId == undefined) {
        soruId = 722207;
    }

    return soruId;
}

function getElenenSecenekler() {
    var elenenSecenekler = "";
    $(".secenekler .secenek.eliminated").each(function (index) {
        var secenek = $(this).attr("id").substr(7, 1);
        if (elenenSecenekler != "") {
            elenenSecenekler += ";";
        }
        elenenSecenekler += secenek;
    });
    return elenenSecenekler;
}

function soruGetir(operation) {
    var url = "/adaycontroller/sorugetir?operation=" + operation + "&highlights=" + getHighlights() + "&fontSize=" + getFontSize() + "&elenenSecenekler=" + getElenenSecenekler();
    var direction = operation == "next" ? "right" : "left";
    $.get(url, { "_":$.now() },
            function (data) {
                $('#soruTemplateDiv').html(data);
                $('#soruNumarasiDiv').text($('#soruNumarasiAlani').val());
                $('#tekrarBakCB').prop('checked', $('#soruStarAlani').val() == "true");
                reHeight();
                $('#soruAlaniDiv').show("highlight", { direction:direction, color:'#acabaa' }, 600);
                setSeansBitisZamani(getSeansBitisZamani());
                afterResponse();
            })
            .error(function () {
                window.location.href = "/";
            });

}

function fillSoruIfadesi() {
    var selectedSecenek = $('.answer-radio:checked').val();
    var secenekText = $("#secenek" + selectedSecenek).text();
//    debugger;
    var parts = secenekText.split("/");
    if (secenekText.indexOf("-") != -1)
    {
       parts = secenekText.split("-");
    }
    // - degil de – ise yani minus sign vs. dash
    if (secenekText.indexOf("–") != -1)
    {
       parts = secenekText.split("–");
    }
    $(".bosluk").each(function (index) {
        $(this).text(parts[index]);
    });
    $('.elenebilir-cumle').removeClass("eliminated");
    $('span[target=secenek' + selectedSecenek + "]").addClass("eliminated");
}

function isaretle(radioButtonElement) {
    var isaretlenenSecenek = radioButtonElement.val();
    if ("A" == isaretlenenSecenek) {
        if ("A" == selectedValue) {
            radioButtonElement.prop('checked', false);
            selectedValue = "";
        } else {
            selectedValue = "A";
        }
    } else if ("B" == isaretlenenSecenek) {
        if ("B" == selectedValue) {
            radioButtonElement.prop('checked', false);
            selectedValue = "";
        }
        else selectedValue = "B";
    } else if ("C" == isaretlenenSecenek) {
        if ("C" == selectedValue) {
            radioButtonElement.prop('checked', false);
            selectedValue = "";
        }
        else selectedValue = "C";
    } else if ("D" == isaretlenenSecenek) {
        if ("D" == selectedValue) {
            radioButtonElement.prop('checked', false);
            selectedValue = "";
        }
        else selectedValue = "D";
    } else if ("E" == isaretlenenSecenek) {
        if ("E" == selectedValue) {
            radioButtonElement.prop('checked', false);
            selectedValue = "";
        }
        else selectedValue = "E";
    }

    var url = "/adaycontroller/isaretle?isaretlenenSecenek=" + selectedValue;

    $.get(url, { "_":$.now() }, function (data) {
    })
            .success(function () {

                var soruNo = $('#soruNumarasiAlani').val();

                if (selectedValue != "") {
                    var secenekText = $("#secenek" + isaretlenenSecenek).text();
                    $("#clausetest" + soruNo).text("(" + soruNo + ") " + secenekText);
                    $("#clausetest" + soruNo).css("display", "");
                    $("#isaretlenmemisClausetest" + soruNo).css("display", "none");
                    fillSoruIfadesi();
                } else {
                    $("#clausetest" + soruNo).css("display", "none").text("");
                    $("#isaretlenmemisClausetest" + soruNo).css("display", "");
                    $(".bosluk").text("----");
                    $('span[target=secenek' + isaretlenenSecenek + "]").removeClass("eliminated");
                }
                regenerateHighlights();
                afterResponse();
            })
            .error(function () {
                reloadCurrentSoru()
            });
}

function seansBitti() {
    $("#overlay").show();
}

function makeRequest(functionName, parameter) {
    if (waitingResponse) {
        $("#overlay").show();
        hideTimeout = window.setTimeout(autoHide, 5000);
    }
    else {
        waitingResponse = true;
        if (parameter != null) {
            window[functionName](parameter);
        }
        else {
            window[functionName]();
        }
    }
}

function autoHide() {
    reloadCurrentSoru();
}

function afterResponse() {
    clearTimeout(hideTimeout);
    $("#overlay").hide();
    waitingResponse = false;


    var tekrarBakilacakMi = ($('#soruStarAlani').val() == "true" ? "Tekrar bakılacak." : "");
    var isaretlenenHarf = $("input[name='isaretlenenSecenek']:checked").length > 0 ? "   " + $("input[name='isaretlenenSecenek']:checked").val() : " yok";
    $('#soruRaporDiv').html(
            "<h5> Soru, " + $('#soruNumarasiAlani').val() + ","
                    + "İşaretlenen seçenek," + isaretlenenHarf + ","
                    + tekrarBakilacakMi + ","
                    + "</h5>"
    );
}

function changeFontSize(fontSize) {
    if (fontSize <= 40 && fontSize >= 10) {
        $('#soruTemplateDiv').css("font-size", fontSize + "px");
        $('#soruTemplateDiv').css("line-height", (fontSize * 1.25) + "px");
        $('#fontSize').html(fontSize + " px");
    }
}

function toggleRemainingTimeVisibility() {
    if ($(".time-info").css("visibility") == "hidden") {
        $('.time-info').css({ "visibility":'visible' });

        $.cookie("timeHidden", "false");
        $("#changeTimeVisibility").text("Süreyi Gizle");
    }
    else {
        $('.time-info').css({ "visibility":'hidden' });

        $.cookie("timeHidden", "true");
        $("#changeTimeVisibility").text("Süreyi Göster");
    }
}

function seansBasliyor() {
    showSeansBasliyorModal();
    $(".modal-backdrop,modal-backdrop.fade.in").css("opacity", "1");
}

function seansBasladi() {
    hideSeansBasliyorModal();
    $(".modal-backdrop,modal-backdrop.fade.in").css("opacity", "0.8");
}

$(function () {


    var numPad = new NumpadControl({ Randomize:false, Location:"bottom" });

    var tcKimlik = document.getElementById("tcKimlikConfirm");

    tcKimlik.onfocus = function () {
        numPad.Show(this);
    };
    $('#SinavTamamlaModal').on('hidden', function () {
        numPad.Hide(this);
    });

    $("#tekrarBakCB").click(function () {
        makeRequest("tekrarBak");
    });

    $("#anaGorunumA").click(function () {
        makeRequest("anaGorunum");
    });

    $("#slideSonraki").click(function (e) {
        e.preventDefault();
        makeRequest("soruGetir", "next");
    });

    $("#slideOnceki").click(function (e) {
        e.preventDefault();
        makeRequest("soruGetir", "prev");
    });

    $("#increaseFont").click(function (e) {
        var fontSize = getFontSize();
        changeFontSize(fontSize + 2);
        resizeImagesAccordingToFontSize(fontSize);
    });

    $("#decreaseFont").click(function (e) {
        var fontSize = getFontSize();
        changeFontSize(fontSize - 2);
        resizeImagesAccordingToFontSize(fontSize);
    });

    $('#SinavTamamlaModal').on('hidden', function () {
        $('#sinavBitirUyari').attr('class', 'alert alert-info');
        $('#sinavBitirUyari').text("TC Kimlik numaranızı girerek sınavı sonlandırabilirsiniz.");
        $('#tcKimlikConfirm').val("");
    });

    $("#sinaviSonlandir").click(function (e) {
        e.preventDefault();

        var dogruTc = "35542833946";

        var girilenTc = $("#tcKimlikConfirm").val();

        if (girilenTc == null || girilenTc == "") {
            $('#sinavBitirUyari').attr('class', 'alert alert-danger');
            $('#sinavBitirUyari').text("Sınavı sonlandırmak için  T.C. Kimlik numaranızı girmelisiniz.");
        } else if (girilenTc == dogruTc) {
            location.href = "/adaycontroller/sinavibitir";
        } else if (girilenTc != dogruTc) {
            $('#sinavBitirUyari').attr('class', 'alert alert-danger');
            $('#sinavBitirUyari').text("Hatalı T.C. Kimlik No.");
        }
    });

    $("#adayBilgiGoruntuleBtn").click(function (e) {
        if ($("#adayBasvuruFoto").attr("src") == undefined) {
            var url = "/adaycontroller/adaybasvurufotogetir";

            $.get(url, { "_":$.now() },function (data) {
                $("#adayBasvuruFoto").attr("src", "data:image/png+xml;base64," + data);
            }).error(function () {
                        reloadCurrentSoru()
                    });
        }
    });

    if ($.cookie("timeHidden") == "true") {
        toggleRemainingTimeVisibility();
    }

    $("#changeTimeVisibility").click(function () {
        toggleRemainingTimeVisibility();
    });

    $('#anlikDurumA').popover({trigger:"hover", delay:{ show:700, hide:100 }});
    $('#gozdenGecirA').popover({trigger:"hover", delay:{ show:700, hide:100 }});
    $('#anaGorunumA').popover({trigger:"hover", delay:{ show:700, hide:100 }});
    $('#sinaviTamamlaButton').popover({trigger:"hover", delay:{ show:700, hide:100 }});
    $('#increaseFont').popover({trigger:"hover", delay:{ show:700, hide:100 }});
    $('#decreaseFont').popover({trigger:"hover", delay:{ show:700, hide:100 }});

    


    $('#tekrarBakDiv').popover({trigger:"hover", delay:{ show:700, hide:100 }});
    changeFontSize(getFontSize());
});

//numpad'in textfield'ın altında gözükmesi için
var PositionInfo = function (elm) {
    var p_elm = elm;

    var Get = function (obj) {
        if (typeof(obj) == "object") {
            return obj;
        }
        else {
            return document.getElementById(obj);
        }
    }

    var Left = function () {
        var x = 0;
        var elm = Get(p_elm);

        while (elm != null) {
            x += elm.offsetLeft;
            elm = elm.offsetParent;
        }
        // x += p_elm.offsetWidth + 7;
        x += 7;
        return parseInt(x);
    }

    var Width = function () {
        var elm = Get(p_elm);
        return parseInt(elm.offsetWidth);
    }

    var Right = function () {
        return Left(p_elm) + Width(p_elm);
    }

    var Top = function () {
        var y = 0;
        var elm = Get(p_elm);
        while (elm != null) {
            y += elm.offsetTop;
            elm = elm.offsetParent;
        }
        //y -= p_elm.offsetHeight;
        return parseInt(y);
    }

    var Height = function () {
        var elm = Get(p_elm);
        return parseInt(elm.offsetHeight);
    }

    var Bottom = function () {
        return Top(p_elm) + Height(p_elm);
    }

    return {
        Top:Top,
        Right:Right,
        Bottom:Bottom,
        Left:Left,
        Width:Width,
        Height:Height
    };
}