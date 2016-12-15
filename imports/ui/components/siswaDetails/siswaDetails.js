import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import { Meteor } from 'meteor/meteor';
 
import template from './siswaDetails.html';
import { DataSiswa } from '../../../api/dataSiswa';
 
class SiswaDetails {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';
 
    $reactive(this).attach($scope);
 
    this.dataSiswaId = $stateParams.dataSiswaId;

    this.subscribe('dataSiswa');
 
    this.helpers({
      dataSiswa() {
        return DataSiswa.findOne({
          _id: $stateParams.dataSiswaId
        });
        },
      isLoggedIn() {
        return !!Meteor.userId();
      }
    });
  }
  
  save() {
    DataSiswa.update({
      _id: this.dataSiswa._id
    }, {
      $set: {
        nama: this.dataSiswa.nama,
        kelas: this.dataSiswa.kelas,
        public: this.dataSiswa.public
      }
      }, (error) => {
      if (error) {
        console.log('Oops, unable to update the siswa...');
      } else {
        console.log('Done!');
      }
    });
  }
}
 
const name = 'siswaDetails';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: SiswaDetails
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('siswaDetails', {
    url: '/siswa/:dataSiswaId',
    template: '<siswa-details></siswa-details>',
    resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        } else {
          return $q.resolve();
        }
      }
    }
  });
}