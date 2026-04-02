# 🎂 生日祝福网站 - 部署指南

## 📁 文件位置
```
F:\02_游戏娱乐\生日祝福网站\
├── index.html      (网站主页)
├── style.css       (样式文件)
├── script.js       (脚本文件)
├── 生日快乐.mp4    (生日视频/音乐)
├── README.md       (本文件)
└── SPEC.md         (技术规范)
```

---

## 🚀 部署到网上（让所有人都能访问）

### 方法1：GitHub Pages（免费，推荐）

#### 第1步：创建GitHub仓库
1. 访问 [github.com](https://github.com) 注册/登录
2. 点击右上角 **"+"** → **"New repository"**
3. 仓库名: `birthday-wish`
4.设为 **Public**
5. 点击 **Create repository**

#### 第2步：上传文件
1. 进入仓库，点击 **"uploading an existing file"**
2. 将以下4个文件拖进去：
   - index.html
   - style.css  
   - script.js
   - 生日快乐.mp4
3. 点击 **Commit changes**

#### 第3步：启用GitHub Pages
1. 进入仓库 → **Settings** → **Pages**
2. Build 设置为 **"Deploy from a branch"**
3. Branch 设为 **"main"** (或 master)
4. 点击 **Save**
5. 等待1-2分钟后刷新，会得到链接如：
   ```
   https://你的用户名.github.io/birthday-wish/
   ```

---

### 方法2：Vercel（国内访问快）

1. 访问 [vercel.com](https://vercel.com) 用GitHub登录
2. 点击 **"New Project"**
3. 拖拽文件夹 `生日祝福网站` 进去
4. 部署完成得到链接

---

### 方法3：阿里云OSS / 腾讯云COS（适合大文件）

如果视频文件大，可以用对象存储服务上传。

---

## 📱 手机端使用

- **iOS (苹果)**：Safari浏览器打开链接即可
- **Android**：Chrome/Edge浏览器打开链接即可
- 视频已添加 `playsinline` 属性，兼容iOS全屏播放

---

## 💡 常见问题

### Q: 视频无法播放？
A: 
- 首次进入需要点击右下角按钮触发播放
- iOS Safari需要用户交互后才能自动播放
- 检查网络链接是否正确

### Q: 如何修改祝福语？
A: 打开 `script.js` 文件，找到第7行 `const messages` 数组，修改里面的文字

### Q: 视频文件太大上传失败？
A: GitHub单文件限制100MB，你的2.9MB没问题。如果更大建议压缩或用专业视频托管。

---

## 🎨 自定义修改

### 修改祝福语
打开 `script.js` 文件：
```javascript
const messages = [
    "愿你的每一天都充满阳光和欢笑 🌞",
    "新的一岁，愿所有的梦想都能实现 ✨",
    // 在这里添加更多...
];
```

### 修改蛋糕样式
打开 `style.css` 文件，找到 `.cake-layer` 修改颜色

---

**立即打开 `index.html` 本地测试，然后部署到网上分享给TA吧！** 🎂

Made with 💝