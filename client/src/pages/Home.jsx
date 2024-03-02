import { useQuery } from '@apollo/client';

import ChordList from '../components/ChordList';
import ChordForm from '../components/ChordForm';

import { QUERY_ChordS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ChordS);
  const Chords = data?.Chords || [];

  return (
    <main style={{ backgroundColor: '#9d7aae', minHeight: '100vh' }}>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ChordForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ChordList
              Chords={Chords}
              title="NEWLY ADDED CHORDS!"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
