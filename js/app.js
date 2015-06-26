$(document).ready(function() {

    var page_size = 15; //Maximum songs in list

    SC.initialize({
        client_id: 'a9d59742643cc1ff818f6e2f79b3b6c1'
    });

    console.log("ready");

    var scwidget = document.getElementById('scwidget');
    scwidget.src = "https://w.soundcloud.com/player/?url=http://api.soundcloud.com/users/1539950/favorites";

    SC.get('/tracks', { genres: 'punk', bpm: { from: 120 } }, function(tracks) {
    console.log(tracks);
    });
    
});
