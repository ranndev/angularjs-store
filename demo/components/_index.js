import groupA from './group-a/group-a';
import groupAComponentA from './group-a-component-a/group-a-component-a';
import groupAComponentB from './group-a-component-b/group-a-component-b';
import groupAComponentC from './group-a-component-c/group-a-component-c';

angular
  .module('app.components', [])
  .component('groupA', groupA)
  .component('groupAComponentA', groupAComponentA)
  .component('groupAComponentB', groupAComponentB)
  .component('groupAComponentC', groupAComponentC);
  
