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


# get IDs
print "Please enter your user ID (usually, you are admin, who has ID 1):"
owner_uid = raw_input()
try:
    owner_uid = int(owner_uid)
    assert(owner_uid > 0)
except:
    print 'Invalid ID (should be a positive number)'
    sys.exit(2)
print "Please enter the ID of your unifeed (You can create a new feed with the SQL in\
the file 'create-tt-unifeed.sql'):"
feed_id = raw_input()
try:
    feed_id = int(feed_id)
    assert(feed_id > 0)
except:
    print 'Invalid ID (should be a positive number)'
    sys.exit(2)

# decoding import
print "Reading in data from shared-items.json ..."
gex_im = open('shared-items.json', 'r')
gex = json.load(gex_im)
gex_im.close()

# start writing
print "Writing tt-import.sql ..."
ttim = open('tt-import.sql', 'w')

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
    s = re.sub('''(['"])''', r'\\\1', s)
    return s

counter = 0
for item in gex['items']:
    # link
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
    # updated is timestamp, make nice SQL date
    updated = datetime.fromtimestamp(item['updated']).strftime('%Y-%m-%d %H-%M-%S')
    ttim.write("INSERT INTO ttrss_entries (guid, title, link, updated, content) VALUES \
                ('{g}', '{t}', '{l}', '{u}', '{c}');\n"\
                .format(g='%s,imported:%f' % (s(link), time()),
                        t=s(title), l=s(link), u=updated, c=s(content)))
    # copy user notes
    note = ''
    if len(item['annotations']) > 0:
        note = item['annotations'][0]['content']
    ttim.write("INSERT INTO ttrss_user_entries (ref_id, feed_id, owner_uid, published, note) \
                SELECT max(id), {fid}, {oid}, 1, '{n}' FROM ttrss_entries;\n\n"\
                .format(fid=feed_id , oid=owner_uid, n=s(note)))
    counter += 1

ttim.close()

print "Done. I wrote {0} entries.".format(counter)
