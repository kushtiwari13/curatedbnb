<?php
declare(strict_types=1);

// Simple iCal proxy for shared hosting. Limits requests to Airbnb iCal URLs.

header('Content-Type: text/calendar; charset=utf-8');
header('Cache-Control: public, max-age=300');

$url = isset($_GET['url']) ? trim((string) $_GET['url']) : '';
if ($url === '') {
    http_response_code(400);
    echo "Missing url parameter.\n";
    exit;
}

$parts = parse_url($url);
if ($parts === false || !isset($parts['scheme'], $parts['host'])) {
    http_response_code(400);
    echo "Invalid url parameter.\n";
    exit;
}

$scheme = strtolower($parts['scheme']);
$host = strtolower($parts['host']);
if ($scheme !== 'https' || !preg_match('/(^|\.)airbnb\.com$/', $host)) {
    http_response_code(403);
    echo "URL not allowed.\n";
    exit;
}

$responseBody = null;

if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_USERAGENT => 'CuratedBNB-iCal-Proxy/1.0',
    ]);
    $responseBody = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);

    if ($responseBody === false || $status < 200 || $status >= 300) {
        http_response_code(502);
        echo "Upstream fetch failed.\n";
        if ($err) {
            error_log("iCal proxy cURL error: " . $err);
        }
        exit;
    }
} else {
    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'timeout' => 10,
            'header' => "User-Agent: CuratedBNB-iCal-Proxy/1.0\r\n",
        ],
    ]);
    $responseBody = @file_get_contents($url, false, $context);
    if ($responseBody === false) {
        http_response_code(502);
        echo "Upstream fetch failed.\n";
        exit;
    }
}

echo $responseBody;
