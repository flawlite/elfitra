import { Meteor } from 'meteor/meteor';
import { DataSiswa } from '../imports/api/dataSiswa';
 
Meteor.startup(() => {
  if (DataSiswa.find().count() === 0) {
    const dataSiswa = [{
      'nama': 'Feri Nurdian',
      'kelas': '1B',
      'public' : true
    }, {
      'nama': 'Andini Pratiwi',
      'kelas': '2C',
      'public' : true
    }, {
      'nama': 'Judika Dimana',
      'kelas': '3D',
      'public' : true
    }];
 
    dataSiswa.forEach((dataSiswa) => {
      DataSiswa.insert(dataSiswa)
    });
  }
});