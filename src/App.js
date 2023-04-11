import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateUser from './pages/UpdateUser';

export function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UpdateUser />} />
        <Route render={() => <div>Page not found</div>} />
      </Routes>
    </Router>
  );
}