/*
This javascript creates HTML from a public tt-rss feed by transforming it with xslt. 
Then, it inserts it into an HTML element on your website.

Include it in your HTML head:

<script type="text/javascript" src="path/to/config.js"></script>
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

var ttrss_url = config['ttrss_url'];
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
  // we also do a little trick to be sure that we use the same host that the current
  // website uses (i.e. if www.host.com and host.com are both leading here, we create
  // consistency by using here the host string that was used in the request, rather 
  // than the host string from the configuration. 
  var uri = parseUri(ttrss_url);
  var ttrss_url_req = ttrss_url.replace(uri['host'], window.location.hostname);
  xml = loadXMLDoc(ttrss_url_req + 'proxy.php?url=' + encodeURIComponent(feed_url));
  xsl = loadXMLDoc(ttrss_url_req + 'rss2html.xslt'); 
  
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


// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
    var o   = parseUri.options,
        m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i   = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

parseUri.options = {
    strictMode: false,
    key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    q:   {
        name:   "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};
