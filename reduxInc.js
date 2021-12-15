function createStore(reducer, initialState) {
    let currentReducer = reducer;
    let currentState = initialState;
    let listener = () => {};
  
    function getState() {
      return currentState;
    }
    function dispatch(action) {
      currentState = currentReducer(currentState, action);
      listener();
      return action;
    }
    function subscribe(newListener) {
      listener = newListener;
    }
    return {
      getState: getState,
      dispatch: dispatch,
      subscribe: subscribe
    };
  }
  
  function counter(state, action) {
    const stateInitialized = isNaN(state)?0:state;
    switch (action.type) {
      case "INCREMENT":
        return stateInitialized + 1;
      case "DECREMENT":
        return stateInitialized - 1;
      default:
        return stateInitialized;
    }
  }
  
  const store = createStore(counter);
  
  store.subscribe(() => console.log(store.getState()));
  
  //store.dispatch({ type: "INCREMENT" });
  //store.dispatch({ type: "INCREMENT" });
  //store.dispatch({ type: "DECREMENT" });
  
  
function redrawScreen() {
    g.reset().clearRect(Bangle.appRect);
    g.setFont("12x20").setFontAlign(0,0);
    g.drawString("Redux Inc", 80, 70);
    g.setFont("Vector:40");
    g.drawString(store.getState(), 80,105);
}

redrawScreen()
Bangle.on("tap", (options) => {
  if(options.double) {
    store.dispatch({ type: "INCREMENT" });
  }
});
 
Bangle.loadWidgets();
Bangle.drawWidgets();