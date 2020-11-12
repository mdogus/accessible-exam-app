// .alert
$(function() {
    $(window).load(function() {
        if ($(".alert")) {
            $(".alert").attr("role", "alert");
            setTimeout(function(){
                $(".alert").removeAttr("role");
            }, 1000);
        }
    });
    
    
});
