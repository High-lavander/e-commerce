import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('access_token');

    navigate('/');
  }, [navigate]);

  return (
    <div>
      <p>Logout</p>
    </div>
  );
}

export default Logout;
