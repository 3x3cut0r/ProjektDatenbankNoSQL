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

// create collections
db.createCollection('users', { capped: false });
db.createCollection('tweets', { capped: false });

// insert data into collections
db.users.insert([
  {
    _id: ObjectId('63d3bcec7a1a6c9fad78ef96'),
    username: 'nosql_lover_34',
  },
  {
    _id: ObjectId('63d3bcec7a1a6c9fad78ef97'),
    username: 'nosql_hater_68',
  },
]);

db.tweets.insert([
  {
    _id: ObjectId('63d3bcec7a1a6c9fad78ef98'),
    userID: ObjectId('63d3bcec7a1a6c9fad78ef96'),
    title: 'NoSQL is cool',
    text: 'I love NoSQL!',
    likes: 15,
    dislikes: 3,
    isRetweet: false, // always false, if isRetweet is not given
    retweetCount: 1, // is updated on retweets
    timestamp: 1672572600,
  },
  {
    _id: ObjectId('63d3bcec7a1a6c9fad78ef99'),
    userID: ObjectId('63d3bcec7a1a6c9fad78ef97'),
    title: 'NoSQL is uncool', // title is ignored on retweets
    text: 'Really? I hate NoSQL.',
    likes: 4,
    dislikes: 8,
    isRetweet: true,
    originalTweetID: ObjectId('63d3bcec7a1a6c9fad78ef98'),
    timestamp: 1672572780,
  },
  {
    _id: ObjectId('63d3bcec7a1a6c9fad78f001'),
    userID: ObjectId('63d3bcec7a1a6c9fad78ef97'),
    title: 'some other tweet',
    text: 'some text',
    likes: 1,
    timestamp: 1672573600,
  },
]);
