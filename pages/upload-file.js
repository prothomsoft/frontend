import {useState} from 'react'
import {uploadFile} from '../api/api';

const UploadFile = () => {
    const [file, setFile] = useState('');
    const [progress, setProgress] = useState(0);

    const uploadFileOnChange = (e) => {
        setFile(e.target.files[0]);       
    }

    const fileOptions = {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setProgress(percentage);
        }
    }

    const uploadFileOnClick = async () => {
        const formData = new FormData();
        formData.append('file', file);
        await uploadFile(formData, fileOptions)
    }

    return <div>
        <h1>Upload File Progress {progress}</h1>
        <input type="file" onChange={(e) => uploadFileOnChange(e)} />
        <button type="button" onClick={() => uploadFileOnClick()} >Upload</button>        
    </div>
}

export default UploadFile;