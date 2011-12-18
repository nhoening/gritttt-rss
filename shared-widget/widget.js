/*
This javascript makes HTML by letting the public tt-rss feed be transformed by the xslt. 
Then, the resulting HTML is inserted into an HTML element on your website.

Include it in your HTML head:

<script type="text/javascript" src="widget.js"></script>

The script might be called on load, this can be done in the body tag:

<body onload="displayRSS(feed_url, element_id);">

or via a third-party event library like jquery:

jQuery(document).ready(function(){
  displayRSS(feed_url, element_id);
});

Replace feed_url with the HTTP-address of your tt-rss feed (Preferences -> Feeds -> Published & shared -> Display URL) and element_id with the HTML element you want to display the RSS feed in.
*/

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

function displayRSS(feed_url, element_id)
{
  // get RSS via proxy circumvent the browser sandbox
  xml = loadXMLDoc('proxy.php?url=' + encodeURIComponent(feed_url));
  xsl = loadXMLDoc("rss2html.xslt"); 
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
    console.log(xsl);
    xsltProcessor.importStylesheet(xsl);
    
    html = xsltProcessor.transformToFragment(xml, document);
    document.getElementById(element_id).appendChild(html);
  }
}
