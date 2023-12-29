import React from 'react';
import './LoadingIcon.css';

export default function LoadingIcon() {
    return (
        <div className='loadingIcon'>
            <video autoPlay loop muted width='100' height='100' className='loadingIcon-video'>
                <source src={'https://wethepeople-project.onrender.com/uploads/videos/loadingIcon.webm'} type='video/mp4' />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}