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

/* load an XML document and return the resulting object */
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

/* reference custom CSS styling */
function includeCSS()
{
    var head = document.getElementsByTagName("head")[0];
    var css = document.createElement('link');
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.href = scriptPath() + "widget.css";
    css.media = 'screen';
    head.appendChild(css);
}

/* get Script path as set in the head for this script (widget.js)
   see http://www.bencarpenter.co.uk/javascript-path-to-the-current-script
*/
function scriptPath() {    
    var scripts = document.getElementsByTagName('SCRIPT');
    var path = '';
    if(scripts && scripts.length>0) {
        for(var i in scripts) {
            if(scripts[i].src && scripts[i].src.match(/widget\.js$/)) {
                path = scripts[i].src.replace(/(.*)widget\.js$/, '$1');
            }
        }
    }
    // nh: making sure path is absolute (FF makes relative paths absolute on it's own,
    //     not sure about others)
    if (path.substring(0,7) !== 'http://') {
        path = path + window.location.hostname + window.location.pathname;
    }
    console.log(path);
    return path;
}

/* create the HTML and insert it */
function displayRSS(feed_url, element_id, max_rows)
{
  includeCSS();
  // get RSS via proxy to circumvent the browser sandbox
  var path2here = scriptPath();
  xml = loadXMLDoc(path2here + 'proxy.php?url=' + encodeURIComponent(feed_url));
  xsl = loadXMLDoc(path2here + 'rss2html.xslt'); 
  
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
    xsltProcessor.setParameter(null, 'ttrss_feed_url', feed_url);
    xsltProcessor.importStylesheet(xsl);
    
    html = xsltProcessor.transformToFragment(xml, document);
    document.getElementById(element_id).appendChild(html);
  }
}
