<?php
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'tokmaganbet.smtp@gmail.com'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'Gg123698741'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->isHTML(true);

$mail->setFrom('tokmaganbet.smtp@gmail.com'); // от кого будет уходить письмо?

$mail->addAddress('tokmaganbet003@gmail.com');     // Кому будет уходить письмо 

$mail->addAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);

$c = true;
$mail->Subject = 'Заявка с сайта';

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

$mail->Body = "<table style='width: 100%;'>$message</table>";

$mail->AltBody = '';

if (!$mail->send()) {
	echo 'Error';
} else {
	header('location: index.html');
}
?>
