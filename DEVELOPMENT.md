# 开发指南

## 环境搭建

### 必需软件
- **.NET 8.0 SDK** - 后端开发
- **Node.js 18+** - 前端开发
- **Visual Studio Code** (推荐) 或 **Visual Studio 2022**

### 快速启动
```bash
# 克隆项目
git clone https://github.com/470503790/AutoPartQuote.git
cd AutoPartQuote

# 安装依赖
npm install  # 安装根目录的开发工具
cd autopart-quote-frontend && npm install  # 安装前端依赖
cd ..

# 同时启动前后端 (需要安装 concurrently)
npm install -g concurrently
npm run dev
```

### 分别启动

#### 后端
```bash
cd AutoPartQuote.Api
dotnet restore
dotnet run
# 访问 https://localhost:7261/swagger 查看 API 文档
```

#### 前端
```bash
cd autopart-quote-frontend
npm install
npm start
# 访问 http://localhost:3000 查看应用
```

## 项目结构详解

### 后端架构
```
AutoPartQuote.Api/
├── Controllers/
│   └── InquiriesController.cs     # RESTful API 端点
├── Models/
│   └── InquiryModels.cs          # 数据传输对象 (DTOs)
├── Services/
│   └── FileParsingService.cs     # 文件解析业务逻辑
├── Program.cs                    # 应用配置和启动
├── appsettings.json             # 应用配置
└── AutoPartQuote.Api.csproj     # 项目文件
```

### 前端架构
```
autopart-quote-frontend/src/
├── components/
│   ├── BatchInquiry.tsx         # 主容器组件
│   ├── FileUpload.tsx           # 文件上传组件
│   ├── PartsTable.tsx           # 数据表格组件
│   ├── FuzzyMatchDialog.tsx     # 模糊匹配弹窗
│   └── TaskStatus.tsx           # 任务状态监控
├── services/
│   └── inquiryApi.ts            # API 客户端
├── types/
│   └── inquiry.ts               # TypeScript 类型定义
├── utils/
│   └── excelParser.ts           # Excel 解析工具
└── App.tsx                      # 应用根组件
```

## 核心功能实现

### 1. 文件上传流程
1. **前端验证**: 文件类型、大小检查
2. **Excel 处理**: 本地使用 SheetJS 解析
3. **PDF/图片处理**: 上传到后端，模拟 OCR 处理
4. **结果展示**: 解析后的零件数据显示在表格中

### 2. Excel 解析算法
```typescript
// 智能列识别
identifyHeaders(headerRow) {
  // 支持多种列名格式
  // 零件号：part number, partnumber, pn 等
  // 零件名称：part name, description, product 等
}

// 数据质量评估
assessDataQuality(part) {
  // 完整数据 -> 精确匹配
  // 包含通配符 -> 模糊匹配  
  // 缺少关键信息 -> 未找到
}
```

### 3. 异步任务处理
```csharp
// 后端任务管理
public class FileParsingService {
    private readonly ConcurrentDictionary<string, UploadTaskStatusResponse> _tasks;
    
    // 后台处理文件
    private async Task ProcessFileInBackground(IFormFile file, string taskId) {
        // 模拟 OCR 处理过程
        // 进度更新和状态管理
    }
}
```

### 4. 前端状态管理
```typescript
// React 状态管理模式
interface BatchInquiryState {
  currentTask: FileUploadResponse | null;
  parsedParts: ParsedPart[];
  selectedFuzzyPart: ParsedPart | null;
  // ... 其他状态
}
```

## API 接口详解

### 文件上传 API
```http
POST /api/inquiries/upload
Content-Type: multipart/form-data

Request Body:
- file: IFormFile (必需)
- description: string (可选)

Response:
{
  "success": true,
  "data": {
    "taskId": "uuid",
    "fileType": "Excel|PDF|Image",
    "fileName": "string",
    "fileSize": number,
    "status": "Pending|Processing|Completed|Failed",
    "createdAt": "datetime",
    "message": "string"
  }
}
```

### 任务状态查询
```http
GET /api/inquiries/upload-tasks/{taskId}

Response:
{
  "success": true,
  "data": {
    "taskId": "uuid",
    "status": "Processing",
    "progress": 75,
    "message": "Analyzing file structure...",
    "results": ParsedPart[] | null,
    "errorDetails": string | null
  }
}
```

## 测试策略

### 后端测试
```bash
# 单元测试
dotnet test

# API 集成测试
curl -X POST http://localhost:5222/api/inquiries/upload \
  -F "file=@test.xlsx" \
  -F "description=Test upload"
```

### 前端测试
```bash
# 运行 Jest 测试
npm test

# Excel 解析测试
npm test -- excelParser.test.ts
```

### 端到端测试
1. 启动前后端服务
2. 访问 http://localhost:3000
3. 上传测试文件
4. 验证解析结果
5. 测试编辑和提交功能

## 部署指南

### 生产构建
```bash
# 后端
dotnet publish -c Release

# 前端
cd autopart-quote-frontend
npm run build
```

### Docker 部署 (可选)
```dockerfile
# 后端 Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0
COPY . /app
WORKDIR /app
EXPOSE 80
ENTRYPOINT ["dotnet", "AutoPartQuote.Api.dll"]

# 前端 Dockerfile  
FROM nginx:alpine
COPY build/ /usr/share/nginx/html/
```

## 常见问题

### Q: Excel 文件解析失败
A: 检查文件格式和列名是否符合识别规则

### Q: PDF 处理超时
A: 目前是模拟处理，实际环境需要集成 OCR 服务

### Q: 跨域问题
A: 确保后端 CORS 配置正确，前端 API_URL 设置正确

### Q: 文件上传失败
A: 检查文件大小限制和类型限制

## 贡献流程

1. **Fork 项目**
2. **创建功能分支**: `git checkout -b feature/your-feature`
3. **编写代码和测试**
4. **提交更改**: `git commit -m "Add your feature"`
5. **推送分支**: `git push origin feature/your-feature`
6. **创建 Pull Request**

## 代码规范

### TypeScript/JavaScript
- 使用 ESLint 和 Prettier
- 遵循 React Hooks 最佳实践
- 类型安全：避免 `any` 类型

### C#
- 遵循微软 C# 编码规范
- 使用异步编程模式
- 依赖注入和接口分离

### Git 提交信息
```
type(scope): description

feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试相关
chore: 构建和工具相关
```