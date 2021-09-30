const UptimeDay = ({ day }) => {
  return (
    <div className="uptime-day">
      <span className="uptime-day-status" style={{ 'background-color': day.up ? '#8cc665' : '#ccc' }}></span>
      <span className="hover">{day.number + ': ' + day.up ? 'Servers operational!' : 'Red alert!'}</span>
    </div>
  );
};

export default UptimeDay;
