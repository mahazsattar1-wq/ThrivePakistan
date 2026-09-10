<?php
/** POST /api/registration.php — event registration interest. */
require __DIR__ . '/lib.php';

tp_handle_form('registration', [
    'name' => true,
    'email' => true,
    'event' => true,
    'organization' => false,
]);
