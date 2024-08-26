import { React, useEffect, useState } from 'react';
import '../../assets/styles/inputs/InputDescription.css'
import { useTranslation } from 'react-i18next';
import FileUploadWithDragAndDrop from '../other/FileUploadWithDragAndDrop';


export default function InputDescription({ onFileChange, onStoryChange, typesDisallowed = [], value,valueFiles=[] }) {
    const { t } = useTranslation();
    const [fileList, setFileList] = useState([]);

    // Обновляем fileList при изменении valueFiles
    useEffect(() => {
        const updatedFiles = valueFiles.map((file) => {
            return {
                uid: file.name + '-' + file.lastModified,
                name: file.name,
                type: file.type,
                status: 'done',
                file,
                preview: file.type?.startsWith('image/') ? URL.createObjectURL(file) : null,
            };
        });
        setFileList(updatedFiles);
    }, [valueFiles]);

    const handleFileInputChange = (event) => {
        if (event.target && event.target.files) {
            const files = event.target.files;
            const newFilesArray = Array.from(files);
            const validatedFiles = newFilesArray.map(file => ({
                uid: file.name + '-' + file.lastModified,
                name: file.name,
                type: file.type,
                status: 'done',
                file,
                preview: file.type?.startsWith('image/') ? URL.createObjectURL(file) : null,
            }));

            const updatedFileList = [...fileList, ...validatedFiles];
            setFileList(updatedFileList);
            onFileChange(updatedFileList.map(f => f.file));
        }
    };

    
    return (
        <div class="story">
            <div className="attachment">
                <label htmlFor="image" className="input-file"></label>
                <input  type="file" name="image" id="image" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg" onChange={handleFileInputChange} multiple />
                <label htmlFor="video" className="input-file"></label>
                <input  type="file" name="video" id="video" accept=".mp4,.avi,.mov,.mkv,.flv,.wmv,.webm" onChange={handleFileInputChange} multiple />
                {typesDisallowed.includes("doc") ? <></> : <>
                    <label htmlFor="document" className="input-file"></label>
                    <input  type="file" name="document" id="document" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar" onChange={handleFileInputChange} multiple />
                </>}
                <FileUploadWithDragAndDrop
                    fileList={fileList}
                    setFileList={setFileList}
                    onFileChange={onFileChange} 
                    typesDisallowed={typesDisallowed}
                />
            </div>

            <textarea
                name="story" id="story"
                value={value}
                placeholder={t("add-story.placeholder.story-text")}
                onChange={onStoryChange}></textarea>

        </div>
    )
}