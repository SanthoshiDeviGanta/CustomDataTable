import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTechnology,
  getTechnologyById,
  loadTechnologies,
} from "../redux/actions";
import sortIcon from "../assets/sort.svg";
import dotsIcon from "../assets/vertical-dots.svg";
import EditTechnology from "./EditTechnology";
import DeleteTechnology from "./DeleteTechnology";
import "./Dashboard.css";

const Dashboard = () => {
  let dispatch = useDispatch();
  const { technologies } = useSelector((state) => state.techonolgiesReducer);

  const [techData, setTechData] = useState(technologies);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("ASC");
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedTech, setSelectedTech] = useState({});

  useEffect(() => {
    dispatch(loadTechnologies());
  }, []);

  useEffect(() => {
    if (technologies) {
      setTechData(technologies);
    }
  }, [technologies]);

  const sorting = (col) => {
    if (order === "ASC") {
      const sortedData = [...technologies].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setTechData(sortedData);
      setOrder("DES");
    }
    if (order === "DES") {
      const sortedData = [...technologies].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setTechData(sortedData);
      setOrder("ASC");
    }
  };

  const handleEdit = (id) => {
    console.log("san handleEdit", id);
    setIsEdit(true);
    dispatch(getTechnologyById(id));
  };

  const handleDelete = (id, technology) => {
    setIsDelete(true);
    setSelectedTech(technology);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteTechnology(selectedTech.id));
    setIsDelete(false);
  };

  const handleClose = () => {
    setIsEdit(false);
    setIsDelete(false);
  };

  const colorCode = {
    pending: "bg-warning",
    "on schedule": "bg-info",
    delayed: "bg-danger",
    completed: "bg-success",
  };

  return (
    <>
      <div className="card shadow">
        <div className="card-header border-0">
          <h3 className="mb-0">Card tables</h3>
          <div className="searchBox">
            <input
              className="searchInput"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table align-items-center table-flush">
            <thead className="thead-light">
              <tr>
                <th
                  scope="col"
                  className="header"
                  onClick={() => sorting("title")}
                >
                  Project <img src={sortIcon} className="sortIcon" alt="sort" />
                </th>
                <th
                  scope="col"
                  className="header"
                  onClick={() => sorting("budget")}
                >
                  Budget <img src={sortIcon} className="sortIcon" alt="sort" />
                </th>
                <th scope="col">Status</th>
                <th scope="col">Users</th>
                <th
                  scope="col"
                  className="header"
                  onClick={() => sorting("completion")}
                >
                  Completion{" "}
                  <img src={sortIcon} className="sortIcon" alt="sort" />
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {techData &&
                techData
                  .filter((tech) =>
                    tech.title.toLowerCase().includes(searchTerm)
                  )
                  .map((technology) => (
                    <tr key={technology.id}>
                      <td>
                        <div class="media align-items-center ">
                          <div className="avatar rounded-circle mr-3">
                            <img alt="tech" src={technology.titleImg} />
                          </div>
                          <div class="media-body">
                            <span class="mb-0 text-sm titleStyle">
                              {technology.title}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="textCenter">
                        ${`${(+technology.budget).toLocaleString("en-US")}`} USD
                      </td>
                      <td>
                        <span class="badge badge-dot ml-5">
                          <i className={colorCode[technology.status]}></i>
                          {technology.status}
                        </span>
                      </td>
                      <td className="avatars">
                        {technology.users.map((user) => (
                          <div className="tooltip" key={user.id}>
                            <img
                              className="myDIV"
                              src={user.profileImg}
                              alt="pic"
                            />
                            <span className="tooltiptext"> {user.name}</span>
                          </div>
                        ))}
                      </td>
                      <td>
                        <div class="completionBox align-items-center ">
                          <span class="mr-2">{technology.completion}%</span>
                          <div>
                            <div class="progress">
                              <div
                                className={`progress-bar ${
                                  colorCode[technology.status]
                                }`}
                                role="progressbar"
                                aria-valuenow={technology.completion}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: `${technology.completion}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="text-right">
                        <div class="dropdown">
                          <div
                            class="btn btn-sm btn-icon-only text-light"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true"
                          >
                            <img
                              src={dotsIcon}
                              alt="dotsIcon"
                              className="dotsIcon"
                            />
                          </div>
                          <div class="dropdown">
                            <div class="dropdown-content">
                              <a onClick={() => handleEdit(technology.id)}>
                                Edit
                              </a>
                              <a
                                onClick={() =>
                                  handleDelete(technology.id, technology)
                                }
                              >
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEdit && (
        <EditTechnology displayStyle={isEdit} handleClose={handleClose} />
      )}
      {isDelete && (
        <DeleteTechnology
          displayStyle={isDelete}
          handleClose={handleClose}
          handleDeleteConfirm={handleDeleteConfirm}
          selectedTech={selectedTech}
        />
      )}
    </>
  );
};

export default Dashboard;
