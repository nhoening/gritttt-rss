<?
/* 
 This script takes website details from the form and inserts
 them into the tt-rss DB.

 It needs to know database credentials, id of user in DB and gritttt-id
 In particular,
 * Make new entry in ttrss_entries, set (title, link, content) from request, 
   also set updated, published & read. Remember new-id
 * Make new entry in ttrss_user_entries, set (new-id->ref_id, gritttt-id->feed_id, user-id->owner_uid) 
 
 TODO: check functions.php in tt-rss for usable code
 */


return 1;
?>
