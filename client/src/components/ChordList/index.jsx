import { Link } from 'react-router-dom';

const ChordList = ({
  Chords,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!Chords.length) {
    return <h3>No Chords Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {Chords &&
        Chords.map((Chord) => (
          <div key={Chord._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-1 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${Chord.ChordAuthor}`}
                >
                  {Chord.ChordAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    Created on {Chord.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    created at {Chord.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg- p-2">
              <p>{Chord.ChordText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/Chords/${Chord._id}`}
            >
              Reply
            </Link>
          </div>
          
        ))}
    </div>
  );
};

export default ChordList;
