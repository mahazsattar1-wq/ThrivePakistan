<?php
/**
 * Thrive Pakistan — shared PHP API helpers.
 *
 * This layer is intentionally a SAFE PLACEHOLDER today: endpoints validate and
 * acknowledge submissions but do not persist anything yet. When the MySQL
 * backend arrives, implement the marked TODO sections only — the frontend
 * already speaks this exact JSON contract.
 *
 * Expected contract:
 *   GET  /api/<resource>.php  -> { "ok": bool, "source": "mysql"|"placeholder", "data": [...] }
 *   POST /api/<form>.php      -> { "ok": bool, "message": string }
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/**
 * Future database configuration belongs in server environment variables,
 * NEVER hard-coded here or exposed to the frontend.
 *
 * Example (set in hosting control panel / .env outside webroot):
 *   TP_DB_HOST, TP_DB_NAME, TP_DB_USER, TP_DB_PASS
 */
function tp_db_config(): array
{
    return [
        'host' => getenv('TP_DB_HOST') ?: '',
        'name' => getenv('TP_DB_NAME') ?: '',
        'user' => getenv('TP_DB_USER') ?: '',
        'pass' => getenv('TP_DB_PASS') ?: '',
    ];
}

/** True once real DB credentials exist (i.e. the MySQL phase has begun). */
function tp_db_ready(): bool
{
    $cfg = tp_db_config();
    return $cfg['host'] !== '' && $cfg['name'] !== '' && $cfg['user'] !== '';
}

function tp_json(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** List-endpoint response while MySQL is not connected. */
function tp_placeholder_list(): void
{
    tp_json([
        'ok' => false,
        'source' => 'placeholder',
        'data' => [],
        'message' => 'MySQL backend not connected yet — frontend will serve mock data.',
    ]);
}

function tp_read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function tp_str(array $body, string $key, int $maxLen = 500): string
{
    $value = $body[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }
    return trim(mb_substr(strip_tags($value), 0, $maxLen));
}

function tp_is_email(string $value): bool
{
    return filter_var($value, FILTER_VALIDATE_EMAIL) !== false;
}

function tp_require_method(string $method): void
{
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        tp_json(['ok' => false, 'message' => 'Method not allowed.'], 405);
    }
}

/**
 * Shared form handler: validate common fields, then (future) INSERT via PDO.
 *
 * @param array<string, bool> $requiredFields field => required?
 */
function tp_handle_form(string $kind, array $requiredFields, array $optionalFields = []): void
{
    tp_require_method('POST');
    $body = tp_read_json_body();

    $errors = [];
    foreach ($requiredFields as $field => $required) {
        $value = tp_str($body, $field);
        if ($required && $value === '') {
            $errors[] = "Missing field: {$field}";
        }
    }
    if (isset($requiredFields['email']) && tp_str($body, 'email') !== '' && !tp_is_email(tp_str($body, 'email'))) {
        $errors[] = 'Invalid email address.';
    }
    if ($errors !== []) {
        tp_json(['ok' => false, 'message' => implode(' ', $errors)], 422);
    }

    if (tp_db_ready()) {
        // TODO(MySQL phase): PDO insert into the table matching $kind,
        // e.g. INSERT INTO contact_messages (payload, created_at) VALUES (:payload, NOW());
        tp_json(['ok' => true, 'message' => 'Stored. Thank you!']);
    }

    // Placeholder behaviour: acknowledge without persisting.
    error_log("[ThrivePakistan][placeholder-form] kind={$kind} payload_keys=" . implode(',', array_keys($body)));
    tp_json([
        'ok' => true,
        'message' => "Received (placeholder endpoint). The {$kind} submission will be persisted once the MySQL backend is connected.",
    ]);
}
