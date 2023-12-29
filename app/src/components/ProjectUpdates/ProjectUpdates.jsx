import './ProjectUpdates.css';

export default function ProjectUpdates({ updates }) {
    const reversedUpdates = [...updates].reverse();

    return (
        <div>
            {updates.length === 0 ? (
                <div className='no-updates-message'>
                    <p>No updates available at the moment.</p>
                </div>
            ) : (
                <div className='project-updates-container'>
                    {reversedUpdates.map((update, index) => (
                        <div key={index} className='project-update'>
                            <h2>{update.title}</h2>
                            <div className='project-update-user'>
                                <img src='' alt='' />
                                <p>{new Date(update.createdAt).toLocaleDateString()}</p>
                            </div>
                            <p className='project-update-description'>
                                {update.message}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}