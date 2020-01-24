// @flow
import React, { useRef, useState } from 'react';

import ProgressBarWithLogo from '../components/ProgressBarWithLogo';

import useSimulateUploading from '../hooks/useSimulateUploading';
import validateFile from '../utils/validateFile';

import './App.scss';

const App = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const [uploading, { startUploading, cancelUploading }] = useSimulateUploading();

    const onDragEnter = e => {
        e.preventDefault();
        setDragging(true);
    }

    const onDragLeave = e => {
        e.preventDefault();
        setDragging(false);
    }

    const onDragOver = e => e.preventDefault();

    const onDrop = e => {
        e.preventDefault();
        setDragging(false);
        if (uploading.status) return;

        validateFile(e.dataTransfer.files[0], startUploading);
    };

    const openFileDialog = () => {
        if(inputRef.current) {
            inputRef.current.value = '';
            inputRef.current.click();
        }
    };

    const onChangeFile = e => {
        e.preventDefault();
        if (uploading.status) return;
        
        validateFile(e.target.files[0], startUploading);
    }

    return (
        <div className="card">
            <div className="header">
                <div className="header__title">
                    Company logo
                </div>
                <div className="header__subtitle">
                    Logo should be square, 100px size and in png, jpeg file format.
                </div>
            </div>
            <div className="divider" />
            <div 
                onDragEnter={onDragEnter} 
                onDragOver={onDragOver} 
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`uploading-area${dragging ? ' uploading-area--active' : ''}`}
            >
                <div className={`uploading-content${dragging ? ' uploading-content--active' : ''}`}>
                    <ProgressBarWithLogo
                        logo={uploading.response}
                        percentage={uploading.progress}
                    />
                    <span className="uploading-content__text">
                        {uploading.status ? 'Uploading' : uploading.response ? 'Drag & drop here to replace' : 'Drag & drop here'}
                    </span>
                    <span className="uploading-content__or">
                        - or -
                    </span>
                    <span 
                        className="uploading-content__link"
                        onClick={uploading.status ? cancelUploading : openFileDialog}
                    >
                        {uploading.status ? 'Cancel' : uploading.response ? 'Select file to replace' : 'Select file to upload'}
                    </span>
                    <input 
                        ref={inputRef} 
                        type="file" 
                        id="file" 
                        className="uploading-content__input"
                        onChange={onChangeFile}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
