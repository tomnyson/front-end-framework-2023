import { useEffect, useState, useReducer } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import { ThemeContext, CartContext } from "./context";
import { ACTION } from "./const";
const cartInit = {
  items: [],
  sum: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.ADD_ITEM: {
      const { item = {} } = action.payload;
      const index = state.items.findIndex((cart) => cart.id === item.id);
      if (index === -1) {
        //them moi
        return {
          ...state,
          items: [...state.items, item],
        };
      }
      const newItems = [...state.items];
      newItems[index] = {
        ...newItems[index],
        quantity: newItems[index].quantity + 1,
      };
      return {
        ...state,
        items: newItems,
        sum: newItems.reduce(
          (accumulator, item) => accumulator + item.price * item.quantity,
          0
        ),
      };
    }
    case ACTION.REMOVE_ITEM:
      const { id } = action.payload;
      const items = state.items.filter((item) => item.id !== id);
      return {
        ...state,
        items: items,
        sum: items.reduce(
          (accumulator, item) => accumulator + item.price * item.quantity,
          0
        ),
      };
    default:
      return state;
  }
}

const Layout = (props) => {
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, cartInit);

  // console.log("state", state);
  // console.log("dispatch", dispatch);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    // dispatch({
    //   type: ACTION.ADD_ITEM,
    //   payload: {
    //     item: {
    //       name: "Corporate Data Planner",
    //       picture: "https://loremflickr.com/640/480/people",
    //       id: "126",
    //       price: 200,
    //       quantity: 5,
    //     },
    //   },
    // });
  }, [location]);

  const carts = [
    {
      name: "Direct Response Officer",
      picture: "https://loremflickr.com/640/480/abstract",
      id: "121",
      price: 100,
      quantity: 1,
    },
    {
      name: "Corporate Data Planner",
      picture: "https://loremflickr.com/640/480/people",
      id: "126",
      price: 200,
      quantity: 5,
    },
  ];
  return (
    <ThemeContext.Provider
      value={{
        theme: {
          color: "green",
        },
      }}
    >
      <Container>
        <CartContext.Provider
          value={{
            cartReducer: state,
            cartDispatch: dispatch,
          }}
        >
          <Header auth={currentUser} />
          {props.children}
        </CartContext.Provider>
      </Container>
    </ThemeContext.Provider>
  );
};
export default Layout;
