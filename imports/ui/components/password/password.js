import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import { Accounts } from 'meteor/accounts-base';
 
import template from './password.html';
 
class Register {
  constructor($scope, $reactive, $state) {
    'ngInject';
 
    this.$state = $state;
 
    $reactive(this).attach($scope);
 
    this.credentials = {
      email: ''
    };
 
    this.error = '';
  }
 
  reset() {
    Accounts.forgotPassword(this.credentials, this.$bindToContext((err) => {
      if (err) {
        this.error = err;
      } else {
        this.$state.go('siswa');
      }
    }));
  }
}
 
const name = 'password';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
])
  .component(name, {
    template,
    controllerAs: name,
    controller: Register
  })
  .config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('password', {
    url: '/password',
    template: '<password></password>'
  });
}