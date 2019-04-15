<?php
$recepient = "vasiluk.natalia@gmail.com";
$sitename = "KONDITER.PP.UA";
$admin = "admin@konditer.pp.ua";
$customerName = trim($_GET["name"]);
$customerPhone = trim($_GET["phone"]);
$customerMail = trim($_GET["mail"]);

$pagetitle = "Новая заявка с сайта \"$sitename\"";
$answerpagetitle = "Відповідь з сайту \"$sitename\"";

$message = "Имя: $customerName \nТелефон: $customerPhone \nE-mail: $customerMail \n\nХочу замовити у Вас торт. \nПеретелефонуйте мені будь-ласка!";
$thanksMessage = "$customerName, дякуємо за звернення! \nМи зателефонуємо Вам протягом 30хв.!";

mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
mail($customerMail, $answerpagetitle, $thanksMessage, "Content-type: text/plain; charset=\"utf-8\"\n From: $admin");
header("refresh: 1; url=http://konditer.pp.ua/");
echo '<script type="text/javascript">','alert("Дякуємо за звернення! Ми зателефонуємо Вам протягом 30хв.!");','</script>';