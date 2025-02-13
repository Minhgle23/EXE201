import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faColumns, faBookOpen, faChartArea, faTable, faUser, faServer } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Main Page</div>
                        <Link className="nav-link" to="/dashboard">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faTachometerAlt} /></div>
                            Dashboard
                        </Link>
                        <div className="sb-sidenav-menu-heading">Function</div>
                        <Link className="nav-link collapsed" to="/manage/product">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faColumns} /></div>
                            Products
                        </Link>
                        <Link className="nav-link collapsed" to="/manage/customers">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faUser} /></div>
                            Customers
                        </Link>
                        <Link className="nav-link collapsed" to="/manage/categories">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faServer} /></div>
                            Categories
                        </Link>
                        <Link className="nav-link collapsed" to="/manage/blogs">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faBookOpen} /></div>
                            Blogs
                        </Link>
                        <div className="sb-sidenav-menu-heading">Revenue</div>
                        <Link className="nav-link" to="/charts">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faChartArea} /></div>
                            Charts
                        </Link>
                        <Link className="nav-link" to="/manage/revenue/table">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faTable} /></div>
                            Tables
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
