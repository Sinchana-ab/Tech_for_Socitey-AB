<?php
// Backend for ChatGPT integration
header("Content-Type: application/json");

// Replace with your OpenAI API key
$apiKey = "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";

// Read input data from the frontend
$input = json_decode(file_get_contents("php://input"), true);
if (!$input || !isset($input['messages'])) {
    echo json_encode(["error" => "Invalid request"]);
    http_response_code(400);
    exit;
}

// OpenAI API endpoint
$apiUrl = "https://api.openai.com/v1/chat/completions";

// Prepare request payload
$requestData = [
    "model" => "gpt-3.5-turbo",
    "messages" => $input['messages']
];

// Initialize cURL
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json"
]);

// Execute API call
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Check for errors
if ($httpCode !== 200) {
    echo json_encode(["error" => "API request failed", "details" => $response]);
    http_response_code($httpCode);
    exit;
}

// Send response back to frontend
echo $response;
?>
