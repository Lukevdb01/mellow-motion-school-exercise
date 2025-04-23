<?php

class StoryController {
    public function getScene($sceneId) {
        $scenes = $this->loadScenes();

        if (!isset($scenes[$sceneId])) {
            http_response_code(404);
            echo json_encode(['error' => 'Scene not found']);
            return;
        }

        echo json_encode($scenes[$sceneId]);
    }

    public function answerQuestion() {
        $data = json_decode(file_get_contents('php://input'), true);  // Get the POST data
        $sceneId = $data['sceneId'] ?? null;  // Extract sceneId from the request
        $choiceIndex = $data['choiceIndex'] ?? null;  // Extract the choice index (which choice the player made)

        $scenes = $this->loadScenes();  // Load all scenes

        // If the scene doesn't exist, return an error
        if (!$sceneId || !isset($scenes[$sceneId])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid scene']);
            return;
        }

        // Get the next scene based on the player's choice
        $scene = $scenes[$sceneId];
        $nextSceneId = $scene['choices'][$choiceIndex]['next'] ?? null;

        // If the next scene exists, return it
        if ($nextSceneId && isset($scenes[$nextSceneId])) {
            echo json_encode($scenes[$nextSceneId]);
        } else {
            http_response_code(404);  // If there's no next scene, return a 404 error
            echo json_encode(['error' => 'Next scene not found']);
        }
    }


    private function loadScenes() {
        return json_decode(file_get_contents(__DIR__ . '/../data/story.json'), true);
    }
}