/**
 * 生日祝福网站 - JavaScript
 * 包含粒子背景、蛋糕动画、贺卡系统、音乐视频控制、心愿瓶功能
 */

// ==================== 全局变量 ====================
const messages = [
    "愿你的每一天都充满阳光和欢笑 🌞",
    "新的一岁，愿所有的梦想都能实现 ✨",
    "愿你永远保持年轻的心，永远快乐 🎈",
    "愿幸福和好运永远围绕着你 💫",
    "愿你的人生像彩虹一样绚丽多彩 🌈"
];

let currentCard = 0;
let candleCount = 0;
const totalCandles = 3;
let isVideoPlaying = false;

// ==================== 粒子背景系统 ====================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 80;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = `rgba(255, ${Math.floor(Math.random() * 150 + 100)}, ${Math.floor(Math.random() * 100 + 150)}, ${this.opacity})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    resizeCanvas();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

// ==================== 页面切换 ====================
function startWishes() {
    const name = document.getElementById('nameInput').value.trim();
    const birthday = document.getElementById('birthdayInput').value;

    if (!name) {
        alert('请输入TA的名字 💝');
        document.getElementById('nameInput').focus();
        return;
    }

    // 保存数据到本地存储
    localStorage.setItem('birthdayName', name);
    localStorage.setItem('birthdayDate', birthday);

    // 隐藏输入页，显示祝福页
    document.getElementById('inputPage').classList.add('hidden');
    document.getElementById('wishPage').classList.remove('hidden');
    document.getElementById('wishPage').style.position = 'relative';
    document.getElementById('wishPage').style.opacity = '1';
    document.getElementById('wishPage').style.pointerEvents = 'auto';

    // 更新显示
    document.getElementById('displayName').textContent = name;
    
    if (birthday) {
        const date = new Date(birthday);
        document.getElementById('displayDate').textContent = 
            `🎂 ${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    }

    // 初始化贺卡系统
    updateCard();
    initCardDots();
}

// ==================== 蛋糕蜡烛系统 ====================
function lightCandle() {
    if (candleCount >= totalCandles) return;

    const candle = document.getElementById(`candle${candleCount + 1}`);
    candle.classList.add('lit');
    candleCount++;

    // 所有蜡烛都点亮后庆祝
    if (candleCount === totalCandles) {
        setTimeout(() => {
            celebrate();
        }, 500);
    }
}

function celebrate() {
    const cake = document.getElementById('cake');
    cake.classList.add('complete');
    document.getElementById('cakeHint').textContent = '🎉 生日快乐! 🎉';
    document.getElementById('cakeHint').style.color = '#feca57';
    document.getElementById('cakeHint').style.fontSize = '1.2rem';
    
    // 彩纸庆祝
    createConfetti();
    
    // 播放视频
    playVideo();
    
    // 每隔一段时间再次庆祝
    setInterval(createConfetti, 3000);
}

// ==================== 彩纸特效 ====================
function createConfetti() {
    const decorations = document.getElementById('decorations');
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        decorations.appendChild(confetti);
        
        setTimeout(() => {
            confetti.classList.add('fall');
        }, 100);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// ==================== 贺卡系统 ====================
function flipCard() {
    const card = document.getElementById('birthdayCard');
    card.classList.toggle('flipped');
}

function nextCard() {
    currentCard = (currentCard + 1) % messages.length;
    updateCard();
}

function prevCard() {
    currentCard = (currentCard - 1 + messages.length) % messages.length;
    updateCard();
}

function updateCard() {
    const cardText = document.getElementById('cardText');
    cardText.textContent = messages[currentCard];
    document.getElementById('birthdayCard').classList.remove('flipped');
    updateCardDots();
}

function initCardDots() {
    const dotsContainer = document.getElementById('cardDots');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < messages.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'card-dot' + (i === currentCard ? ' active' : '');
        dotsContainer.appendChild(dot);
    }
}

function updateCardDots() {
    const dots = document.querySelectorAll('.card-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentCard);
    });
}

// ==================== 视频/音频控制 ====================
function playVideo() {
    const video = document.getElementById('birthdayVideo');
    const videoBtn = document.getElementById('videoBtn');
    
    // iOS需要用户交互后才能播放
    video.play().then(() => {
        isVideoPlaying = true;
        videoBtn.classList.add('playing');
    }).catch(e => {
        console.log('需要用户交互才能播放视频');
    });
}

function toggleVideo() {
    const video = document.getElementById('birthdayVideo');
    const videoBtn = document.getElementById('videoBtn');
    const videoIcon = document.getElementById('videoIcon');

    if (isVideoPlaying) {
        video.pause();
        videoBtn.classList.remove('playing');
        videoIcon.textContent = '🔇';
    } else {
        video.play().then(() => {
            videoBtn.classList.add('playing');
            videoIcon.textContent = '🎵';
        });
    }
    isVideoPlaying = !isVideoPlaying;
}

// ==================== 心愿瓶系统 ====================
function openBottleModal() {
    document.getElementById('bottleModal').classList.add('show');
}

function closeBottleModal() {
    document.getElementById('bottleModal').classList.remove('show');
}

function saveWish() {
    const wish = document.getElementById('wishText').value.trim();
    if (wish) {
        // 保存到本地存储
        const wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
        wishes.push({
            text: wish,
            date: new Date().toLocaleDateString()
        });
        localStorage.setItem('wishes', JSON.stringify(wishes));
        
        alert('💝 心愿已存入瓶中!');
        document.getElementById('wishText').value = '';
        closeBottleModal();
    } else {
        alert('请先写下您的心愿 ✨');
    }
}

// 点击外部关闭弹窗
document.getElementById('bottleModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeBottleModal();
    }
});

// 键盘回车提交心愿
document.getElementById('wishText').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        saveWish();
    }
});

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子背景
    initParticles();
    animateParticles();
    
    // 监听窗口大小变化
    window.addEventListener('resize', resizeCanvas);
    
    // 加载已保存的数据
    const savedName = localStorage.getItem('birthdayName');
    if (savedName) {
        console.log('Welcome back! Saved birthday:', savedName);
    }

    // iOS Safari 处理
    if (document.readyState === 'complete') {
        document.body.style.position = 'relative';
    }
});

// 页面加载完成后移除fixed
window.addEventListener('load', function() {
    document.body.style.position = 'relative';
    document.body.style.height = 'auto';
    document.body.style.overflowY = 'auto';
});

// 音频/视频错误处理
const video = document.getElementById('birthdayVideo');
video.addEventListener('error', function(e) {
    console.log('视频加载失败，将使用静音模式');
    document.getElementById('videoBtn').style.opacity = '0.5';
});