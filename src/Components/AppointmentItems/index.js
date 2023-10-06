import "./style.css";

const AppointmentItems = (props) => {
  const { each, onClickToggleStar } = props;
  const { id, title, date, isStar } = each;
  const isStarActive = isStar
    ? "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
    : "https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png";
  const ToggleStar = () => {
    onClickToggleStar(id);
  };
  return (
    <li className="each-item">
      <div>
        <h1 className="ap-title">{title}</h1>
        <span className="ap-date">{date}</span>
      </div>
      <button type="button" className="star-btn" onClick={ToggleStar}>
        <img src={isStarActive} alt="star" />
      </button>
    </li>
  );
};
export default AppointmentItems;
