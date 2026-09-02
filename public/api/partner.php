<?php
/** POST /api/partner.php — partnership conversation requests. */
require __DIR__ . '/lib.php';

tp_handle_form('partner', [
    'name' => true,
    'organization' => true,
    'email' => true,
    'orgType' => true,
    'interest' => true,
    'message' => true,
    'phone' => false,
]);
