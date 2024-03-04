// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_Chord } from '../utils/queries';

const SingleChord = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { ChordId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_Chord, {
    // pass URL parameter
    variables: { ChordId: ChordId },
  });

  const Chord = data?.Chord || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {Chord.ChordAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          created on {Chord.createdAt}
        </span>
      </h3>
      <div className="bg- py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px solid #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {Chord.ChordText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={Chord.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px solid #1a1a1a' }}>
        <CommentForm ChordId={Chord._id} />
      </div>
    </div>
  );
};

export default SingleChord;
