import './ImagesUploader.css';
import axios from 'axios';

export default function ImagesUploader({ addedImages, onChange }) {

    function uploadImage(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('images', files[i]);
        }
        axios.post('api/upload/', data, {
            headers: { 'content-type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            onChange(prev => {
                return [...prev, ...filenames];
            })
        })
    }

    function removeImage(ev, filename) {
        ev.preventDefault();
        onChange([...addedImages.filter(photo => photo !== filename)]);
    }

    function selectAsMainImage(ev, filename) {
        ev.preventDefault();
        onChange([filename, ...addedImages.filter(photo => photo !== filename)]);
    }

    return (
        <>
            <div className='images-container'>
                {addedImages.length > 0 && addedImages.map(link => (
                    <div key={link} className='image-item'>
                        <img src={'https://wethepeople-project.onrender.com/uploads/' + link} alt='' />
                        <button onClick={ev => removeImage(ev, link)} className='remove-btn'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'>
                                <path stroke-linecap='round' stroke-linejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' />
                            </svg>
                        </button>
                        <button onClick={ev => selectAsMainImage(ev, link)} className='select-main-photo-btn'>
                            {link === addedImages[0] && (
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
                                    <path fill-rule='evenodd' d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' clip-rule='evenodd' />
                                </svg>
                            )}
                            {link !== addedImages[0] && (
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'>
                                    <path stroke-linecap='round' stroke-linejoin='round' d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.527a.563.563 0 00-.182.557l1.257 5.273a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.257-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' />
                                </svg>
                            )}
                        </button>
                    </div>
                ))}
                <label className='upload-photo-btn'>
                    <input type='file' multiple className='hidden' onChange={uploadImage} />
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='upload-icon'>
                        <path stroke-linecap='round' stroke-linejoin='round' d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z' />
                    </svg>
                    Upload
                </label>
            </div>
        </>
    )
}
