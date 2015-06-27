$(document).ready(function() {

    var page_size = 15; //Maximum songs in list
    var track_list;
    var search_list = ["Take Me to Church", "Burn", "Dream On"];
    var index = 0;

    SC.initialize({
        client_id: 'a9d59742643cc1ff818f6e2f79b3b6c1'
    });

    var scwidget = document.getElementById('scwidget');
    scwidget.src = "https://w.soundcloud.com/player/?url=http://api.soundcloud.com/users/1539950/favorites";
    var widget = SC.Widget(scwidget);
    winit();

    widget.bind(SC.Widget.Events.READY, function() {
        widget.bind(SC.Widget.Events.FINISH, function(e) {
            next();
        });
    });

    $(document).keydown(function(e) {
        if (!$("#sterm").is(':focus')) {
            if (e.keyCode == 39) {
                next();
            } else if (e.keyCode == 37) {
                prev();
            } else if (e.keyCode == 32) {
                toggle();
            } else if (e.shiftKey && e.keyCode == 39) {
                seekFront();
            } else if (e.shiftKey && e.keyCode == 37) {
                seekBack();
            }
        }
    });

    function winit() {
        var qinit = search_list[Math.floor(Math.random()*search_list.length)];
        document.getElementById('sterm').value = qinit;
        $("#sterm").focus();
        qsearch(qinit);
    }

    function qsearch(query) {
        SC.get('/tracks', { q: query, limit: page_size }, function(tracks) {
            if(tracks.length == 0) {

            }
            else {
                track_list = tracks;
                index = 0;
                playTrack(track_list[index]);
            }
        });
    }
    
    function playTrack(track) {
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

    function next() {
        if (track_list.length > 0) {
            if (index < track_list.length - 1) {
                index += 1;
                playTrack(track_list[index]);
            }
            else {
                index = 0;
                playTrack(track_list[index]);
            }
        }
        else {

        }
    }

    function prev() {
        if (track_list.length > 0) {
            if (index > 0) {
                index -= 1;
                playTrack(track_list[index]);
            }
            else {
                index = track_list.length - 1;
                playTrack(track_list[index]);
            }
        }
        else {

        }
    }

    function toggle() {
        widget.toggle();
    }

    function seekFront() {
        widget.getPosition(function(pos) {
            widget.seekTo(pos + 3000);
        });
    }

    function seekBack() {
        widget.getPosition(function(pos) {
            widget.seekTo(pos - 3000);
        });
    }

    $('#sterm').keyup(function(e) {
        e.preventDefault();

        var query = $('#sterm').val();

        if(query == '') {
            return;
        }

        if (e.keyCode == 9 || e.keyCode == 16 || e.keyCode == 17 || e.keyCode == 18 || e.keyCode == 91 || e.keyCode == 92) {
            return;
        }

        qsearch(query);

    });



});
