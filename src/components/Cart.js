import React, { useState, useContext } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { CartContext } from "../context";
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

  console.log("carts", carts);
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
                        src={`${item.picture}`}
                        alt=""
                        style={{ width: 100 }}
                      />
                    </td>
                    <td>{item.name}</td>
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
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default Cart;
