<?php

/*
 Shows a form to display in the iframe, which submits to share.php with details about the page.
*/

// if your tt-rss instance runs on a version below 1.5.10
// remove the 'includes'
require_once("../../includes/functions.php");
require_once("../../includes/sessions.php");

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
        <div id="gritttt-logo">
            <a href="http://gritttt-rss.nicolashoening.de/" target="_blank">
                <img src="./gritttt-logo.png" alt="Go to Home of Gritttt" title="Go to Home of Gritttt"/>
            </a>
        </div>
        <div id="gritttt-heading">Share this page in your tt-rss:</div> 
        <br/>
        <input id="gritttt-url" name="gritttt-url" type="hidden" size="40" name="url"></input>
        <div id="gritttt-row-title">
            <label for="gritttt-title">Title:</label>
            <input id="gritttt-title" name="gritttt-title" type="text" size="60" name="title"></input>
        </div>

        <div id="gritttt-row-comment">
            <label for="gritttt-comment">Comment:</label>
            <textarea rows="2" cols="40" id="gritttt-comment" name="gritttt-comment"></textarea>
        </div>
        <div id="gritttt-row-submit">
            <input id="gritttt-submit" type="submit" name="shareit" value="Share"/>
        </div>
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
            document.getElementById('gritttt-ttrss-link').href = getParameterByName('ttrss_url');
        </script>

<? } ?>
  </body>
</html>
