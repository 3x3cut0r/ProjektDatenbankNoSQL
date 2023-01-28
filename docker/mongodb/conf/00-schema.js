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

db.createCollection('users', { capped: false });
db.createCollection('tweets', { capped: false });

db.tweets.insert([
  {
    _id: ObjectId('63d3bcec7a1a6c9fad78ef98'),
    title: 'IT is cool',
    text: 'yey i love IT',
  },
  {
    _id: ObjectId('63d3bcec7a1a6c9fad78ef99'),
    title: 'NoSQL is cool',
    text: 'yey i love NoSQL',
    likes: 15,
    dislikes: 4,
    retweets: {
      _id: ObjectId('63d3bcec7a1a6c9fad78efa0'),
      title: 'seriously?',
      text: 'SQL is much cooler!',
      likes: 6,
      dislikes: 10,
    },
  },
]);
