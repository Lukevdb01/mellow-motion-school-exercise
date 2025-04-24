<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/controllers/StoryController.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

$controller = new StoryController();

if ($method === 'GET' && isset($uri[1]) && $uri[0] === 'backend' && $uri[1] === 'scene') {
    $sceneId = $uri[2] ?? 'scene1';
    $controller->getScene($sceneId);

} elseif ($method === 'POST' && isset($uri[1]) && $uri[0] === 'backend' && $uri[1] === 'answer-question') {
    $controller->answerQuestion();

} else {
    http_response_code(404);
    echo json_encode(['error' => 'Route not found']);
}