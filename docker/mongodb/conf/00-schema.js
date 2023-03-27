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
    _id: ObjectId('63d3bcec7a1a6c9fad00a001'),
    username: 'nosql_lover_34',
  },
  {
    _id: ObjectId('63d3bcec7a1a6c9fad00a002'),
    username: 'nosql_hater_68',
  },
  {
    _id: ObjectId('63d3bcec7a1a6c9fad00a003'),
    username: 'another_user_123',
  },
  {
    _id: ObjectId('63d3bcec7a1a6c9fad00a004'),
    username: 'a_forth_user',
  },
]);

// tweets (v1.0)
db.tweets.insert([
  {
    _id: ObjectId('63d3bcec7a1a6c9fad00f001'),
    userID: ObjectId('63d3bcec7a1a6c9fad00a001'),
    title: 'NoSQL is cool',
    text: 'I love NoSQL!',
    isRetweet: false, // always false, if isRetweet is not given
    retweetCount: 1, // is updated on retweets
    timestamp: 1672572600,
  },
  {
    _id: ObjectId('63d3bcec7a1a6c9fad00f002'),
    userID: ObjectId('63d3bcec7a1a6c9fad00a002'),
    title: 'NoSQL is uncool',
    text: 'I hate NoSQL.',
    isRetweet: true, // automatically true, if originalTweetID is given
    originalTweetID: ObjectId('63d3bcec7a1a6c9fad00f001'),
    timestamp: 1672572780,
  },
  {
    _id: ObjectId('63d3bcec7a1a6c9fad00f003'),
    userID: ObjectId('63d3bcec7a1a6c9fad00a003'),
    title: 'some other tweet',
    text: 'some text',
    timestamp: 1672573600,
  },
]);
