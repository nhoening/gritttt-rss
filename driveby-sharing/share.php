<?php
/* 
 This script takes website details from the form and inserts 
 them into the tt-rss DB. Put this into the tt-rss directory.
*/

// adapt these
$feed_id = 3;
$user_id = 1;  //admin is 1
// end adapt

header('Content-Type: text/html; charset=utf-8');

require_once("functions.php");
require_once("sessions.php");

$link = db_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
init_connection($link);

$MSG = 'success';

if ($_SESSION["uid"] && validate_session($link)) {
    try{
        $t = $_POST['gritttt-title'];
        $url = $_POST['gritttt-url'];
        $uid = $url.',imported:'.time();
        $c = $_POST['gritttt-comment'];
        // Make new entry in ttrss_entries, set (title, link, content) from request, Remember new-id 
        db_query($link, "INSERT into ttrss_entries (title, link, guid, date_entered, date_updated, updated) VALUES ('$t', '$url', '$uid', NOW(), NOW(), NOW());");
        if (1 ==1) { // currently only support for MySQL, no postgres love :(
            $last_id = mysql_insert_id();
        } else {

        }
        // Make new entry in ttrss_user_entries
        db_query($link, "INSERT into ttrss_user_entries (ref_id, feed_id, owner_uid, note, published, unread) VALUES ($last_id, $feed_id, $user_id, '$c', 1, 0);");
        db_query($link, "UPDATE ttrss_feeds SET last_updated = NOW() WHERE id = $feed_id;");
    } catch (Exception $e) { // does not catch DB errors yet ?
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
