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

$total = isset($payload['total']) ? (float) $payload['total'] : 0.0;
if ($total <= 0) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid booking total.']);
    exit;
}

$keyId = 'rzp_test_S2ZvLKm3aet64B';
$keySecret = 'ttl0eZaZFxqBuRCDIFmlPEOp';
if (!$keyId || !$keySecret) {
    http_response_code(500);
    echo json_encode(['message' => 'Razorpay keys missing on server.']);
    exit;
}

$amount = (int) round($total * 100);
$orderPayload = [
    'amount' => $amount,
    'currency' => 'INR',
    'receipt' => 'curatedbnb_' . time(),
    'notes' => [
        'propertyId' => $payload['propertyId'] ?? '',
        'propertyName' => $payload['propertyName'] ?? '',
        'checkIn' => $payload['dates']['checkIn'] ?? '',
        'checkOut' => $payload['dates']['checkOut'] ?? '',
        'guests' => $payload['guests'] ?? '',
        'guestName' => $payload['guest']['name'] ?? '',
        'guestEmail' => $payload['guest']['email'] ?? '',
    ],
];

$ch = curl_init('https://api.razorpay.com/v1/orders');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($orderPayload),
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_USERPWD => $keyId . ':' . $keySecret,
    CURLOPT_TIMEOUT => 15,
]);

$responseBody = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if ($responseBody === false || $status < 200 || $status >= 300) {
    $error = curl_error($ch);
    curl_close($ch);
    http_response_code(502);
    echo json_encode(['message' => 'Unable to create Razorpay order.']);
    if ($error) {
        error_log('Razorpay order error: ' . $error);
    }
    exit;
}
curl_close($ch);

$order = json_decode($responseBody, true);
if (!is_array($order) || empty($order['id'])) {
    http_response_code(502);
    echo json_encode(['message' => 'Unexpected Razorpay response.']);
    exit;
}

echo json_encode([
    'orderId' => $order['id'],
    'amount' => $order['amount'],
    'currency' => $order['currency'],
]);
