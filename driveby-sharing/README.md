# A Drive-by sharing widget (share any web page in your tt-rss)

1. Make sure a dedicated feed exists in your tt-rss<br/>
   You can insert it via executing the SQL in the file `create-gritttt-feed`, which you can find in the main directory. After creating the dedicated feed, look up the table `ttrss_feeds` and take note of the feed's ID.

2. Adjust feed ID and user ID in `share.php`:<br/> 
   The feed ID is the ID of the feed you created in step 1. The user is the tt-rss user, and his ID is most likely `1`, if you log in with the user `admin`. That is the standard case, if you use a multi-user tt-rss, fill in the ID you use in that context. 

3. In `dialog.js`, set the URL at which your tt-rss instance is reachable in the variable `ttrss_url`.

4. Adjust the URL of your tt-rss instance in `bookmarklet.js`:<br/>
   Replace `http://www.example.com` with the URL at which your tt-rss instance is reachable.

5. Put this directory on your webserver:<br/>
   Within the folder of your tt-rss instance, first create a folder called `grittt` (if you have not got it already) and copy the `driveby-sharing` folder in there.

6. Copy content of `bookmarklet.js` into a bookmark of your browser.

7. Share!
