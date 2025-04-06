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


$solution_word = $_SESSION["random_word"];


echo json_encode([
    "solution" => $solution_word
]);
