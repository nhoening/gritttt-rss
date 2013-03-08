# A widget to display your shared items on any webpage

1. Put this directory on your webserver.

2. Install the widget on a webpage of yours by calling it via Javascript:<br/>
   The HTML-document, on which the widget should appear, needs to include the javascript in `widget.js` when loading. It needs to call the function `displayRSS` and pass to it the address of your public tt-rss feed and pass to it the ID of an element somewhere on your page, into which the resulting HTML will be inserted once the page is loaded. You can also pass a restriction on the number of items shown (default is 8, I think tt-rss returns up to 30). More info inside of `widget.js`.
   You can also look into `example.html` to see an example web page that includes a widget. Here is the relevant line:

    <body onload="displayRSS('http://tt-rss.nicolashoening.de/backend.php?op=rss&amp;id=-2&amp;view-mode=all_articles&amp;key=56480f857b35ffc7b0172834539481501ff69e94', 'example-div', 11)">
