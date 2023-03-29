import React from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { GetOneAssignmentApiCall } from "../services/assignmentApis";
import { Button } from "@mui/material";

export default function ViewStudentUploadAssignment(props) {
  const AssignmentId = props.AssignmentId;

  const [Assignment, setAssignment] = useState({});
  const [IsSetAssignment, SetIsSetAssignment] = useState(0);

  GetOneAssignmentApiCall(AssignmentId)
    .then((result) => {
      setAssignment(result);
      SetIsSetAssignment(1);
    })
    .catch((err) => {
      console.log(err);
    });

  const AddMarkes = (id) => {
    console.log(id);
    // console.log(take-points);

  }

  console.log(Assignment);

  return (
    <>
      {IsSetAssignment === 0 ? (
        <>Loading....</>
      ) : (
        <>
          <h3>
            {Assignment.SubmitArray.map((assignment) => (<>
              <div class="card" style={{ width: '70%' }}>
                <div class="card-body">
                  <div className="row">
                    <div className="col-4">
                      <a href={assignment.Attach} target="_blank" rel="noopener noreferrer">
                        <img
                          src={`https://res.cloudinary.com/djj0dl6dz/image/fetch/f_auto,q_auto:good,c_limit,h_200,w_200/${assignment.Attach}#page=1`}
                          style={{ border: "1px solid black" }} width="150" height="150"
                          alt="PDF Front Page"
                        />
                      </a>
                    </div>
                    <div className="col-6">
                      <h5 className="card-title">{assignment.userUserId}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Submited On {assignment.DateWhenAssign}</h6>

                      {assignment.Points === 0 ? <>  <div className="input-group mb-3">
                        <input type="text" name="take-points" className="form-control" placeholder="Enter Points" aria-label="Enter Points" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                          <span className="input-group-text" id="basic-addon2"> / {Assignment.assignmentObject.Points}</span>
                        </div>
                      </div>

                        <Button color="primary" onClick={() => { AddMarkes(Assignment.assignmentObject._id) }} size="large" type="submit" variant="contained" >
                          Marked
                        </Button>
                      </> : <><p className="card-text">Points : {assignment.Points}</p></>}


                    </div>

                  </div>

                </div>
              </div>
              <br />
            </>
            ))}
          </h3>
          {/* <h3>{assignment.Instructions}</h3> */}
        </>
      )}
    </>
  );
}

//  <>
{/* <br/>
<h4>{assignment.userUserId}</h4>
<br/>
<a href={assignment.Attach} target="_blank" rel="noopener noreferrer">
<img
  src={`https://res.cloudinary.com/djj0dl6dz/image/fetch/f_auto,q_auto:good,c_limit,h_200,w_200/${assignment.Attach}#page=1`}
  style={{ border: "1px solid black" }}
  alt="PDF Front Page"
/>
</a></> */}