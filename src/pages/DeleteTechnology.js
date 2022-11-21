import React from "react";

const DeleteTechnology = (props) => {
  console.log("props", props);
  const { displayStyle, selectedTech, handleClose, handleDeleteConfirm } =
    props;
  return (
    <div
      id="myModal"
      class="modal"
      style={{ display: displayStyle ? "block" : "none" }}
    >
      <div class="modal-content deleteModal">
        <span class="close" onClick={handleClose}>
          &times;
        </span>
        <h2 className="mb-5">
          Are you sure wanted to delete the{" "}
          <span style={{ color: "red" }}>{selectedTech.title}</span>{" "}?
        </h2>
        <div className="btnSection">
          <button className="modalBtn modalCancelBtn" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="modalBtn modalSubmitBtn"
            onClick={handleDeleteConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteTechnology;
