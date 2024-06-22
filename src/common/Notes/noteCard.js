import React from "react";
import { toast } from "react-toastify";
import NotFound from "../../assets/Not Found.png"
import "./noteCard.css"

function NoteCard(props) {
  const {
    setValueEdited,
    setNotes,
    notes,
    setOpenModal,
    filteredNotes,
    screen,
    theme,
    setLoader
  } = props;
  return (
    <div className={"col-12 d-flex flex-wrap mt-3"}>
      {filteredNotes?.length > 0
        ? filteredNotes?.map((item, index) => {
            return (
              <div
                id="card"
                key={index}
                style={{
                  minHeight: "30vh",
                }}
                className={
                  screen <= 500 ?
                  "animate__animated animate__flipInX rounded border col-12 p-3 mb-3" 
                  : "animate__animated animate__flipInX rounded border col-md-4 col-lg-3 col-sm-12 p-3 mx-2 mb-3"}
              >
                <div className="d-flex mb-3 justify-content-between align-items-center">
                  <div
                    style={{
                      backgroundColor: notes[index]?.checked
                        ? "black"
                        : item?.category?.toLowerCase() == "business"
                        ? "#EE4E4E"
                        : item?.category?.toLowerCase() == "personal"
                        ? "#3ABEF9"
                        : "orange",
                      borderRadius: "20px",
                      color: "white",
                      width: "max-content",
                    }}
                    className="px-3 py-2"
                  >
                    {item?.category}
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      className="mx-2 input_checkbox"
                      checked={
                        notes?.find((_, index1) => index1 == index)?.checked
                      }
                      type="checkbox"
                      onChange={() => {
                        const findIndex = notes?.findIndex(
                          (item, index1) => index1 == index
                        );
                        const Checked = notes?.find(
                          (item, index1) =>
                            item?.checked == true && index1 == index
                        );
                        if (findIndex > -1) {
                          if (!Checked) {
                            setNotes([
                              ...notes.slice(0, findIndex),
                              {
                                category: notes[findIndex]?.category,
                                title: notes[findIndex]?.title,
                                description: notes[findIndex]?.description,
                                checked: true,
                                editable: false,
                              },
                              ...notes.slice(findIndex + 1),
                            ]);
                          } else {
                            setNotes([
                              ...notes.slice(0, findIndex),
                              {
                                category: notes[findIndex]?.category,
                                title: notes[findIndex]?.title,
                                description: notes[findIndex]?.description,
                                checked: false,
                                editable: false,
                              },
                              ...notes.slice(findIndex + 1),
                            ]);
                          }
                        }
                      }}
                    ></input>
                    {!notes[index]?.checked && (
                      <svg
                        onClick={() => {
                          let temp = [...notes];
                          temp[index] = {
                            ...notes[index],
                            editable: true,
                          };
                          setNotes(temp);
                          setValueEdited(item);
                          setOpenModal(true);
                        }}
                        style={{
                          cursor: "pointer",
                        }}
                        className="mx-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 50 50"
                      >
                        <path
                          fill={theme ? "#5B5B5B" : "white"}
                          d="M43.125 2a4.857 4.857 0 00-3.438 1.438l-.812.812 6.875 6.875.813-.813a4.858 4.858 0 000-6.874A4.864 4.864 0 0043.124 2zm-5.781 4.031a1.005 1.005 0 00-.594.313L4.312 38.812a1.02 1.02 0 00-.28.438l-2 7.5a.997.997 0 00.261.957c.25.25.613.352.957.262l7.5-2a1.02 1.02 0 00.438-.282L43.656 13.25a1.006 1.006 0 00-1.406-1.438L9.969 44.094 5.906 40.03 38.188 7.75a1 1 0 00-.75-1.719h-.094z"
                        ></path>
                      </svg>
                    )}
                    <svg
                      onClick={() => {
                        setNotes(
                          notes?.filter((ele, index1) => index1 !== index)
                        );
                        toast.success("Note deleted")
                        setLoader(true)
                        setTimeout(() => {
                          setLoader(false)
                        }, 3000);
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                      className="mx-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 50 50"
                    >
                      <path
                        fill={theme ? "#5B5B5B" : "white"}
                        d="M21 0c-1.645 0-3 1.355-3 3v1H9.687c-1.222 0-2.042.895-2.468 2h-.125C4.844 6 3 7.867 3 10.188V11c0 .55.45 1 1 1h1.125l5.094 34.75C10.489 48.637 12.125 50 14 50h22c1.875 0 3.398-1.395 3.781-3.188v-.062L44.875 12H46c.55 0 1-.45 1-1v-.813C47 7.867 45.156 6 42.906 6h-.125c-.426-1.105-1.246-2-2.468-2H32V3c0-1.645-1.355-3-3-3zm0 2h8c.555 0 1 .445 1 1v1H20V3c0-.555.445-1 1-1zM9.687 6h30.626c.398 0 .874.445.874 1 0 .55.45 1 1 1h.72c1.081 0 1.929.836 2.03 2H5.063c.101-1.164.949-2 2.03-2h.72c.55 0 1-.45 1-1 0-.555.476-1 .874-1zm-2.53 6h35.687l-5.032 34.375C37.599 47.379 36.922 48 36 48H14c-.922 0-1.684-.621-1.813-1.531zm5.093 4.281c-.266.04-.508.184-.664.399-.16.218-.223.492-.18.758l3.313 24.906a1 1 0 101.969-.281l-3.282-24.907a1.01 1.01 0 00-.39-.687 1.012 1.012 0 00-.766-.188zm8.406 0a.999.999 0 00-.843 1.063l1.093 24.906c.028.55.496.98 1.047.953.55-.027.98-.496.953-1.047L21.813 17.25a1.01 1.01 0 00-.325-.71 1.027 1.027 0 00-.738-.259h-.094zm8.375 0a.996.996 0 00-.843.969l-1.094 24.906c-.028.551.402 1.02.953 1.047.55.027 1.02-.402 1.047-.953l1.093-24.906a1.007 1.007 0 00-.289-.774 1.008 1.008 0 00-.773-.289h-.094zm8.407 0a.999.999 0 00-.844.875l-3.282 24.907a1 1 0 101.969.281l3.313-24.907a.998.998 0 00-1.063-1.156h-.093z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h5
                    id="title"
                    style={{
                      textDecoration: notes[index]?.checked && "line-through",
                    }}
                  >
                    {item?.title}
                  </h5>
                  <p
                    id="desc"
                    style={{
                      textDecoration: notes[index]?.checked && "line-through",
                    }}
                  >
                    {item?.description}
                  </p>
                </div>
              </div>
            );
          })
        : 
        // notes?.length > 0
        // ? filteredNotes?.map((item, index) => {
        //     return (
        //       <div
        //         key={index}
        //         style={{
        //           minHeight: "45vh",
        //         }}
        //         className="animate__animated animate__flipInX rounded border col-md-3 p-3 mx-2 mb-3"
        //       >
        //         <div className="d-flex mb-3 justify-content-between align-items-center">
        //           <div
        //             style={{
        //               backgroundColor: notes[index]?.checked
        //                 ? "black"
        //                 : item?.category?.toLowerCase() == "business"
        //                 ? "#EE4E4E"
        //                 : item?.category?.toLowerCase() == "personal"
        //                 ? "#3ABEF9"
        //                 : "orange",
        //               borderRadius: "20px",
        //               color: "white",
        //               width: "max-content",
        //             }}
        //             className="px-3 py-2"
        //           >
        //             {item?.category}
        //           </div>
        //           <div className="d-flex align-items-center">
        //             <input
        //               style={{
        //                 accentColor: "#3ABEF9",
        //                 height: "22px",
        //                 width: "22px",
        //               }}
        //               className="mx-2"
        //               checked={
        //                 notes?.find((_, index1) => index1 == index)?.checked
        //               }
        //               type="checkbox"
        //               onChange={() => {
        //                 const findIndex = notes?.findIndex(
        //                   (item, index1) => index1 == index
        //                 );
        //                 const Checked = notes?.find(
        //                   (item, index1) =>
        //                     item?.checked == true && index1 == index
        //                 );
        //                 if (findIndex > -1) {
        //                   if (!Checked) {
        //                     setNotes([
        //                       ...notes.slice(0, findIndex),
        //                       {
        //                         category: notes[findIndex]?.category,
        //                         title: notes[findIndex]?.title,
        //                         description: notes[findIndex]?.description,
        //                         checked: true,
        //                         editable: false,
        //                       },
        //                       ...notes.slice(findIndex + 1),
        //                     ]);
        //                   } else {
        //                     setNotes([
        //                       ...notes.slice(0, findIndex),
        //                       {
        //                         category: notes[findIndex]?.category,
        //                         title: notes[findIndex]?.title,
        //                         description: notes[findIndex]?.description,
        //                         checked: false,
        //                         editable: false,
        //                       },
        //                       ...notes.slice(findIndex + 1),
        //                     ]);
        //                   }
        //                 }
        //               }}
        //             ></input>
        //             {!notes[index]?.checked && (
        //               <svg
        //                 onClick={() => {
        //                   let temp = [...notes];
        //                   temp[index] = {
        //                     ...notes[index],
        //                     editable: true,
        //                   };
        //                   setNotes(temp);
        //                   setValueEdited(item);
        //                   setOpenModal(true);
        //                 }}
        //                 style={{
        //                   cursor: "pointer",
        //                 }}
        //                 className="mx-2"
        //                 xmlns="http://www.w3.org/2000/svg"
        //                 width="20"
        //                 height="20"
        //                 viewBox="0 0 50 50"
        //               >
        //                 <path
        //                   fill="#5B5B5B"
        //                   d="M43.125 2a4.857 4.857 0 00-3.438 1.438l-.812.812 6.875 6.875.813-.813a4.858 4.858 0 000-6.874A4.864 4.864 0 0043.124 2zm-5.781 4.031a1.005 1.005 0 00-.594.313L4.312 38.812a1.02 1.02 0 00-.28.438l-2 7.5a.997.997 0 00.261.957c.25.25.613.352.957.262l7.5-2a1.02 1.02 0 00.438-.282L43.656 13.25a1.006 1.006 0 00-1.406-1.438L9.969 44.094 5.906 40.03 38.188 7.75a1 1 0 00-.75-1.719h-.094z"
        //                 ></path>
        //               </svg>
        //             )}
        //             <svg
        //               onClick={() => {
        //                 // let temp = [...notes]
        //                 // temp = notes?.filter((ele, index1) => index1 !== index)
        //                 setNotes(
        //                   notes?.filter((ele, index1) => index1 !== index)
        //                 );
        //               }}
        //               style={{
        //                 cursor: "pointer",
        //               }}
        //               className="mx-2"
        //               xmlns="http://www.w3.org/2000/svg"
        //               width="20"
        //               height="20"
        //               viewBox="0 0 50 50"
        //             >
        //               <path
        //                 fill="#5B5B5B"
        //                 d="M21 0c-1.645 0-3 1.355-3 3v1H9.687c-1.222 0-2.042.895-2.468 2h-.125C4.844 6 3 7.867 3 10.188V11c0 .55.45 1 1 1h1.125l5.094 34.75C10.489 48.637 12.125 50 14 50h22c1.875 0 3.398-1.395 3.781-3.188v-.062L44.875 12H46c.55 0 1-.45 1-1v-.813C47 7.867 45.156 6 42.906 6h-.125c-.426-1.105-1.246-2-2.468-2H32V3c0-1.645-1.355-3-3-3zm0 2h8c.555 0 1 .445 1 1v1H20V3c0-.555.445-1 1-1zM9.687 6h30.626c.398 0 .874.445.874 1 0 .55.45 1 1 1h.72c1.081 0 1.929.836 2.03 2H5.063c.101-1.164.949-2 2.03-2h.72c.55 0 1-.45 1-1 0-.555.476-1 .874-1zm-2.53 6h35.687l-5.032 34.375C37.599 47.379 36.922 48 36 48H14c-.922 0-1.684-.621-1.813-1.531zm5.093 4.281c-.266.04-.508.184-.664.399-.16.218-.223.492-.18.758l3.313 24.906a1 1 0 101.969-.281l-3.282-24.907a1.01 1.01 0 00-.39-.687 1.012 1.012 0 00-.766-.188zm8.406 0a.999.999 0 00-.843 1.063l1.093 24.906c.028.55.496.98 1.047.953.55-.027.98-.496.953-1.047L21.813 17.25a1.01 1.01 0 00-.325-.71 1.027 1.027 0 00-.738-.259h-.094zm8.375 0a.996.996 0 00-.843.969l-1.094 24.906c-.028.551.402 1.02.953 1.047.55.027 1.02-.402 1.047-.953l1.093-24.906a1.007 1.007 0 00-.289-.774 1.008 1.008 0 00-.773-.289h-.094zm8.407 0a.999.999 0 00-.844.875l-3.282 24.907a1 1 0 101.969.281l3.313-24.907a.998.998 0 00-1.063-1.156h-.093z"
        //               ></path>
        //             </svg>
        //           </div>
        //         </div>
        //         <div>
        //           <h5
        //             style={{
        //               textDecoration: notes[index]?.checked && "line-through",
        //             }}
        //           >
        //             {item?.title}
        //           </h5>
        //           <p
        //             style={{
        //               textDecoration: notes[index]?.checked && "line-through",
        //             }}
        //           >
        //             {item?.description}
        //           </p>
        //         </div>
        //       </div>
        //     );
        //   })
        // : 
        <div className="d-flex col-12 justify-content-center align-items-center">
          <img 
          className="animate__animated animate__flipInX"
          src={NotFound}
          style={{
            width:'300px',
            height:'300px'
          }}
          alt="Not Found"
          />
        </div>
        }
    </div>
  );
}

export default NoteCard;
