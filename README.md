## props vs state

As a recap, here is a summary of the main differences between props and state:

- We use props to pass data to components.
- Components use state to manage their data.
- Props are read-only and cannot be modified.
- State can be modified by its component using the setState() method.
- The setState() method results in re-rendering the component affected.

## Lifecycle Methods

React provides special lifecycle methods for class components, which are called when components are mounted, updated or unmounted.

Mounting is the process when a component is rendered on the page.
Unmounting is the process when a component is removed from the page.

The componentDidMount method is called when a component is rendered on the page.

For example, we can use componentDidMount in our Counter app to set the initial value of the counter:
componentDidMount() {
this.setState({counter: 42});
}

### componentDidUpdate

Another lifecycle method is componentDidUpdate(), which is called when a component is updated in the DOM.

We can, for example, alert the current counter value when it is incremented:
componentDidUpdate() {
alert("Number of clicks: " + this.state.counter);
}

## The useEffect Hook

The lifecycle methods we covered are only available for class components.
However, React provides a special Hook called useEffect to make lifecycle methods available in functional components. It combines the componentDidMount, componentDidUpdate, and componentWillUnmount methods into one.

For example, we can achieve the behavior of our last example using a functional Counter component:
function Counter() {
const [counter, setCounter] = useState(0);

useEffect(() => {
alert("Number of clicks: " + counter);
});

function increment() {
setCounter(counter+1);
}
return <div>

  <p>{counter}</p>
  <button onClick={increment}>Increment</button>
  </div>;
}

When you run the code, you'll notice that the alert dialog appears also during the first render. This is caused by the fact that, by default, useEffect runs both, after the first render and after every update.

To call the method only when something changes, we can provide it a second argument:
useEffect(() => {
//do something
}, [count]);  
JSX
Now, the useEffect() method will run only if count changes.

To mimic componentWillUnmount, useEffect may return a function that cleans up after it:
useEffect(() => {
// do something

return () => {
// cleanup
};
});
JSX
You can have multiple effects in the same component.

### install bootstrap
```npm install react-bootstrap bootstrap```

## cách bật server local
#### b1: cài đặt
```
npm install -g json-server
```
#### b1: open terminal
```
cd database
json-server --watch db.json
```
```
 import React, { createContext, useReducer } from 'react';

  const CartContext = createContext();
    const initialState = {
    items: [],
    total: 0
  };

  function cartReducer(state, action) {
    switch (action.type) {
      case 'ADD_ITEM':
        return {
          ...state,
          items: [...state.items, action.payload],
          total: state.total + action.payload.price
        };
      case 'REMOVE_ITEM':
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
          total: state.total - action.payload.price
        };
      case 'CLEAR_CART':
        return initialState;
      default:
        return state;
    }
  }
Define a CartProvider component that uses the useReducer hook to create a cart state and dispatch function based on the cartReducer.
javascript
Copy code
  function CartProvider(props) {
    const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

    return (
      <CartContext.Provider value={{ cartState, cartDispatch }}>
        {props.children}
      </CartContext.Provider>
    );
  }
Use the CartProvider to wrap the components that need access to the cart state and dispatch functions.
javascript
Copy code
  function App() {
    return (
      <CartProvider>
        <Cart />
      </CartProvider>
    );
  }
In the child components, use the useContext hook to access the cart state and dispatch functions.
javascript
Copy code
  import { useContext } from 'react';

  function Cart() {
    const { cartState, cartDispatch } = useContext(CartContext);

    function handleRemove(item) {
      cartDispatch({ type: 'REMOVE_ITEM', payload: item });
    }

    return (
      <div>
        <h2>Cart</h2>
        <ul>
          {cartState.items.map(item => (
            <li key={item.id}>
              {item.name} - {item.price}
              <button onClick={() => handleRemove(item)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: {cartState.total}</p>
      </div>
    );
  }
    function CartProvider(props) {
    const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

    return (
      <CartContext.Provider value={{ cartState, cartDispatch }}>
        {props.children}
      </CartContext.Provider>
    );
  }
  function App() {
    return (
      <CartProvider>
        <Cart />
      </CartProvider>
    );
  }

   import { useContext } from 'react';

  function Cart() {
    const { cartState, cartDispatch } = useContext(CartContext);

    function handleRemove(item) {
      cartDispatch({ type: 'REMOVE_ITEM', payload: item });
    }

    return (
      <div>
        <h2>Cart</h2>
        <ul>
          {cartState.items.map(item => (
            <li key={item.id}>
              {item.name} - {item.price}
              <button onClick={() => handleRemove(item)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: {cartState.total}</p>
      </div>
    );
  }
```




