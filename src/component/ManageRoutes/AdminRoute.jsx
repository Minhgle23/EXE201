import React from 'react';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
const AdminRoute = ({ Component}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    if (!user || user.role != "ADMIN") {
        return <Navigate to="/" />;
      }
      return <Component />;
};

export default AdminRoute;
