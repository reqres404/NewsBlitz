import "./Feedback.css";

const Feedback = () => {
  return (
    <div className="feedback-container">
      
      <iframe
        className="feedback-form"
        src="https://docs.google.com/forms/d/e/1FAIpQLSfXwQYruUpHZpm6C5PczADMfBynbpI6vQ6rJfcjmZr_nssHnw/viewform?embedded=true"
        title="Feedback Form"
      >
        Loading…
      </iframe>
    </div>
  );
};

export default Feedback;
