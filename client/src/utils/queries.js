import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      Chords {
        _id
        ChordText
        createdAt
      }
    }
  }
`;

export const QUERY_ChordS = gql`
  query getChords {
    Chords {
      _id
      ChordText
      ChordAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_Chord = gql`
  query getSingleChord($ChordId: ID!) {
    Chord(ChordId: $ChordId) {
      _id
      ChordText
      ChordAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      Chords {
        _id
        ChordText
        ChordAuthor
        createdAt
      }
    }
  }
`;
