# AutoPartQuote Design Tokens

## 概述

AutoPartQuote Design Tokens 是一套完整的设计令牌系统，为项目提供一致的设计语言。本系统支持多种输出格式，包括 W3C 标准、CSS 变量、TypeScript 常量，并兼容 Figma Tokens Studio。

## 特性

- ✅ **W3C 标准兼容** - 遵循 W3C Design Tokens 规范
- ✅ **多格式输出** - CSS、TypeScript、JSON 多种格式支持
- ✅ **暗色模式** - 内置明暗主题切换支持
- ✅ **品牌扩展** - 支持多品牌主题定制
- ✅ **Figma 集成** - 与 Figma Tokens Studio 完全兼容
- ✅ **类型安全** - TypeScript 类型定义支持
- ✅ **自动构建** - 自动化构建和验证流程

## 项目结构

```
├── tokens/                    # 设计令牌源文件
│   ├── base/                 # 基础令牌
│   │   ├── colors.json       # 颜色令牌
│   │   ├── typography.json   # 字体令牌
│   │   ├── spacing.json      # 间距令牌
│   │   ├── radius.json       # 圆角令牌
│   │   ├── shadow.json       # 阴影令牌
│   │   └── motion.json       # 动画令牌
│   ├── semantic/             # 语义化令牌
│   │   ├── colors.json       # 语义颜色
│   │   └── typography.json   # 语义字体
│   ├── themes/               # 主题令牌
│   │   ├── light/            # 明亮主题
│   │   └── dark/             # 暗色主题
│   └── brands/               # 品牌主题
│       └── default/          # 默认品牌
├── scripts/                  # 构建脚本
├── dist/                     # 构建产物
└── docs/                     # 文档
```

## 输出文件

### 1. W3C Design Tokens (tokens.raw.json)
```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "$description": "AutoPartQuote Design Tokens - W3C compliant format",
  "color": {
    "base": {
      "blue": {
        "500": {
          "$type": "color",
          "$value": "#3b82f6",
          "$description": "Primary brand color"
        }
      }
    }
  }
}
```

### 2. Style Dictionary JSON (tokens.sd.json)
```json
{
  "color": {
    "base": {
      "blue": {
        "500": {
          "value": "#3b82f6",
          "type": "color",
          "description": "Primary brand color"
        }
      }
    }
  }
}
```

### 3. CSS 变量 (dist/tokens.css)
```css
:root {
  --color-base-blue-500: #3b82f6;
  --spacing-4: 1rem;
  --font-size-base: 1rem;
}

[data-theme="dark"] {
  --color-surface-primary: #171717;
  --color-content-primary: #ffffff;
}
```

### 4. TypeScript 常量 (dist/tokens.ts)
```typescript
export const COLOR_BASE_BLUE_500 = '#3b82f6';
export const SPACING_4 = '1rem';
export const FONT_SIZE_BASE = '1rem';

export const tokens = {
  color: {
    base: {
      blue: {
        '500': '#3b82f6'
      }
    }
  }
} as const;
```

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 构建令牌
```bash
npm run build
```

### 3. 在项目中使用

#### CSS 方式
```css
/* 引入令牌 */
@import './dist/tokens.css';

/* 使用令牌 */
.button {
  background-color: var(--color-brand-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-base);
}
```

#### TypeScript 方式
```typescript
import { tokens, COLOR_BRAND_PRIMARY, SPACING_4 } from './dist/tokens';

// 使用常量
const buttonStyle = {
  backgroundColor: COLOR_BRAND_PRIMARY,
  padding: SPACING_4
};

// 使用类型化对象
const primaryColor = tokens.color.base.blue['500'];
```

#### JavaScript 方式
```javascript
import tokens from './dist/tokens.json';

const primaryColor = tokens.color.base.blue['500'].value;
```

## 主题切换

### CSS 自动模式
```css
/* 自动跟随系统主题 */
:root {
  /* 默认令牌 */
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* 暗色主题令牌 */
  }
}
```

### 手动切换
```html
<!-- 明亮主题 -->
<html data-theme="light">

<!-- 暗色主题 -->
<html data-theme="dark">
```

```javascript
// JavaScript 切换
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
}
```

## 令牌分类

### 基础令牌 (Base Tokens)
- **颜色** - 基础色彩调色板
- **字体** - 字体族、大小、粗细、行高
- **间距** - 统一的间距尺度
- **圆角** - 边框圆角值
- **阴影** - 阴影效果
- **动效** - 动画时长和缓动函数
- **透明度** - 不透明度值

### 语义令牌 (Semantic Tokens)
- **文本颜色** - primary, secondary, tertiary
- **背景颜色** - 各级背景色
- **边框颜色** - 边框和分割线颜色
- **品牌颜色** - 品牌主色及变体
- **状态颜色** - success, warning, error, info
- **排版** - 标题和正文排版组合

### 主题令牌 (Theme Tokens)
- **明亮主题** - 浅色背景主题
- **暗色主题** - 深色背景主题

## 开发集成

### 1. 在 React 项目中使用
```jsx
import { tokens } from '@autopartquote/design-tokens';

function Button({ variant = 'primary', children }) {
  const styles = {
    backgroundColor: tokens.color.brand.primary,
    color: tokens.color.text.inverse,
    padding: `${tokens.spacing['2']} ${tokens.spacing['4']}`,
    borderRadius: tokens.radius.base,
    fontSize: tokens.font.size.base,
    fontFamily: tokens.font.family.base.join(', ')
  };

  return <button style={styles}>{children}</button>;
}
```

### 2. 在 Vue 项目中使用
```vue
<template>
  <button :style="buttonStyles" class="custom-button">
    <slot />
  </button>
</template>

<script>
import { tokens } from '@autopartquote/design-tokens';

export default {
  computed: {
    buttonStyles() {
      return {
        backgroundColor: tokens.color.brand.primary,
        padding: `${tokens.spacing['2']} ${tokens.spacing['4']}`,
        borderRadius: tokens.radius.base
      };
    }
  }
};
</script>
```

### 3. 在 Sass/SCSS 中使用
```scss
// 引入 CSS 变量
@import './dist/tokens.css';

// 在 Sass 中使用
.button {
  background-color: var(--color-brand-primary);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-base);
  
  &:hover {
    background-color: var(--color-brand-primary-hover);
  }
  
  &:disabled {
    color: var(--color-text-disabled);
    background-color: var(--color-background-tertiary);
  }
}
```

## Figma 集成

### 1. 安装 Figma Tokens Studio 插件

### 2. 导入令牌
1. 在 Figma 中打开 Tokens Studio 插件
2. 选择 "JSON" 格式
3. 导入 `tokens.raw.json` 文件

### 3. 同步令牌
- 令牌会自动映射到 Figma 的样式系统
- 支持颜色、字体、间距、阴影等令牌类型
- 支持明暗主题切换

## 构建命令

```bash
# 构建所有格式
npm run build

# 只构建 W3C 和 Style Dictionary 格式
npm run build:tokens

# 只构建 CSS 文件
npm run build:css

# 只构建 TypeScript 文件
npm run build:ts

# 验证令牌格式
npm run validate
```

## 扩展指南

### 1. 添加新的基础令牌
在 `tokens/base/` 目录下创建新的 JSON 文件，遵循 W3C Design Tokens 格式。

### 2. 添加新的语义令牌
在 `tokens/semantic/` 目录下扩展现有文件或创建新文件。

### 3. 添加新主题
在 `tokens/themes/` 目录下创建新的主题文件夹。

### 4. 添加新品牌
在 `tokens/brands/` 目录下创建新的品牌文件夹。

## 最佳实践

### 1. 命名规范
- 使用描述性名称而非具体值
- 遵循层级结构：`category.subcategory.item`
- 语义令牌优于基础令牌

### 2. 令牌引用
- 语义令牌应引用基础令牌
- 使用 `{token.path}` 语法进行引用
- 避免硬编码值

### 3. 主题设计
- 保持明暗主题的一致性
- 确保对比度符合无障碍标准
- 测试不同设备和环境

### 4. 版本管理
- 遵循语义化版本控制
- 记录重大变更
- 提供迁移指南

## 故障排除

### 常见问题

#### 1. 构建失败
```bash
# 清理 dist 目录
rm -rf dist

# 重新安装依赖
npm install

# 重新构建
npm run build
```

#### 2. 令牌引用无法解析
- 检查引用路径是否正确
- 确保被引用的令牌存在
- 验证 JSON 格式是否正确

#### 3. CSS 变量未生效
- 确保正确引入 CSS 文件
- 检查 CSS 选择器优先级
- 验证变量名是否正确

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 添加或修改令牌
4. 运行测试和构建
5. 提交 Pull Request

## 许可证

MIT License - 详见 [LICENSE](../LICENSE) 文件。

## 支持

如有问题或建议，请通过以下方式联系：
- GitHub Issues
- 项目文档
- 团队内部沟通渠道