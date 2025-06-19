import React from "react";
import { useParams } from "react-router-dom";

const lessonContent = {
  algebra: {
    videos: ["Algebra Basics", "Linear Equations", "Quadratic Functions"],
    books: ["Algebra Essentials", "Advanced Algebra Techniques"],
    tests: ["Algebra Test 1", "Algebra Quiz: Expressions"],
  },
  geometry: {
    videos: ["Triangles", "Circles and Arcs", "3D Shapes"],
    books: ["Geometry Workbook", "Shapes and Theorems"],
    tests: ["Geometry Basics Test", "Circle Theorem Quiz"],
  },
};

const LessonDetail = () => {
  const { lessonId } = useParams();
  const lessonData = lessonContent[lessonId] || {};

  return (
    <div className="lesson-detail">
      <h1 className="lesson-title">{lessonId.toUpperCase()}</h1>
      <hr className="lesson-line" />

      {lessonData.videos && (
        <div className="slide-section">
          <h2>Videos</h2>
          <div className="slide-container horizontal-scroll">
            {lessonData.videos.map((video, index) => (
              <div key={index} className="slide-card video-card">
                {video}
              </div>
            ))}
          </div>
        </div>
      )}

      {lessonData.books && (
        <div className="slide-section">
          <h2>Books</h2>
          <div className="slide-container horizontal-scroll">
            {lessonData.books.map((book, index) => (
              <div key={index} className="slide-card">
                {book}
              </div>
            ))}
          </div>
        </div>
      )}

      {lessonData.tests && (
        <div className="slide-section">
          <h2>Tests</h2>
          <div className="slide-container horizontal-scroll">
            {lessonData.tests.map((test, index) => (
              <div key={index} className="slide-card">
                {test}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonDetail;
