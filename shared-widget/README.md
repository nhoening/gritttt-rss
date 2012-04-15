# A widget to display your shared items on any webpage

1. In `widget.js`, set the URL at which your tt-rss instance is reachable in the variable `ttrss_url`.

2. Put this directory on your webserver:<br/>
   Within the folder of your tt-rss instance, first create a folder called 'grittt' (if you have not got it already) and copy the 'shared-widget' folder in there.

3. Install the widget on a webpage of yours by calling it via Javascript:<br/>
   The HTML-document, on which the widget should appear, needs to execute the javascript in dialog.js when loading. It needs to pass to dialog.js the address of your public tt-rss feed and the ID of an element somewhere on your page, into which the resulting HTML will be inserted once the page is loaded. You can also pass a restriction on the number of items shown (default is 8, I think tt-rss returns up to 30). More info inside of `widget.js`.
   You can also look into `example.html` to see an example of what you have to do.


