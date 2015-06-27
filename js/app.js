$(document).ready(function() {

    var page_size = 15; //Maximum songs in list
    var track_list;

    SC.initialize({
        client_id: 'a9d59742643cc1ff818f6e2f79b3b6c1'
    });

    console.log("ready");

    var scwidget = document.getElementById('scwidget');
    scwidget.src = "https://w.soundcloud.com/player/?url=http://api.soundcloud.com/users/1539950/favorites";
    var widget = SC.Widget(scwidget);

    widget.bind(SC.Widget.Events.READY, function() {
        widget.bind(SC.Widget.Events.FINISH, function(e) {
            next();
        });
    });

    var qsearch = function(query) {
        SC.get('/tracks', { q: query, limit: page_size }, function(tracks) {
            if(tracks.length == 0) {

            }
            else {
                track_list = tracks;
                playTrack(track_list.shift());
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

    var next = function() {
        if (track_list.length > 0) {
            playTrack(track_list.shift())
        }
        else {
            
        }
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
