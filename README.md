# 美容店预约系统

这是一个基于 Node.js 和 Supabase 构建的简单美容店预约管理系统。

## 功能

- 添加新的预约
- 查看所有预约列表
- 编辑已有的预约
- 删除预约
- 按日期查询预约

## 技术栈

- **后端:** Node.js, Express.js
- **数据库:** Supabase (PostgreSQL)
- **前端:** HTML, CSS, JavaScript (无框架)

## 如何运行

1.  **设置 Supabase**
    - 前往 [Supabase](https://supabase.com/) 并创建一个新项目。
    - 在项目的 SQL Editor 中，运行 `create_appointments_table.sql` 脚本以创建 `appointments` 表。
    - 在 `appointment_system.js` 文件中，将 `supabaseUrl` 和 `supabaseKey` 替换为您自己的项目URL和anon key。

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **启动后端服务器**
    ```bash
    npm start
    ```
    服务器将在 `http://localhost:3000` 上运行。

4.  **访问前端**
    在浏览器中打开 `public/index.html` 文件，或者直接访问 `http://localhost:3000`。

## 文件结构

```
.
├── public/
│   ├── index.html       # 前端主页面
│   ├── styles.css       # 样式文件
│   └── app.js           # 前端逻辑
├── appointment_system.js  # 后端服务器
├── create_appointments_table.sql # 数据库表结构
└── package.json         # 项目依赖
``` 