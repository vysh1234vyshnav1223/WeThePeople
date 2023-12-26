import React, { useState } from 'react';
import './ProjectPayment.css';
import axios from 'axios';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ProjectPayment({ selectedPledge, projectId }) {
    const [loading, setLoading] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const paymentData = {
            cardNumber,
            cardholderName,
            expiryDate,
            cvv,
            amount: selectedPledge.minimumPledge,
        };

        try {
            const response = await axios.post('/api/projects/pledge/' + projectId, paymentData);
            setCardNumber('');
            setCardholderName('');
            setExpiryDate('');
            setCVV('');
            setLoading(false);
            toast.success('Payment Successful');
        } catch (error) {
            setLoading(false);
            if (error.response) {
                toast.error(error.response.data.errors ? error.response.data.errors[0].msg : error.response.data.error);
            } else if (error.request) {
                toast.error('No response from the server. Please try again.');
            } else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        }
    }


    return (
        <div className='project-payment-container'>
            <div className='project-payment-heading'>
                <h4> Rewards {`>`} <span> Payment</span></h4>
                <h3>Pledge Summary</h3>
                <p>
                    We won't charge you at this time. If the project
                    reaches its funding goal, your payment method will be
                    charged when the campaign ends.
                </p>
            </div>
            <div className='payment-box'>
                {loading ? (
                    <LoadingIcon />
                ) : (
                    <div className='pledge-payment-summary'>
                        <h4>Pledge {selectedPledge.minimumPledge}$</h4>
                        <h4>{selectedPledge.title}</h4>
                        <p>
                            {selectedPledge.description}
                        </p>
                        <h5>Estimated Delivery: <br /><span>{selectedPledge.estimatedDelivery}</span></h5>
                    </div>

                )}
                <div className='pledge-payment-card-details'>
                    <h2>Add a payment method</h2>
                    <div className='pledge-payment-card-container'>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Card Number:
                                <input
                                    type='text'
                                    value={cardNumber}
                                    onChange={ev => setCardNumber(ev.target.value)}
                                    placeholder='1234 5678 9012 3456'
                                    maxLength='16'
                                    required
                                />
                            </label>

                            <label>
                                Cardholder Name:
                                <input
                                    type='text'
                                    value={cardholderName}
                                    onChange={ev => setCardholderName(ev.target.value)}
                                    placeholder='John Doe'
                                    required
                                />
                            </label>

                            <div className='form-row'>
                                <label>
                                    Expiry Date:
                                    <input
                                        className='pledge-expiry'
                                        type='text'
                                        value={expiryDate}
                                        onChange={ev => setExpiryDate(ev.target.value)}
                                        placeholder='MM/YY'
                                        maxLength='5'
                                        required
                                    />
                                </label>

                                <label>
                                    CVV:
                                    <input
                                        className='pledge-cvv'
                                        type='text'
                                        value={cvv}
                                        onChange={ev => setCVV(ev.target.value)}
                                        placeholder='123'
                                        maxLength='3'
                                        required
                                    />
                                </label>
                            </div>

                            <button type='submit' className='pledge-submit-button'>Submit</button>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}