# A Drive-by sharing widget (share any web page in your tt-rss)

[Requirement: tt-rss version >= 1.7.9]

1. Make sure a dedicated feed exists in your tt-rss<br/>
   You can insert it via executing the SQL in the file `create-gritttt-feed`, which you can find in the main directory. After creating the dedicated feed, look up the table `ttrss_feeds` and take note of the ID of the newly-created feed.

2. Create a configuration file `config.js` as a copy of `config.js.template`.
   Enter your settings in `config.js`:<br/> 
   As `gritttt_url`, set the URL at which you will put the `driveby-sharing` folder later (see step 5).<br/>
   As `path_to_ttrss`, set the relative path from `gritttt_url` to the folder containing your tt-rss instance.<br/>
   The feed ID (`feed_id`) is the ID of the feed you created in step 1. For `user_id`, the user is the tt-rss user, and his ID is most likely `1`, if you log in with the user `admin`.
   That is the standard case - if you run a multi-user tt-rss, fill in the ID you want to use in that context of sharing.

3. Adjust the URL at which the `driveby-sharing` folder will be in `bookmarklet.js`:<br/>
   Replace `http://www.example.com/gritttt/driveby-sharing` with whereever you put that folder later, in step 5 (you also edited this in `config.js` in step 2).

4. Copy content of `bookmarklet.js` into a bookmark of your browser and give it a catchy name, for example `share in tt-rss`.

5. Put this directory on your webserver, according to the settings you made in step 2 and 3. The example made a folder called `gritttt`,
   and put the `driveby-sharing` folder in there (the `gritttt` folder is also useful to put the `shared-widget` folder in there, should you use that feature).

6. Start sharing - on any website, click the bookmarklet, fill in title and possibly a note and hit `Share`!
