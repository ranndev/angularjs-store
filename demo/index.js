import './index.scss';
import 'angular';

import './services/_index';
import './stores/_index';
import './components/_index';

angular
  .module('app', [
    'app.services',
    'app.stores',
    'app.components'
  ]);
