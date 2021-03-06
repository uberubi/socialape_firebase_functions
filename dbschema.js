let db = {
  users: [
    {
      userId: 'OaPkK7HVMFNjWOpzdoopTVcPbhj1',
      email: 'user@gmail.com',
      handle: 'user',
      imageUrl: 'image/dsadasdas/asdfafds',
      bio: 'Hello, my name is user, nice to mett you',
      website: 'https://user.com',
      location: 'London, UK'
    },
  ],
  screams: [
    {
      userHandle: 'user',
      body: 'This is a sample scream',
      createdAt: '2019-03-15T10:59:52.798Z',
      likeCount: 5,
      commentCount: 3
    }
  ],
  comments: [
    {
      userHandle: 'user',
      screamId: 'dsajkjafnmndsfsdnfsdjknf',
      body: 'nice one mate!',
      createdAt: '2020-06-15T10:59:52.798Z'
    }
  ],
  notifications: [
    {
      recipient: 'fulluser',
      sender: 'andrew',
      read: 'true | false',
      screamId: 'dsadasfdsgfdsgsdgs',
      type: 'like | comment',
      createdAt: '2020-03-15T10:59:52.798Z'
    }
  ]
};

const userDetails = {
  // Redux data
  credentials: {
    userId: 'N43KJ5H43KJHREW4J5H3JWMERHB',
    email: 'user@email.com',
    handle: 'user',
    createdAt: '2019-03-15T10:59:52.798Z',
    imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
    bio: 'Hello, my name is user, nice to meet you',
    website: 'https://user.com',
    location: 'Lonodn, UK'
  },
  likes: [
    {
      userHandle: 'user',
      screamId: 'hh7O5oWfWucVzGbHH2pa'
    },
    {
      userHandle: 'user',
      screamId: '3IOnFoQexRcofs5OhBXO'
    }
  ]
};