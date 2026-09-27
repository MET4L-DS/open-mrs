import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AiimsEsmDemographicsApp from './aiims-esm-demographics-app.component';

const Root: React.FC = () => (
  <BrowserRouter basename={window.getOpenmrsSpaBase()}>
    <Routes>
      <Route path="aiims-esm-demographics-app" element={<AiimsEsmDemographicsApp />} />
    </Routes>
  </BrowserRouter>
);

export default Root;
