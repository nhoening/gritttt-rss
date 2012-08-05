var gritttt_url = config['gritttt_url'];
var path_to_ttrss = config['path_to_ttrss'];

var overlay_id = 'gritttt-overlay';
var box_id = 'gritttt-box';
var msg_id = 'gritttt-msg';


function getHostname(str) {
    var re = new RegExp('^(?:f|ht)tp(?:s)?\://([^/]+)', 'im');
    return str.match(re)[1].toString();
}

function show_share_form(overlay)
{
    var iframe_url = gritttt_url + "/form.php";
    iframe_url += "?action=" + encodeURIComponent(gritttt_url +  "/share.php");
    iframe_url += "&url=" + encodeURIComponent(location.href);
    iframe_url += "&title=" + encodeURIComponent(document.title);
    overlay.innerHTML = '<iframe frameborder="0" scrolling="no" name="' + box_id + '" id="' + box_id + '" src="' + iframe_url.replace('"', "'") + '" width="600px" height="200px"></iframe>';
}

function show_msg(overlay, msg) 
{
    overlay.innerHTML = '<div id="' + box_id + '"><div id="' + msg_id + '">' + msg + '</div></div>';
}

function show_overlay(show) 
{
    if (show) {
        document.getElementById(overlay_id).style.display = 'block';
    }else {
        document.getElementById(overlay_id).style.display = 'none';
    }
}

/* Create dialog and listen for messages from iframe */
(function(){

    if (document.getElementById(overlay_id) == null) {
        // reference our CSS styling
        var head = document.getElementsByTagName("head")[0];
        var css = document.createElement('link');
        css.type = 'text/css';
        css.rel = 'stylesheet';
        css.href = gritttt_url + "/dialog.css";
        css.media = 'screen';
        head.appendChild(css);

        // display form in iframe that sits on an overlay
        var overlay = document.createElement("div");
        overlay.id = overlay_id;
        overlay.title = "click to close window.";
        overlay.onclick = function(){
            show_overlay(false);
        };
        document.body.insertBefore(overlay, document.body.firstChild);
 
        // listen for messages 
        // first create IE + others compatible event handler
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        eventer(messageEvent,function(e) {
            if (e.origin == 'http://' + getHostname(gritttt_url)) {
                if (e.data == 'success') {
                    show_msg(overlay, 'Page successfully shared! Click anywhere to close.');
                }
                else if(e.data == 'login') {
                    // should not happen - form.php should have caught this
                    show_msg(overlay, 'Could not share, please log in to <a href="' + gritttt_url + '/' + path_to_ttrss + '">your tt-rss reader</a>, and reload page.');
                }
                else if(e.data == 'reload-form') {
                    show_share_form(document.getElementById(overlay_id));
                }
                else if(e.data.substring(0,7) == 'failure') {
                    alert('oops:' + e.data.substring(8));
                }
            }
        }, false);
    } else {
        show_overlay(true);
    }

    // create the gritttt-box with the iframe if first click on this page or if we now show a message/
    if (document.getElementById(box_id) == null || document.getElementById(msg_id) !== null) {       
        show_share_form(document.getElementById(overlay_id));
    }
})()

