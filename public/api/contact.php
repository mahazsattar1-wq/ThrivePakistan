<?php
/** POST /api/contact.php — contact form submissions. */
require __DIR__ . '/lib.php';

tp_handle_form('contact', [
    'name' => true,
    'email' => true,
    'subject' => true,
    'message' => true,
    'phone' => false,
]);
