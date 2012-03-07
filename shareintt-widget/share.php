<?php
/* 
 This script takes website details from the form and inserts
 them into the tt-rss DB.

 It needs to know database credentials, id of user in DB and gritttt-id
 In particular,
 * Make new entry in ttrss_entries, set (title, link, content) from request, 
   also set updated, published & read. Remember new-id
 * Make new entry in ttrss_user_entries, set (new-id->ref_id, gritttt-id->feed_id, user-id->owner_uid) 
 
 TODO:
    * Login and possible logout can be done with the JSON API (http://tt-rss.org/redmine/projects/tt-rss/wiki/JsonApiReference). To start with, we could simply check if the user is logged in and report an error if (s)he is not.
    * The API does not support insertion of a new article (why should it?). Therefore, this needs to be coded by hand
      Search for 'INSERT' in functions.php to get a start. All we need is to get a database connection and make that insert happen.
 */


// This below might be useful to allow sharing only when user is logged in
//  Then we might need the sessionid from tt-rss here.
/*

$ttrssServer = 'http://www.nicolashoening.de/tt-rss-test';

function postAPI($data) {                                                                   
    $data_string = json_encode($data);                                                                                   
    $ch = curl_init(ttrssServer.'/api');                                                                      
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
        'Content-Type: application/json',                                                                                
        'Content-Length: ' . strlen($data_string))                                                                       
    );  
    return curl_exec($ch);
}
$data = array("op" => "isLoggedIn"); 
echo(postAPI($data));
*/

$path_to_ttrss = '../tt-rss-test/';
require_once($path_to_ttrss."backend.php");
require_once($path_to_ttrss."functions.php");
require_once($path_to_ttrss."fb-prefs.php");

$link = db_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
init_connection($link);

$login = $_POST["login"]; // make empty?
$password = $_POST["password"];

if (authenticate_user($link, $login, $password)) {
    db_query($link, "UPDATE ttrss_users SET last_login = NOW() WHERE id = ");
} else {
    echo('please log in');
}
?>

<script>
window.onload = function(){
        window.parent.postMessage('<?php echo $RES;?>', '*'); //TODO: only send to specific URI
};
</script>
