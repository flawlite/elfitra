import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './siswaAdd.html';
import { DataSiswa } from '../../../api/dataSiswa';

class SiswaAdd {
    constructor() {
        this.dataSiswa = {};
    }
    submit() {
        this.dataSiswa.owner = Meteor.userId();
        DataSiswa.insert(this.dataSiswa);
        
        if(this.done) {
            this.done();
        }
        
        this.reset();
    }

    reset() {
        this.dataSiswa = {};
    }
}

const name = 'siswaAdd';

// create a module
export default angular.module(name, [
    angularMeteor
    ]).component(name, {
        template,
        bindings: {
            done: '&?'
        },
        controllerAs: name,
        controller: SiswaAdd
    });