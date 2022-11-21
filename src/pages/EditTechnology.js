import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTechnology } from "../redux/actions";

const EditTechnology = (props) => {
  let dispatch = useDispatch();
  const { technology } = useSelector((state) => state.techonolgiesReducer);
  // const { title, budget, status, completion } = technology;
  console.log("technology", technology);

  const [updatedTech, setUpdatedTech] = useState({
    title: "",
    budget: "",
    status: "",
    completion: "",
  });
  const { id, title, budget, status, completion } = updatedTech;

  const statusOptions = ["pending", "on schedule", "delayed", "completed"];

  useEffect(() => {
    if (technology) {
      setUpdatedTech({ ...technology });
    }
  }, [technology]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    console.log("name, value", name, value);
    if (name === "completion") {
      if (Number(value) > 100) {
        value = 100;
      }
    }
    setUpdatedTech({ ...updatedTech, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !budget || !status || !completion) {
    } else {
      dispatch(updateTechnology(id, updatedTech));
      props.handleClose();
    }
  };

  return (
    <>
      <div
        id="myModal"
        className="modal"
        style={{ display: props.displayStyle ? "block" : "none" }}
      >
        <div class="modal-content">
          <span class="close" onClick={props.handleClose}>
            &times;
          </span>
          <h2 className="modalHeading">Edit Project Details </h2>
          <input
          className="inputTextField"
            type="text"
            name="title"
            value={title || ""}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <input
           className="inputTextField"
            type="number"
            aria-label="budget"
            name="budget"
            value={budget || ""}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />      
          <select
           className="inputTextField selectField"
            name="status"
            id="status"
            onChange={(e) => {
              handleInputChange(e);
            }}
          >
            {statusOptions.map((option) => (
              <option name="status" value={option} selected={option === status}>
                {option}
              </option>
            ))}
          </select>
          <input
           className="inputTextField"
            type="number"
            min="1"
            max="100"
            name="completion"
            value={completion || ""}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <button onClick={handleSubmit} className="modalBtn modalSubmitBtn">Submit</button>
        </div>
      </div>
    </>
  );
};

export default EditTechnology;
