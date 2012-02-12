
(function(){

    var iframe_url = "http://www.nicolashoening.de/gritttt-rss/form.html";
    iframe_url += "?url=" + encodeURIComponent(location.href);
    iframe_url += "&title=" + encodeURIComponent(document.title); 
    var iframe_id = 'gritttt-iframe';
    var div_id = 'gritttt-div';

    if (document.getElementById(div_id) == null) {
        var head = document.getElementsByTagName("head")[0];
        var css = document.createElement('link');
        css.type = 'text/css';
        css.rel = 'stylesheet';
        css.href = ""; //TODO
        css.media = 'screen';
        head.appendChild(css);

        // display forn in iframe
        var div = document.createElement("div");
        div.id = div_id;
        var str = "<div onclick='document.getElementById(\"" + div_id + "\").style.display=\"none\";' style='position:fixed;top:0px;width:100%;height:100%;z-index:10000;background: #C3e2fd;' title='click to close window'>";
        str += "<iframe frameborder='0' scrolling='no' name='" + iframe_id + "' id='" + iframe_id + "' src='" + iframe_url + "' width='550px' height='275px'></iframe>";
        str += "</div>"
        div.innerHTML = str;
        document.body.insertBefore(div, document.body.firstChild);
    } else {
        document.getElementById(div_id).style.display = 'block';
    }

  
})()

