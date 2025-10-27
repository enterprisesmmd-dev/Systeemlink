<?php
/**
 * Admin Logout
 */

session_destroy();
header('Location: ?page=admin/login');
exit;
