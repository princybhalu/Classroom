import React from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { GetOneAssignmentApiCall } from "../services/assignmentApis";

export default function ViewStudentUploadAssignment() {
  const { AssignmentId } = useParams();

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

  console.log(Assignment);

  return (
    <>
      {IsSetAssignment === 0 ? (
        <>Loading....</>
      ) : (
        <>
          <h3>
            {Assignment.StudentSubmition.map((assignment) => (
              <>
              <br/>
              <h4>{assignment.userUserId}</h4>
              <br/>
              <a href={assignment.Attach} target="_blank" rel="noopener noreferrer">
              <img
                src={`https://res.cloudinary.com/djj0dl6dz/image/fetch/f_auto,q_auto:good,c_limit,h_200,w_200/${assignment.Attach}#page=1`}
                style={{ border: "1px solid black" }}
                alt="PDF Front Page"
              />
            </a></>
            ))}
          </h3>
          {/* <h3>{assignment.Instructions}</h3> */}
        </>
      )}
    </>
  );
}
