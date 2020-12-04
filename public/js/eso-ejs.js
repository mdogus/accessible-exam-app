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
    
    $(document).ready(function(){
        
    });
    
    /* Kişisel Bilgi formu düğmesi */
    /*$("#personalInfoModalButton").click((e) => {
        e.preventDefault();
        
        var actualModal = $(this).attr('data-actual');
        var newModal = $(this).attr('data-target');
        $(actualModal).modal('hide');
        $(newModal).modal('show');
        //$("#personalInfoModal").css("display","block");
        //$("#startExamModal").css("display","none");
    });*/
    /* Sınava Başla düğmesi */
    /*$("#startExamModalButton").click((e) => {
        e.preventDefault();
        
        //var actualModal = $(this).attr('data-actual');
        //var newModal = $(this).attr('data-target');
        //$(actualModal).modal('hide');
        //$(newModal).modal('show');
        //$("#personalInfoModal").css("display","none");
        //$("#startExamModal").css("display","block");
    });*/
});

