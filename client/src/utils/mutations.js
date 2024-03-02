import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_Chord = gql`
  mutation addChord($ChordText: String!) {
    addChord(ChordText: $ChordText) {
      _id
      ChordText
      ChordAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($ChordId: ID!, $commentText: String!) {
    addComment(ChordId: $ChordId, commentText: $commentText) {
      _id
      ChordText
      ChordAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
