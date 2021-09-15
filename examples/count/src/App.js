import { reactive } from "reactive";
import style from './App.css';

const App = () => {
  const count = reactive(0);
  const increment = () => {
    count(count() + 1);
  };
  const decrement = () => {
    count(count() - 1);
  };
  return (
    <>
      <style>{style}</style>
      <button type="button" onClick={decrement}> - </button>
      <span>{count()}</span>
      <button type="button" onClick={increment}> + </button>
    </>
  );
};

export default App;
