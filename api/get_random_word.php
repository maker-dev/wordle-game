<?php
require_once __DIR__ . '/vendor/autoload.php';

//ENV
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$Front_URL = $_ENV["FRONT_URL"];


session_start();

// Set the header to return JSON
header("Content-Type: application/json");

// Allow Cross-Origin Resource Sharing (CORS) if needed
header("Access-Control-Allow-Origin: " . $Front_URL);

// Allow credentials (cookies, authorization headers, etc.)
header("Access-Control-Allow-Credentials: true");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE"); 

// Allow specific headers, including authorization headers
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$filePath = __DIR__ . "/assets/wordle_words.csv";

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

$maxIndex = count($words) - 1;
$random_number = $maxIndex > 0 ? rand(0, $maxIndex) : 0;
$random_word = $words[$random_number];

$_SESSION['random_word'] = $random_word;
$_SESSION['attempts_left'] = 6;
$_SESSION['guesses'] = [];

echo json_encode([
    "response" => "Random word Generated Successfully." . $random_word
]);
