import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Counts } from 'meteor/tmeasday:publish-counts';

import template from './siswaList.html';
import { DataSiswa } from '../../../api/dataSiswa';
import { name as SiswaSort } from '../siswaSort/siswaSort';
import { name as SiswaAddButton } from '../siswaAddButton/siswaAddButton';
import { name as SiswaRemove } from '../siswaRemove/siswaRemove';

class SiswaList {
    constructor($scope, $reactive) {
'ngInject';

$reactive(this).attach($scope);

this.perPage = 5;
this.page = 1;
this.sort = {
name: 1
};
this.searchText = '';

this.subscribe('dataSiswa', () => [{
    limit: parseInt(this.perPage),
    skip: parseInt((this.getReactively('page') - 1) * this.perPage),
    sort: this.getReactively('sort')
}, this.getReactively('searchText')
]);

this.helpers({
    dataSiswa() {
        return DataSiswa.find({}, {
            sort : this.getReactively('sort')
        });
    },
    siswaCount() {
        return Counts.get('numberOfSiswa');
    },
    isLoggedIn() {
        return !!Meteor.userId();
    }
});
}

pageChanged(newPage) {
this.page = newPage;
}

sortChanged(sort) {
this.sort = sort;
}
}

const name = 'siswaList';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    utilsPagination,
    SiswaSort,
    SiswaAddButton,
    SiswaRemove
    ]).component(name, {
        template,
        controllerAs: name,
        controller: SiswaList
})
.config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
    .state('siswa', {
        url: '/siswa',
        template: '<siswa-list></siswa-list>'
    });
}