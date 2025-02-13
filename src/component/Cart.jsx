import { useContext } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartContext from "./CartContext";
import "../App.css"; // Import the custom CSS file

const Cart = () => {
  const { cart, totalPrice, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBuy = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng.");
      navigate('/');
    } else {
      navigate('/cart/verify');
    }
  };

  return (
    <Container>
      <h2 className="text-center">Cart</h2>
      <div className="text-end">
        <Button variant="danger" className="m-3" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td style={{ maxWidth: "150px" }}>
                <p className="text-truncate overflow-hidden text-nowrap">
                  {product.title}
                </p>
              </td>
              <td>{(product.price * 24000).toLocaleString()} VND</td>
              <td>
                <img
                  src={process.env.PUBLIC_URL + `/assets/images/products/${product.image}`}
                  alt={product.name}
                  style={{ width: 60 }}
                />
              </td>
              <td>
                <div className="quantity-controls">
                  <Button variant="outline-secondary" size="sm" onClick={() => decreaseQuantity(product.id)}>-</Button>
                  <span className="mx-2">{product.userQuantity}</span>
                  <Button variant="outline-secondary" size="sm" onClick={() => increaseQuantity(product.id)}>+</Button>
                </div>
              </td>
              <td>{(product.price * product.userQuantity * 24000).toLocaleString()} VND</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Total: {(totalPrice * 24000).toLocaleString()} VND</h4>
      <Button onClick={handleBuy} className="btn btn-primary">
        Buy
      </Button>
    </Container>
  );
};

export default Cart;
