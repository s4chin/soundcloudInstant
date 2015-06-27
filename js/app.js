$(document).ready(function() {

    var page_size = 15; //Maximum songs in list

    SC.initialize({
        client_id: 'a9d59742643cc1ff818f6e2f79b3b6c1'
    });

    console.log("ready");

    var scwidget = document.getElementById('scwidget');
    scwidget.src = "https://w.soundcloud.com/player/?url=http://api.soundcloud.com/users/1539950/favorites";

    var qsearch = function(query) {
        SC.get('/tracks', { q: query }, function(tracks) {
            if(tracks.length == 0) {

            }
            else {

            }
        });
    }
    
    
    $('#sterm').keyup(function(e) {
        e.preventDefault();

        var query = $('#sterm').val();

        if(query == '') {
            return;
        }

        qsearch(query);

    });

});
