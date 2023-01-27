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
    price: '49,00',
    name: 'T-Shirt',
  },
  {
    price: '89,99',
    name: 'Jeans',
  },
  {
    price: '120,00',
    name: 'Jacket',
  },
]);
