import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';
import riffReplaySmallTransparent from '../../assets/riffReplaySmallTransparent.png'
import riffReplaySmall from '../../assets/riffReplaySmall.jpg';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header style={{ backgroundColor: '#4c3c64' }} className="text-light mb-4 py-3 flex-row align-center">

      <div className="container flex-row justify-space-between-md justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0"></h1>
          </Link>
          <p className="m-0">Where every note finds a home. 🎵🎶🎶</p>
        </div>
        <div>
        <img src={riffReplaySmallTransparent} alt="Riff Replay" className="logo" style={{ width: '325px', marginRight: '500px' }} /> {/* Add this line to style the logo */}

          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
                {Auth.getProfile().authenticatedPerson.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
              <Link className="btn btn-lg btn-dark m-1" to="http://127.0.0.1:8080">
                Record
                </Link>
                <a href="https://app.midiano.com" className="btn btn-lg btn-dark m-1" target="_blank" rel="noopener noreferrer">
                Play▶️
              </a>
              <Link className="btn btn-lg btn-dark m-1" to="http://127.0.0.1:5500/client/src/pages/player.html">
                Listen🎧
              </Link>
              
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-dark m-1" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-dark m-1" to="/signup">
                Signup
              </Link>
              <Link className="btn btn-lg btn-dark m-1" to="/about">
                About
              </Link>
              <Link className="btn btn-lg btn-dark m-1" to="http://127.0.0.1:8080">
                Record⏺️
              </Link>
              <a href="https://app.midiano.com" className="btn btn-lg btn-dark m-1" target="_blank" rel="noopener noreferrer">
                Play▶️
              </a>
              <Link className="btn btn-lg btn-dark m-1" to="http://127.0.0.1:5500/client/src/pages/player.html">
                Listen🎧
              </Link>


            </>
          )}
          
        </div>
      </div>
    </header>
  );
};

export default Header;
