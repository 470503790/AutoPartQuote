# AutoPartQuote Design Tokens

完整的设计令牌系统，为 AutoPartQuote 项目提供一致的设计语言。

## 快速开始

```bash
# 安装依赖
npm install

# 构建所有令牌
npm run build

# 验证令牌格式
npm run validate

# 启动演示
npm run demo
```

## 输出文件

- `tokens.raw.json` - W3C Design Tokens 标准格式
- `tokens.sd.json` - Style Dictionary 兼容格式  
- `dist/tokens.css` - CSS 变量文件
- `dist/tokens.ts` - TypeScript 常量文件

## 特性

✅ W3C Design Tokens 规范兼容  
✅ 多格式输出支持  
✅ 明暗主题支持  
✅ Figma Tokens Studio 兼容  
✅ TypeScript 类型支持  
✅ 自动化构建验证  

查看 `docs/README.md` 了解详细文档和使用指南。
查看 `examples/component-demo.html` 了解组件示例。