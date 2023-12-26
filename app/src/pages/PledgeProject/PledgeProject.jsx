import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import ProjectPledgeContainer from '../../components/ProjectPledgeContainer/ProjectPledgeContainer';
import './PledgeProject.css';
import ProjectPayment from '../../components/ProjectPayment/ProjectPayment';
import { useLocation, useParams } from 'react-router-dom';


export default function PledgeProject() {
    const { id } = useParams()
    const location = useLocation();
    const {state} = location;
    const [showPaymentComponent, setshowPaymentComponent] = useState(false);
    const [selectedPledge, setSelectedPledge] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const handlePledgeClick = (reward) => {
        setshowPaymentComponent(true);
        setSelectedPledge(reward);
    }

    return (
        <div>
            <Layout>
            <div className='pledge-container'>
                <div className='pledge-project-details'>
                    <h2>{state.projectDetails.title}</h2>
                    <p>By {state.projectDetails.creator.name}</p>
                </div>
                {showPaymentComponent ? (
                    <ProjectPayment selectedPledge={selectedPledge} projectId={id}/>
                ) : (
                    <div>
                        <ProjectPledgeContainer onPledgeClick={handlePledgeClick} rewards={state.projectDetails.rewards} />
                        <div className='pledge-conditions'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                                <path stroke-linecap='round' stroke-linejoin='round' d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z' />
                            </svg>
                            <h3>Rewards aren't guaranteed</h3>
                            <p>
                                When considering your pledge, please be aware that you're
                                supporting an ambitious creative project still in development.
                                While the creator is committed to delivering on their promises,
                                it's important to acknowledge the inherent risk involved. Factors
                                beyond the creator's control may impact the fulfillment of rewards.
                                We encourage you to carefully assess this risk before deciding to pledge.
                                Your understanding and consideration are greatly appreciated.
                            </p>
                        </div>
                    </div>

                )}

            </div>
            </Layout>
        </div>
    )
}