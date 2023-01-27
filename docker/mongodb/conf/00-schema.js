db.createUser({
  user: 'project',
  pwd: 'project',
  roles: [
    {
      role: 'readWrite',
      db: 'project',
    },
  ],
});

db = new Mongo().getDB('project');

db.createCollection('customers', { capped: false });
db.createCollection('items', { capped: false });

db.items.insert([
  {
    _id: '63d3bcec7a1a6c9fad78ef98',
    price: '49,00',
    name: 'T-Shirt',
  },
  {
    _id: '63d3bcec7a1a6c9fad78ef99',
    price: '89,99',
    name: 'Jeans',
  },
  {
    _id: '63d3bcec7a1a6c9fad78ef9a',
    price: '120,00',
    name: 'Jacket',
  },
]);
