This allows you to import your shared and starred items from your Google Reader account to your tt-rss database.

# Preparation

1. First, make sure you have a backup of your current tt-rss database.
It probably is also a good idea to stop feed updates while you
are doing this. I am not responsible for data loss or corruption.

2. You need to export your shared/starred items from your Google account.
Go to `Google Reader -> settings -> Import/Export`, and download the shared/starred items in `Reader JSON`-format (*not* the `JSON Activity Stream` format). Store the export in this directory. The files should be 
called `shared-items.json` and `starred-items.json`.

3. Make sure a dedicated feed exists in your tt-rss. You can insert it via executing 
the SQL in the file `create-gritttt-feed.sql`, which you can find in the 
main directory. Take note of the ID this feed has in the table `ttrss_feeds`
(You'll need that to create imports).

# Importing

1. Execute the `import.py` script ("python import.py" in a terminal). Tell it your user Id & the feed ID when
it asks for them, and decide if you want shared and/or starred items. You should now have a file called `gritttt-import.sql` in this directory.

2. Import the resulting SQL in `gritttt-import.sql` into your tt-rss database
(via some import functionality, e.g. with phpMyAdmin). 

Note: when importing a large file with SQL statements (and yours might already be pretty large), phpMyAdmin might by default abort after a while but should offer to resume. Depending on file size, multiple operations might be necessary, so read carefully what phpMyAdmin is telling you!
