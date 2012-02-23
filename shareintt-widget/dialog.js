
(function(){

    var host = 'http://www.nicolashoening.de';
    var iframe_url = host + "/gritttt-rss/form.html";
    iframe_url += "?url=" + encodeURIComponent(location.href);
    iframe_url += "&title=" + encodeURIComponent(document.title);
    var iframe_id = 'gritttt-iframe';
    var div_id = 'gritttt-div';
    var css_url = host + "/gritttt-rss/dialog.css";

    if (document.getElementById(div_id) == null) {
        var head = document.getElementsByTagName("head")[0];
        var css = document.createElement('link');
        css.type = 'text/css';
        css.rel = 'stylesheet';
        css.href = css_url;
        css.media = 'screen';
        head.appendChild(css);

        // display form in iframe
        var div = document.createElement("div");
        div.id = div_id;
        div.title = "click to close window.";
        div.onclick = function(){
            document.getElementById(div_id).style.display='none';
        };
        div.innerHTML = '<iframe frameborder="0" scrolling="no" name="' + iframe_id + '" id="' + iframe_id + '" src="' + iframe_url.replace('"', "'") + '" width="600px" height="200px"></iframe>';
        document.body.insertBefore(div, document.body.firstChild);
   
        // listen for success/failure report 
        // first create IE + others compatible event handler
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        eventer(messageEvent,function(e) {
            console.log('parent received message: "' + e.data + '" from ' + e.origin);
            if (e.origin == host) {
                console.log('host confirmed');
                if (e.data == 'shared') {
                    document.getElementById(div_id).style.display='none';
                    // TODO: refill iframe or nullify div, or make sense in another way of 
                    //       a follow-up click on bookmarklet
                }
                else if(e.data == 'failure') {
                    alert('oops');
                }
            }
        },false);

    } else {
        document.getElementById(div_id).style.display = 'block';
    }

  
})()

