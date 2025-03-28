<?php

session_start();

// Set the header to return JSON
header("Content-Type: application/json");

// Allow Cross-Origin Resource Sharing (CORS) if needed
header("Access-Control-Allow-Origin: http://localhost:5173");

// Allow credentials (cookies, authorization headers, etc.)
header("Access-Control-Allow-Credentials: true");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE"); 

// Allow specific headers, including authorization headers
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$filePath = __DIR__ . "/../wordle_words.csv";

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

$random_number = rand(0, 999);

$random_word = $words[$random_number];

$_SESSION['random_word'] = $random_word;
$_SESSION['attempts_left'] = 6;
$_SESSION['guesses'] = [];

echo json_encode([
    "response" => "Random word Generated Successfully."
]);
