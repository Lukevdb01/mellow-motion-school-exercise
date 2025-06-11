<?php
// index.php in /mellow-motion/backend/

// Basic CORS setup
// Verstuur Content-Type header en CORS headers
header("Content-Type: application/json");

// Preflight requests correct afhandelen
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Preflight hoeft verder niks te doen
    http_response_code(204); // No Content
    exit;
}

// Load controller
require_once __DIR__ . '/controllers/StoryController.php';

// Determine route
$basePath = '/mellow-motion/backend';
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$route = str_replace($basePath, '', $requestUri);
$segments = explode('/', trim($route, '/'));

// Request method
$method = $_SERVER['REQUEST_METHOD'];
$controller = new StoryController();

// Routes
if ($method === 'GET' && isset($segments[0]) && $segments[0] === 'scene') {
    $sceneId = $segments[1] ?? 'scene1';
    $controller->getScene($sceneId);
    exit;

} elseif ($method === 'POST' && isset($segments[0]) && $segments[0] === 'answer-question') {
    $controller->answerQuestion();
    exit;

} else {
    http_response_code(404);
    echo json_encode(['error' => 'Route not found']);
    exit;
}
