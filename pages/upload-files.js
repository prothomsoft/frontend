import {useState} from 'react'
import {uploadFiles} from '../api/api';

const UploadFiles = () => {
    const [files, setFiles] = useState('');
    const [progress, setProgress] = useState(0);

    const uploadFilesOnChange = (e) => {
        setFiles(e.target.files);        
    }

    const filesOptions = {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setProgress(percentage);
        }
    }

    const uploadFilesOnClick = async () => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);                      
        }
        await uploadFiles(formData, filesOptions)
    }

    return <div>
        <h1>Upload Files Progress {progress}</h1>
        <input type="file" multiple onChange={(e) => uploadFilesOnChange(e)} />
        <button type="button" onClick={() => uploadFilesOnClick()} >Upload</button>        
    </div>
}

export default UploadFiles;