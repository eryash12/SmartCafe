/**
 * Created by Priyam on 3/9/16.
 */
$('.form').find('input, textarea').on('keyup blur focus', function (e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if( $this.val() === '' ) {
            label.removeClass('highlight');
        }
        else if( $this.val() !== '' ) {
            label.addClass('highlight');
        }
    }

});

$('.tab a').on('click', function (e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});

$( "#signup form" ).submit(function( event ) {

    var data = {};
    var fname = $( "input:first" ).val();
    var lname = $( "#lname" ).val();
    var email = $("#email").val();
    var pass = $("#pass").val();
    fname = encodeURIComponent(fname);
    lname = encodeURIComponent(lname);
    email = encodeURIComponent(email);
    pass = encodeURIComponent(pass);
    //var data1 = JSON.stringify(data);
    //$.ajax(
    //    {
    //        url: base+"data/sign_up_user/",
    //        data: {abcd:data1},
    //        type: "POST",
    //        success: function(data, status)
    //        {
    //
    //            alert(data);
    //        },
    //        error: function(xhr, desc, err)
    //        {
    //            console.log(xhr);
    //            console.log(desc);
    //            console.log(err);
    //        }
    //    }
    //)
    $.post( base+"data/sign_up_user/"+fname+"/"+lname+"/"+email+"/"+pass, { })
        .done(function( data ) {
            alert( data );
        });
});
$( "#login form" ).submit(function( event ) {

    var data = {};

    var email = $("#login-email").val();
    var pass = $("#login-pass").val();
    email = encodeURIComponent(email);
    pass = encodeURIComponent(pass);
    $.ajax(
        {
            url: base+"data/user_login/"+email+"/"+pass,

            type: "POST",
            success: function(data, status)
            {
                if(data === "success"){
                   alert("success");
                }
            },
            error: function(xhr, desc, err)
            {
                console.log(xhr);
                console.log(desc);
                console.log(err);
            }
        }
    )
});


