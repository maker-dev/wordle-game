<?php

session_start();

// Set the header to return JSON
header("Content-Type: application/json");

// Allow Cross-Origin Resource Sharing (CORS) if needed
header("Access-Control-Allow-Origin: *");


// Allow methods for the CORS preflight response (OPTIONS)
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type");


// //Check http Method
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

if (strlen($guess_word) !== 5) {
    http_response_code(400); // Invalid input
    echo json_encode([
        "message" => "Word must be 5 letters."
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

// Check the random_word and attempts_left variables
$random_word = isset($_SESSION['random_word']) ? $_SESSION['random_word'] : '';
$attempts_left = isset($_SESSION['attempts_left']) ? $_SESSION['attempts_left'] : '';

if (!$random_word || !$attempts_left) {
    http_response_code(400); // Invalid input
    echo json_encode([
        "message" => "Play New Game"
    ]);
    return;
}

$attempts_left -= 1;
$_SESSION['attempts_left'] = $attempts_left;

// update guesses
$_SESSION['guesses'][] = $guess_word;

// Feedback for the guess
if ($guess_word === $random_word) {
    echo json_encode([
        "correct" => true,
        "feedback" => [
            ["letter" => $guess_word[0], "status" => "green" ],
            ["letter" => $guess_word[1], "status" => "green" ],
            ["letter" => $guess_word[2], "status" => "green" ],
            ["letter" => $guess_word[3], "status" => "green" ],
            ["letter" => $guess_word[4], "status" => "green" ]
        ],
        "attempts_left" => $attempts_left
    ]);
    return;
} else {
    $feedback = [];
    
    for ($index = 0; $index < 5; $index++) {
        $character = $guess_word[$index];
        $status    = "unknown";
        
        if ($character === $random_word[$index]) {
            $status = "green";
        } else if (strpos($random_word, $character) !== false) {
            $status = "yellow";
        } else {
            $status = "gray";
        }

        $feedback[] = ["letter" => $character, "status" => $status];
    }

    echo json_encode([
        "correct" => false,
        "feedback" => $feedback,
        "attempts_left" => $attempts_left
    ]);
    return;
}