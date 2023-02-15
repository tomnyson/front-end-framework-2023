import React, { useState, useContext } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { CartContext } from "../context";
import { useNavigate } from "react-router-dom";
import { ACTION } from "../const";
const Cart = () => {
  // const [cart, setCart] = useState([
  //   { id: 1, product: "T-Shirt", price: 20, quantity: 1 },
  //   { id: 2, product: "Jeans", price: 50, quantity: 1 },
  //   { id: 3, product: "Sneakers", price: 80, quantity: 1 },
  // ]);
  console.log(ACTION.REMOVE_ITEM);
  const { cartReducer: carts, cartDispatch: dispatch } =
    useContext(CartContext);
  const navigate = useNavigate();
  if (!carts?.items?.length) {
    return (
      <Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <h5>data not found</h5>
            <Button style={{ display: "block" }} onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </Row>
    );
  }
  return (
    <Container>
      <Row>
        <Col>
          <h2>Shopping Cart</h2>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carts?.items?.length &&
                carts.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={`${item.image}`}
                        alt=""
                        style={{ width: 100 }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Button
                        color="danger"
                        onClick={() => {
                          dispatch({
                            type: ACTION.REMOVE_ITEM,
                            payload: {
                              id: item.id,
                            },
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  SUM: <span>${carts.sum}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    onClick={() => {
                      const isLogin = localStorage.getItem("user");
                      if (!isLogin) {
                        //user chua login
                        navigate("/login");
                        return;
                      }
                      navigate("/checkout");
                    }}
                  >
                    Checkout
                  </Button>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default Cart;
