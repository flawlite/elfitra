import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import template from './elfitra.html';
import { name as SiswaList } from '../siswaList/siswaList'; 
import { name as SiswaDetails } from '../siswaDetails/siswaDetails';
import { name as Navigation } from '../navigation/navigation';
import { name as Auth } from '../auth/auth';

class Elfitra {}

const name = 'elfitra';

// create a module
export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    uiRouter,
    SiswaList,
    SiswaDetails,
    Navigation,
    Auth,
    'accounts.ui'
    ]).component(name, {
        template,
        controllerAs: name,
        controller: Elfitra
    })
    .config(config)
    .run(run);
    
    function config($locationProvider, $urlRouterProvider) {
        'ngInject';
        
        $locationProvider.html5Mode(true);
        
        $urlRouterProvider.otherwise('/siswa');
    }
    
    function run($rootScope, $state) {
        'ngInject';
        
        $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('siswa');
            }
        }
        );
    }