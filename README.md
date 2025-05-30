# Smart Mermaid: AI 驱动的文本转 Mermaid 图表工具

Smart Mermaid 是一款利用人工智能技术，将您的文本描述智能转换为 Mermaid 格式图表代码，并实时渲染成可视化图表的 Web 应用。无论是流程图、序列图、甘特图还是状态图，只需输入文本，AI 即可为您生成相应的图表。

## 访问体验

[https://smart-mermaid.aizhi.site](https://smart-mermaid.aizhi.site)

**提示：** 本应用完全免费，应用已内置 API Key，您可以直接免费使用。为防止资源滥用，我们设置了每位用户每日 5 次的免费生成额度。
如有更多需求，可联系作者免费添加。

<img src="https://github.com/user-attachments/assets/ce261409-13ff-4f6a-b749-13112f3b3067" width="200px">


## 效果预览

![PixPin_2025-05-23_11-25-46](https://github.com/user-attachments/assets/7ad74f73-68f3-499f-bcb4-f2b3e67336e8)

*图：Smart Mermaid 操作界面与生成的图表*

## 核心优势

* **简化图表绘制**：告别手动编写 Mermaid 代码的繁琐，通过自然语言描述即可快速生成图表。
* **提升效率**：将想法迅速转化为可视化图表，节省您在文档撰写和沟通演示上的时间。
* **智能辅助**：AI 自动分析文本，理解意图，并选择合适的图表类型（或由您指定）。
* **灵活配置**：支持自定义 AI 服务配置，满足不同用户的需求。

## 主要功能

### 🎯 核心功能

* **灵活的文本输入**:
    * 直接在编辑器中手动输入或粘贴文本。
    * 支持上传文件（.txt, .md, .docx 格式）。
    * 最大支持 20,000 字符的输入长度。

* **智能 AI 转换**:
    * 集成先进 AI 模型分析文本内容。
    * 支持自动识别最佳图表类型或由用户指定。
    * 精准生成符合 Mermaid 规范的图表代码。

* **便捷的图表展示与编辑**:
    * 清晰展示 AI 生成的 Mermaid 源代码。
    * 集成 Excalidraw 进行图表的可视化渲染。
    * 支持在 Excalidraw 画布上对图表进行二次编辑和导出（如 PNG, SVG）。

### 🔧 高级功能

* **自定义 AI 配置**:
    * 支持配置您自己的 AI 服务 API（OpenAI、Azure OpenAI、其他兼容服务）
    * 可自定义 API URL、API Key 和模型名称
    * 配置自己的 AI 服务后享有无限使用权限

* **访问权限管理**:
    * 内置访问密码功能，验证通过后可享有无限使用权限
    * 支持多种使用模式：免费限量 → 密码验证 → 自定义配置

* **使用量统计**:
    * 实时显示剩余使用次数
    * 本地存储使用记录，按日重置

## 使用权限说明

Smart Mermaid 提供三种使用模式：

### 📊 免费模式
- **限制**: 每日 5 次免费生成
- **适用**: 轻量级用户，偶尔使用
- **无需配置**: 开箱即用

### 🔑 密码模式  
- **权限**: 输入访问密码后享有无限使用
- **适用**: 经授权的用户
- **获取方式**: 联系作者获取访问密码

### ⚙️ 自定义配置模式
- **权限**: 无限制使用
- **适用**: 有自己 AI 服务的用户  
- **配置**: 在设置中填入您的 API 配置
- **优势**: 完全自主控制，无依赖

## 使用方法

### 基础使用流程

1.  **输入描述文本**:
    * 在左侧的文本区域直接输入或粘贴您的图表描述。
    * 或者点击上传按钮，选择本地的 `.txt`, `.md`, 或 `.docx` 文件。

2.  **选择图表类型**:
    * 从下拉菜单中选择您期望生成的图表类型（如流程图、序列图等）。
    * 您也可以选择"自动选择"，让 AI 根据文本内容判断最合适的图表类型。

3.  **生成图表**:
    * 点击"生成图表"按钮。
    * AI 将开始处理您的文本，并在右侧区域显示生成的 Mermaid 代码和 Excalidraw 渲染的图表。

4.  **查看与编辑**:
    * 您可以直接在 Mermaid 代码区域查看或修改代码，图表会实时更新。
    * Excalidraw 画布支持对图表元素进行拖拽、修改样式等操作，并可导出图表。

### 解锁无限使用

#### 方法一：使用访问密码
1. 点击右上角的设置按钮
2. 在"访问密码"选项卡中输入密码
3. 验证成功后即可享有无限使用权限

#### 方法二：配置自定义 AI 服务
1. 点击右上角的设置按钮
2. 在"AI 配置"选项卡中填入您的配置：
   - **API URL**: 您的 AI 服务地址（如：`https://api.openai.com/v1`）
   - **API Key**: 您的 API 密钥
   - **模型名称**: 使用的模型（如：`gpt-3.5-turbo`, `gpt-4`等）
3. 保存配置后即可无限使用

#### 获取访问权限
- **联系作者**: 扫描应用内二维码或通过 GitHub Issues 联系
- **自备 AI 服务**: 使用您自己的 OpenAI API Key 或其他兼容服务

## 技术选型

* **前端框架**: Next.js 15 (采用 App Router)
* **UI 组件库**: shadcn/ui
* **CSS 框架**: Tailwind CSS
* **图表渲染与处理**:
    * Excalidraw (`@excalidraw/excalidraw`)
    * Mermaid 到 Excalidraw 转换 (`@excalidraw/mermaid-to-excalidraw`)
* **文件解析**: mammoth (用于处理 `.docx` 文件)
* **AI 服务**: 兼容 OpenAI API 模式

## 本地部署指南

### 环境要求

* Node.js 18.x 或更高版本
* npm 或 yarn 包管理工具

### 安装步骤

1.  **克隆代码仓库**:
    ```bash
    git clone [https://github.com/yourusername/smart-mermaid.git](https://github.com/yourusername/smart-mermaid.git)
    cd smart-mermaid
    ```
    *(请将 `yourusername` 替换为实际的仓库路径)*

2.  **安装项目依赖**:
    ```bash
    npm install
    # 或者
    yarn install
    ```

3.  **配置环境变量**:
    在项目根目录下创建 `.env.local` 文件，并填入以下配置：
    ```plaintext
    # AI 服务配置（必需）
    AI_API_URL=https://api.openai.com/v1
    AI_API_KEY=在此处填入您的API密钥
    AI_MODEL_NAME=gpt-3.5-turbo
    
    # 应用配置
    NEXT_PUBLIC_MAX_CHARS=20000
    NEXT_PUBLIC_DAILY_USAGE_LIMIT=5
    
    # 访问密码（可选）
    ACCESS_PASSWORD=设置您的访问密码
    ```

    **环境变量说明**:
    * `AI_API_URL`: AI 服务 API 的基础地址（不包含 `/chat/completions`）
    * `AI_API_KEY`: 您的 AI 服务 API 密钥
    * `AI_MODEL_NAME`: 指定使用的 AI 模型名称
    * `NEXT_PUBLIC_MAX_CHARS`: 允许用户输入的最大字符数（默认 20,000）
    * `NEXT_PUBLIC_DAILY_USAGE_LIMIT`: 每用户每日免费使用次数限制（默认 5）
    * `ACCESS_PASSWORD`: 可选，设置后用户可通过输入此密码获得无限使用权限

4.  **启动开发服务器**:
    ```bash
    npm run dev
    # 或者
    yarn dev
    ```

5.  **访问应用**:
    在浏览器中打开 `http://localhost:3000` 即可访问本地部署的应用。


## 欢迎贡献与反馈

如果您在使用过程中遇到任何问题，或有功能建议，欢迎通过 GitHub Issues 提出。也欢迎您 Fork本项目并提交 Pull Requests 参与贡献！

如果这个项目对您有帮助，请给我们一个 ⭐️ Star！
