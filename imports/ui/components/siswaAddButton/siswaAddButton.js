import angular from 'angular';
import angularMeteor from 'angular-meteor';

import buttonTemplate from './siswaAddButton.html';
import modalTemplate from './siswaAddModal.html';
import { name as SiswaAdd } from '../siswaAdd/siswaAdd';

class SiswaAddButton {
    constructor($mdDialog, $mdMedia) {
        'ngInject';
        
        this.$mdDialog = $mdDialog;
        this.$mdMedia = $mdMedia
    }
    
    open(event) {
        this.$mdDialog.show({
            controller($mdDialog) {
                'ngInject';
                
                this.close = () => {
                    $mdDialog.hide();
                }
            },
            
            controllerAs: 'siswaAddModal',
            template: modalTemplate,
            targetEvent: event,
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
        });
    }
}

const name = 'siswaAddButton';

// create a module
export default angular.module(name, [
    angularMeteor,
    SiswaAdd
    ]).component(name, {
        template: buttonTemplate,
        controllerAs: name,
        controller: SiswaAddButton
    });