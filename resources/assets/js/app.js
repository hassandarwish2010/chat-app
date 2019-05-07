
require('./bootstrap');


import Echo from "laravel-echo"

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});
let onlineUserLentgh=0;
window.Echo.join('online')
    .here((users) => {
        onlineUserLentgh=users.length;
        if(users.length>1){
            $('#no-online-users').css('display','none');

        }
        let userId=$('meta[name=user-id]').attr('content');

        users.forEach(function (user) {
            if(user.id==userId){
                return;
            }
            $('#online-users').append(`<li id="user-${user.id}" class="list-group-item"><span class="fa fa-circle" style="color: green;"></span> ${user.name}</li>`);
        })//end forEach
        //console.log(users);
    })
    .joining((user) => {
        onlineUserLentgh++;
        $('#no-online-users').css('display','none');
        $('#online-users').append(`<li id="user-${user.id}" class="list-group-item"><span class="fa fa-circle" style="color: green;"></span> ${user.name}</li>`);
    })
    .leaving((user) => {
        onlineUserLentgh--;
        if(onlineUserLentgh==1){
            $('#no-online-users').css('display','block');
        }
        $('#user-' + user.id).remove();

    });
$('#chat-text').keypress(function (e) {
    if(e.which == 13){
        e.preventDefault();
        let body=$(this).val();
        let url=$(this).data('url');
        $(this).val('');
        let username=$('meta[name=user-name]').attr('content');

        $('#chat').append(`
                     <div class="st-div right">
                         <h5>${username}</h5>
                         <p>${body}</p>
                        </div>
                        <div class="clearfix"></div>
                           `)

        let data= {
            '_token':$('meta[name=csrf-token]').attr('content'),
        body
    }
        $.ajax({
            url:url,
            method:'post',
            data:data
        });
    }
});//end of keypress

window.Echo.channel('chat-group')
    .listen('MessageDelivered', (e) => {
     //alert(e.user.name);
        $('#chat').append(`
                     
                     <div class="st-div left">
                     <h5>${e.user.name}</h5>
                         <p>${e.message.body}</p>
                        </div>
                        <div class="clearfix"></div>
`)
    });