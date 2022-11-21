import axios from "axios";
import * as types from "./actionTypes.js";

const getTechnologies = (technologies) => ({
  type: types.GET_TECHNOLOGIES,
  payload: technologies,
});

const getTechnology = (technology) => ({
  type: types.GET_TECHNOLOGY,
  payload: technology,
});

const updatedTechnology = () => ({
  type: types.UPDATE_TECHNOLOGY,
});

const deletedTechnology = () => ({
  type: types.DELETE_TECHNOLOGY,
});

export const loadTechnologies = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((resp) => {
        // console.log("resp", resp);
        dispatch(getTechnologies(resp.data));
      })
      .catch((error) => console.log("error", error));
  };
};

export const getTechnologyById = (id) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}/${id}`)
      .then((resp) => dispatch(getTechnology(resp.data)))
      .catch((err) => console.log("err", err));
  };
};

export const updateTechnology = (id, technology) => {
  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_API}/${id}`, technology)
      .then((resp) => {
        dispatch(updatedTechnology());
        dispatch(loadTechnologies());
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const deleteTechnology = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_API}/${id}`)
      .then((resp) => {
        // console.log("resp", resp);
        dispatch(deletedTechnology());
        dispatch(loadTechnologies());
      })
      .catch((error) => console.log("error", error));
  };
};
