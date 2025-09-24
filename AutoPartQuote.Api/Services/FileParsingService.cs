using AutoPartQuote.Api.Models;
using System.Collections.Concurrent;
using System.Text.RegularExpressions;

namespace AutoPartQuote.Api.Services
{
    public interface IFileParsingService
    {
        Task<FileUploadResponse> ProcessFileAsync(IFormFile file, string description = null);
        Task<UploadTaskStatusResponse> GetTaskStatusAsync(string taskId);
        Task<bool> UpdatePartConfirmationAsync(PartConfirmationRequest request);
        Task<List<ParsedPart>> GetTaskResultsAsync(string taskId);
    }

    public class FileParsingService : IFileParsingService
    {
        private readonly ConcurrentDictionary<string, UploadTaskStatusResponse> _tasks = new();
        private readonly ILogger<FileParsingService> _logger;

        public FileParsingService(ILogger<FileParsingService> logger)
        {
            _logger = logger;
        }

        public async Task<FileUploadResponse> ProcessFileAsync(IFormFile file, string? description = null)
        {
            var taskId = Guid.NewGuid().ToString();
            var fileType = GetFileType(file.FileName);

            var response = new FileUploadResponse
            {
                TaskId = taskId,
                FileType = fileType,
                FileName = file.FileName,
                FileSize = file.Length,
                Status = UploadTaskStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                Message = "File uploaded successfully, processing started"
            };

            var taskStatus = new UploadTaskStatusResponse
            {
                TaskId = taskId,
                Status = UploadTaskStatus.Processing,
                Progress = 0,
                Message = "Starting file processing...",
                CreatedAt = DateTime.UtcNow
            };

            _tasks[taskId] = taskStatus;

            // Start background processing
            _ = Task.Run(async () => await ProcessFileInBackground(file, taskId, fileType));

            return response;
        }

        public async Task<UploadTaskStatusResponse> GetTaskStatusAsync(string taskId)
        {
            if (_tasks.TryGetValue(taskId, out var status))
            {
                return status;
            }

            throw new ArgumentException($"Task with ID {taskId} not found", nameof(taskId));
        }

        public async Task<bool> UpdatePartConfirmationAsync(PartConfirmationRequest request)
        {
            if (!_tasks.TryGetValue(request.TaskId, out var taskStatus) || taskStatus.Results == null)
            {
                return false;
            }

            var part = taskStatus.Results.FirstOrDefault(p => p.RowIndex == request.RowIndex);
            if (part == null)
            {
                return false;
            }

            part.PartNumber = request.SelectedMatch;
            part.IsConfirmed = request.IsConfirmed;
            part.Notes = request.Notes;
            part.MatchingStatus = MatchingStatus.Exact;

            return true;
        }

        public async Task<List<ParsedPart>> GetTaskResultsAsync(string taskId)
        {
            if (_tasks.TryGetValue(taskId, out var status) && status.Results != null)
            {
                return status.Results;
            }

            return new List<ParsedPart>();
        }

        private FileType GetFileType(string fileName)
        {
            var extension = Path.GetExtension(fileName).ToLowerInvariant();
            
            return extension switch
            {
                ".xlsx" or ".xls" => FileType.Excel,
                ".pdf" => FileType.PDF,
                ".jpg" or ".jpeg" or ".png" or ".bmp" or ".gif" => FileType.Image,
                _ => throw new ArgumentException($"Unsupported file type: {extension}")
            };
        }

        private async Task ProcessFileInBackground(IFormFile file, string taskId, FileType fileType)
        {
            try
            {
                _logger.LogInformation($"Starting background processing for task {taskId}");
                
                var taskStatus = _tasks[taskId];
                taskStatus.Status = UploadTaskStatus.Processing;
                taskStatus.Progress = 10;
                taskStatus.Message = "Reading file content...";

                // Simulate processing delay and progress updates
                await Task.Delay(1000);
                taskStatus.Progress = 30;
                taskStatus.Message = "Analyzing file structure...";

                await Task.Delay(1000);
                taskStatus.Progress = 60;
                taskStatus.Message = "Extracting part information...";

                // Mock parsing results based on file type
                var results = await MockParseFile(fileType);
                
                await Task.Delay(1000);
                taskStatus.Progress = 90;
                taskStatus.Message = "Performing fuzzy matching...";

                // Add fuzzy matching logic
                foreach (var part in results)
                {
                    if (string.IsNullOrEmpty(part.PartNumber) || part.PartNumber.Length < 3)
                    {
                        part.MatchingStatus = MatchingStatus.NotFound;
                    }
                    else if (part.PartNumber.Contains("?") || part.PartName.Contains("?"))
                    {
                        part.MatchingStatus = MatchingStatus.Fuzzy;
                        part.SuggestedMatches = GenerateMockSuggestions(part.PartNumber);
                    }
                    else
                    {
                        part.MatchingStatus = MatchingStatus.Exact;
                    }
                }

                await Task.Delay(500);
                taskStatus.Status = UploadTaskStatus.Completed;
                taskStatus.Progress = 100;
                taskStatus.Message = "Processing completed successfully";
                taskStatus.CompletedAt = DateTime.UtcNow;
                taskStatus.Results = results;

                _logger.LogInformation($"Completed processing for task {taskId}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error processing file for task {taskId}");
                
                var taskStatus = _tasks[taskId];
                taskStatus.Status = UploadTaskStatus.Failed;
                taskStatus.Progress = 0;
                taskStatus.Message = "Processing failed";
                taskStatus.ErrorDetails = ex.Message;
                taskStatus.CompletedAt = DateTime.UtcNow;
            }
        }

        private async Task<List<ParsedPart>> MockParseFile(FileType fileType)
        {
            // Mock parsed data - in real implementation, this would use OCR for images/PDFs
            // or actual Excel parsing for spreadsheets
            var mockData = new List<ParsedPart>
            {
                new ParsedPart
                {
                    RowIndex = 1,
                    PartNumber = "BP-001",
                    PartName = "Brake Pad Set",
                    Brand = "Bosch",
                    Quantity = 2,
                    Description = "Front brake pads for sedan",
                    MatchingStatus = MatchingStatus.Exact,
                    IsConfirmed = false
                },
                new ParsedPart
                {
                    RowIndex = 2,
                    PartNumber = "OF-?02",
                    PartName = "Oil Filter",
                    Brand = "Mann",
                    Quantity = 1,
                    Description = "Engine oil filter",
                    MatchingStatus = MatchingStatus.Fuzzy,
                    IsConfirmed = false
                },
                new ParsedPart
                {
                    RowIndex = 3,
                    PartNumber = "",
                    PartName = "Air Filter",
                    Brand = "K&N",
                    Quantity = 1,
                    Description = "High performance air filter",
                    MatchingStatus = MatchingStatus.NotFound,
                    IsConfirmed = false
                }
            };

            return await Task.FromResult(mockData);
        }

        private List<string> GenerateMockSuggestions(string partNumber)
        {
            // Mock suggestion generation - in real implementation, this would query a database
            var suggestions = new List<string>();
            
            if (partNumber.Contains("?"))
            {
                suggestions.Add(partNumber.Replace("?", "1"));
                suggestions.Add(partNumber.Replace("?", "2"));
                suggestions.Add(partNumber.Replace("?", "3"));
            }
            else
            {
                suggestions.Add($"{partNumber}-A");
                suggestions.Add($"{partNumber}-B");
                suggestions.Add($"{partNumber}-C");
            }

            return suggestions;
        }
    }
}