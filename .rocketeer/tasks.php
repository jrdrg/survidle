<?php
use Rocketeer\Facades\Rocketeer;

$listeners = [
    'node_modules/.bin/tsd update --overwrite',
    'node_modules/.bin/bower install',
    'node_modules/.bin/grunt',
];

Rocketeer::listenTo('deploy.before-symlink', $listeners);
Rocketeer::listenTo('update.after', $listeners);
