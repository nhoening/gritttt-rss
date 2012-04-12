# A Drive-by sharing widget (share any web page in your tt-rss)

1. Make sure a dedicated feed exists in your tt-rss<br/>
   You can insert it via executing the SQL in the file `create-gritttt-feed`, which you can find in the main directory. After creating the dedicated feed, look up the table `ttrss_feeds` and take note of the feed's ID.

2. Adjust feed ID and user ID in `share.php`<br/> 
   The feed ID is the ID of the feed you created in step 1. The user is the tt-rss user, and his ID is most likely `1`, if you log in with the user `admin`. That is the standard case, if you use a multi-user tt-rss, fill in the ID you use in that context. 

4. Adjust paths in dialog.js<br/>
   * host: URL of the host on which tt-rss resides, e.g. `www.example.com`
   * path_to_grittt: path on that host to the directory containing `form.html` and `dialog.css` 

5. Adjust path to your site in `bookmarklet.js`<br/>
   Replace 'http://www.example.com/gritttt-rss' with the URL to the directory containing dialog.js

3. Copy files to a directory on your webserver<br/>
   You can put all files in any directory on your webserver. The only exception is `share.php`, which needs to be in your tt-rss root directory.
   
6. Copy content of `bookmarklet.js` into a bookmark of your browser.

7. Share!
