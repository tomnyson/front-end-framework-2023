import React, { useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

const Cart = () => {
  const [cart, setCart] = useState([
    { id: 1, product: "T-Shirt", price: 20, quantity: 1 },
    { id: 2, product: "Jeans", price: 50, quantity: 1 },
    { id: 3, product: "Sneakers", price: 80, quantity: 1 },
  ]);

  const actions = ["CREATE", "UPDATE", "DELETE"];
  const handelCart = (type, payload) => {
    /**
     * type: create
     * payload: { id: 4, product: "T-Shirt", price: 20, quantity: 1 },
     */
  };
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Shopping Cart</h2>
          <Table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.product}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default Cart;
