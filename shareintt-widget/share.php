<?php
/* 
 This script takes website details from the form and inserts 
 them into the tt-rss DB. Put this into the tt-rss directory.
*/

// adapt these
$feed_id = 174;
$o_id = 1;  //admin is 1


header('Content-Type: text/html; charset=utf-8');

require_once("functions.php");
require_once("sessions.php");

$link = db_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
init_connection($link);

$MSG = 'success';

if ($_SESSION["uid"] && validate_session($link)) {
    try{
        /*
        Update db. We needs to know database credentials, id of user in DB and gritttt-id
        In particular,
        - Make new entry in ttrss_entries, set (title, link, content) from request, Remember new-id 
        - Make new entry in ttrss_user_entries, set (new-id->ref_id, gritttt-id->feed_id, user-id->owner_uid) 
          also set updated, published & read. 
        */
        $t = $_POST['gritttt-title'];
        $u = $_POST['gritttt-url'];
        $c = $_POST['gritttt-comment'];
        db_query($link, "INSERT into ttrss_entries (title, link, guid, updated) VALUES ('$t', '$u', '$u', NOW());");
        if (1 ==1) { // currently only support for MySQL, no postgres love :(
            $last_id = mysql_insert_id();
        } else {

        }
        db_query($link, "INSERT into ttrss_user_entries (ref_id, feed_id, owner_uid, note, published, unread) VALUES ($last_id, $feed_id, $o_id, '$c', 1, 0);");
    } catch (Exception $e) {  // does not catch DB errors yet?
        $MSG = 'failure:'.$e->getMessage();
    }
} else {
    $MSG = 'login';
}
?>

<script>
window.onload = function(){
        window.parent.postMessage('<?php echo $MSG;?>', '*'); //TODO: only send to specific URI
};
</script>
