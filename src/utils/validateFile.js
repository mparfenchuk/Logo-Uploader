// @flow
const validateFile = (
    file: File, 
    startUploading: (file: string) => void
) => {
    if (!file) return false;

    const supportedFilesTypes = ['image/jpeg', 'image/png'];
    const { type } = file;
    
    if (supportedFilesTypes.indexOf(type) === -1) {
        alert('Logo should be png or jpeg file format');
        return false;
    } else {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                const height = this.height;
                const width = this.width;
                if (height !== 100 || width !== 100) {
                    alert('Logo should be square, 100px size');
                    return false;
                }
                return startUploading(e.target.result);
            };
        };
        reader.readAsDataURL(file);
    }
}

export default validateFile;