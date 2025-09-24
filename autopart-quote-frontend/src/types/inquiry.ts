export enum FileType {
  Excel = 'Excel',
  PDF = 'PDF',
  Image = 'Image'
}

export enum UploadTaskStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Completed = 'Completed',
  Failed = 'Failed'
}

export enum MatchingStatus {
  Exact = 'Exact',
  Fuzzy = 'Fuzzy',
  NotFound = 'NotFound'
}

export interface FileUploadResponse {
  taskId: string;
  fileType: FileType;
  fileName: string;
  fileSize: number;
  status: UploadTaskStatus;
  createdAt: string;
  message?: string;
}

export interface UploadTaskStatusResponse {
  taskId: string;
  status: UploadTaskStatus;
  progress: number;
  message?: string;
  createdAt: string;
  completedAt?: string;
  results?: ParsedPart[];
  errorDetails?: string;
}

export interface ParsedPart {
  rowIndex: number;
  partNumber: string;
  partName: string;
  brand: string;
  quantity: number;
  description?: string;
  matchingStatus: MatchingStatus;
  suggestedMatches?: string[];
  isConfirmed: boolean;
  notes?: string;
}

export interface PartConfirmationRequest {
  taskId: string;
  rowIndex: number;
  selectedMatch: string;
  isConfirmed: boolean;
  notes?: string;
}

export interface InquirySubmissionRequest {
  taskId: string;
  confirmedParts: ParsedPart[];
  customerInfo?: string;
  additionalNotes?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}