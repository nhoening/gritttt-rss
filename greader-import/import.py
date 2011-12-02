#!/usr/bin/python
# -*- coding: utf-8 -*-

'''
This script transforms the JSON Stream containing
exported Google Readers shared items to SQL that inserts
them into the feed table in tt-rss.

You can export the json in the preferences of Google Reader
(choose the custom Google one)

Requires Python 2.6+
'''

import json


# ID of your tt-rss user. Usually, it's admin, who has ID 1.
owner_uid = 1
# set here the ID of your unifeed (create a new feed with the SQL in
# the file create-tt-unifeed.sql)
feed_id = -1

# decoding import
gex_im = open('shared-items.json', 'r')
gex = json.load(gex_im)
gex_im.close()

# start writing
ttim = open('tt-import.sql', 'w')

def s(unicode_str):
    '''
    sanitising strings:
     - getting rid of all non-ascii things for a sane database
     - escape quotations
    '''
    return unicode_str.encode('ascii', 'ignore')\
                      .replace('"', '\\"')\
                      .replace("'", "\\'")

for item in gex['items']:
    link = item['alternate'][0]['href']
    if item.has_key('title'):
        title = item['title']
    else:
        title = link
    # content is either under content/content or summary/content
    content = ''
    for k in ['content', 'summary']:
        if item.has_key(k):
            content += item[k]['content']
    ttim.write("INSERT INTO ttrss_entries (title, link, updated, content) VALUES \
                '{t}', '{l}', '{u}', '{c}';\n"\
                .format(t=s(title), l=s(link), u=item['updated'], c=s(content)))
    #TODO: updated is a timestamp, correct to whatever tt-rss uses
    #TODO: item['annotations'][0]['content'] contains user comments, where to put them?
    ttim.write("INSERT INTO ttrss_user_entries (ref_id, feed_id, owner_uid) VALUES \
                {rid}, {fid}, {oid};\n\n"\
                .format(rid=-1, fid=feed_id , oid=owner_uid))
    # TODO: how to get ref_id? This is the new ID of our insert in
    #       ttrss_entries

ttim.close()
