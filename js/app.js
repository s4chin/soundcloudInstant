$(document).ready(function() {

    var page_size = 15; //Maximum songs in list

    SC.initialize({
        client_id: 'a9d59742643cc1ff818f6e2f79b3b6c1'
    });

    console.log("ready");

    var scwidget = document.getElementById('scwidget');
    scwidget.src = "https://w.soundcloud.com/player/?url=http://api.soundcloud.com/users/1539950/favorites";
    var widget = SC.Widget(scwidget);

    var qsearch = function(query) {
        SC.get('/tracks', { q: query, limit: page_size }, function(tracks) {
            if(tracks.length == 0) {

            }
            else {
                playTrack(track[0]);
            }
        });
    }
    
    var playTrack = function(track) {
        widget.load(track.uri, {
            auto_play: true,
            buying: false,
            liking: false,
            download: true,
            sharing: false,
            show_artwork: true,
            show_comments: false,
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
