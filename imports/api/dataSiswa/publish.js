import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { DataSiswa } from './collection';

if (Meteor.isServer) {
    Meteor.publish('dataSiswa', function(options, searchString) {
        const selector = {
            $or: [{
                // Siswa Umum
                $and: [{
                    public: true
                }, {
                    public: {
                        $exists: true
                    }
                }]
            }, {
                // Wali Kelas
                $and: [{
                    owner: this.userId
                }, {
                    owner: {
                        $exists: true
                    }
                }]
            }]
        };
        
        if (typeof searchString === 'string' && searchString.length) {
            selector.nama = {
                $regex: `.*${searchString}.*`,
                $options : 'i'
            };
        }
        Counts.publish(this, 'numberOfSiswa', DataSiswa.find(selector), {
            noReady: true
        });
        
        return DataSiswa.find(selector, options);
    });
}