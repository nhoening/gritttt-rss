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
$ttrss_above_1510 = $config['ttrss_version_above_1.5.10'];

header('Content-Type: text/html; charset=utf-8');
if ($ttrss_above_1510) {
    set_include_path(get_include_path() . PATH_SEPARATOR . $path_to_ttrss);
    require_once($path_to_ttrss . "/include/functions.php");
    require_once($path_to_ttrss . "/include/sessions.php");
} else {
    require_once($path_to_ttrss . "/functions.php");
    require_once($path_to_ttrss . "/sessions.php");
}

$link = db_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
init_connection($link);

if (1 == 1) { // if mysql
    mysql_set_charset('utf8', $link);
}

$MSG = 'success';

if ($_SESSION["uid"] && validate_session($link)) {
    try{
        $t = mysqli_real_escape_string($_POST['gritttt-title']);
        $url = mysqli_real_escape_string($_POST['gritttt-url']);
        $uid = $url.',imported:'.time();
        $c = mysqli_real_escape_string($_POST['gritttt-comment']);
        // Make new entry in ttrss_entries, set (title, link, content) from request, Remember new-id 
        db_query($link, "INSERT into ttrss_entries (title, link, guid, date_entered, date_updated, updated) VALUES ('$t', '$url', '$uid', NOW(), NOW(), NOW());");
        if (1 == 1) {
            $last_id = mysql_insert_id();
        } else {
            // TODO: find ttrss_entry id for non-MySQL DBs (e.g. postgres)
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
