import './index.scss';
import 'angular';

import './stores/_index';
import './components/_index';

angular
  .module('app', [
    'app.stores',
    'app.components'
  ]);
