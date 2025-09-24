using System.Text.Json.Serialization;

namespace AutoPartQuote.Api.Models
{
    public enum FileType
    {
        Excel,
        PDF,
        Image
    }

    public enum UploadTaskStatus
    {
        Pending,
        Processing,
        Completed,
        Failed
    }

    public enum MatchingStatus
    {
        Exact,
        Fuzzy,
        NotFound
    }

    public class FileUploadRequest
    {
        public IFormFile File { get; set; } = null!;
        public string? Description { get; set; }
    }

    public class FileUploadResponse
    {
        public string TaskId { get; set; } = null!;
        public FileType FileType { get; set; }
        public string FileName { get; set; } = null!;
        public long FileSize { get; set; }
        public UploadTaskStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Message { get; set; }
    }

    public class UploadTaskStatusResponse
    {
        public string TaskId { get; set; } = null!;
        public UploadTaskStatus Status { get; set; }
        public int Progress { get; set; }
        public string? Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public List<ParsedPart>? Results { get; set; }
        public string? ErrorDetails { get; set; }
    }

    public class ParsedPart
    {
        public int RowIndex { get; set; }
        public string PartNumber { get; set; } = string.Empty;
        public string PartName { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string? Description { get; set; }
        public MatchingStatus MatchingStatus { get; set; }
        public List<string>? SuggestedMatches { get; set; }
        public bool IsConfirmed { get; set; }
        public string? Notes { get; set; }
    }

    public class PartConfirmationRequest
    {
        public string TaskId { get; set; } = null!;
        public int RowIndex { get; set; }
        public string SelectedMatch { get; set; } = string.Empty;
        public bool IsConfirmed { get; set; }
        public string? Notes { get; set; }
    }

    public class InquirySubmissionRequest
    {
        public string TaskId { get; set; } = null!;
        public List<ParsedPart> ConfirmedParts { get; set; } = new();
        public string? CustomerInfo { get; set; }
        public string? AdditionalNotes { get; set; }
    }

    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public T? Data { get; set; }
        public string? Message { get; set; }
        public List<string>? Errors { get; set; }
    }
}