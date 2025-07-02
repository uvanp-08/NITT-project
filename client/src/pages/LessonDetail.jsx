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
    ref.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
  };

  const recordUsage = async (type, itemId) => {
    try {
      await axios.post("/api/usage/record", {
        lessonId: lesson.id,
        type,
        itemId
      });
    } catch (err) {
      console.error("Usage record failed:", err);
    }
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
        console.error("Fetch lesson failed:", err);
        setError("Failed to load lesson.");
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [lessonSlug]);

  const extractYoutubeId = (url) => {
    const match = url.match(/(?:youtu\.be\/|v=)([^&]+)/);
    return match ? match[1] : "";
  };

  const renderSection = (title, items, ref, type, isFile = false) => (
    <div className="slide-section">
      <h2>{title}</h2>
      <div className="slider-wrapper">
        <button className="arrow left" onClick={() => scroll(ref, "left")}>◀</button>
        <div className="slide-container horizontal-scroll" ref={ref}>
          {items.map(item => {
            const link = isFile ? `/uploads/${item.file}` : (item.url || item.link);

            if (type === "video") {
              const videoId = extractYoutubeId(item.url || "");
              return (
                <a
                  key={item.id}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="slide-card video-thumbnail"
                  onClick={() => recordUsage(type, item.id)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100px",
                      borderRadius: "6px",
                      objectFit: "cover"
                    }}
                  />
                  <span style={{ marginTop: "5px", fontSize: "14px", display: "block", textAlign: "center" }}>
                    {item.title}
                  </span>
                </a>
              );
            }

            return (
              <a
                key={item.id}
                href={item.url || item.link || item.file}
                target="_blank"
                rel="noreferrer"
                className="slide-card"
                onClick={() => recordUsage(type, item.id)}
              >
                {item.title}
              </a>
            );
          })}
        </div>
        <button className="arrow right" onClick={() => scroll(ref, "right")}>▶</button>
      </div>
    </div>
  );

  if (loading) return <div className="card">Loading lesson...</div>;
  if (error) return <div className="card">{error}</div>;

  return (
    <>
      <h1 className="lesson-title">{lesson.name}</h1>
      <hr className="lesson-line" />
      {videos.length > 0 && renderSection("▶️ Videos", videos, videoRef, "video")}
      {materials.length > 0 && renderSection("📘 Study Materials", materials, materialRef, "material", true)}
      {tests.length > 0 && renderSection("📝 Tests", tests, testRef, "test")}
    </>
  );
};

export default LessonDetail;
