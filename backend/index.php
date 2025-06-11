<?php
// index.php in /mellow-motion/backend/

// CORS headers
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Load controller
require_once __DIR__ . '/controllers/StoryController.php';

// Determine route
$basePath = '/mellow-motion/backend';
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$route = str_replace($basePath, '', $requestUri);
$segments = explode('/', trim($route, '/'));

$method = $_SERVER['REQUEST_METHOD'];
$controller = new StoryController();

// Example: GET /scene/dialog1
if ($method === 'GET' && isset($segments[0]) && $segments[0] === 'scene') {
    $sceneId = $segments[1] ?? 'scene1';
    $controller->getScene($sceneId);
    exit;

// Example: POST /answer-question
} elseif ($method === 'POST' && isset($segments[0]) && $segments[0] === 'answer-question') {
    $controller->answerQuestion();
    exit;

} else {
    http_response_code(404);
    echo json_encode(['error' => 'Route not found']);
    exit;
}
