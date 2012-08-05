<?php

/*
 Shows a form to display in the iframe, which submits to share.php with details about the page.
*/

// read config
$datastring = file_get_contents('config.js');
preg_match("/config[ ]?=[ ]?\{([^\;]+)\\;/", $datastring, $matches);
$config = json_decode('{' . $matches[1], true);
$gritttt_url = $config['gritttt_url'];
$path_to_ttrss = $config['path_to_ttrss'];
$ttrss_above_1510 = $config['ttrss_version_above_1.5.10'];

if ($ttrss_above_1510) {
    set_include_path(get_include_path() . PATH_SEPARATOR . $path_to_ttrss);
    require_once($path_to_ttrss . "/include/functions.php");
    require_once($path_to_ttrss . "/include/sessions.php");
} else {
    require_once($path_to_ttrss . "/functions.php");
    require_once($path_to_ttrss . "/sessions.php");
}

ini_set('default_charset', 'utf-8');

$link = db_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
init_connection($link);
?>

<html>
  <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <link rel="stylesheet" type="text/css" href="form.css"/>
      <script type="text/javascript">
            function getParameterByName(name)
            {
              name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
              var regexS = "[\\?&]" + name + "=([^&#]*)";
              var regex = new RegExp(regexS);
              var results = regex.exec(window.location.search);
              if(results == null)
                return "";
              else
                return decodeURIComponent(results[1].replace(/\+/g, " "));
            }
    </script>
    </head>
  <body>

<?
// Logged in?
if ($_SESSION["uid"] && validate_session($link)) {
?>
        <!-- Show form -->
        <form id="gritttt-form" method="post" action="">
            <div id="gritttt-heading">Share this page in your tt-rss:</div> 
            <br/>
            <input id="gritttt-url" name="gritttt-url" type="hidden" size="40" name="url"></input>
            <label for="gritttt-title">Title:</label>
            <input id="gritttt-title" name="gritttt-title" type="text" size="60" name="title"></input>
            <br/>
            <label for="gritttt-comment">Comment:</label>
            <textarea rows="2" cols="40" id="gritttt-comment" name="gritttt-comment"></textarea>
            <br/>
            <input id="gritttt-submit" type="submit" name="shareit" value="Share"/>
        </form>
        <script type="text/javascript">
            document.getElementById('gritttt-form').action = getParameterByName('action');
            document.getElementById('gritttt-url').value = getParameterByName('url');
            document.getElementById('gritttt-title').value = getParameterByName('title');
        </script>
<? } else { ?>
        <!-- Tell user to log in first -->
        <div id="gritttt-msg">
            Please log in to <a id="gritttt-ttrss-link" href="" target="_blank">your tt-rss reader</a>.<br/>
            Then, click <a href="#" onclick="window.parent.postMessage('reload-form', '*');">here</a> to continue.
        </div>
        <script type="text/javascript">
            document.getElementById('gritttt-ttrss-link').href = '<?echo($gritttt_url);?>/<?echo($path_to_ttrss);?>';
        </script>

<? } ?>
  </body>
</html>
