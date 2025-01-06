<?php

session_start();

// Set the header to return JSON
header("Content-Type: application/json");

// Allow Cross-Origin Resource Sharing (CORS) if needed
header("Access-Control-Allow-Origin: *");

//Check http Method
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        "message" => "Method not allowed."
    ]);
    return;
}

// Read the raw POST data (JSON)
$inputData = json_decode(file_get_contents('php://input'), true);

$guess_word = isset($inputData['guess_word']) ? $inputData['guess_word'] : '';

if (!$guess_word) {
    http_response_code(400); // Invalid input
    echo json_encode([
        "message" => "Empty input"
    ]);
    return;
}

//Check if the word is valid
$filePath = __DIR__ . "/../five_letter_words_full.csv";

$words = [];

if (($handle = fopen($filePath, "r")) !== FALSE) {
    
    // Skip the header row if present
    fgetcsv($handle);

    // Read each row of the CSV and store the word in the array
    while (($data = fgetcsv($handle)) !== FALSE) {
        $words[] = $data[0];  // Assuming the words are in the first column
    }

    // Close the file
    fclose($handle);
}

if (!array_search(strtolower($guess_word), $words)) {
    http_response_code(400); // invalid input
    echo json_encode([
        "message" => "Invalid word"
    ]);
    return;
}

// Check the random word
$random_word = isset($_SESSION['random_word']) ? $_SESSION['random_word'] : '';

if (!$random_word) {
    http_response_code(400); // Invalid input
    echo json_encode([
        "message" => "Generate new random word"
    ]);
    return;
}

// Feedback for the guess
echo json_encode([
    "message" => $random_word
]);