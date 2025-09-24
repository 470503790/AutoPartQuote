# AutoPartQuote - 批量询价系统

## 项目概述

AutoPartQuote 是一个自动化零件询价系统，支持批量文件上传和智能解析功能。用户可以上传 Excel、PDF 或图片文件，系统会自动解析零件清单并提供人工确认和编辑功能。

## 功能特性

### 🚀 核心功能
- **多格式文件支持**: Excel (.xlsx, .xls)、PDF (.pdf)、图片 (.jpg, .png, .bmp, .gif)
- **智能解析**: Excel 文件本地即时解析，PDF/图片后端 OCR 识别
- **拖拽上传**: 直观的拖拽界面，支持文件选择和拖放操作
- **实时进度**: 文件处理进度实时反馈和状态监控
- **智能匹配**: 自动识别零件号、名称、品牌、数量等信息
- **模糊匹配**: 不完整或模糊数据的人工确认机制
- **表格编辑**: 可视化表格界面，支持行级编辑和删除
- **数据校验**: 完整的文件类型和大小验证机制

### 🔧 技术特性
- **前后端分离**: React TypeScript + .NET 8.0 Web API
- **异步处理**: 后台任务处理和轮询机制
- **类型安全**: 完整的 TypeScript 类型定义
- **响应式设计**: 移动端友好的界面设计
- **错误处理**: 完善的错误捕获和用户提示

## 技术架构

### 前端技术栈
- **React 18** - 用户界面框架
- **TypeScript** - 类型安全的 JavaScript
- **react-dropzone** - 文件拖拽上传
- **SheetJS (xlsx)** - Excel 文件本地解析
- **Axios** - HTTP 客户端

### 后端技术栈
- **.NET 8.0** - Web API 框架
- **ASP.NET Core** - RESTful API
- **System.Text.Json** - JSON 序列化
- **IFormFile** - 文件上传处理

## 项目结构

```
AutoPartQuote/
├── AutoPartQuote.Api/              # 后端 API 项目
│   ├── Controllers/                # API 控制器
│   │   └── InquiriesController.cs  # 询价相关 API
│   ├── Models/                     # 数据模型
│   │   └── InquiryModels.cs       # 询价相关模型
│   ├── Services/                   # 业务逻辑服务
│   │   └── FileParsingService.cs  # 文件解析服务
│   └── Program.cs                  # 应用程序入口
├── autopart-quote-frontend/        # 前端 React 项目
│   ├── src/
│   │   ├── components/            # React 组件
│   │   │   ├── BatchInquiry.tsx   # 主界面组件
│   │   │   ├── FileUpload.tsx     # 文件上传组件
│   │   │   ├── PartsTable.tsx     # 零件表格组件
│   │   │   ├── FuzzyMatchDialog.tsx # 模糊匹配确认弹窗
│   │   │   └── TaskStatus.tsx     # 任务状态组件
│   │   ├── services/              # API 服务
│   │   │   └── inquiryApi.ts      # 询价 API 服务
│   │   ├── types/                 # TypeScript 类型定义
│   │   │   └── inquiry.ts         # 询价相关类型
│   │   └── utils/                 # 工具函数
│   │       └── excelParser.ts     # Excel 解析工具
│   └── public/                    # 静态资源
└── AutoPartQuote.sln              # Visual Studio 解决方案文件
```

## 快速开始

### 环境要求
- .NET 8.0 SDK
- Node.js 18+ 
- npm 或 yarn

### 后端启动
```bash
cd AutoPartQuote.Api
dotnet restore
dotnet run
```
后端将在 `https://localhost:7261` 运行

### 前端启动
```bash
cd autopart-quote-frontend
npm install
npm start
```
前端将在 `http://localhost:3000` 运行

## API 文档

### 文件上传
```http
POST /api/inquiries/upload
Content-Type: multipart/form-data

file: File (必需)
description: string (可选)
```

### 获取任务状态
```http
GET /api/inquiries/upload-tasks/{taskId}
```

### 确认零件匹配
```http
POST /api/inquiries/confirm-part
Content-Type: application/json

{
  "taskId": "string",
  "rowIndex": number,
  "selectedMatch": "string",
  "isConfirmed": boolean,
  "notes": "string"
}
```

### 提交询价
```http
POST /api/inquiries/submit
Content-Type: application/json

{
  "taskId": "string",
  "confirmedParts": ParsedPart[],
  "customerInfo": "string",
  "additionalNotes": "string"
}
```

## 使用说明

### 1. 文件上传
- 支持拖拽或点击选择文件
- 文件大小限制：10MB
- 支持格式：Excel (.xlsx, .xls)、PDF (.pdf)、图片 (.jpg, .png, .bmp, .gif)

### 2. Excel 文件处理
- **自动列识别**: 系统会智能识别包含零件号、名称、品牌、数量等信息的列
- **即时解析**: Excel 文件在浏览器本地解析，无需上传到服务器
- **数据预览**: 解析结果实时显示在表格中

### 3. PDF/图片文件处理
- **服务器处理**: 文件上传到后端进行 OCR 识别
- **异步处理**: 显示处理进度，支持轮询状态更新
- **结果预览**: 处理完成后显示解析结果

### 4. 数据确认和编辑
- **状态标识**: 
  - 🟢 精确匹配 - 自动识别成功
  - 🟠 模糊匹配 - 需要人工确认
  - 🔴 未找到 - 需要手动输入
- **在线编辑**: 直接在表格中编辑零件信息
- **模糊匹配确认**: 弹窗显示建议选项，支持自定义输入

### 5. 提交询价
- 确认所有必要信息后提交询价请求
- 系统生成询价单ID用于跟踪

## 开发说明

### Excel 解析逻辑
系统支持多种列名格式的自动识别：

**零件号列**: part number, partnumber, part_number, part no, pn
**零件名称列**: part name, partname, part_name, description, product  
**品牌列**: brand, manufacturer, make
**数量列**: quantity, qty, amount, count
**描述列**: desc, description, note, remark

### 模糊匹配算法
- 检测包含 `?` 或 `*` 通配符的零件号
- 生成可能的匹配建议
- 支持人工选择或自定义输入

### 安全措施
- 文件类型白名单验证
- 文件大小限制 (10MB)
- CORS 跨域配置
- 输入数据清理和验证

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 支持

如有问题或建议，请提交 Issue 或联系项目维护者。