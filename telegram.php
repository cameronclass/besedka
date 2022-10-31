<?php

$token = "5427984135:AAEnfi7G_TERkKa5AzT4RPdKN09uTgxar-U";
$chat_id = "-697999449";

$c = true;


foreach ($_POST as $key => $value) {
    if ($value != "") {
        $key = str_replace('_', ' ', $key);
        $txt .= "<b>".$key."</b> ".$value."%0A";
    }
}
  
 
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r"); 

if ($sendToTelegram) {

} else {
    echo "Error";
}