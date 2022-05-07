'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(
       'Books', [
          {
            title    : 'David Bach: Faktor Latte',
            author   : 'David Bach',
            image    : '/uploads/image1.png',
            published: new Date(),
            price    : 90,
            stock    : 100,
            user     : 1,
            category : 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title    : 'Selena and Nebula',
            author   : 'Tere Liye',
            image    : '/uploads/image2.png',
            published: new Date(),
            price    : 90,
            stock    : 100,
            user     : 1,
            category : 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title    : 'Pelukis Bisu (The Silent Patient)',
            author   : 'Alex Michalides',
            image    : '/uploads/image3.png',
            published: new Date(),
            price    : 90,
            stock    : 100,
            user     : 1,
            category : 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title    : 'Kecamuk Darah (Troubled Blood)',
            author   : 'Robert Galbraith',
            image    : '/uploads/image4.png',
            published: new Date(),
            price    : 90,
            stock    : 100,
            user     : 1,
            category : 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title    : 'Kitab Kawin (Edisi Cover Baru)',
            author   : 'Laksmi Pamuntjak',
            image    : '/uploads/image5.png',
            published: new Date(),
            price    : 90,
            stock    : 100,
            user     : 1,
            category : 3,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title    : 'Salvation of a Saint',
            author   : 'Keigo Higashino',
            image    : '/uploads/image6.png',
            published: new Date(),
            price    : 90,
            stock    : 100,
            user     : 1,
            category : 3,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Books', null, {});
  }
};
