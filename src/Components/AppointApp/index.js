import { Component } from "react";
import "./style.css";
import { v4 as uuidV4 } from "uuid";
import AppointmentItems from "../AppointmentItems";

class AppointApp extends Component {
  state = {
    title: "",
    date: "",
    isActiveStar: "",
    appointmentsData: [
      {
        date: "2023-10-07",
        id: "f0d8c753-c0cb-452b-b5b4-fe42965d7411",
        isStar: true,
        title: "Covid",
      },
      {
        date: "2023-10-07",
        id: "f0d8c753-c0cb-452b-b5b4-fe42965d7412",
        isStar: false,
        title: "Fever",
      },
      {
        date: "2023-10-07",
        id: "f0d8c753-c0cb-452b-b5b4-fe42965d7413",
        isStar: false,
        title: "das",
      },
    ],
  };
  onChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };
  onChangeDate = (event) => {
    this.setState({
      date: event.target.value,
    });
  };
  submitForm = (event) => {
    event.preventDefault();
    const { title, date } = this.state;
    const newData = {
      id: uuidV4(),
      title: title,
      date: date,
      isStar: false,
    };
    const currentData = new Date().toISOString().split("T")[0];
    console.log(currentData);
    if (date >= currentData) {
      this.setState((prevState) => {
        return {
          appointmentsData: [...prevState.appointmentsData, newData],
          title: "",
          date: "",
        };
      });
    } else {
      alert("Pls Enter Current/Future Dates");
    }
  };
  onClickToggleStar = (id) => {
    this.setState((prevState) => {
      return {
        appointmentsData: prevState.appointmentsData.map((each) => {
          if (each.id === id) {
            return { ...each, isStar: !each.isStar };
          }
          return each;
        }),
      };
    });
  };
  filterStarItems = () => {
    this.setState((prev) => {
      return {
        isActiveStar: !prev.isActiveStar,
      };
    });
  };
  getFilters = () => {
    const { isActiveStar, appointmentsData } = this.state;
    if (isActiveStar) {
      return appointmentsData.filter((each) => each.isStar);
    }
    return appointmentsData;
  };

  render() {
    const { title, date, isActiveStar } = this.state;
    const filterStars = this.getFilters();
    const starItemsBtn = isActiveStar && "star-btn-active ";

    return (
      <div className="bg-container">
        <div className="bg-card-container">
          <div className="lg-flex-card">
            <div className="input-card">
              <h1 className="title">Add Appointments</h1>
              <form onSubmit={this.submitForm} className="form">
                <label htmlFor="title" className="label">
                  Title
                </label>
                <input
                  value={title}
                  onChange={this.onChangeTitle}
                  id="title"
                  type="text"
                  placeholder="Title"
                  className="title-input"
                />
                <label htmlFor="date" className="label">
                  Date
                </label>
                <input
                  value={date}
                  onChange={this.onChangeDate}
                  id="date"
                  type="date"
                  placeholder="Date"
                  className="date-input"
                />
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>
            <div className="lg-banner-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="bannger"
                className="lg-banner"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="control-card">
            <b>Appointments</b>
            <button
              type="button"
              className={`inActive-start-btn ${starItemsBtn}`}
              onClick={this.filterStarItems}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-items-card">
            {filterStars.map((each) => {
              return (
                <AppointmentItems
                  each={each}
                  key={each.id}
                  onClickToggleStar={this.onClickToggleStar}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
export default AppointApp;
