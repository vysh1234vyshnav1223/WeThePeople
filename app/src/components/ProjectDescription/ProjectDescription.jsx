import './ProjectDescription.css';


export default function ProjectDescription({ description, name, bio }) {
    return (
        <div className='description-box'>
            <div className='description-container'>
                <h2>Story</h2>
                <p> {description}</p>
            </div>
            <div className='description-user-profile'>
                <div className='user-profile-box'>
                    <h2>Creator Details</h2>
                    <h3>{name}</h3>
                    <p>{bio}</p>
                </div>
            </div>

        </div>
    )
}