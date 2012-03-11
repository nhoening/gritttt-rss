/*
This javascript creates HTML from a public tt-rss feed by transforming it with xslt. 
Then, it inserts it into an HTML element on your website.

Include it in your HTML head:

<script type="text/javascript" src="widget.js"></script>

The script might be called on load, this can be done in the body tag:

<body onload="displayRSS(feed_url, element_id);">

or via a third-party event library like jquery:

jQuery(document).ready(function(){
  displayRSS(feed_url, element_id);
});

The feed_url with the HTTP-address of your tt-rss feed (Preferences -> Feeds -> Published & shared -> Display URL) and element_id is the HTML element you want to display the RSS feed in.
*/

// adjust this if your page is not in the same directory as this.
// The path to this directory can be relative or absolute (a full URL).
var path_to_gritttt = '';

function loadXMLDoc(dname)
{
  if (window.XMLHttpRequest)
  {
    xhttp = new XMLHttpRequest();
  }
  else
  {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.open("GET", dname, false);
  xhttp.overrideMimeType("text/xml; charset='utf-8'");
  xhttp.send("");
  return xhttp.responseXML;
}

/* reference our CSS styling */
function includeCSS()
{
    var head = document.getElementsByTagName("head")[0];
    var css = document.createElement('link');
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.href = path_to_gritttt + "widget.css";
    css.media = 'screen';
    head.appendChild(css);
}

/* make HTML and insert it */
function displayRSS(feed_url, element_id)
{
  includeCSS();
  // get RSS via proxy to circumvent the browser sandbox
  xml = loadXMLDoc(path_to_gritttt + 'proxy.php?url=' + encodeURIComponent(feed_url));
  xsl = loadXMLDoc(path_to_gritttt + "rss2html.xslt"); 
  // code for IE
  if (window.ActiveXObject)
  {
    html = xml.transformNode(xsl);
    document.getElementById(element_id).innerHTML = html;
  }
  // code for Mozilla, Firefox, Opera, etc.
  else if (document.implementation && document.implementation.createDocument)
  {
    xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    
    html = xsltProcessor.transformToFragment(xml, document);
    document.getElementById(element_id).appendChild(html);
  }
}
