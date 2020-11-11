// .alert
$(function() {
    $(window).ready(function() {
        if ($(".alert")) {
            $(".alert").attr("role", "alert");
            setTimeout(function(){
                $(".alert").removeAttr("role");
            }, 1000);
        }
        //$(".alert").attr("aria-live", "assertive");
        //setTimeout(function(){
          //  $(".alert").removeAttr("aria-live");
        //}, 100);
    });
    //if (focus !== false) {
        
    //}*/
});
