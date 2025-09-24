import React, { useEffect, useState } from 'react';
import { UploadTaskStatusResponse, UploadTaskStatus, ParsedPart } from '../types/inquiry';
import { InquiryApiService } from '../services/inquiryApi';

interface TaskStatusProps {
  taskId: string;
  onCompleted: (results: ParsedPart[]) => void;
  onError: (error: string) => void;
}

const TaskStatus: React.FC<TaskStatusProps> = ({ taskId, onCompleted, onError }) => {
  const [status, setStatus] = useState<UploadTaskStatusResponse | null>(null);
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const pollStatus = async () => {
      try {
        const statusResponse = await InquiryApiService.getTaskStatus(taskId);
        setStatus(statusResponse);

        if (statusResponse.status === UploadTaskStatus.Completed) {
          setPolling(false);
          if (statusResponse.results) {
            onCompleted(statusResponse.results);
          }
        } else if (statusResponse.status === UploadTaskStatus.Failed) {
          setPolling(false);
          onError(statusResponse.errorDetails || '处理失败');
        }
      } catch (error) {
        console.error('Failed to poll status:', error);
        onError(error instanceof Error ? error.message : '获取状态失败');
        setPolling(false);
      }
    };

    if (polling) {
      // Poll immediately
      pollStatus();
      
      // Then poll every 2 seconds
      intervalId = setInterval(pollStatus, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [taskId, polling, onCompleted, onError]);

  const getStatusColor = (status: UploadTaskStatus) => {
    switch (status) {
      case UploadTaskStatus.Pending:
        return '#757575';
      case UploadTaskStatus.Processing:
        return '#2196f3';
      case UploadTaskStatus.Completed:
        return '#4caf50';
      case UploadTaskStatus.Failed:
        return '#f44336';
      default:
        return '#757575';
    }
  };

  const getStatusText = (status: UploadTaskStatus) => {
    switch (status) {
      case UploadTaskStatus.Pending:
        return '等待处理';
      case UploadTaskStatus.Processing:
        return '处理中';
      case UploadTaskStatus.Completed:
        return '处理完成';
      case UploadTaskStatus.Failed:
        return '处理失败';
      default:
        return '未知状态';
    }
  };

  if (!status) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <div style={spinnerStyle}></div>
          <div>获取任务状态中...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={{ margin: 0 }}>文件处理状态</h3>
        <div style={{ fontSize: '14px', color: '#666' }}>
          任务ID: {taskId}
        </div>
      </div>

      <div style={statusCardStyle}>
        <div style={statusRowStyle}>
          <span style={{ fontWeight: 'bold' }}>状态：</span>
          <span style={{ 
            color: getStatusColor(status.status),
            fontWeight: 'bold'
          }}>
            {getStatusText(status.status)}
          </span>
        </div>

        {status.message && (
          <div style={statusRowStyle}>
            <span style={{ fontWeight: 'bold' }}>信息：</span>
            <span>{status.message}</span>
          </div>
        )}

        <div style={statusRowStyle}>
          <span style={{ fontWeight: 'bold' }}>进度：</span>
          <div style={{ flex: 1, marginLeft: '8px' }}>
            <div style={progressBarStyle}>
              <div 
                style={{
                  ...progressFillStyle,
                  width: `${status.progress}%`,
                  backgroundColor: getStatusColor(status.status)
                }}
              />
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              {status.progress}%
            </div>
          </div>
        </div>

        <div style={statusRowStyle}>
          <span style={{ fontWeight: 'bold' }}>创建时间：</span>
          <span>{new Date(status.createdAt).toLocaleString('zh-CN')}</span>
        </div>

        {status.completedAt && (
          <div style={statusRowStyle}>
            <span style={{ fontWeight: 'bold' }}>完成时间：</span>
            <span>{new Date(status.completedAt).toLocaleString('zh-CN')}</span>
          </div>
        )}

        {status.errorDetails && (
          <div style={errorStyle}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>错误详情：</div>
            <div style={errorDetailsStyle}>{status.errorDetails}</div>
          </div>
        )}

        {status.status === UploadTaskStatus.Processing && (
          <div style={processingStyle}>
            <div style={spinnerStyle}></div>
            <span>正在处理文件，请稍等...</span>
          </div>
        )}

        {status.status === UploadTaskStatus.Completed && status.results && (
          <div style={resultsStyle}>
            <div style={{ fontWeight: 'bold', color: '#4caf50', marginBottom: '8px' }}>
              ✓ 处理完成！解析到 {status.results.length} 个零件
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              结果将自动显示在下方表格中
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  margin: '16px 0',
  padding: '16px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const headerStyle: React.CSSProperties = {
  marginBottom: '16px',
  paddingBottom: '8px',
  borderBottom: '1px solid #e0e0e0'
};

const statusCardStyle: React.CSSProperties = {
  backgroundColor: '#f8f9fa',
  padding: '16px',
  borderRadius: '6px',
  border: '1px solid #e9ecef'
};

const statusRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '12px',
  gap: '8px'
};

const progressBarStyle: React.CSSProperties = {
  width: '100%',
  height: '8px',
  backgroundColor: '#e0e0e0',
  borderRadius: '6px',
  overflow: 'hidden'
};

const progressFillStyle: React.CSSProperties = {
  height: '100%',
  transition: 'width 0.3s ease',
  borderRadius: '6px'
};

const loadingStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '20px',
  justifyContent: 'center'
};

const processingStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginTop: '16px',
  padding: '12px',
  backgroundColor: '#e3f2fd',
  borderRadius: '6px',
  color: '#1976d2'
};

const resultsStyle: React.CSSProperties = {
  marginTop: '16px',
  padding: '12px',
  backgroundColor: '#f1f8e9',
  borderRadius: '6px'
};

const errorStyle: React.CSSProperties = {
  marginTop: '16px',
  padding: '12px',
  backgroundColor: '#ffebee',
  borderRadius: '6px',
  color: '#c62828'
};

const errorDetailsStyle: React.CSSProperties = {
  fontSize: '14px',
  fontFamily: 'monospace',
  backgroundColor: '#ffcdd2',
  padding: '8px',
  borderRadius: '4px',
  wordBreak: 'break-word'
};

const spinnerStyle: React.CSSProperties = {
  width: '16px',
  height: '16px',
  border: '2px solid #f3f3f3',
  borderTop: '2px solid #3498db',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
};

// Add CSS for spinner animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default TaskStatus;