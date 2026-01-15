<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed.']);
    exit;
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid JSON payload.']);
    exit;
}

$orderId = $payload['razorpay_order_id'] ?? '';
$paymentId = $payload['razorpay_payment_id'] ?? '';
$signature = $payload['razorpay_signature'] ?? '';

if ($orderId === '' || $paymentId === '' || $signature === '') {
    http_response_code(400);
    echo json_encode(['message' => 'Missing payment verification fields.']);
    exit;
}

$keySecret = 'ttl0eZaZFxqBuRCDIFmlPEOp';
if (!$keySecret) {
    http_response_code(500);
    echo json_encode(['message' => 'Razorpay key secret missing on server.']);
    exit;
}

$expected = hash_hmac('sha256', $orderId . '|' . $paymentId, $keySecret);
if (!hash_equals($expected, $signature)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid payment signature.']);
    exit;
}

$booking = is_array($payload['booking'] ?? null) ? $payload['booking'] : [];
$guest = is_array($booking['guest'] ?? null) ? $booking['guest'] : [];

$guestName = $guest['name'] ?? 'Guest Name';
$guestEmail = $guest['email'] ?? 'guest@example.com';
$ownerEmail = getenv('OWNER_EMAIL') ?: 'owner@example.com';
$fromEmail = getenv('FROM_EMAIL') ?: $ownerEmail;
$fromName = getenv('FROM_NAME') ?: 'Curated BNB';

$checkInRaw = $booking['dates']['checkIn'] ?? '';
$checkOutRaw = $booking['dates']['checkOut'] ?? '';

$parseDate = static function ($value) {
    if (!$value) {
        return null;
    }
    try {
        return new DateTime($value);
    } catch (Exception $e) {
        return null;
    }
};

$checkIn = $parseDate($checkInRaw);
$checkOut = $parseDate($checkOutRaw);
$checkInLabel = $checkIn ? $checkIn->format('Y-m-d') : 'N/A';
$checkOutLabel = $checkOut ? $checkOut->format('Y-m-d') : 'N/A';

$safePaymentId = preg_replace('/[^a-zA-Z0-9_-]/', '', $paymentId);
$confirmationsDir = __DIR__ . '/../confirmations';
if (!is_dir($confirmationsDir)) {
    mkdir($confirmationsDir, 0755, true);
}

$textFilename = 'confirmation_' . $safePaymentId . '.txt';
$icsFilename = 'confirmation_' . $safePaymentId . '.ics';
$textPath = $confirmationsDir . '/' . $textFilename;
$icsPath = $confirmationsDir . '/' . $icsFilename;

$propertyName = $booking['propertyName'] ?? 'Curated BNB stay';
$guests = $booking['guests'] ?? '';
$total = $booking['total'] ?? '';

$textBody = "Booking confirmation\n"
    . "Reference: " . $paymentId . "\n"
    . "Guest: " . $guestName . "\n"
    . "Property: " . $propertyName . "\n"
    . "Check-in: " . $checkInLabel . "\n"
    . "Check-out: " . $checkOutLabel . "\n"
    . "Guests: " . $guests . "\n"
    . "Total (INR): " . $total . "\n";

file_put_contents($textPath, $textBody);

$icsStart = $checkIn ? $checkIn->format('Ymd') : '';
$icsEnd = $checkOut ? $checkOut->format('Ymd') : '';
$icsBody = "BEGIN:VCALENDAR\r\n"
    . "VERSION:2.0\r\n"
    . "PRODID:-//Curated BNB//Booking//EN\r\n"
    . "BEGIN:VEVENT\r\n"
    . "UID:" . $safePaymentId . "@curatedbnb\r\n"
    . "DTSTAMP:" . gmdate('Ymd\THis\Z') . "\r\n"
    . ($icsStart ? "DTSTART;VALUE=DATE:" . $icsStart . "\r\n" : "")
    . ($icsEnd ? "DTEND;VALUE=DATE:" . $icsEnd . "\r\n" : "")
    . "SUMMARY:Curated BNB stay\r\n"
    . "END:VEVENT\r\n"
    . "END:VCALENDAR\r\n";

file_put_contents($icsPath, $icsBody);

$baseUrl = rtrim((string) getenv('APP_URL'), '/');
$downloadPath = '/confirmations/' . $textFilename;
$calendarPath = '/confirmations/' . $icsFilename;
$downloadUrl = $baseUrl ? $baseUrl . $downloadPath : $downloadPath;
$calendarUrl = $baseUrl ? $baseUrl . $calendarPath : $calendarPath;

$subject = 'Curated BNB booking confirmed';
$message = $textBody . "\nDownload confirmation: " . $downloadUrl . "\nCalendar invite: " . $calendarUrl . "\n";
$headers = [
    'From: ' . $fromName . ' <' . $fromEmail . '>',
    'Content-Type: text/plain; charset=utf-8',
];

@mail($ownerEmail, $subject, $message, implode("\r\n", $headers));
if ($guestEmail) {
    @mail($guestEmail, $subject, $message, implode("\r\n", $headers));
}

echo json_encode([
    'status' => 'success',
    'paymentId' => $paymentId,
    'downloadUrl' => $downloadUrl,
    'calendarUrl' => $calendarUrl,
    'emailSentTo' => $guestEmail,
]);
