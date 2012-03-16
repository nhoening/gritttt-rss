# A widget to display your shared items on any webpage

1. Put this directory on your webserver.
2. Adjust the path to that directory (`path_to_gritttt`) in `widget.js`
3. Install the widget by calling it via Javascript:<br/>
   Your HTML on the server needs to execute the javascript onload. It needs to pass it the address of your public tt-rss feed and the ID of an element somewhere on your page, into which the resulting HTML will be inserted once the page is loaded. More info inside of `widget.js`.
   You can also look into `example.html` to see an example of what you have to do.
