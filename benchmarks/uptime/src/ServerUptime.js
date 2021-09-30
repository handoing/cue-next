import { memo } from "cue";
import UptimeDay from "./UptimeDay";

const ServerUptime = ({ name, days }) => {
  const upDays = () => {
    return days.reduce(function (upDays, day) {
      return upDays += (day.up ? 1 : 0)
    }, 0);
  }

  const maxStreak = () => {
    var streak = days.reduce(([max, streak], day) => {
      if (day.up && streak + 1 > max) {
        return [streak + 1, streak + 1]
      } else if (day.up) {
        return [max, streak + 1]
      } else {
        return [max, 0]
      }
    }, [0, 0])
    return streak[0]
  }

  return (
    <div class="server-uptime">
      <h1>{name}</h1>
      <h2>{upDays()} Days Up</h2>
      <h2>Biggest Streak: {maxStreak()}</h2>
      <div class="days">
        {days.map((day) => {
          return <UptimeDay key={day.number} day={day} />
        })}
      </div>
    </div>
  );
};

export default ServerUptime;
