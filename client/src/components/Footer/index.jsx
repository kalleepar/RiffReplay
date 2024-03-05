import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const footerStyle = {
    backgroundColor: '#4c3c64', // Change this to the color you want
    color: 'white', // Change this to the text color you prefer
    padding: '20px', // Adjust padding as needed
  };

  return (
    <footer style={footerStyle}>
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4>
          
          <span
            className="footer"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            
          </span>{' '}
          Kal Parker
        </h4>
        2024
      </div>
    </footer>
  );
};

export default Footer;