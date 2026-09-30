<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$ch = curl_init('https://manage.hmoni.com/api/cv/download');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 20);
curl_setopt($ch, CURLOPT_USERAGENT, 'HMoniProxy/1.0');

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
curl_close($ch);

if ($response !== false && $httpCode >= 200 && $httpCode < 400) {
    header("Content-Type: " . ($contentType ? $contentType : "application/pdf"));
    header("Content-Disposition: attachment; filename=\"H_Moni_CV.pdf\"");
    echo $response;
} else {
    // If download route fails, redirect to direct URL
    header("Location: https://manage.hmoni.com/api/cv/download");
    exit();
}
