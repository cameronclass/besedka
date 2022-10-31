<?php


require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';


$mail->isSMTP();                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com'; 
$mail->SMTPAuth = true;
$mail->Username = 'tokmaganbeta@gmail.com'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'qvuudlqrhszydbpw'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->isHTML(true);



$mail->setFrom('tokmaganbeta@gmail.com');  // от кого будет уходить письмо?

$mail->addAddress('zakaz@sspot.ru');     // Кому будет уходить письмо 
$mail->addAddress('tokmaganbet@gmail.com');     // Кому будет уходить письмо 


$c = true;
$mail->Subject = 'Заявка с сайта SkySpot B2B';

foreach ($_POST as $key => $value) {
	if ($value != "" && $key != "form_subject") {
		$message .= "
			" . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
			<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
			<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
		</tr>
		";
	}
}

// $mail->addAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']);


$mail->Body = "<table style='width: 100%;'>$message</table>";

$mail->AltBody = '';


if (!$mail->send()) {
	// echo $mail->ErrorInfo;
}