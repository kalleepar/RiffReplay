import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_Chord } from '../../utils/mutations';
import { QUERY_ChordS, QUERY_ME } from '../../utils/queries';
import piano from '../../assets/piano.jpg';
import Auth from '../../utils/auth';

const ChordForm = () => {
  const [ChordText, setChordText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addChord, { error }] = useMutation
  (ADD_Chord, {
    refetchQueries: [
      QUERY_ChordS,
      'getChords',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addChord({
        variables: {
          ChordText,
          // Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username 
          ChordAuthor: Auth.getProfile().authenticatedPerson.username
        },
      });

      setChordText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'ChordText' && value.length <= 280) {
      setChordText(value);
      setCharacterCount(value.length);
    }
  };

  

  return (
    <div>
      <h3>Submit your own chords!</h3>
     
      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="ChordText"
                placeholder="Here's a new Chord..."
                value={ChordText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
 <img src={piano} alt="Piano img" className="logo" style={{ width: '100px' }} /> 
            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Chord
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your Chords. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ChordForm;
