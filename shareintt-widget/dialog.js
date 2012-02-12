
(function(){

    var iframe_url = "http://www.nicolashoening.de/gritttt-rss/form.html" 
    var iframe_id = 'gritttt-iframe';
    var div_id = 'gritttt-div';

    if (document.getElementById(div_id) == null) {
        // TODO:  CSS to style the box, use right:0 ?
        var headID = document.getElementsByTagName("head")[0];
        var cssNode = document.createElement('link');
        cssNode.type = 'text/css';
        cssNode.rel = 'stylesheet';
        cssNode.href = url;
        cssNode.media = 'screen';
        headID.appendChild(cssNode);

        // display forn in iframe
        var div = document.createElement("div");
        div.id = div_id;
        var str = "<div onclick='document.getElementById(\"" + div_id + "\").style.display=\"none\";' style='position:fixed;top:0px;width:100%;height:100%;z-index:10000;background: #C3e2fd;' title='click to close window' valign='top' align='center' width='20px'>";
        str += "<iframe frameborder='0' scrolling='no' name='" + iframe_id + "' id='" + iframe_id + "' src='" + iframe_url + "' width='550px' height='75px' style='textalign:right; backgroundColor: white;'></iframe>";
        str += "</div>"
        div.innerHTML = str;
        document.body.insertBefore(div, document.body.firstChild);
    } else {
        document.getElementById(div_id).style.display = 'block';
    }

    // TODO: set title and url
    var title = document.title;
    var url = location.href;
  
})()

