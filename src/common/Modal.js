import React, { useState } from "react";
import "./modal.css";
import { toast } from "react-toastify";

function Modal(props) {
  const { 
    setOpenModal, 
    setValueEdited,
    notes, 
    setNotes, 
    valueEdited, 
    setDeleteData, 
    deleteData ,
  } = props;
  const [title, setTitle] = useState("" || valueEdited?.title);
  const [desc, setDesc] = useState("" || valueEdited?.description);
  const [category, setCategory] = useState(
    valueEdited?.category ? valueEdited?.category : "Business"
  );

  const resetFields = () => {
    setDesc("");
    setCategory("");
    setTitle("");
    setDeleteData(false);
    setValueEdited()
  };
  return (
    <div >
      <div className="animate__animated animate__fadeInDownBig card w-100 p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h4>{deleteData ? "Confirmation" : valueEdited ? " Update Note" : "Add Note"}</h4>
          <svg
            onClick={() => {
              resetFields();
              setOpenModal(false);
            }}
            className="cross_Icon"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 26 26"
          >
            <path
              fill="#5B5B5B"
              d="M21.125 0H4.875A4.876 4.876 0 000 4.875v16.25A4.876 4.876 0 004.875 26h16.25A4.876 4.876 0 0026 21.125V4.875A4.876 4.876 0 0021.125 0zm-2.344 17.395l-1.39 1.386a.653.653 0 01-.922 0L13 15.313 9.531 18.78a.65.65 0 01-.922-.004l-1.39-1.382a.665.665 0 010-.926L10.687 13 7.223 9.535a.658.658 0 010-.926l1.386-1.386a.65.65 0 01.926 0L13 10.688l3.469-3.465a.646.646 0 01.922 0l1.39 1.382a.663.663 0 010 .93L15.313 13l3.468 3.469c.25.258.25.668 0 .926z"
            ></path>
          </svg>
        </div>
        <hr></hr>
        <div className="col-12 px-0">
          {deleteData ? (
            <div style={{filter:'none'}} className="row flex-column align-items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
              >
                <path
                  fill="orange"
                  d="M22.239 18.451L13.442 3.816C13.135 3.305 12.596 3 12 3s-1.135.305-1.441.815L1.761 18.451A1.684 1.684 0 003.203 21h17.595a1.683 1.683 0 001.441-2.549zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z"
                ></path>
              </svg>
              <h5>Are you sure you want to delete data from localStorage</h5>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-6 col-sm-12 mb-3">
                <label>Title</label>
                <input
                  placeholder="Add Title"
                  className="input col-12 fixed_height"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6 col-sm-12 mb-3">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input col-12 fixed_height"
                  name="Category"
                >
                  <option value="Business">Business</option>
                  <option value="Personal">Personal</option>
                  <option value="Home">Home</option>
                </select>
              </div>
              <div className="col-md-12 col-sm-12">
                <div className="d-flex justify-content-between align-items-center">
                  <label>Description (optional)</label>
                  <span>{`${desc?.length || 0}/200`}</span>
                </div>
                <textarea
                  name="Description"
                  rows="6"
                  cols="30"
                  className="input description_style col-12"
                  placeholder="Add description"
                  value={desc}
                  onChange={(e) => {
                    let value = e.target.value
                    if(value?.length <= 200){
                    setDesc(e.target.value);
                    }
                  }}
                ></textarea>
              </div>
            </div>
          )}
        </div>
        <hr></hr>
        <div className={deleteData ? "d-flex justify-content-end" : "d-flex justify-content-between"}>
          {deleteData ?
            <button 
            onClick={() => {
                resetFields()
                setOpenModal(false)
                toast.success("Data removed from LocalStorage")
                localStorage.removeItem("notes",JSON.stringify(notes))
                setTimeout(() => {
                  window.location.reload()
                }, 3000);
            }}
            className='Save_dataBtn'>
            Delete
        </button>
            :
            <>
            <button
            onClick={() => {
              resetFields();
              setOpenModal(false);
            }}
            className="modal_action-btn"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (valueEdited) {
                const findIndex = notes?.findIndex(
                  (ele) => ele?.title == valueEdited?.title
                );
                setNotes([
                  ...notes?.slice(0, findIndex),
                  {
                    description: desc || valueEdited?.description,
                    category: category || valueEdited?.category,
                    title: title || valueEdited?.title,
                    checked: false,
                    editable: false,
                  },
                  ...notes?.slice(findIndex + 1),
                ]);
                toast.success("Note updated successfully")
              } else {
                if (notes?.length > 0) {
                  setNotes([
                    ...notes,
                    {
                      description: desc,
                      category: category,
                      title: title,
                      checked: false,
                      editable: false,
                    },
                  ]);
                } else {
                  setNotes([
                    {
                      description: desc,
                      category: category,
                      title: title,
                      checked: false,
                      editable: false,
                    },
                  ]);
                }
                toast.success("Note added successfully")
              }
              resetFields();
              setOpenModal(false);
            }}
            className="modal_action-btn"
          >
            {valueEdited ? "Update" : "Add"}
          </button>
          </>
          }
        </div>
      </div>
    </div>
  );
}

export default Modal;
