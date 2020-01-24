// @flow
import { useState, useEffect, useRef } from 'react';

type uploadingProps = {
    status: boolean,
    progress: number,
    file?: string,
    response?: string
}

const useSimulateUploading = () => {
    const timerRef = useRef<IntervalID | null>(null);
    const [uploading, setUploading] = useState<uploadingProps>({ 
        status: false, 
        progress: 0
    });

    const startUploading = (file: string) => {
        setUploading(prevState => ({ ...prevState, progress: 0, status: true, file }));
        timerRef.current = setInterval(() => {
            setUploading(prevState => ({ 
                ...prevState, 
                progress: prevState.progress + 1 
            }));
        }, 50)
    };

     const cancelUploading = () => {
        clearInterval(timerRef.current);
        setUploading(prevState => ({ ...prevState, status: false, progress: 0 }));
    };

    useEffect(() => {
        if (uploading.progress >= 100) {
            clearInterval(timerRef.current);
            setUploading({ status: false, progress: 0, response: uploading.file });
        }
    }, [uploading])

    useEffect(() => {
        return () => {
            clearInterval(timerRef.current);
        }
    }, [])

    return [uploading, { startUploading, cancelUploading }];
}

export default useSimulateUploading;