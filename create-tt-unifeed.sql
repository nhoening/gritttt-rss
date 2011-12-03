-- Execute this on your tt-rss database to add the unifeed entry
-- This assumes that you use the admin user who has ID:1
INSERT into ttrss_feeds (title, owner_uid, update_interval) VALUES ('tt-unifeed', 1, -1);
