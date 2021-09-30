import { reactive, onMounted } from "cue";
import style from './App.css';

const useCount = (props) => {
  const count = reactive(props.count !== undefined ? props.count : 0);
  const increment = () => {
    count(count() + 1);
    props.onIncrement && props.onIncrement();
  };
  const decrement = () => {
    count(count() - 1);
    props.onDecrement && props.onDecrement();
  };
  return [ count, increment, decrement ];
}

const App = (props = {}) => {
  const [ count, increment, decrement ] = useCount(props);

  onMounted(() => {
    console.log('count mounted!');
  });

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
