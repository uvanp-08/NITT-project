import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";


const assignmentsData = [
  {
    id: 1,
    name: "Math Assignment",
    description: "Solve the problems from chapters 3 and 4.",
    person: "JS",
    timeAssigned: "2025-06-01 10:00 AM",
    dueDate: "2025-06-15 11:59 PM",
    marks: 100,
    files: ["chapter3.pdf", "chapter4-problems.docx"],
  },
  {
    id: 2,
    name: "Science Project",
    description: "Prepare a presentation on renewable energy.",
    person: "AL",
    timeAssigned: "2025-06-05 09:00 AM",
    dueDate: "2025-06-20 11:59 PM",
    marks: 50,
    files: [],
  },

];

const AssignmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const assignment = assignmentsData.find(
    (a) => a.id === Number(id)
  );

  const [uploadFile, setUploadFile] = useState(null);

  if (!assignment) {
    return (
      <div className="card">
        <h2>Assignment Not Found</h2>
        <Link to="/">Go Back Home</Link>
      </div>
    );
  }

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!uploadFile) {
      alert("Please select a file to upload.");
      return;
    }
    alert(`Uploaded file: ${uploadFile.name}`);
    setUploadFile(null);

  };

  return (
    <div className="card assignment-detail-card">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      <h2>{assignment.name}</h2>
      <p><strong>Description:</strong> {assignment.description}</p>
      <p><strong>Time Assigned:</strong> {assignment.timeAssigned}</p>
      <p><strong>Due Date:</strong> {assignment.dueDate}</p>
      <p><strong>Marks:</strong> {assignment.marks}</p>

      <div>
        <strong>Attached Files:</strong>
        {assignment.files.length > 0 ? (
          <ul>
            {assignment.files.map((file, idx) => (
              <li key={idx}>
                <a href={`#`} target="_blank" rel="noopener noreferrer">
                  {file}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No files attached.</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="upload-form">
        <label htmlFor="fileUpload">Upload your submission:</label>
        <input
          id="fileUpload"
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt,.zip"
        />
        <button type="submit" className="upload-btn">Submit</button>
      </form>
    </div>
  );
};

export default AssignmentDetail;
