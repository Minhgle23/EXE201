import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./style/AdminDashboard.css";
import Sidebar from "./SideBar.jsx";
import { Dropdown } from "react-bootstrap";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="wrapper">
      <div className="header">
        <div className="toggle-btn">&#9776;</div>
        <div className="header-right">
          {user && (
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                Hello, {user.username && user.name.firstname}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <main>
            <div className="container-fluid px-4">
              <h2 className="mt-4">Admin Dashboard</h2>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Function</li>
              </ol>
              <div className="row">
                {[
                  {
                    title: "Products",
                    color: "primary",
                    link: "/manage/product",
                  },
                  {
                    title: "Customers",
                    color: "warning",
                    link: "/manage/customers",
                  },
                  {
                    title: "Categories",
                    color: "success",
                    link: "/manage/categories",
                  },
                  { title: "Blogs", color: "danger", link: "/manage/blogs" },
                  {
                    title: "Revenue chart",
                    color: "secondary",
                    link: "/charts",
                  },
                  {
                    title: "Revenue table",
                    color: "info",
                    link: "/manage/revenue/table",
                  },
                ].map((item, index) => (
                  <div className="col-xl-4 col-md-6" key={index}>
                    <div className={`card bg-${item.color} text-white mb-4`}>
                      <div className="card-body">{item.title}</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <Link
                          className="small text-white stretched-link"
                          to={item.link}
                        >
                          View Details
                        </Link>
                        <div className="small text-white">
                          <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
