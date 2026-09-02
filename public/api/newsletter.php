<?php
/** POST /api/newsletter.php — newsletter / community signup. */
require __DIR__ . '/lib.php';

tp_handle_form('newsletter', [
    'email' => true,
]);
