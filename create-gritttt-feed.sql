-- Execute this on your tt-rss database to add the gritttt feed entry
-- This assumes that you use the admin user who has ID:1
INSERT into ttrss_feeds (title, owner_uid, update_interval) VALUES ('gritttt-feed', 1, -1);
