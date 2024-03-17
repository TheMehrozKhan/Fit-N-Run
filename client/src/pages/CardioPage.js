import React, { useState } from "react";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';
import cardioImg from "../images/cardioImg.jpg";
import { Container } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_CARDIO } from "../utils/mutations";

const Cardio = () => {
    const [cardio, setCardio] = useState('');
    const [cardioDuration, setCardioDuration] = useState(0);
    const [cardioDistance, setCardioDistance] = useState(0);
    const [date, setDate] = useState('');
    const [saveCardio, { error, data }] = useMutation(ADD_CARDIO);

    const handleCardioChange = (e) => {
        setCardio(e.target.value);
    };

    const handleCardioDurationChange = (e) => {
        const value = parseInt(e.target.value);
        setCardioDuration(value > 0 ? value : 0); // If value is negative, set it to 0
    };

    const handleCardioDistanceChange = (e) => {
        const value = parseInt(e.target.value);
        setCardioDistance(value > 0 ? value : 0); // If value is negative, set it to 0
    };

    const handleDateChange = (selectedDates) => {
        setDate(selectedDates[0]);
    };

    const handleCardioSubmit = async (e) => {
        e.preventDefault();
        const { data } = await saveCardio({
            variables: {
                input: {
                    name: cardio,
                    distance: cardioDistance,
                    duration: cardioDuration,
                    date: date
                }
            }
        });

        setCardio('');
        setCardioDuration(0); // Resetting to default value
        setCardioDistance(0); // Resetting to default value
        setDate('');
    };

    return (
        <div className="cardioImg" style={{ backgroundImage: `url(${cardioImg})` }}>
            <Container className="cardioContainer">
                <div className='cardioForm'>
                    <h1 className="cardioTitle"> Cardio </h1>
                    <form onSubmit={handleCardioSubmit}>
                        <div className="form-group">
                            <label>Activity:</label>
                            <input type="text" className="form-control" placeholder="Hiking" value={cardio} onChange={handleCardioChange} />
                        </div>
                        <div className="form-group">
                            <label>Duration (Minutes):</label>
                            <input type="number" className="form-control" placeholder="30" value={cardioDuration} onChange={handleCardioDurationChange} />
                        </div>
                        <div className="form-group">
                            <label>Distance (Miles):</label>
                            <input type="number" className="form-control" placeholder="3" value={cardioDistance} onChange={handleCardioDistanceChange} />
                        </div>
                        <div className="form-group label">
                            <label>Date:</label>
                            <Flatpickr
                                className="form-control"
                                value={date}
                                options={{ dateFormat: 'm/d/Y' }}
                                onChange={handleDateChange}
                                placeholder="Enter Your Date"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </Container>
        </div >
    );
};

export default Cardio;