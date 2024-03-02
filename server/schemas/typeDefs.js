const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    Chords: [Chord]!
  }

  type Chord {
    _id: ID
    ChordText: String
    ChordAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    Chords(username: String): [Chord]
    Chord(ChordId: ID!): Chord
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addChord(ChordText: String!): Chord
    addComment(ChordId: ID!, commentText: String!): Chord
    removeChord(ChordId: ID!): Chord
    removeComment(ChordId: ID!, commentId: ID!): Chord
  }
`;

module.exports = typeDefs;
