const db = require('../config/connection');
const { User, Chord } = require('../models');
const userSeeds = require('./userSeeds.json');
const ChordSeeds = require('./ChordSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Chord', 'Chords');
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < ChordSeeds.length; i++) {
      const { _id, ChordAuthor } = await Chord.create(ChordSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: ChordAuthor },
        {
          $addToSet: {
            Chords: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
