<?php
declare(strict_types=1);

header('Content-Type: text/calendar; charset=utf-8');
header('Cache-Control: public, max-age=300');

$property = isset($_GET['property']) ? preg_replace('/[^a-z0-9-]/i', '', (string) $_GET['property']) : '';
if ($property === '') {
    http_response_code(400);
    echo "Missing property parameter.\n";
    exit;
}

$bookingsFile = __DIR__ . '/../bookings/' . $property . '.json';
$bookings = [];
if (is_file($bookingsFile)) {
    $raw = file_get_contents($bookingsFile);
    $decoded = json_decode((string) $raw, true);
    if (is_array($decoded)) {
        $bookings = $decoded;
    }
}

echo "BEGIN:VCALENDAR\r\n";
echo "VERSION:2.0\r\n";
echo "PRODID:-//Curated BNB//Outbound Bookings//EN\r\n";

foreach ($bookings as $booking) {
    $checkIn = $booking['checkIn'] ?? '';
    $checkOut = $booking['checkOut'] ?? '';
    if (!$checkIn || !$checkOut) {
        continue;
    }
    try {
        $start = new DateTime($checkIn);
        $end = new DateTime($checkOut);
    } catch (Exception $e) {
        continue;
    }

    $uid = $booking['uid'] ?? bin2hex(random_bytes(8));
    $summary = $booking['summary'] ?? 'Booked';

    echo "BEGIN:VEVENT\r\n";
    echo "UID:" . $uid . "@curatedbnb\r\n";
    echo "DTSTAMP:" . gmdate('Ymd\\THis\\Z') . "\r\n";
    echo "DTSTART;VALUE=DATE:" . $start->format('Ymd') . "\r\n";
    echo "DTEND;VALUE=DATE:" . $end->format('Ymd') . "\r\n";
    echo "SUMMARY:" . $summary . "\r\n";
    echo "END:VEVENT\r\n";
}

echo "END:VCALENDAR\r\n";
