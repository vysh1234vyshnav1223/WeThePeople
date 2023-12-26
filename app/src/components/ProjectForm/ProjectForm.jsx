import React, { useState, useEffect } from 'react';
import ImagesUploader from '../ImagesUploader/ImagesUploader';
import './ProjectForm.css';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ProjectForm() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [fundingGoal, setFundingGoal] = useState('');
    const [duration, setDuration] = useState('');
    const [images, setImages] = useState([]);
    const [rewards, setRewards] = useState([{ title: '', description: '', minimumPledge: '', estimatedDelivery: '' }]);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get('/api/projects/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setDescription(data.description);
            setCategory(data.category);
            setFundingGoal(data.fundingGoal);
            setDuration(data.duration);
            setImages(data.images);
            setRewards(data.rewards);
        })
            .catch(error => {
                toast.error('Unexpected error occurred. Please try again later');
            })
    }, [id]);


    const isEditMode = !!id;

    const handleRewardFieldChange = (index, field, value) => {
        setRewards(prevRewards => {
            const newRewards = [...prevRewards];
            newRewards[index] = { ...newRewards[index], [field]: value };
            return newRewards;
        });
    };

    const handleAddReward = () => {
        setRewards(prevRewards => [
            ...prevRewards,
            { title: '', description: '', minimumPledge: '', estimatedDelivery: '' },
        ]);
    };


    const handleRemoveReward = (index) => {
        const updatedRewards = [...rewards];
        updatedRewards.splice(index, 1);
        setRewards(updatedRewards);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectData = {
            title, description, category, fundingGoal, duration, images, rewards,
        }
        if (id) {
            const resposne = await axios.put('api/projects/edit/:id', { id, ...projectData });
            setRedirect(true);
            toast.success('Project updated succesfully')
        } else {
            try {
                await axios.post('/api/projects/new', projectData);
                setRedirect(true);
                toast.success('Project created successfully');
            } catch (error) {
                toast.error('Unexpected error occurred. Try again later');
                throw error;
            }
        }
    };

    const handleDelete = async () => {
        try {
            if (!id) {
                toast.error('Project is not yet created');
                return;
            }

            const response = await axios.delete(`api/projects/delete/${id}`);
            if (response.status === 200) {
                toast.success('Project deleted successfully');
                setRedirect(true)
            } else {
                toast.error(response.data.error || 'Unexpected error occurred. Try again later');
            }
        } catch (error) {
            toast.error(error.response.data.error || 'Unexpected error occurred. Try again later');
        }
    }

    if (redirect) {
        return <Navigate to={'/projects'} />
    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <label className='form-label' htmlFor='title'>Title: </label>
                <input
                    type='text'
                    name='title'
                    id='title'
                    className='form-input'
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                    required
                />
                <br />
                <label className='form-label' htmlFor='description'>Description: </label>
                <input
                    type='text'
                    name='description'
                    id='description'
                    className='form-input'
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                    required
                />
                <br />

                <label className='form-label' htmlFor='category'>Category: </label>
                <select
                    name='category'
                    className='form-input'
                    value={category}
                    onChange={ev => setCategory(ev.target.value)}
                    required
                >
                    <option value=''>Select a category</option>
                    <option value='Technology'>Technology</option>
                    <option value='Art'>Art</option>
                    <option value='Music'>Music</option>
                    <option value='comics'>Comics</option>
                    <option value='design'>Design</option>
                    <option value='food'>Food</option>
                    <option value='photography'>Photography</option>
                </select>
                <br />

                <label className='form-label' htmlFor='fundingGoal'>Funding Goal(in $): </label>
                <input
                    type='number'
                    name='fundingGoal'
                    id='fundingGoal'
                    className='form-input'
                    min='0'
                    value={fundingGoal}
                    onChange={ev => setFundingGoal(ev.target.value)}
                    required
                />
                <br />

                {!isEditMode && (
                    <div>
                        <label className='form-label' htmlFor='duration'>Duration (in Days): </label>
                        <p className='preInput-text'>The duration of the project cannot be changed once set. This is
                            to maintain accountability and transperancy between the creators and the backers.
                        </p>
                        <input
                            type='number'
                            name='duration'
                            id='duration'
                            className='form-input'
                            min='0'
                            value={duration}
                            onChange={ev => setDuration(ev.target.value)}
                            required
                        />
                        <br />
                    </div>
                )}
                <label className='form-label' htmlFor='images'>Images: </label>
                <ImagesUploader addedImages={images} onChange={setImages} />
                <br />

                <div>
                    <label className='form-label reward-heading'>Reward Tiers:</label>
                    {rewards.map((reward, index) => (
                        <div key={index} className='reward-container'>
                            <label className='form-label'>Reward Title: </label>
                            <input
                                type='text'
                                name='title'
                                className='form-input'
                                value={reward.title}
                                onChange={ev => handleRewardFieldChange(index, 'title', ev.target.value)}
                            />
                            <br />
                            <label className='form-label'>Reward Description:</label>
                            <textarea
                                name='description'
                                cols='50'
                                rows='5'
                                className='form-input'
                                value={reward.description}
                                onChange={ev => handleRewardFieldChange(index, 'description', ev.target.value)}
                            />
                            <br />
                            <label className='form-label'>Minimum Pledge(in $):</label>
                            <input
                                type='number'
                                name='minimumPledge'
                                className='form-input'
                                min='0'
                                value={reward.minimumPledge}
                                onChange={ev => handleRewardFieldChange(index, 'minimumPledge', ev.target.value)}
                            />
                            <br />
                            <label className='form-label'>Estimated Delivery (in Days): </label>
                            <input
                                type='number'
                                name='estimatedDelivery'
                                className='form-input'
                                value={reward.estimatedDelivery}
                                onChange={ev => handleRewardFieldChange(index, 'estimatedDelivery', ev.target.value)}
                            />
                            <br />
                            {index > 0 && (
                                <button
                                    type='button'
                                    className='remove-button'
                                    onClick={() => handleRemoveReward(index)}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type='button'
                        className='add-reward-button'
                        onClick={handleAddReward}
                    >
                        Add More Reward Tiers
                    </button>
                    <br />
                    {!!isEditMode && (
                        <button
                            type='button'
                            className='delete-button'
                            onClick={handleDelete}
                        >
                            Delete Project
                        </button>)}
                </div>
                <button type='submit' className='submit-button'>{isEditMode ? 'Update Project' : 'Create Project'}</button>
            </form>
        </div>
    )

}