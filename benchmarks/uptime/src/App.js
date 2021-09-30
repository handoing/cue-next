import { reactive } from "cue";
import './App.css';
import ServerUptime from "./ServerUptime";

function generateServer (name) {
  var days = []
  for (var i=0; i<=364; i++) {
    var up = Math.random() > 0.2
    days.push({ number: i, up })
  }
  return { name, days }
}

function generateServers () {
  return [
    generateServer("Stefan's Server"),
    generateServer("Godfrey's Server"),
    generateServer("Yehuda's Server")
  ]
}

var fpsMeter = {
  alpha: 2/121,
  lastValue: null,
  push (dataPoint) {
    if (this.lastValue) {
      return this.lastValue = this.lastValue + this.alpha * (dataPoint - this.lastValue)
    } else {
      return this.lastValue = dataPoint
    }
  }
}

var timeoutId
var lastFrame = null

const App = () => {
  const fps = reactive(0);
  const playing = reactive(false);
  const servers = reactive(Object.freeze(generateServers()));

  function toggle () {
    playing(!playing());
    if (playing()) {
      update()
    } else {
      clearTimeout(timeoutId)
    }
  }

  function update () {
    var thisFrame = window.performance.now()
    if (lastFrame) {
      fps(Math.round(fpsMeter.push(1000 / (thisFrame - lastFrame))))
    }
    servers(Object.freeze(generateServers()))
    timeoutId = setTimeout(update, 0)
    lastFrame = thisFrame
  }

  return (
    <div>
      <p>FPS: { fps() }</p>
      <button onClick={toggle}>{ playing() ? 'pause' : 'play' }</button>
      {servers().map((server) => {
        return <ServerUptime key={server.name} name={server.name} days={server.days}></ServerUptime>
      })}
    </div>
  );
};

export default App;
