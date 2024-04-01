import React, { useState, useEffect } from 'react';
import weights from '../images/weights.png';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyCoEo2YV5HCOkBJbR9B8Efw9qzMC0ECpVo');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const ExerciseList = () => {
  const [muscle, setMuscle] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setMuscle(e.target.value);
    setError(null); // Clear any previous errors on input 
  };


  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const prompt = `Provide a description of exercises targeting the muscle group: ${muscle}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setResponse(text);
    } catch (error) {
      // ...error handling...
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="exerciseBg" style={{ backgroundImage: `url(${weights})` }}>
      <div className="exerciseContainer">
        <div>
          <h1 className="exerciseHeader">Exercises From - FitNRun AI</h1>
          <div>
            <input
              className="exercise-input"
              type="text"
              placeholder="Enter a Muscle Group"
              value={muscle}
              onChange={handleInputChange}
            />
            <button className="exercise-btn" onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Search'}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
          {response && (
      <div className="exercise-response">
        <h2 style={{marginBottom:`20px`, marginTop:`12px`}}>Exercises for {muscle}</h2>
        <div dangerouslySetInnerHTML={{
          __html: response
            .replace(/\*\b(.+?)\b\*/g, '<b>$1</b>') // Replace bold formatting
            .replace(/\*/g, '') // Remove remaining asterisks
            .split('\n\n')
            .map((item) => `<p>${item.trim()}</p>`)
            .join('')
        }} />
      </div>
    )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseList;