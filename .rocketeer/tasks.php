<?php
use Rocketeer\Facades\Rocketeer;

Rocketeer::listenTo('deploy.before-symlink', array(
    'node_modules/.bin/tsd update --overwrite',
    'node_modules/.bin/grunt',
));
