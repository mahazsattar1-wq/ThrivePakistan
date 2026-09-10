<?php
/** GET /api/health.php — deployment health & backend phase indicator. */
require __DIR__ . '/lib.php';

tp_require_method('GET');
tp_json([
    'ok' => true,
    'source' => tp_db_ready() ? 'mysql' : 'placeholder',
    'data' => [],
    'message' => tp_db_ready()
        ? 'MySQL backend connected.'
        : 'PHP layer active, MySQL not connected yet (frontend mock data in use).',
    'php' => PHP_VERSION,
]);
