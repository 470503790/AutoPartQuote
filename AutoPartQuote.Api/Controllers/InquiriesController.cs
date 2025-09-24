using AutoPartQuote.Api.Models;
using AutoPartQuote.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AutoPartQuote.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InquiriesController : ControllerBase
    {
        private readonly IFileParsingService _fileParsingService;
        private readonly ILogger<InquiriesController> _logger;

        public InquiriesController(IFileParsingService fileParsingService, ILogger<InquiriesController> logger)
        {
            _fileParsingService = fileParsingService;
            _logger = logger;
        }

        [HttpPost("upload")]
        public async Task<ActionResult<ApiResponse<FileUploadResponse>>> UploadFile([FromForm] FileUploadRequest request)
        {
            try
            {
                // Validate file
                if (request.File == null || request.File.Length == 0)
                {
                    return BadRequest(new ApiResponse<FileUploadResponse>
                    {
                        Success = false,
                        Message = "No file uploaded",
                        Errors = new List<string> { "File is required" }
                    });
                }

                // Validate file size (max 10MB)
                const long maxFileSize = 10 * 1024 * 1024;
                if (request.File.Length > maxFileSize)
                {
                    return BadRequest(new ApiResponse<FileUploadResponse>
                    {
                        Success = false,
                        Message = "File too large",
                        Errors = new List<string> { "File size must be less than 10MB" }
                    });
                }

                // Validate file type
                var allowedExtensions = new[] { ".xlsx", ".xls", ".pdf", ".jpg", ".jpeg", ".png", ".bmp", ".gif" };
                var fileExtension = Path.GetExtension(request.File.FileName).ToLowerInvariant();
                
                if (!allowedExtensions.Contains(fileExtension))
                {
                    return BadRequest(new ApiResponse<FileUploadResponse>
                    {
                        Success = false,
                        Message = "Invalid file type",
                        Errors = new List<string> { $"Supported file types: {string.Join(", ", allowedExtensions)}" }
                    });
                }

                var result = await _fileParsingService.ProcessFileAsync(request.File, request.Description);

                return Ok(new ApiResponse<FileUploadResponse>
                {
                    Success = true,
                    Data = result,
                    Message = "File uploaded successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading file");
                return StatusCode(500, new ApiResponse<FileUploadResponse>
                {
                    Success = false,
                    Message = "Internal server error",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        [HttpGet("upload-tasks/{taskId}")]
        public async Task<ActionResult<ApiResponse<UploadTaskStatusResponse>>> GetTaskStatus(string taskId)
        {
            try
            {
                var status = await _fileParsingService.GetTaskStatusAsync(taskId);
                
                return Ok(new ApiResponse<UploadTaskStatusResponse>
                {
                    Success = true,
                    Data = status,
                    Message = "Task status retrieved successfully"
                });
            }
            catch (ArgumentException ex)
            {
                return NotFound(new ApiResponse<UploadTaskStatusResponse>
                {
                    Success = false,
                    Message = "Task not found",
                    Errors = new List<string> { ex.Message }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving task status for {TaskId}", taskId);
                return StatusCode(500, new ApiResponse<UploadTaskStatusResponse>
                {
                    Success = false,
                    Message = "Internal server error",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        [HttpPost("confirm-part")]
        public async Task<ActionResult<ApiResponse<bool>>> ConfirmPart([FromBody] PartConfirmationRequest request)
        {
            try
            {
                var result = await _fileParsingService.UpdatePartConfirmationAsync(request);
                
                if (!result)
                {
                    return NotFound(new ApiResponse<bool>
                    {
                        Success = false,
                        Message = "Task or part not found"
                    });
                }

                return Ok(new ApiResponse<bool>
                {
                    Success = true,
                    Data = true,
                    Message = "Part confirmation updated successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error confirming part");
                return StatusCode(500, new ApiResponse<bool>
                {
                    Success = false,
                    Message = "Internal server error",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        [HttpGet("tasks/{taskId}/results")]
        public async Task<ActionResult<ApiResponse<List<ParsedPart>>>> GetTaskResults(string taskId)
        {
            try
            {
                var results = await _fileParsingService.GetTaskResultsAsync(taskId);
                
                return Ok(new ApiResponse<List<ParsedPart>>
                {
                    Success = true,
                    Data = results,
                    Message = "Task results retrieved successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving task results for {TaskId}", taskId);
                return StatusCode(500, new ApiResponse<List<ParsedPart>>
                {
                    Success = false,
                    Message = "Internal server error",
                    Errors = new List<string> { ex.Message }
                });
            }
        }

        [HttpPost("submit")]
        public async Task<ActionResult<ApiResponse<string>>> SubmitInquiry([FromBody] InquirySubmissionRequest request)
        {
            try
            {
                // Mock inquiry submission - in real implementation, this would save to database
                // and potentially trigger email notifications or other business processes
                
                var inquiryId = Guid.NewGuid().ToString();
                
                _logger.LogInformation("Inquiry submitted with ID {InquiryId} for task {TaskId}", inquiryId, request.TaskId);
                
                return Ok(new ApiResponse<string>
                {
                    Success = true,
                    Data = inquiryId,
                    Message = "Inquiry submitted successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error submitting inquiry");
                return StatusCode(500, new ApiResponse<string>
                {
                    Success = false,
                    Message = "Internal server error",
                    Errors = new List<string> { ex.Message }
                });
            }
        }
    }
}