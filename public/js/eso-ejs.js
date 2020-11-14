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
    
    //Pop-up modal
    //$('#myModal').on('shown.bs.modal', function () {
      //$('#myButton').trigger('focus')
    //})
});

