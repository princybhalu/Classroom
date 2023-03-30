import React from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { AddMarkesApiCall } from "../services/assignmentApis";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";


export default function ViewStudentUploadAssignment(props) {

  const Assignment = props.Assignment;

  // eslint-disable-next-line no-undef
  const [mark , SetMarks] = useState(0);

  const handleChange = (event) => {
    SetMarks(event.target.value);
  }

  const AddMarkes = async (userid) => {
    // let mark = document.getElementById("input-get-mark").value ;
    console.log(mark);

    let req = {
      Assignment_id : Assignment.assignmentObject._id  ,
      user_id : userid ,
      Points : mark
    }
    console.log("req")
    console.log(req)

    const res =  await AddMarkesApiCall(req);
    console.log(res);
    navigate("/assignment/viewOneAssignment/" + Assignment.assignmentObject._id + "/" + props.classname);

    // console.log(take-points);
  }

  const navigate = useNavigate();

  return (
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

                  {assignment.Points == 0 ? <>  <div className="input-group mb-3">
                    <input type="text" name="take-points" id="input-get-mark" 
                    onChange={handleChange} className="form-control" placeholder="Enter Points" aria-label="Enter Points" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                      <span className="input-group-text" id="basic-addon2"> / {Assignment.assignmentObject.Points}</span>
                    </div>
                  </div>

                    <Button color="primary" onClick={() => { AddMarkes(assignment.userId) }} size="large" type="submit" variant="contained" >
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
    </>
  )
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