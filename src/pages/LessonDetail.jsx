import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./LessonDetail.css";

const LessonDetail = () => {
  const { lessonSlug } = useParams();
  const [lesson, setLesson] = useState(null);
  const [videos, setVideos] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const materialRef = useRef(null);
  const testRef = useRef(null);

  const scroll = (ref, direction) => {
    if (!ref.current) return;
    const scrollAmount = 300;
    ref.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await axios.get(`/api/lessons/${lessonSlug}`);
        if (res.data.lesson) {
          setLesson(res.data.lesson);
          setVideos(res.data.videos);
          setMaterials(res.data.materials);
          setTests(res.data.tests);
          setError(null);
        } else {
          setError("Lesson not found.");
        }
      } catch (err) {
        console.error("Lesson fetch error:", err);
        setError(`Failed to load lesson details. ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonSlug]);

  if (loading) return <div className="card">Loading lesson...</div>;
  if (error) return <div className="card">{error}</div>;
  if (!lesson) return <div className="card">Lesson not found.</div>;

  const renderSection = (title, items, ref, icon, isFile = false, isVideo = false) => (
    <div className="slide-section">
      <h2>{title}</h2>
      <div className="slider-wrapper">
        <button className="arrow left" onClick={() => scroll(ref, "left")}>◀</button>
        <div className="slide-container horizontal-scroll" ref={ref}>
          {items.map((item) => (
            <a
              key={item.id}
              href={isFile ? item.file : item.url || item.link}
              target="_blank"
              rel="noreferrer"
              className={`slide-card ${isVideo ? "video-card" : ""}`}
            >
              {icon} {item.title}
            </a>
          ))}
        </div>
        <button className="arrow right" onClick={() => scroll(ref, "right")}>▶</button>
      </div>
    </div>
  );

  return (
    <>
      <h1 className="lesson-title">{lesson.name}</h1>
      <hr className="lesson-line" />

      {videos.length > 0 && renderSection("▶️ Videos", videos, videoRef, "", false, true)}
      {materials.length > 0 && renderSection("📘 Study Materials", materials, materialRef, "", true)}
      {tests.length > 0 && renderSection("📝 Tests", tests, testRef, "")}
    </>
  );
};

export default LessonDetail;
