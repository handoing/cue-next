import { reactive } from "reactive";
import style from './App.css';

const App = (props = {
  onIncrement: () => {},
  onDecrement: () => {},
}) => {
  const count = reactive(0);
  const increment = () => {
    count(count() + 1);
    props.onIncrement();
  };
  const decrement = () => {
    count(count() - 1);
    props.onDecrement();
  };
  return (
    <div>
      <style>{style}</style>
      <button type="button" onClick={decrement}> - </button>
      <span>{count()}</span>
      <button type="button" onClick={increment}> + </button>
    </div>
  );
};

export default App;
