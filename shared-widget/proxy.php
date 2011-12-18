<?php

$url = $_GET['url'];

// if unable to fetch, remove @ in front of file_get_contents to output any errors
if ($data = @file_get_contents($url))
{
    header('Content-Type: text/xml');
    echo $data;
}
else
{
    header('Content-Type: text/plain');
    echo 'Unable to fetch contents.';
}
?>

