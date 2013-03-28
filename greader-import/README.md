This allows you to import your shared and starred items from your Google Reader account to your tt-rss database.

# Preparation

1. First, make sure you have a backup of your current tt-rss database.
It probably is also a good idea to stop feed updates while you
are doing this. I am not responsible for data loss or corruption.

2. You need to export your shared/starred items from your Google account.
Go to `Google Reader -> settings -> Import/Export -> Download your data through Takeout`.
In the zip-archive, you will get from this, there should be two files called 
`shared.json` and `starred.json`. Put them in this directory.

3 . If you want, you can link all imported items to a certain feed. 
You can insert a new feed into the DB by executing the SQL in the file `create-gritttt-feed.sql`, which you can find in the 
main directory. Take note of the ID this feed has in the table `ttrss_feeds`
(You will need that while you create imports).
However, if you simply want the items to be in your database (you can always find them in the virtual feeds for published and starred items, anyway), you can skip this step.


# Importing

1. Execute the `import.py` script ("python import.py" in a terminal). Tell it your user Id & (possibly) the feed ID when
it asks for them, and decide if you want shared and/or starred items. You should now have a file called `gritttt-import.sql` in this directory.

2. Import the resulting SQL in `gritttt-import.sql` into your tt-rss database
(via some import functionality, e.g. with phpMyAdmin). 


Notes: 

* Requires python version to be >= 2.6. If your webserver does not fulfill this requirement, just generate the SQL on your local PC (Python 2.6 is from 2008, so every home PC or Mac has that by now). That is how I used it from the beginning, anyway.
* When importing a large file with SQL statements (and yours might already be pretty large), phpMyAdmin might by default abort after a while but should offer to resume. Depending on file size, multiple operations might be necessary, so read carefully what phpMyAdmin is telling you!
* Postgres support is very fresh, it has not been verified by many people to have worked.
* We should probably add transaction support (such that all or no articles are imported, not some subset if some articles give errors). There isn't any yet, so making a DB backup beforehand is very much advised.
