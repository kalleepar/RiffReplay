const { User, Chord } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('Chords');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('Chords');
    },
    Chords: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Chord.find(params).sort({ createdAt: -1 });
    },
    Chord: async (parent, { ChordId }) => {
      return Chord.findOne({ _id: ChordId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('Chords');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addChord: async (parent, { ChordText }, context) => {
      if (context.user) {
        const Chord = await Chord.create({
          ChordText,
          ChordAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { Chords: Chord._id } }
        );

        return Chord;
      }
      throw AuthenticationError;
    },
    addComment: async (parent, { ChordId, commentText }, context) => {
      if (context.user) {
        return Chord.findOneAndUpdate(
          { _id: ChordId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeChord: async (parent, { ChordId }, context) => {
      if (context.user) {
        const Chord = await Chord.findOneAndDelete({
          _id: ChordId,
          ChordAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { Chords: Chord._id } }
        );

        return Chord;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { ChordId, commentId }, context) => {
      if (context.user) {
        return Chord.findOneAndUpdate(
          { _id: ChordId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
