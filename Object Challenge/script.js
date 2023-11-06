const library = [
  {
    title: "harry potter",
    author: "JK",
    status: {
      own: true,
      reading: false,
      read: false,
    },
    title: "The roadr",
    author: "bf",
    status: {
      own: true,
      reading: false,
      read: false,
    },
    title: "lesson in chemistry",
    author: "B",
    status: {
      own: true,
      reading: false,
      read: false,
    }
  },
];

library[0].status.read = true;
library[1].status.read = true;
library[2].status.read = true;

console.log(library);

const {title : firstBook} = library[0]

const libraryJSON = JSON.stringify(library)