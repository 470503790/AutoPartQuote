import axios from 'axios';
import {
  FileUploadResponse,
  UploadTaskStatusResponse,
  ParsedPart,
  PartConfirmationRequest,
  InquirySubmissionRequest,
  ApiResponse
} from '../types/inquiry';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:7261';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class InquiryApiService {
  static async uploadFile(file: File, description?: string): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (description) {
      formData.append('description', description);
    }

    const response = await apiClient.post<ApiResponse<FileUploadResponse>>(
      '/api/inquiries/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Upload failed');
    }
  }

  static async getTaskStatus(taskId: string): Promise<UploadTaskStatusResponse> {
    const response = await apiClient.get<ApiResponse<UploadTaskStatusResponse>>(
      `/api/inquiries/upload-tasks/${taskId}`
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to get task status');
    }
  }

  static async confirmPart(request: PartConfirmationRequest): Promise<boolean> {
    const response = await apiClient.post<ApiResponse<boolean>>(
      '/api/inquiries/confirm-part',
      request
    );

    if (response.data.success) {
      return response.data.data || false;
    } else {
      throw new Error(response.data.message || 'Failed to confirm part');
    }
  }

  static async getTaskResults(taskId: string): Promise<ParsedPart[]> {
    const response = await apiClient.get<ApiResponse<ParsedPart[]>>(
      `/api/inquiries/tasks/${taskId}/results`
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to get task results');
    }
  }

  static async submitInquiry(request: InquirySubmissionRequest): Promise<string> {
    const response = await apiClient.post<ApiResponse<string>>(
      '/api/inquiries/submit',
      request
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to submit inquiry');
    }
  }
}

export default InquiryApiService;