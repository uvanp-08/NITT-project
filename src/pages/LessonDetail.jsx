import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./LessonDetail.css";

const LessonDetail = () => {
  const { lessonSlug } = useParams();
  const [lesson, setLesson] = useState(null);
  const [videos, setVideos] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await axios.get(`/api/lessons/${lessonSlug}`);
        setLesson(res.data.lesson);
        setVideos(res.data.videos);
        setMaterials(res.data.materials);
        setTests(res.data.tests);
      } catch (err) {
        console.error("Lesson fetch error:", err);
      }
    };

    fetchLesson();
  }, [lessonSlug]);

  if (!lesson) return <div className="card">Loading lesson...</div>;

  return (
    <div className="lesson-detail">
      <h1 className="lesson-title">{lesson.name}</h1>
      <hr className="lesson-line" />

      {videos.length > 0 && (
        <div className="slide-section">
          <h2>Videos</h2>
          <div className="slide-container horizontal-scroll">
            {videos.map((video) => (
              <iframe
                key={video.id}
                width="320"
                height="180"
                src={video.url}
                title={video.title}
                allowFullScreen
              />
            ))}
          </div>
        </div>
      )}

      {materials.length > 0 && (
        <div className="slide-section">
          <h2>Study Materials</h2>
          <div className="slide-container horizontal-scroll">
            {materials.map((mat) => (
              <a
                key={mat.id}
                className="slide-card"
                href={`/uploads/${mat.file}`}
                download
              >
                📘 {mat.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {tests.length > 0 && (
        <div className="slide-section">
          <h2>Tests</h2>
          <div className="slide-container horizontal-scroll">
            {tests.map((test) => (
              <a
                key={test.id}
                className="slide-card"
                href={test.link}
                target="_blank"
                rel="noreferrer"
              >
                📝 {test.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonDetail;
