<?php
/* 
 This script takes website details from the form and inserts 
 them into the tt-rss DB.
*/

// read config
$datastring = file_get_contents('config.js');
preg_match("/config[ ]?=[ ]?\{([^\;]+)\\;/", $datastring, $matches);
$config = json_decode('{' . $matches[1], true);
$feed_id = $config['feed_id'];
$user_id = $config['user_id'];
$path_to_ttrss = $config['path_to_ttrss'];

header('Content-Type: text/html; charset=utf-8');

set_include_path(get_include_path() . PATH_SEPARATOR . $path_to_ttrss);
require_once($path_to_ttrss . "/classes/idb.php");
require_once($path_to_ttrss . "/include/sessions.php");

$MSG = 'success';

if ($_SESSION["uid"] && validate_session()) {
    try{
        $t = Db::get()->escape_string($_POST['gritttt-title']);
        $url = Db::get()->escape_string($_POST['gritttt-url']);
        $uid = $url.',imported:'.time();
        $c = Db::get()->escape_string($_POST['gritttt-comment']);
        // 1. Make new entry in ttrss_entries, set (title, link, content) from request, Remember new-id 
        Db::get()->query("INSERT into ttrss_entries (title, link, guid, date_entered, date_updated, updated) VALUES ('$t', '$url', '$uid', NOW(), NOW(), NOW());");
        // 2. Make new entry in ttrss_user_entries
        // We have to do this SELECT instead of using a function like mysqli_insert_id bcs tt-rss doesn't
        // expose that functionality via its iDB interface
        $res = Db::get()->query('SELECT MAX(id) as maxid FROM ttrss_entries;');
        $last_id = Db::get()->fetch_result($res, 0, 'maxid');
        Db::get()->query("INSERT into ttrss_user_entries (ref_id, feed_id, owner_uid, note, published, unread, last_published) VALUES ($last_id, $feed_id, $user_id, '$c', 1, 0, NOW());");
        // 3. tell everyone that the gritttt-feed has been updated
        Db::get()->query("UPDATE ttrss_feeds SET last_updated = NOW() WHERE id = $feed_id;");
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
