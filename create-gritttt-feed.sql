-- Execute this on your tt-rss database to add the gritttt feed entry
-- This assumes that you use the admin user who has ID:1
-- You don't have to change the feed_url (example.com), this is not used 
-- anywhere (but having a URL is good to make it editable in tt-rss)
INSERT into ttrss_feeds (title, owner_uid, update_interval, feed_url, include_in_digest) 
VALUES ('gritttt-feed', 1, -1, 'http://www.example.com', 0);
