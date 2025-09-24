import React, { useState } from 'react';
import FileUpload from './FileUpload';
import PartsTable from './PartsTable';
import FuzzyMatchDialog from './FuzzyMatchDialog';
import TaskStatus from './TaskStatus';
import { FileUploadResponse, ParsedPart, UploadTaskStatus, InquirySubmissionRequest } from '../types/inquiry';
import { InquiryApiService } from '../services/inquiryApi';

interface BatchInquiryState {
  currentTask: FileUploadResponse | null;
  parsedParts: ParsedPart[];
  selectedFuzzyPart: ParsedPart | null;
  showFuzzyDialog: boolean;
  isSubmitting: boolean;
  submissionResult: string | null;
  error: string | null;
}

const BatchInquiry: React.FC = () => {
  const [state, setState] = useState<BatchInquiryState>({
    currentTask: null,
    parsedParts: [],
    selectedFuzzyPart: null,
    showFuzzyDialog: false,
    isSubmitting: false,
    submissionResult: null,
    error: null
  });

  const handleUploadSuccess = (uploadResponse: FileUploadResponse, parsedParts?: ParsedPart[]) => {
    setState(prev => ({
      ...prev,
      currentTask: uploadResponse,
      parsedParts: parsedParts || [],
      error: null,
      submissionResult: null
    }));
  };

  const handleUploadError = (error: string) => {
    setState(prev => ({
      ...prev,
      error: error,
      currentTask: null,
      parsedParts: []
    }));
  };

  const handleTaskCompleted = (results: ParsedPart[]) => {
    setState(prev => ({
      ...prev,
      parsedParts: results
    }));
  };

  const handleTaskError = (error: string) => {
    setState(prev => ({
      ...prev,
      error: error
    }));
  };

  const handlePartUpdate = (updatedPart: ParsedPart) => {
    setState(prev => ({
      ...prev,
      parsedParts: prev.parsedParts.map(part => 
        part.rowIndex === updatedPart.rowIndex ? updatedPart : part
      )
    }));
  };

  const handlePartDelete = (rowIndex: number) => {
    setState(prev => ({
      ...prev,
      parsedParts: prev.parsedParts.filter(part => part.rowIndex !== rowIndex)
    }));
  };

  const handleShowFuzzyMatchDialog = (part: ParsedPart) => {
    setState(prev => ({
      ...prev,
      selectedFuzzyPart: part,
      showFuzzyDialog: true
    }));
  };

  const handleFuzzyMatchConfirm = (updatedPart: ParsedPart, selectedMatch: string, notes?: string) => {
    handlePartUpdate(updatedPart);
    setState(prev => ({
      ...prev,
      showFuzzyDialog: false,
      selectedFuzzyPart: null
    }));
  };

  const handleCloseFuzzyDialog = () => {
    setState(prev => ({
      ...prev,
      showFuzzyDialog: false,
      selectedFuzzyPart: null
    }));
  };

  const handleSubmitInquiry = async () => {
    if (!state.currentTask || state.parsedParts.length === 0) {
      setState(prev => ({ ...prev, error: '没有可提交的零件清单' }));
      return;
    }

    setState(prev => ({ ...prev, isSubmitting: true, error: null }));

    try {
      const request: InquirySubmissionRequest = {
        taskId: state.currentTask.taskId,
        confirmedParts: state.parsedParts.filter(part => part.isConfirmed),
        customerInfo: undefined, // Could be added via a form
        additionalNotes: undefined
      };

      const inquiryId = await InquiryApiService.submitInquiry(request);
      
      setState(prev => ({
        ...prev,
        submissionResult: inquiryId,
        isSubmitting: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '提交失败',
        isSubmitting: false
      }));
    }
  };

  const handleReset = () => {
    setState({
      currentTask: null,
      parsedParts: [],
      selectedFuzzyPart: null,
      showFuzzyDialog: false,
      isSubmitting: false,
      submissionResult: null,
      error: null
    });
  };

  const confirmedPartsCount = state.parsedParts.filter(part => part.isConfirmed).length;
  const canSubmit = state.parsedParts.length > 0 && confirmedPartsCount > 0;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={{ margin: 0, color: '#333' }}>批量询价系统</h1>
        <p style={{ margin: '8px 0 0 0', color: '#666' }}>
          上传文件自动解析零件清单，支持 Excel、PDF、图片格式
        </p>
      </div>

      {state.error && (
        <div style={errorStyle}>
          <strong>错误：</strong> {state.error}
          <button 
            onClick={() => setState(prev => ({ ...prev, error: null }))}
            style={errorCloseStyle}
          >
            ×
          </button>
        </div>
      )}

      {state.submissionResult && (
        <div style={successStyle}>
          <strong>提交成功！</strong> 询价单ID: {state.submissionResult}
          <div style={{ marginTop: '8px', fontSize: '14px' }}>
            您的询价请求已提交，我们将尽快处理并回复。
          </div>
          <button 
            onClick={handleReset}
            style={{ ...buttonStyle, backgroundColor: '#4caf50', color: 'white', marginTop: '12px' }}
          >
            新建询价
          </button>
        </div>
      )}

      {!state.submissionResult && (
        <>
          <div style={sectionStyle}>
            <FileUpload 
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
            />
          </div>

          {state.currentTask && state.currentTask.status !== UploadTaskStatus.Completed && (
            <TaskStatus
              taskId={state.currentTask.taskId}
              onCompleted={handleTaskCompleted}
              onError={handleTaskError}
            />
          )}

          {state.parsedParts.length > 0 && (
            <div style={sectionStyle}>
              <PartsTable
                parts={state.parsedParts}
                onPartUpdate={handlePartUpdate}
                onPartDelete={handlePartDelete}
                onShowFuzzyMatchDialog={handleShowFuzzyMatchDialog}
              />

              <div style={actionsStyle}>
                <div style={summaryStyle}>
                  <div>总计：{state.parsedParts.length} 个零件</div>
                  <div>已确认：{confirmedPartsCount} 个</div>
                  <div>待确认：{state.parsedParts.length - confirmedPartsCount} 个</div>
                </div>

                <div style={buttonsStyle}>
                  <button
                    onClick={handleReset}
                    style={{ ...buttonStyle, backgroundColor: '#757575', color: 'white' }}
                  >
                    重新开始
                  </button>
                  <button
                    onClick={handleSubmitInquiry}
                    disabled={!canSubmit || state.isSubmitting}
                    style={{
                      ...buttonStyle,
                      backgroundColor: canSubmit ? '#4caf50' : '#ccc',
                      color: 'white',
                      cursor: canSubmit ? 'pointer' : 'not-allowed'
                    }}
                  >
                    {state.isSubmitting ? '提交中...' : `提交询价 (${confirmedPartsCount}项)`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <FuzzyMatchDialog
        part={state.selectedFuzzyPart}
        isOpen={state.showFuzzyDialog}
        onClose={handleCloseFuzzyDialog}
        onConfirm={handleFuzzyMatchConfirm}
      />
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
};

const headerStyle: React.CSSProperties = {
  marginBottom: '32px',
  textAlign: 'center',
  paddingBottom: '16px',
  borderBottom: '2px solid #e0e0e0'
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '32px'
};

const errorStyle: React.CSSProperties = {
  backgroundColor: '#ffebee',
  color: '#c62828',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '16px',
  border: '1px solid #ef5350',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const successStyle: React.CSSProperties = {
  backgroundColor: '#f1f8e9',
  color: '#388e3c',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '16px',
  border: '1px solid #4caf50',
  textAlign: 'center'
};

const errorCloseStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  color: '#c62828',
  fontWeight: 'bold'
};

const actionsStyle: React.CSSProperties = {
  marginTop: '24px',
  padding: '16px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px'
};

const summaryStyle: React.CSSProperties = {
  display: 'flex',
  gap: '24px',
  fontSize: '14px',
  color: '#666'
};

const buttonsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px'
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease'
};

export default BatchInquiry;