# A Drive-by sharing widget (share any web page in your tt-rss)

1. Make sure a dedicated feed exists in your tt-rss<br/>
   You can insert it via executing the SQL in the file `create-gritttt-feed`, which you can find in the main directory. After creating the dedicated feed, look up the table `ttrss_feeds` and take note of the feed's ID.

2. Create a configuration file `config.js` as a copy of `config.js.template`.
   Enter your settings in `config.js`:<br/> 
   As `ttrss_url`, set the URL at which your tt-rss instance is reachable in the variable `ttrss_url`.
   The feed ID (`feed_id`) is the ID of the feed you created in step 1. For `user_id`, the user is the tt-rss user, and his ID is most likely `1`, if you log in with the user `admin`.
   That is the standard case - if you run a multi-user tt-rss, fill in the ID
   you want to use in that context of sharing. 

3. In `share.php` and `form.php`, you need to make an adjustment to a library include path (see comment in file), but only if your tt-rss instance runs on a version below 1.5.10.

4. Adjust the URL of your tt-rss instance in `bookmarklet.js`:<br/>
   Replace `http://www.example.com/tt-rss` with the URL at which your tt-rss instance is reachable.

5. Copy content of `bookmarklet.js` into a bookmark of your browser and give it a catchy name, for example `share in tt-rss`.

6. Put this directory on your webserver:<br/>
   Within the folder of your tt-rss instance, first create a folder called `grittt` (if you have not got it already) and copy the `driveby-sharing` folder in there.

7. Share!
