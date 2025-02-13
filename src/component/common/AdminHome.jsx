// AdminHome.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Container, Row, Col } from 'react-bootstrap';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsBookHalf,
} from 'react-icons/bs';
import './style/style.css';

const AdminHome = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9999/detailOrders');
        const orders = response.data;

        // Initialize data for chart
        const revenueByDate = orders.reduce((acc, order) => {
          const date = new Date(order.OrderDate).toLocaleDateString();
          acc[date] = acc[date] ? acc[date] + order.Amount : order.Amount;
          return acc;
        }, {});

        // Extract labels and data
        let labels = Object.keys(revenueByDate);
        let data = Object.values(revenueByDate);

        // Sort labels by ascending date order
        labels = labels.sort((a, b) => new Date(a) - new Date(b));
        // Sort data according to sorted labels
        const sortedData = labels.map(label => ({
          date: label,
          revenue: revenueByDate[label],
        }));

        setChartData(sortedData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={2} className="sidebar-hidden">
        </Col>
        <Col xs={12} md={10}>
          <main className="main-container">
            <div className="main-title">
              <h3>DASHBOARD</h3>
            </div>
            <div className="main-cards">
              <div className="card-admin">
                <div className="card-admin-inner">
                  <h3>PRODUCTS</h3>
                  <BsFillArchiveFill className="card_icon" />
                </div>
                <h1>300</h1>
              </div>
              <div className="card-admin">
                <div className="card-admin-inner">
                  <h3>CATEGORIES</h3>
                  <BsFillGrid3X3GapFill className="card_icon" />
                </div>
                <h1>12</h1>
              </div>
              <div className="card-admin">
                <div className="card-admin-inner">
                  <h3>CUSTOMERS</h3>
                  <BsPeopleFill className="card_icon" />
                </div>
                <h1>33</h1>
              </div>
              <div className="card-admin">
                <div className="card-admin-inner">
                  <h3>BLOGS</h3>
                  <BsBookHalf className="card_icon" />
                </div>
                <h1>300</h1>
              </div>
            </div>
            <div className="charts">
            
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;
