import './ProjectPledgeContainer.css';

export default function ProjectPledgeContainer({ onPledgeClick, rewards }) {
    const handlePledgeClick = (selectedReward) => {
        onPledgeClick(selectedReward);
    }
    return (
        <div className='pledge-project-rewards-container'>
            <div className='pledge-project-rewards-heading'>
                <h4> <span>Rewards </span>{`>`}  Payment </h4>
                <h3>Select your Reward</h3>
                <p>Select an option below</p>
            </div>
            {rewards.map((reward, index) => (
                <div key={index} className='pledge-project-rewards'>
                    <h4>Pledge US$ {reward.minimumPledge}</h4>
                    <h4>{reward.title}</h4>
                    <p>
                        {reward.description}
                    </p>
                    <h5>Estimated Delivery: <br /><span>{reward.estimatedDelivery} days</span></h5>
                    <button onClick={() => handlePledgeClick(reward)}>Pledge US$ {reward.minimumPledge}</button>
                </div>
            ))};
        </div>
    )
}