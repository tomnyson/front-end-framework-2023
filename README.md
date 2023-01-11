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