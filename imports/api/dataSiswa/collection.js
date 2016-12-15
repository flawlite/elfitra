import { Mongo } from 'meteor/mongo';

export const DataSiswa = new Mongo.Collection('dataSiswa');

DataSiswa.allow({
    insert(userId, dataSiswa) {
        return userId && dataSiswa.owner === userId;
    },
    update(userId, dataSiswa, fields, modifier) {
        return userId && dataSiswa.owner === userId;
    },
    remove(userId, dataSiswa) {
        return userId && dataSiswa.owner === userId;
    }
});