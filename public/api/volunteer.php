<?php
/** POST /api/volunteer.php — volunteer community applications. */
require __DIR__ . '/lib.php';

tp_handle_form('volunteer', [
    'name' => true,
    'email' => true,
    'city' => true,
    'skills' => true,
    'area' => true,
    'phone' => false,
]);
