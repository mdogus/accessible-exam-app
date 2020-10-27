$(function() {
    $("#nextQuestion").click(function (e) {
        //event.preventDefault();
        
        //var name = sampleForm.name.value;
        //var data = "Adı: " + name;
        var data = "Adı: Mustafa";
        
        $("#nextQuestion").ajax({
            type: "POST",
            url: "/",
            data: data,
            success: function(response) {
                console.log(response);
                alert(response);
            }
        });
    });
]});
