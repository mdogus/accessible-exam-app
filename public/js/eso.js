






$(function(){
    $("#questionsDiv").load("questions.html", function(){

        
        
        
        $("#questionsDiv").steps({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            autoFocus: true,
            labels: {
                current: "Adım:",
                pagination: "Sayfalama",
                finish: "Bitir",
                next: "Sonraki",
                previous: "Önceki",
                loading: "Yükleniyor ..."
            }
        });

        
        $( ".eso-options input" ).checkboxradio();
    }); 


});