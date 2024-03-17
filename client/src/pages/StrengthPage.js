import React, { useState } from "react";
import strengthBg from "../images/strengthImg.jpg";
import { Container } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_STRENGTH } from "../utils/mutations";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';

const Strength = () => {
    const [activity, setActivity] = useState('');
    const [customActivity, setCustomActivity] = useState(''); // State variable for custom activity
    const [reps, setReps] = useState();
    const [sets, setSets] = useState();
    const [weight, setWeight] = useState();
    const [date, setDate] = useState(new Date()); // Set default date to today
    const [saveStrength, { error }] = useMutation(ADD_STRENGTH);

    const handleActivityChange = (e) => {
        const selectedActivity = e.target.value;
        setActivity(selectedActivity);
        if (selectedActivity !== "Custom") {
            setCustomActivity(''); // Reset custom activity when selecting a predefined activity
        }
    };

    const handleCustomActivityChange = (e) => {
        setCustomActivity(e.target.value);
    };

    const handleRepsChange = (e) => {
        const value = parseInt(e.target.value);
        setReps(value > 0 ? value : 1); // If value is negative, set it to 1
    };

    const handleSetsChange = (e) => {
        const value = parseInt(e.target.value);
        setSets(value > 0 ? value : 1); // If value is negative, set it to 1
    };

    const handleWeightChange = (e) => {
        const value = parseInt(e.target.value);
        setWeight(value > 0 ? value : ''); // If value is negative, set it to empty string
    };

    const handleDateChange = (selectedDates) => {
        setDate(selectedDates[0]);
    };

    const handleStrengthSubmit = async (e) => {
        e.preventDefault();
        const selectedActivity = activity === "Custom" ? customActivity : activity;
        const { data } = await saveStrength({
            variables: {
                input: {
                    name: selectedActivity,
                    reps: reps,
                    sets: sets,
                    weight: weight,
                    date: date
                }
            }
        });

        setActivity('');
        setCustomActivity(''); // Reset custom activity
        setReps(''); // Resetting to default value
        setSets(''); // Resetting to default value
        setWeight(''); // Resetting to default value
        setDate(new Date()); // Reset date to today
    };

    return (
        <div className="strengthImg" style={{ backgroundImage: `url(${strengthBg})` }}>
            <Container className="strengthContainer">
                <div className="strengthForm">
                    <h1 className="strengthTitle"> Strength Training </h1>
                    <form onSubmit={handleStrengthSubmit}>
                        <div className="form-group label">
                            <label>Activity:</label>
                            <select className="form-control" value={activity} onChange={handleActivityChange}>
                                <option value="">Select an activity...</option>
                                <option value="Push-ups">Push-ups</option>
                                <option value="Pull-ups">Pull-ups</option>
                                <option value="Squats">Squats</option>
                                <option value="Deadlifts">Deadlifts</option>
                                <option value="Bench Press">Bench Press</option>
                                <option value="Custom">Custom</option>
                            </select>
                            {activity === "Custom" && (
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    placeholder="Enter custom activity"
                                    value={customActivity}
                                    onChange={handleCustomActivityChange}
                                />
                            )}
                        </div>
                        <div className="form-group label">
                            <label>Reps:</label>
                            <input type="number" className="form-control" placeholder="15" value={reps} onChange={handleRepsChange} />
                        </div>
                        <div className="form-group label">
                            <label>Sets:</label>
                            <input type="number" className="form-control" placeholder="3" value={sets} onChange={handleSetsChange} />
                        </div>
                        <div className="form-group label">
                            <label>Weight (Optional):</label>
                            <input type="number" className="form-control" placeholder="45" value={weight} onChange={handleWeightChange} />
                        </div>
                        <div className="form-group label">
                            <label>Date:</label>
                            <Flatpickr
                                className="form-control"
                                value={date}
                                options={{ dateFormat: 'm/d/Y' }}
                                onChange={handleDateChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Strength;