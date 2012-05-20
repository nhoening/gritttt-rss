/*
This javascript creates HTML from a public tt-rss feed by transforming it with xslt. 
Then, it inserts it into an HTML element on your website.

Include it in your HTML head:

<script type="text/javascript" src="path/to/widget.js"></script>

The script might be called on load, this can be done in the body tag:

<body onload="displayRSS(feed_url, element_id);">

The feed_url with the HTTP-address of your tt-rss feed (Preferences -> Feeds -> Published & shared -> Display URL) and element_id is the HTML element you want to display the RSS feed in.

You can of course also use via a third-party event library like jquery:

jQuery(document).ready(function(){
  displayRSS(feed_url, element_id, 11);
});

Note that here I added an (optional) number parameter which constrains the number of shown rows to 11 (per default it is 8).
*/

// -- adapt this
// The full URL to your tt-rss installation
// The domain has to be the same as the domain on which this script is executed!
// i.e. if you host tt-rss on a subdomain, you might need to specifiy the actual path from your domain 
var ttrss_url = 'http://www.example.com/tt-rss';
// -- end adapt

ttrss_url = ttrss_url + "/gritttt/shared-widget/";

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
  //xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
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
    css.href = ttrss_url + "widget.css";
    css.media = 'screen';
    head.appendChild(css);
}

/* make HTML and insert it */
function displayRSS(feed_url, element_id, max_rows)
{
  includeCSS();
  // get RSS via proxy to circumvent the browser sandbox
  xml = loadXMLDoc(ttrss_url + 'proxy.php?url=' + encodeURIComponent(feed_url));
  xsl = loadXMLDoc(ttrss_url + 'rss2html.xslt'); 
  
  if (max_rows === undefined) max_rows = 8;

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
    xsltProcessor.setParameter(null, 'max_rows', max_rows);
    xsltProcessor.importStylesheet(xsl);
    
    html = xsltProcessor.transformToFragment(xml, document);
    document.getElementById(element_id).appendChild(html);
  }
}
