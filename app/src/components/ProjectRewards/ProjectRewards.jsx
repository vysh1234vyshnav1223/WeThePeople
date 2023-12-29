import React from 'react';
import './ProjectRewards.css';
import { useNavigate } from 'react-router-dom';


export default function ProjectRewards({ projectDetails }) {
  const navigate = useNavigate();
  const rewards = projectDetails.rewards;

  const handleButtonClick = () => {
    navigate('/project/pledge/' + projectDetails._id, { state: { projectDetails: projectDetails } })

  }

  return (
    <div>
      <div className='rewards-box'>
        <div className='available-rewards-container'>
          <h2>Available Rewards</h2>
          {rewards.map((reward, index) => (
            <div key={index} className='reward-preview'>
              <h4>{reward.title}</h4>
              <p>US$ {reward.minimumPledge}</p>
            </div>
          ))}
        </div>
        <div className='reward-boxes-container'>
          {rewards.map((reward, index) => (
            <div key={index} className='reward-details'>
              <div className='reward-info'>
                <h2>{reward.title}</h2>
                <p>{reward.description}</p>
                <h4>Get it in {reward.estimatedDelivery} days</h4>
              </div>
              <div className='reward-pledge'>
                <p>Minimum Pledge: US$ {reward.minimumPledge}</p>
                <button onClick={handleButtonClick}>Pledge</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
