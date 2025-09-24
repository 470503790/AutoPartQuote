import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { InquiryApiService } from '../services/inquiryApi';
import { ExcelParser } from '../utils/excelParser';
import { FileUploadResponse, FileType, ParsedPart } from '../types/inquiry';

interface FileUploadProps {
  onUploadSuccess: (uploadResponse: FileUploadResponse, parsedParts?: ParsedPart[]) => void;
  onUploadError: (error: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess, onUploadError }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const isExcelFile = (file: File): boolean => {
    const excelTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    const excelExtensions = ['.xlsx', '.xls'];
    
    return excelTypes.includes(file.type) || 
           excelExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  };

  const validateFile = (file: File): string | null => {
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return 'File size must be less than 10MB';
    }

    // Check file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/bmp',
      'image/gif'
    ];

    const allowedExtensions = ['.xlsx', '.xls', '.pdf', '.jpg', '.jpeg', '.png', '.bmp', '.gif'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      return 'Unsupported file type. Please upload Excel, PDF, or image files.';
    }

    return null;
  };

  const handleFileUpload = async (file: File, description?: string) => {
    const validationError = validateFile(file);
    if (validationError) {
      onUploadError(validationError);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      if (isExcelFile(file)) {
        // Handle Excel files locally
        setUploadProgress(30);
        
        try {
          const parseResult = await ExcelParser.parseFile(file);
          setUploadProgress(80);
          
          if (parseResult.errors.length > 0) {
            console.warn('Excel parsing warnings:', parseResult.errors);
          }
          
          // Create a mock upload response for Excel files
          const mockResponse: FileUploadResponse = {
            taskId: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            fileType: FileType.Excel,
            fileName: file.name,
            fileSize: file.size,
            status: 'Completed' as any,
            createdAt: new Date().toISOString(),
            message: 'Excel file processed locally'
          };
          
          setUploadProgress(100);
          onUploadSuccess(mockResponse, parseResult.parts);
        } catch (parseError) {
          onUploadError(`Failed to parse Excel file: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
        }
      } else {
        // Handle PDF/Image files via backend API
        setUploadProgress(20);
        
        const uploadResponse = await InquiryApiService.uploadFile(file, description);
        setUploadProgress(100);
        
        onUploadSuccess(uploadResponse);
      }
    } catch (error) {
      onUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      handleFileUpload(file);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled: isUploading,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/bmp': ['.bmp'],
      'image/gif': ['.gif']
    }
  });

  return (
    <div className="file-upload-container">
      <div
        {...getRootProps()}
        className={`file-upload-dropzone ${isDragActive ? 'drag-active' : ''} ${isUploading ? 'uploading' : ''}`}
        style={{
          border: '2px dashed #ccc',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          backgroundColor: isDragActive ? '#f0f8ff' : '#fafafa',
          transition: 'all 0.3s ease'
        }}
      >
        <input {...getInputProps()} />
        
        {isUploading ? (
          <div>
            <div style={{ fontSize: '18px', marginBottom: '16px' }}>
              上传中... {uploadProgress}%
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#e0e0e0', 
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div 
                style={{
                  width: `${uploadProgress}%`,
                  height: '100%',
                  backgroundColor: '#1976d2',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '48px', marginBottom: '16px', color: '#666' }}>
              📁
            </div>
            <div style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>
              {isDragActive ? '释放文件以上传' : '拖拽文件到此处或点击选择'}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              支持 Excel (.xlsx, .xls)、PDF (.pdf)、图片 (.jpg, .png, .bmp, .gif)
            </div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
              最大文件大小：10MB
            </div>
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
        <h4>文件处理说明：</h4>
        <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
          <li><strong>Excel 文件</strong>：本地即时解析，支持自动识别零件号、名称、品牌、数量等列</li>
          <li><strong>PDF/图片文件</strong>：上传到服务器进行 OCR 识别和解析</li>
          <li>解析完成后可以预览、编辑和确认零件清单</li>
          <li>支持模糊匹配的零件需要人工确认</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;