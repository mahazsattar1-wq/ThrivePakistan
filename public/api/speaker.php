<?php
/** POST /api/speaker.php — speaker profile submissions. */
require __DIR__ . '/lib.php';

tp_handle_form('speaker', [
    'name' => true,
    'email' => true,
    'organization' => true,
    'expertise' => true,
    'interest' => true,
    'profile' => true,
]);
