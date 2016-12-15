import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './siswaRemove.html';
import { DataSiswa } from '../../../api/dataSiswa';

class SiswaRemove {
    remove() {
        if (this.dataSiswa) {
            DataSiswa.remove(this.dataSiswa._id);
        }
    }
}

const name = 'siswaRemove';

// create a module
export default angular.module(name, [
    angularMeteor
    ]).component(name, {
        template,
        bindings: {
            dataSiswa: '<'
        },
        controllerAs: name,
        controller: SiswaRemove
    });