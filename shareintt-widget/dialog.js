
(function(){

  var iframe_url = "http://www.nicolashoening.de/tt-unifeed/form.html" 
  var iframe_id = 'tt-unifeed-iframe';

  // TODO: check if div is there already, then just refill title and url 
  //var existing_iframe = document.getElementById(iframe_id);

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
  div.id = "tt-unifeed-bookmarklet";
  var str = "";
  str += "<table id='instacalc_bookmarklet_table' valign='top' width='570' cellspacing='0' cellpadding='0'><tr><td width ='550' height='80'>";
  str += "<iframe frameborder='0' scrolling='no' name='" + iframe_id + "' id='" + iframe_id + "' src='" + iframe_url + "' width='550px' height='75px' style='textalign:right; backgroundColor: white;'></iframe>";
  str += "</td><td onclick='document.getElementById(\"" + div.id + "\").style.display=\"none\";' style='background: #C3e2fd;' title='click to close window' valign='top' align='center' width='20px'>";
  str += "<a href='javascript:void(0);' style='width:100%; text-align: middle; color: #FF0000; font-family: Arial;'>x</a>";
  str += "</td></tr></table>";
  div.innerHTML = str;
  document.body.insertBefore(div, document.body.firstChild);

  // TODO: set title and url
  var title = document.title;
  var url = location.href;
  
})()

