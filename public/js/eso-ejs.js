// .alert
$(function() {
    $(window).load(function() {
        if ($(".alert")) {
            $(".alert").attr("role", "alert");
            setTimeout(function(){
                $(".alert").removeAttr("role");
            }, 100);
        }
    });
});

/*$(document).ready(function() {
    $("#personalInfoButton").click(function(event) {
        event.preventDefault();
        console.log('Btn: Kişisel Bilgi Formu');
        $("#personalInfoButton").css("background-color", "red");
        var data = {
            event: "Kişisel Bilgi Formu düğmesine basıldı."
        };
        $.ajax({
            type: "POST",
            url: "/log",
            data: data,
            success: function(response) {
                    console.log("Kişisel Bilgi Formu");
            }
        });
    });
});*/
