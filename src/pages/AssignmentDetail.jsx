import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const AssignmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/assignments/${id}`);
        const data = await res.json();
        setAssignment(data);
      } catch (err) {
        console.error("Failed to load assignment", err);
      }
    };
    fetchAssignment();
  }, [id]);

  const [uploadFile, setUploadFile] = useState(null);

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

  if (!assignment) {
    return (
      <div className="card">
        <h2>Assignment Not Found</h2>
        <Link to="/">Go Back Home</Link>
      </div>
    );
  }

  return (
    <div className="card assignment-detail-card">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      <h2>{assignment.name}</h2>
      <p><strong>Description:</strong> {assignment.description}</p>
      <p><strong>Time Assigned:</strong> {assignment.time_assigned}</p>
      <p><strong>Due Date:</strong> {assignment.due_date}</p>
      <p><strong>Marks:</strong> {assignment.marks}</p>

      <div>
        <strong>Attached Files:</strong>
        {assignment.files && assignment.files.length > 0 ? (
          <ul>
            {assignment.files.map((file, idx) => (
              <li key={idx}>
                <a href={file} target="_blank" rel="noopener noreferrer">
                  {file.split("/").pop()}
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
          accept=".pdf,.doc,.docx,.txt,.zip,.pptx"
        />
        <button type="submit" className="upload-btn">Submit</button>
      </form>
    </div>
  );
};

export default AssignmentDetail;
