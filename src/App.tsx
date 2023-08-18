import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/authorization/authorization';

import Main from './pages/main/main';


import React, { useState, useEffect } from 'react';
import { getApiRoot, projectKey } from '../src/API/ClientBuilder';

function App() {
  const [projectDetails, setProjectDetails] = useState({});

  const getProject = async () => {
    try {
      const project = await getApiRoot()
        .withProjectKey({ projectKey })
        // .products()
        // .get()
        // .execute();

        .customers()
        .get()
        .execute();

      setProjectDetails(project.body);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      <div className="app">
        {/* <Home className="main" /> */}
        <main className="main">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
