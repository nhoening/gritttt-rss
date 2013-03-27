#!/usr/bin/python
# -*- coding: utf-8 -*-

'''
This script transforms the JSON Stream containing
exported Google Readers shared items to SQL that inserts
them into the feed table in tt-rss.

You can export the json in the preferences of Google Reader
(choose the custom Google one)

Requires Python 2.6+ and your MySQL DB >= 4.1
'''

import sys
import json
from datetime import datetime
from time import time
import re
import os


# get IDs

print "Please enter your user ID (usually, you are admin, who has ID 1):"
owner_uid = raw_input()
try:
    owner_uid = int(owner_uid)
    assert(owner_uid > 0)
except:
    print 'Invalid ID (should be a positive number)'
    sys.exit(2)

print "If you want, you can link all imported items to a certain feed "\
      "(You can create a new dedicated feed with the SQL in the file 'create-gritttt-feed.sql'). "\
      "Enter the ID of that feed now."\
      "However, if you simply want the items to be in your database without being connected to "\
      "a certain feed (you can always find them in the "\
      "virtual feeds for published and starred items, anyway), just hit Enter."   
feed_id = raw_input()
if feed_id == '':
    feed_id = 'NULL'
else:
    try:
        feed_id = int(feed_id)
        assert(feed_id > 0)
    except:
        print 'Invalid ID (should be a positive number)'
        sys.exit(2)

# which database to import to
print "Are you importing to a MySQL database (Y/n)? (no assumes PostgreSQL):"
mysql_database = raw_input().lower()
if not mysql_database in ['', 'y', 'n']:
    print 'Invalid choice'
    sys.exit(2)
if mysql_database in ['', 'y']:
    mysql_database = True
else:
    mysql_database = False

# which data to import
print "Should we import shared articles (Y/n)? (then I expect you to have exported a file "\
      "called shared.json from Google):"
do_shared = raw_input().lower()
if not do_shared in ['', 'y', 'n']:
    print 'Invalid choice'
    sys.exit(2)
if do_shared in ['', 'y']:
    do_shared = True
    if not os.path.exists('shared.json'):
        print 'Cannot find the file shared.json ...'
        sys.exit(2)
else:
    do_shared = False

print "Should we import starred articles (Y/n)? (then I expect you to have exported a file "\
      "called starred.json from Google):"
do_starred = raw_input().lower()
if not do_starred in ['', 'y', 'n']:
    print 'Invalid choice'
    sys.exit(2)
if do_starred in ['', 'y']:
    do_starred = True
    if not os.path.exists('starred.json'):
        print 'Cannot find the file starred.json ...'
        sys.exit(2)
else:
    do_starred = False

# start writing
print "Writing gritttt-import.sql ..."
ttim = open('gritttt-import.sql', 'w')
ttim.write('-- SQL Import from Google Reader, created {0} \n\n '\
           .format(datetime.now()))

def s(unicode_str):
    '''
    for sanitizing strings:
     - getting rid of all non-utf8 things
     - escape single quotations
    '''
    s = unicode_str.encode('utf-8', 'ignore')
    s = s.replace("\\'", "'") # unescape already escaped ones
    if mysql_database:
        s = re.sub('''(['"])''', r'\\\1', s)
    else: # PostgreSQL is assumed
        s = re.sub('''(['])''', r"''", s)
    return s


def write_sql(items, shared, c):
    for item in items:
        # link
        if 'alternate' not in item:
            print('Could not import item with id {}. It does not seem to have'\
                  ' any href-information.'.format(item['id']))
            continue
        link = item['alternate'][0]['href']
        # title, or just link
        if item.has_key('title'):
            title = item['title']
        else:
            title = link
        # content is either under content/content or summary/content
        content = ''
        for k in ['content', 'summary']:
            if item.has_key(k):
                content += item[k]['content']
        # updated is when feed item was published, make nice SQL date
        pub = datetime.fromtimestamp(item['published']).strftime('%Y-%m-%d %H:%M:%S')

        ttim.write("INSERT INTO ttrss_entries (guid, title, link, date_entered, date_updated, updated, content, content_hash) VALUES \
                    ('{g}', '{t}', '{l}', '{pub}', '{pub}', '{pub}', '{c} ', '');\n"\
                    .format(g='%s,imported:%f' % (s(link), time()),
                            t=s(title), l=s(link), pub=pub, c=s(content)))
        # copy user notes
        note = ''
        if len(item['annotations']) > 0:
            note = item['annotations'][0]['content']
        if mysql_database:
            ttim.write("INSERT INTO ttrss_user_entries (label_cache, uuid, tag_cache, ref_id, feed_id, owner_uid, published, marked,  note, unread) \
                        SELECT '', '', '', max(id), {fid}, {oid}, {pub}, {mar}, '{n} ', 0 FROM ttrss_entries;\n\n"\
                        .format(fid=feed_id , oid=owner_uid, pub=int(shared), mar=int(not shared), n=s(note)))
        else: # PostgreSQL is assumed
            ttim.write("INSERT INTO ttrss_user_entries (label_cache, uuid, tag_cache, ref_id, feed_id, owner_uid, published, marked,  note, unread) \
                        SELECT '', '', '', max(id), {fid}, {oid}, {pub}, {mar}, '{n} ', False FROM ttrss_entries;\n\n"\
                        .format(fid=feed_id , oid=owner_uid, pub=shared, mar=(not shared), n=s(note)))
        c += 1
    return c


counter = 0

if do_starred:
    print "Reading in data from starred.json ..."
    gex_im = open('starred.json', 'r')
    gex = json.load(gex_im)
    gex_im.close()
    # we insert them in the order of date
    items = gex['items']
    items.reverse()
    counter = write_sql(items, False, counter)

if do_shared:
    print "Reading in data from shared.json ..."
    gex_im = open('shared.json', 'r')
    gex = json.load(gex_im)
    gex_im.close()
    # we insert them in the order of date
    items = gex['items']
    items.reverse()
    counter = write_sql(items, True, counter)

if feed_id != 'NULL':
    ttim.write("UPDATE ttrss_feeds SET last_updated = NOW() WHERE id = {id};".format(id=feed_id));

ttim.close()

print "Done. I wrote {0} entries.".format(counter)
