<?php
/**
 * GET /api/events.php — event list.
 * Placeholder until MySQL: returns ok:false so the frontend keeps using its
 * bundled mock dataset. MySQL phase: SELECT * FROM events WHERE published = 1.
 */
require __DIR__ . '/lib.php';

tp_require_method('GET');
tp_placeholder_list();
