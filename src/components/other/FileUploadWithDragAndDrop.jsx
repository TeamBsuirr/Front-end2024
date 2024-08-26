import React, { useEffect, useState } from 'react';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { notification } from 'antd';

// SVG for removing files
const RemoveIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// DraggableUploadListItem component
const DraggableUploadListItem = ({ originNode, file, onRemove }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: file.uid,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: 'move',
        borderColor: file.status === 'error' ? 'red' : 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px',
        marginBottom: '4px',
        marginTop: '14px',
        backgroundColor: '#E0CDB4',
        border: '1px solid #1F1B16',
        borderRadius: '4px',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={isDragging ? 'is-dragging' : ''}
            {...attributes}
            {...listeners}
        >
            <div style={{ display: 'flex', gap:'4px', alignItems: 'center' }}>
            <svg viewBox="64 64 896 896" focusable="false" data-icon="paper-clip" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z"></path></svg>
                {file.name}
            </div>
            <button onClick={() => onRemove(file.uid)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                <RemoveIcon />
            </button>
        </div>
    );
};

// FileUploadWithDragAndDrop component
const FileUploadWithDragAndDrop = ({ fileList, setFileList, onFileChange, typesDisallowed }) => {
    const [previewFiles, setPreviewFiles] = useState([]);
    
    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    useEffect(() => {
        const newPreviewFiles = fileList.map(file => {
            if (!file.preview && file.type?.startsWith('image/')) {
                return {
                    ...file,
                    preview: URL.createObjectURL(file.file),
                };
            }
            return file;
        });
    
        setPreviewFiles(newPreviewFiles);
    }, [fileList]);

    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            const reorderedFiles = arrayMove(
                fileList,
                fileList.findIndex(i => i.uid === active.id),
                fileList.findIndex(i => i.uid === over?.id)
            );
            setFileList(reorderedFiles);
            onFileChange(reorderedFiles.map(file => file.file));
        }
    };

    const handleRemove = (uid) => {
        const updatedFiles = fileList.filter(file => file.uid !== uid);
        setFileList(updatedFiles);
        onFileChange(updatedFiles.map(file => file.file));
    };

    const handleFileInputChange = (event) => {
        if (event.target && event.target.files) {
            const files = Array.from(event.target.files);
            console.log('Files:', files);
            const newFiles = files.map((file) => ({
                uid: file.name + '-' + file.lastModified,
                name: file.name,
                type: file.type,
                file,
                preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
                status: 'done',
            }));
            console.log('New Files:', newFiles);
            const validatedFiles = newFiles.map(validateFiles);
            console.log('Validated Files:', validatedFiles);
            setFileList(prevFiles => [...prevFiles, ...validatedFiles]);
            setPreviewFiles(prevFiles => [...prevFiles, ...newFiles.filter(file => file.preview)]);
            onFileChange([...fileList, ...validatedFiles].map(file => file.file));
        }
    };

    const validateFiles = (file) => {
        const fileType = file.type;
        if (typesDisallowed.includes(fileType)) {
            notification.error({
                message: `Invalid file type: ${file.name}`,
                description: `The file type ${fileType} is not allowed.`,
            });
            return {
                ...file,
                status: 'error',
            };
        }
        return file;
    };

    return (
        <div>
            <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.svg,.mp4,.avi,.mov,.mkv,.flv,.wmv,.webm,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar"
                multiple
                onChange={handleFileInputChange}
                style={{ marginBottom: '10px' }}
            />
            <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                <SortableContext items={fileList.map(i => i.uid)} strategy={verticalListSortingStrategy}>
                    <div className="sortable-file-list">
                        {fileList.map((file) => (
                            <DraggableUploadListItem
                                key={file.uid}
                                originNode={<div>{file.name}</div>}
                                file={file}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default FileUploadWithDragAndDrop;
