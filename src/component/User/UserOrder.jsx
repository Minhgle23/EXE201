import { useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import './UserStyle/userOrder.css'; // Import the custom CSS file

function UserOrder() {
  const [userOrder, setUserOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);

  const user = JSON.parse(localStorage.getItem('user')) || {};
  const userId = user.id ? parseInt(user.id) : null;

  useEffect(() => {
    fetch('http://localhost:9999/categories')
      .then(res => res.json())
      .then(result => setCategories(result));
      
    const fetchOrder = async () => {
      if (userId) {
        try {
          const response = await fetch('http://localhost:9999/detailOrders');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const userPay = data.filter(orderDetail => orderDetail.customer.id == userId);
          setUserOrder(userPay);
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      }
    };
    fetchOrder();
  }, [userId]);

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <Container>
      <h2 className="text-center my-4">Order History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total Product</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userOrder.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.OrderDate}</td>
              <td>{order.products.length}</td>
              <td>{order.Amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
              <td><span style={{color: order.status ? 'green' : 'red' }}> {order.status ? "Completed" : "Cancelled"}</span></td>
              <td><Button onClick={() => handleViewDetail(order)}>View detail</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p>Order ID: {selectedOrder.id}</p>
              <p>Order Date: {selectedOrder.OrderDate}</p>
              <p>Amount: {selectedOrder.Amount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
              <p>Bank Code: {selectedOrder.bankCode}</p>
              <h5>Customer Details</h5>
              <p>Name: {selectedOrder.customer.name.firstname} {selectedOrder.customer.name.lastname}</p>
              <p>Email: {selectedOrder.customer.email}</p>
              <p>Phone: {selectedOrder.customer.phone}</p>
              <p>Address: {selectedOrder.customer.address.street}, {selectedOrder.customer.address.city}</p>
              <h5>Products</h5>
              <ul>
                {selectedOrder.products.map(product => (
                  <li key={product.id}>
                    <p>Title: {product.title}</p>
                    <p>Price: {product.price}</p>
                    <p>Description: {product.description}</p>
                    <p>Category: {categories.find(cate => cate.cateid === product.category)?.name}</p>
                    <img src={process.env.PUBLIC_URL + `/assets/images/products/${product.image}`} alt={product.title} style={{ width: '100px' }} />
                    <p>Quantity: {product.userQuantity}</p>
                  </li>
                ))}
              </ul>
              <p>Status:<span style={{color: selectedOrder.status ? 'green' : 'red' }}> {selectedOrder.status ? "Completed" : "Cancelled"}</span></p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default UserOrder;
