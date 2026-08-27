// ============================================================
// 🔥 تمام کدهای جاوااسکریپت بازی
// ============================================================

// ============================================================
// 1. تنظیمات اولیه و متغیرها
// ============================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { alpha:false, desynchronized:true });

let W = 0, H = 0, scale = 1;

function resize(){
    W = window.innerWidth;
    H = window.innerHeight;
    scale = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(W * scale);
    canvas.height = Math.floor(H * scale);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
}
resize();
window.addEventListener("resize", resize);

const scoreText = document.getElementById("score");
const bestText = document.getElementById("best");
const comboBox = document.getElementById("combo");
const comboValue = document.getElementById("comboValue");
const startScreen = document.getElementById("startScreen");
const gameOver = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const recordText = document.getElementById("record");
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
const menuButton = document.getElementById("menuButton");
const menuPanel = document.getElementById("menuPanel");
const gamesValue = document.getElementById("gamesValue");
const walletBest = document.getElementById("walletBest");
const walletEggs = document.getElementById("walletEggs");
const walletScore = document.getElementById("walletScore");
const finalGames = document.getElementById("finalGames");
const finalEggs = document.getElementById("finalEggs");
const changeThemeBtn = document.getElementById("changeThemeBtn");
const openThemeStartBtn = document.getElementById("openThemeStartBtn");
const openThemeFromMenu = document.getElementById("openThemeFromMenu");
const themeSelectorOverlay = document.getElementById("themeSelectorOverlay");
const closeThemeSelector = document.getElementById("closeThemeSelector");
const currentThemeDisplay = document.getElementById("currentThemeDisplay");
const startThemeLabel = document.getElementById("startThemeLabel");

const myReferralCode = document.getElementById("myReferralCode");
const referralCount = document.getElementById("referralCount");
const copyBtn = document.getElementById("copyReferralCode");

const powerupTimer = document.getElementById('powerupTimer');
const shieldTimeDisplay = document.getElementById('shieldTimeDisplay');
const speedTimeDisplay = document.getElementById('speedTimeDisplay');
const gemTimeDisplay = document.getElementById('gemTimeDisplay');

const shieldTimerItem = document.getElementById('shieldTimer');
const speedTimerItem = document.getElementById('speedTimer');
const gemTimerItem = document.getElementById('gemTimer');

const noInternetOverlay = document.getElementById('noInternetOverlay');
const retryBtn = document.getElementById('retryBtn');

const WEBHOOK_URL = "https://benula-webhook-production.up.railway.app";

// ============================================================
// 2. تم‌های جدید (به جز زمستانی، پاییزی، هالووین، کریسمس)
// ============================================================

const themeConfigs = {
    classic: {
        id: "classic",
        icon: "☀️",
        nameEn: "Classic",
        nameFa: "کلاسیک",
        descEn: "Original summer",
        descFa: "تابستانی اصلی",
        skyDay: ["#87CEEB", "#a8d8f0", "#c8e8f5"],
        skyNight: ["#0a1525", "#152535", "#1a2a40"],
        groundDay: ["#7dbb4b", "#6aaa3a", "#55963b"],
        groundNight: ["#2a3a2a", "#1a2a1a", "#0a1a0a"],
        eggColors: [
            ["#ffffff", 1], ["#45d46b", 2], ["#3498db", 5], ["#a855f7", 10], ["#ffd43b", 25]
        ],
        foxColor: "#f97316",
        treeColor: "#6a4a2a",
        rockColor: "#7a8a9a",
        isSpace: false
    },
    city: {
        id: "city",
        icon: "🏙️",
        nameEn: "City",
        nameFa: "شهری",
        descEn: "Urban streets",
        descFa: "خیابان‌های شهری",
        skyDay: ["#b8c8d8", "#d0dce8", "#e0e8f0"],
        skyNight: ["#0a1520", "#15202a", "#1a2a3a"],
        groundDay: ["#8a9aa8", "#7a8a98", "#6a7a88"],
        groundNight: ["#3a4a5a", "#2a3a4a", "#1a2a3a"],
        eggColors: [
            ["#e8eef0", 1], ["#b8c8d8", 2], ["#8898a8", 5], ["#5a6a7a", 10], ["#c8d8e0", 25]
        ],
        foxColor: "#d47a3a",
        treeColor: "#6a4a2a",
        rockColor: "#7a8a9a",
        isSpace: false
    },
    beach: {
        id: "beach",
        icon: "🏖️",
        nameEn: "Beach",
        nameFa: "ساحلی",
        descEn: "Sun & sand",
        descFa: "آفتاب و شن",
        skyDay: ["#87CEEB", "#b0d8f0", "#d0e8f5"],
        skyNight: ["#0a1a2a", "#152535", "#1a2a40"],
        groundDay: ["#f0d8a0", "#e8c888", "#d4b070"],
        groundNight: ["#5a4a2a", "#4a3a1a", "#3a2a10"],
        eggColors: [
            ["#f5e8c8", 1], ["#f0c878", 2], ["#e8a848", 5], ["#d48838", 10], ["#f5d898", 25]
        ],
        foxColor: "#d47a3a",
        treeColor: "#6a5a3a",
        rockColor: "#b8a888",
        isSpace: false
    },
    forest: {
        id: "forest",
        icon: "🌲",
        nameEn: "Forest",
        nameFa: "جنگلی",
        descEn: "Deep woods",
        descFa: "جنگل انبوه",
        skyDay: ["#6a9a6a", "#7aaa7a", "#8aba8a"],
        skyNight: ["#0a1a0a", "#152a15", "#1a3a1a"],
        groundDay: ["#3a5a2a", "#2a4a1a", "#1a3a0a"],
        groundNight: ["#1a2a0a", "#0a1a0a", "#050a00"],
        eggColors: [
            ["#d4e8c8", 1], ["#a8c878", 2], ["#6a9a3a", 5], ["#3a6a1a", 10], ["#c8e8a8", 25]
        ],
        foxColor: "#d47a3a",
        treeColor: "#3a2a1a",
        rockColor: "#5a6a4a",
        isSpace: false
    },
    space: {
        id: "space",
        icon: "🚀",
        nameEn: "Space",
        nameFa: "فضایی",
        descEn: "Galaxy fox",
        descFa: "روباه کهکشانی",
        skyDay: ["#1a0a3a", "#2a1a4a", "#3a2a5a"],
        skyNight: ["#0a0a1a", "#0a0a2a", "#1a0a2a"],
        groundDay: ["#3a2a4a", "#4a3a5a", "#5a4a6a"],
        groundNight: ["#1a0a2a", "#0a0a1a", "#05000a"],
        eggColors: [
            ["#c8a8e8", 1], ["#a878d8", 2], ["#f0d060", 5], ["#6a3a9a", 10], ["#e8e0f0", 25]
        ],
        foxColor: "#a878d8",
        treeColor: "#4a2a6a",
        rockColor: "#5a4a6a",
        isSpace: true
    },
    night: {
        id: "night",
        icon: "🌙",
        nameEn: "Night",
        nameFa: "شب",
        descEn: "Dark & stars",
        descFa: "تاریک و ستاره‌ها",
        skyDay: ["#1a1a2e", "#16213e", "#0f3460"],
        skyNight: ["#0a0a1a", "#0a0a2a", "#1a0a2a"],
        groundDay: ["#2a2a3a", "#1a1a2a", "#0a0a1a"],
        groundNight: ["#1a0a2a", "#0a0a1a", "#05000a"],
        eggColors: [
            ["#e8e0f0", 1], ["#c8b8e8", 2], ["#a898d8", 5], ["#8878c8", 10], ["#d8c8f0", 25]
        ],
        foxColor: "#d47a3a",
        treeColor: "#3a2a5a",
        rockColor: "#5a4a6a",
        isSpace: false
    },
    // ============================================================
    // 🔥 تم‌های جدید (به جز زمستانی، پاییزی، هالووین، کریسمس)
    // ============================================================
    volcano: {
        id: "volcano",
        icon: "🌋",
        nameEn: "Volcano",
        nameFa: "آتشفشانی",
        descEn: "Lava & fire",
        descFa: "گدازه و آتش",
        skyDay: ["#4a1a0a", "#6a2a0a", "#8a3a0a"],
        skyNight: ["#2a0a0a", "#3a0a0a", "#4a0a0a"],
        groundDay: ["#2a1a0a", "#1a0a0a", "#0a0a0a"],
        groundNight: ["#1a0a0a", "#0a0a0a", "#050000"],
        eggColors: [
            ["#ff6b35", 1], ["#ff4500", 2], ["#ff8c00", 5], ["#dc143c", 10], ["#ffd700", 25]
        ],
        foxColor: "#ff4500",
        treeColor: "#8b4513",
        rockColor: "#4a4a4a",
        isSpace: false
    },
    ocean: {
        id: "ocean",
        icon: "🌊",
        nameEn: "Ocean",
        nameFa: "اقیانوسی",
        descEn: "Deep blue sea",
        descFa: "دریای آبی عمیق",
        skyDay: ["#006994", "#0088b0", "#00a0c0"],
        skyNight: ["#001a30", "#002a40", "#003a50"],
        groundDay: ["#f4d03f", "#e8c840", "#d4b840"],
        groundNight: ["#2a3a2a", "#1a2a1a", "#0a1a0a"],
        eggColors: [
            ["#7fffd4", 1], ["#00ced1", 2], ["#4682b4", 5], ["#1e90ff", 10], ["#00bfff", 25]
        ],
        foxColor: "#1e90ff",
        treeColor: "#2f4f4f",
        rockColor: "#5f9ea0",
        isSpace: false
    },
    desert: {
        id: "desert",
        icon: "🏜️",
        nameEn: "Desert",
        nameFa: "صحرایی",
        descEn: "Golden sands",
        descFa: "شن‌های طلایی",
        skyDay: ["#f4a460", "#f5b86e", "#f7c88c"],
        skyNight: ["#1a0f0a", "#2a1a0a", "#3a2a0a"],
        groundDay: ["#d4a050", "#c89040", "#b88030"],
        groundNight: ["#3a2a0a", "#2a1a0a", "#1a0a0a"],
        eggColors: [
            ["#f5deb3", 1], ["#deb887", 2], ["#d2b48c", 5], ["#cd853f", 10], ["#f4a460", 25]
        ],
        foxColor: "#cd853f",
        treeColor: "#8b6914",
        rockColor: "#a08a6a",
        isSpace: false
    },
    magic: {
        id: "magic",
        icon: "✨",
        nameEn: "Magic",
        nameFa: "جادویی",
        descEn: "Enchanted forest",
        descFa: "جنگل جادویی",
        skyDay: ["#4a1a6a", "#6a2a8a", "#8a3aaa"],
        skyNight: ["#1a0a2a", "#2a0a3a", "#3a0a4a"],
        groundDay: ["#3a2a4a", "#2a1a3a", "#1a0a2a"],
        groundNight: ["#1a0a2a", "#0a0a1a", "#05000a"],
        eggColors: [
            ["#e8d0f0", 1], ["#d4a0e8", 2], ["#c070d0", 5], ["#a040b0", 10], ["#f0d8ff", 25]
        ],
        foxColor: "#8b5cf6",
        treeColor: "#5a2a6a",
        rockColor: "#6a4a7a",
        isSpace: false
    },
    toon: {
        id: "toon",
        icon: "🎨",
        nameEn: "Toon",
        nameFa: "کارتونی",
        descEn: "Cartoon world",
        descFa: "دنیای کارتونی",
        skyDay: ["#87CEEB", "#90d8f0", "#a0e0f5"],
        skyNight: ["#1a1a3a", "#2a2a4a", "#3a3a5a"],
        groundDay: ["#4ade80", "#3ab870", "#2aa060"],
        groundNight: ["#1a2a1a", "#0a1a0a", "#050a05"],
        eggColors: [
            ["#ff6b6b", 1], ["#feca57", 2], ["#48dbfb", 5], ["#ff9ff3", 10], ["#f368e0", 25]
        ],
        foxColor: "#f0932b",
        treeColor: "#6ab04c",
        rockColor: "#badc58",
        isSpace: false
    },
    cyberpunk: {
        id: "cyberpunk",
        icon: "💜",
        nameEn: "Cyberpunk",
        nameFa: "سایبرپانک",
        descEn: "Neon future",
        descFa: "آینده نئونی",
        skyDay: ["#1a0a2a", "#2a1a3a", "#3a2a4a"],
        skyNight: ["#0a001a", "#1a002a", "#2a003a"],
        groundDay: ["#1a1a2a", "#2a2a3a", "#3a3a4a"],
        groundNight: ["#0a0a1a", "#1a0a2a", "#2a0a3a"],
        eggColors: [
            ["#ff6bff", 1], ["#00ffff", 2], ["#ff00ff", 5], ["#00ff00", 10], ["#ffff00", 25]
        ],
        foxColor: "#ff2d95",
        treeColor: "#ff0066",
        rockColor: "#7a3a9a",
        isSpace: false
    }
};

// ============================================================
// 3. اسکین‌های روباه
// ============================================================

const FOX_SKINS = [
    { 
        id: 'classic', 
        name: 'Classic Fox', 
        nameFa: 'روباه کلاسیک', 
        color: '#f97316', 
        price: 0, 
        rarity: 'common', 
        trailColor: 'rgba(249,115,22,0.3)',
        glowColor: '#f97316',
        eyeColor: '#1a1a2a',
        desc: '🔥 Orange trail'
    },
    { 
        id: 'ember', 
        name: 'Ember Fox', 
        nameFa: 'روباه آتشین', 
        color: '#ef4444', 
        price: 250000, 
        rarity: 'uncommon', 
        trailColor: 'rgba(239,68,68,0.3)',
        glowColor: '#ff6b35',
        eyeColor: '#fbbf24',
        desc: '💥 Fire sparks'
    },
    { 
        id: 'frost', 
        name: 'Frost Fox', 
        nameFa: 'روباه یخی', 
        color: '#3b82f6', 
        price: 500000, 
        rarity: 'uncommon', 
        trailColor: 'rgba(59,130,246,0.3)',
        glowColor: '#93c5fd',
        eyeColor: '#ffffff',
        desc: '❄️ Ice trail'
    },
    { 
        id: 'shadow', 
        name: 'Shadow Fox', 
        nameFa: 'روباه شب', 
        color: '#7c3aed', 
        price: 1000000, 
        rarity: 'rare', 
        trailColor: 'rgba(124,58,237,0.3)',
        glowColor: '#4ade80',
        eyeColor: '#4ade80',
        desc: '🌑 Purple shadow'
    },
    { 
        id: 'golden', 
        name: 'Golden Fox', 
        nameFa: 'روباه طلایی', 
        color: '#fbbf24', 
        price: 1750000, 
        rarity: 'rare', 
        trailColor: 'rgba(251,191,36,0.3)',
        glowColor: '#fcd34d',
        eyeColor: '#78350f',
        desc: '✨ Gold trail'
    },
    { 
        id: 'neon', 
        name: 'Neon Fox', 
        nameFa: 'روباه نئونی', 
        color: '#ec4899', 
        price: 2500000, 
        rarity: 'epic', 
        trailColor: 'rgba(236,72,153,0.3)',
        glowColor: '#f472b6',
        eyeColor: '#3b82f6',
        desc: '💜 Neon trail'
    },
    { 
        id: 'crystal', 
        name: 'Crystal Fox', 
        nameFa: 'روباه کریستالی', 
        color: '#8b5cf6', 
        price: 4000000, 
        rarity: 'epic', 
        trailColor: 'rgba(139,92,246,0.3)',
        glowColor: '#a78bfa',
        eyeColor: '#c4b5d4',
        desc: '💎 Crystal trail'
    },
    { 
        id: 'galaxy', 
        name: 'Galaxy Fox', 
        nameFa: 'روباه کهکشانی', 
        color: '#1e1b4b', 
        price: 7500000, 
        rarity: 'legendary', 
        trailColor: 'rgba(129,140,248,0.3)',
        glowColor: '#818cf8',
        eyeColor: '#c7d2fe',
        desc: '🌌 Galaxy trail'
    },
    { 
        id: 'rainbow', 
        name: 'Rainbow Fox', 
        nameFa: 'روباه رنگین‌کمان', 
        color: 'rainbow', 
        price: 12500000, 
        rarity: 'legendary', 
        trailColor: 'rgba(255,255,255,0.2)',
        glowColor: null,
        eyeColor: '#ffffff',
        desc: '🌈 Rainbow trail'
    },
    { 
        id: 'phoenix', 
        name: 'Phoenix Fox', 
        nameFa: 'روباه ققنوس', 
        color: '#dc2626', 
        price: 25000000, 
        rarity: 'mythic', 
        trailColor: 'rgba(220,38,38,0.3)',
        glowColor: '#f97316',
        eyeColor: '#fcd34d',
        desc: '🔥 Phoenix trail'
    }
];

// ============================================================
// 4. متغیرهای اصلی بازی
// ============================================================

let isOnline = true;
let audioContext = null;
let musicMaster = null;
let musicTimer = null;
let musicStep = 0;
let soundEnabled = localStorage.getItem("foxSound") !== "off";

let currentTheme = localStorage.getItem("foxTheme") || "classic";
let language = localStorage.getItem("foxLanguage") || "en";
let currentSkinId = localStorage.getItem('foxSkin') || 'classic';
let purchasedSkins = JSON.parse(localStorage.getItem('purchasedSkins') || '["classic"]');

let best = loadNumber("foxBest");
let gamesPlayed = loadNumber("foxGames");
let totalEggs = loadNumber("foxEggs");
let totalScore = loadNumber("foxTotalScore");

let playing = false;
let score = 0;
let speed = 330;
let lastTime = 0;
let eggTimer = 0;
let obstacleTimer = 1;
let combo = 0;
let comboTimer = 0;
let eggs = [];
let obstacles = [];
let powerups = [];
let particles = [];
let shieldActive = false;
let shieldHits = 0;
let shieldTimer = 0;
let speedBoostActive = false;
let speedBoostTimer = 0;
let gemActive = false;
let gemTimer = 0;
let powerupTimerValue = 0;
let gameTime = 0;
let shieldTimeout = null;
let isNight = false;
let lastDayCycle = -1;
let MAX_PARTICLES = 12;

const POWERUP_CONFIG = {
    shield: { 
        duration: 15,
        color: '#4fc3f7', 
        icon: '🛡️', 
        spawnRate: 0.02,
        startTime: 10,
        maxHits: 1
    },
    speed: { 
        duration: 15,
        color: '#ffd54f', 
        icon: '⚡', 
        spawnRate: 0.02,
        startTime: 10,
        speedMultiplier: 1.2
    },
    gem: { 
        duration: 12,
        color: '#f472b6', 
        icon: '💎', 
        spawnRate: 0.02,
        startTime: 10
    }
};

const fox = {
    x:100, y:0, w:62, h:48, vy:0, gravity:2100, jump:-780, grounded:true, animation:0
};

// ============================================================
// 5. توابع کمکی
// ============================================================

function loadNumber(key, defaultValue = 0){
    try{
        const value = localStorage.getItem(key);
        if(value === null){ localStorage.setItem(key, String(defaultValue)); return defaultValue; }
        const number = Number(value);
        if(Number.isFinite(number)) return number;
        localStorage.setItem(key, String(defaultValue));
        return defaultValue;
    }catch(error){ return defaultValue; }
}

function saveWallet(){
    try{
        localStorage.setItem("foxBest", String(best));
        localStorage.setItem("foxGames", String(gamesPlayed));
        localStorage.setItem("foxEggs", String(totalEggs));
        localStorage.setItem("foxTotalScore", String(totalScore));
    }catch(error){}
}

function ground(){ return H * .72; }

function getTheme() {
    return themeConfigs[currentTheme] || themeConfigs.classic;
}

function getThemeName(themeId) {
    const t = themeConfigs[themeId];
    if (!t) return themeId;
    return language === 'fa' ? t.nameFa : t.nameEn;
}

function getThemeDesc(themeId) {
    const t = themeConfigs[themeId];
    if (!t) return '';
    return language === 'fa' ? t.descFa : t.descEn;
}

function getSkin(id) {
    return FOX_SKINS.find(s => s.id === id) || FOX_SKINS[0];
}

function isSkinOwned(id) {
    return purchasedSkins.includes(id);
}

function isSkinActive(id) {
    return currentSkinId === id;
}

function getRarityLabel(rarity) {
    const labels = {
        'common': { fa: 'معمولی', en: 'Common' },
        'uncommon': { fa: 'نادر', en: 'Uncommon' },
        'rare': { fa: 'کمیاب', en: 'Rare' },
        'epic': { fa: 'حماسی', en: 'Epic' },
        'legendary': { fa: 'افسانه‌ای', en: 'Legendary' },
        'mythic': { fa: 'اسطوره‌ای', en: 'Mythic' }
    };
    return labels[rarity] ? (language === 'fa' ? labels[rarity].fa : labels[rarity].en) : rarity;
}

function getEggColors() {
    return getTheme().eggColors;
}

function updateSpeed(){
    let baseSpeed = 330;
    if(score <= 600){
        const progress = Math.max(0, Math.min(score / 600, 1));
        const smooth = progress * progress * (3 - 2 * progress);
        baseSpeed = 330 + 870 * smooth;
    }else{
        baseSpeed = 1200 + (score - 600) * .12;
    }
    speed = speedBoostActive ? baseSpeed * 1.2 : baseSpeed;
}

function updateDayNight(){
    const cycle = Math.floor(score / 100);
    isNight = cycle % 2 === 1;
    if(cycle !== lastDayCycle) lastDayCycle = cycle;
}

function resetFox(){
    fox.x = Math.max(70, W * .14);
    fox.y = ground() - fox.h;
    fox.vy = 0;
    fox.grounded = true;
    fox.animation = 0;
}

function collision(a,b){
    return(
        a.x + 8 < b.x + b.w &&
        a.x + a.w - 8 > b.x &&
        a.y + 7 < b.y + b.h &&
        a.y + a.h - 5 > b.y
    );
}

function jump(){
    if(!playing) return;
    if(fox.grounded){
        fox.vy = fox.jump;
        fox.grounded = false;
    }
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.style.display = 'block';
    toast.className = '';
    void toast.offsetWidth;
    toast.style.animation = 'fadeInUp 0.3s ease';
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.style.animation = 'fadeOutDown 0.3s ease';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 300);
    }, 2500);
}

// ============================================================
// 6. توابع صدا
// ============================================================

function initAudio(){
    if(audioContext) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if(!AudioCtx) return;
    audioContext = new AudioCtx();
    musicMaster = audioContext.createGain();
    musicMaster.gain.value = soundEnabled ? 0.075 : 0;
    musicMaster.connect(audioContext.destination);
}

function playTone(frequency, duration, type="square", volume=.08, delay=0){
    if(!audioContext || !soundEnabled) return;
    const now = audioContext.currentTime + delay;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + .008);
    gain.gain.exponentialRampToValueAtTime(.001, now + duration);
    oscillator.connect(gain);
    gain.connect(musicMaster);
    oscillator.start(now);
    oscillator.stop(now + duration + .03);
}

function playKick(){
    if(!audioContext || !soundEnabled) return;
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(120, now);
    oscillator.frequency.exponentialRampToValueAtTime(45, now + .12);
    gain.gain.setValueAtTime(.12, now);
    gain.gain.exponentialRampToValueAtTime(.001, now + .14);
    oscillator.connect(gain);
    gain.connect(musicMaster);
    oscillator.start(now);
    oscillator.stop(now + .15);
}

function playHat(){
    if(!audioContext || !soundEnabled) return;
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * .035, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for(let i=0;i<data.length;i++) data[i] = Math.random() * 2 - 1;
    const source = audioContext.createBufferSource();
    const gain = audioContext.createGain();
    gain.gain.value = .025;
    source.buffer = buffer;
    source.connect(gain);
    gain.connect(musicMaster);
    source.start();
}

const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880.00, 698.46, 523.25, 659.25, 783.99, 987.77, 880.00, 783.99, 659.25, 587.33];

function musicTick(){
    if(!playing || !soundEnabled) return;
    const note = melody[musicStep % melody.length];
    playTone(note, .17, "square", .055);
    if(musicStep % 2 === 0) playHat();
    if(musicStep % 4 === 0) playKick();
    if(musicStep % 8 === 7) playTone(note / 2, .28, "triangle", .035, .02);
    musicStep++;
}

function startMusic(){
    initAudio();
    if(!audioContext || !musicMaster) return;
    if(audioContext.state === "suspended") audioContext.resume();
    musicMaster.gain.cancelScheduledValues(audioContext.currentTime);
    musicMaster.gain.setTargetAtTime(soundEnabled ? 0.075 : 0, audioContext.currentTime, 0.03);
    stopMusicTimer();
    musicStep = 0;
    if(soundEnabled) musicTick();
    musicTimer = setInterval(musicTick, 190);
}

function stopMusicTimer(){
    if(musicTimer){ clearInterval(musicTimer); musicTimer = null; }
}

function stopMusic(){
    stopMusicTimer();
    if(musicMaster && audioContext){
        musicMaster.gain.cancelScheduledValues(audioContext.currentTime);
        musicMaster.gain.setTargetAtTime(0, audioContext.currentTime, 0.03);
    }
}

function enableSound(){
    soundEnabled = true;
    localStorage.setItem("foxSound", "on");
    initAudio();
    if(musicMaster && audioContext){
        musicMaster.gain.cancelScheduledValues(audioContext.currentTime);
        musicMaster.gain.setTargetAtTime(.075, audioContext.currentTime, .04);
    }
    if(playing) startMusic();
    updateSoundButtons();
}

function disableSound(){
    soundEnabled = false;
    localStorage.setItem("foxSound", "off");
    stopMusic();
    updateSoundButtons();
}

function updateSoundButtons(){
    const onButton = document.getElementById("soundOnButton");
    const offButton = document.getElementById("soundOffButton");
    if(language === "fa"){
        onButton.textContent = soundEnabled ? "🔊 روشن ✓" : "🔊 روشن";
        offButton.textContent = !soundEnabled ? "🔇 خاموش ✓" : "🔇 خاموش";
    }else{
        onButton.textContent = soundEnabled ? "🔊 On ✓" : "🔊 On";
        offButton.textContent = !soundEnabled ? "🔇 Off ✓" : "🔇 Off";
    }
}

// ============================================================
// 7. توابع اینترنت و کد دعوت
// ============================================================

function checkInternet() {
    if (navigator.onLine) {
        if (noInternetOverlay.style.display === 'flex') {
            noInternetOverlay.style.display = 'none';
            isOnline = true;
            showReferralDataFromCache();
            setTimeout(() => {
                syncReferralsWithServer().then(() => {
                    showReferralDataFromCache();
                });
            }, 500);
        }
        return true;
    } else {
        showNoInternet();
        return false;
    }
}

function showNoInternet() {
    isOnline = false;
    const fa = language === 'fa';
    document.getElementById('noInternetTitle').textContent = fa ? '❌ اتصال اینترنت برقرار نیست' : '❌ No Internet Connection';
    document.getElementById('noInternetMessage').textContent = fa ? 
        'لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.' : 
        'Please check your internet connection and try again.';
    noInternetOverlay.style.display = 'flex';
}

function getUserId() {
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
                return String(tg.initDataUnsafe.user.id);
            }
        }
        let userId = localStorage.getItem("foxUserId");
        if (!userId) {
            userId = "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6);
            localStorage.setItem("foxUserId", userId);
        }
        return userId;
    } catch(e) {
        return "user_" + Date.now();
    }
}

function generateReferralCode(userId) {
    let code = userId.toString().slice(-6).toUpperCase();
    while (code.length < 6) {
        code += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
    }
    return code;
}

function getReferralsFromLocalStorage(refCode) {
    try {
        const stored = JSON.parse(localStorage.getItem('fox_referrals')) || {};
        return stored[refCode] || [];
    } catch(e) { return []; }
}

function saveReferralToLocalStorage(refCode, userId) {
    try {
        let stored = JSON.parse(localStorage.getItem('fox_referrals')) || {};
        if (!stored[refCode]) stored[refCode] = [];
        if (!stored[refCode].includes(userId)) {
            stored[refCode].push(userId);
            localStorage.setItem('fox_referrals', JSON.stringify(stored));
            return true;
        }
        return false;
    } catch(e) { return false; }
}

async function syncReferralsWithServer() {
    if (!navigator.onLine) {
        return getReferralsFromLocalStorage(generateReferralCode(getUserId()));
    }
    
    const userId = getUserId();
    const code = generateReferralCode(userId);
    const local = getReferralsFromLocalStorage(code);
    
    try {
        const response = await fetch(`${WEBHOOK_URL}/api/referrals/${code}`);
        if (response.ok) {
            const data = await response.json();
            if (data.success && data.referrals) {
                const all = [...new Set([...local, ...data.referrals])];
                const stored = JSON.parse(localStorage.getItem('fox_referrals')) || {};
                stored[code] = all;
                localStorage.setItem('fox_referrals', JSON.stringify(stored));
                return all;
            }
        }
    } catch(e) {}
    
    return local;
}

function showReferralDataFromCache() {
    const userId = getUserId();
    const code = generateReferralCode(userId);
    myReferralCode.textContent = code;
    const referrals = getReferralsFromLocalStorage(code);
    referralCount.textContent = referrals.length;
    return referrals;
}

async function registerReferralWithRetry(referralCodeInput, overlayElement, inputElement, errorElement, submitBtn) {
    if (!navigator.onLine) {
        const fa = language === 'fa';
        errorElement.textContent = fa ? '❌ اتصال اینترنت برقرار نیست!' : '❌ No internet connection!';
        errorElement.style.color = '#f87171';
        inputElement.classList.add('error');
        setTimeout(() => inputElement.classList.remove('error'), 500);
        return false;
    }
    
    const userId = getUserId();
    
    if (!referralCodeInput || referralCodeInput.trim() === '') {
        const fa = language === 'fa';
        errorElement.textContent = fa ? '⚠️ لطفاً کد دعوت را وارد کنید.' : '⚠️ Please enter an invite code.';
        errorElement.style.color = '#fbbf24';
        inputElement.classList.add('error');
        setTimeout(() => inputElement.classList.remove('error'), 500);
        return false;
    }
    
    const code = referralCodeInput.trim().toUpperCase();
    
    if (!/^[A-Z0-9]{4,10}$/.test(code)) {
        const fa = language === 'fa';
        errorElement.textContent = fa ? '⚠️ فرمت کد نامعتبر!' : '⚠️ Invalid code format!';
        errorElement.style.color = '#fbbf24';
        inputElement.classList.add('error');
        setTimeout(() => inputElement.classList.remove('error'), 500);
        return false;
    }
    
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    const fa = language === 'fa';
    submitBtn.textContent = fa ? '⏳ در حال ارسال...' : '⏳ Sending...';
    errorElement.textContent = '';
    
    try {
        const response = await fetch(`${WEBHOOK_URL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                refCode: code,
                timestamp: Date.now()
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            errorElement.textContent = fa ? '✅ کد تایید شد!' : '✅ Code verified!';
            errorElement.style.color = '#34d399';
            inputElement.style.borderColor = '#34d399';
            localStorage.setItem("foxRegistered", "true");
            localStorage.setItem("foxReferralCode", code);
            setTimeout(() => {
                if (overlayElement && overlayElement.parentNode) {
                    overlayElement.remove();
                }
                showReferralDataFromCache();
                syncReferralsWithServer().then(() => {
                    showReferralDataFromCache();
                });
            }, 1000);
            return true;
        } else {
            errorElement.textContent = fa ? '❌ کد اشتباه!' : '❌ Wrong code!';
            errorElement.style.color = '#f87171';
            inputElement.classList.add('error');
            setTimeout(() => inputElement.classList.remove('error'), 500);
            inputElement.value = '';
            inputElement.focus();
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.textContent = fa ? '✅ تایید کد' : '✅ Verify Code';
            return false;
        }
    } catch(e) {
        const fa = language === 'fa';
        errorElement.textContent = fa ? '❌ خطا در ارتباط با سرور!' : '❌ Server connection error!';
        errorElement.style.color = '#f87171';
        inputElement.classList.add('error');
        setTimeout(() => inputElement.classList.remove('error'), 500);
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.textContent = fa ? '✅ تایید کد' : '✅ Verify Code';
        return false;
    }
}

function showReferralPrompt() {
    if (localStorage.getItem("foxRegistered") === "true") return;
    
    const overlay = document.createElement('div');
    overlay.id = 'referralPrompt';
    
    const fa = language === 'fa';
    const title = fa ? 'خوش اومدی!' : 'Welcome!';
    const subtitle = fa ? 'اگر کد دعوت داری، اینجا وارد کن' : 'If you have an invite code, enter it here';
    const placeholder = fa ? 'مثلاً: FOX123' : 'e.g. FOX123';
    const submitText = fa ? '✅ تایید کد' : '✅ Verify Code';
    const skipText = fa ? '⏭ رد کردن' : '⏭ Skip';
    const hint = fa ? 'می‌تونی بعداً از منو کد دعوت رو ببینی' : 'You can see your invite code in the menu later';
    
    overlay.innerHTML = `
        <div class="box">
            <div style="font-size:60px;margin-bottom:10px;">🦊</div>
            <h2 style="margin-bottom:5px;">${title}</h2>
            <p style="color:#aaa;margin-bottom:15px;font-size:14px;">${subtitle}</p>
            <span class="error-msg" id="refErrorMsg"></span>
            <input type="text" id="refCodeInput" placeholder="${placeholder}" maxlength="10" autofocus>
            <button class="btn-submit" id="refSubmitBtn">${submitText}</button>
            <button class="btn-skip" id="refSkipBtn">${skipText}</button>
            <p class="hint">${hint}</p>
        </div>
    `;
    document.body.appendChild(overlay);
    
    const input = document.getElementById('refCodeInput');
    const submitBtn = document.getElementById('refSubmitBtn');
    const skipBtn = document.getElementById('refSkipBtn');
    const errorMsg = document.getElementById('refErrorMsg');
    
    async function handleSubmit() {
        await registerReferralWithRetry(input.value, overlay, input, errorMsg, submitBtn);
    }
    
    function handleSkip() {
        localStorage.setItem("foxRegistered", "true");
        overlay.remove();
        showReferralDataFromCache();
    }
    
    submitBtn.addEventListener('click', handleSubmit);
    skipBtn.addEventListener('click', handleSkip);
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitBtn.click();
        }
    });
    
    input.addEventListener('input', function() {
        errorMsg.textContent = '';
        errorMsg.style.color = '';
        this.classList.remove('error');
        this.style.borderColor = '#f97316';
    });
    
    setTimeout(() => input.focus(), 200);
}

function copyReferralCode() {
    const code = myReferralCode.textContent;
    if (code === "---" || !code) {
        const msg = language === 'fa' ? 'کدی برای کپی وجود ندارد!' : 'No code to copy!';
        alert(msg);
        return;
    }
    if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
            const originalText = copyBtn.textContent;
            const copiedText = language === 'fa' ? '✅ کپی شد!' : '✅ Copied!';
            copyBtn.textContent = copiedText;
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }).catch(() => {
            fallbackCopy(code);
        });
    } else {
        fallbackCopy(code);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        const msg = language === 'fa' ? 'کد کپی شد!' : 'Code copied!';
        alert(msg);
    } catch(e) {
        const msg = language === 'fa' ? 'لطفاً کد را دستی کپی کنید: ' : 'Please copy manually: ';
        alert(msg + text);
    }
    document.body.removeChild(textarea);
}

// ============================================================
// 8. توابع پارتیکل
// ============================================================

function createTrailParticle(x, y, color) {
    if (particles.length >= MAX_PARTICLES) return;
    if (Math.random() > 0.06) return;
    
    particles.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 1,
        maxLife: 0.2 + Math.random() * 0.2,
        size: 2 + Math.random() * 2,
        color: color
    });
}

function createBurstParticles(x, y, color, count = 6) {
    const maxBurst = Math.min(count, 8);
    for (let i = 0; i < maxBurst; i++) {
        if (particles.length >= MAX_PARTICLES) break;
        const angle = Math.random() * Math.PI * 2;
        const speed = 30 + Math.random() * 50;
        particles.push({
            x: x + (Math.random() - 0.5) * 8,
            y: y + (Math.random() - 0.5) * 8,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 15,
            life: 1,
            maxLife: 0.25 + Math.random() * 0.25,
            size: 2 + Math.random() * 2,
            color: color
        });
    }
}

function updateParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 20 * dt;
        p.life -= dt / p.maxLife;
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

function drawParticles() {
    for (const p of particles) {
        const alpha = p.life * 0.7;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

// ============================================================
// 9. توابع رسم (Draw Functions)
// ============================================================

function drawBackground(){
    const theme = getTheme();
    const gy = ground();
    const colors = isNight ? theme.skyNight : theme.skyDay;
    const isSpace = theme.isSpace || false;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, gy);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.5, colors[1]);
    gradient.addColorStop(1, colors[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, gy);

    if(isSpace){
        for(let i=0; i<15; i++){
            const x = (i * 137 + 53) % W;
            const y = (i * 97 + 31) % (gy * 0.7);
            const size = 1 + (i % 3);
            ctx.fillStyle = `rgba(200,180,255,${0.03 + (i % 3) * 0.02})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.fillStyle = "rgba(150,100,200,0.05)";
        ctx.beginPath();
        ctx.ellipse(W*0.2, gy*0.3, 150, 80, 0.5, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = "rgba(100,150,255,0.04)";
        ctx.beginPath();
        ctx.ellipse(W*0.7, gy*0.2, 180, 60, -0.3, 0, Math.PI*2);
        ctx.fill();
    }

    if(isNight){
        ctx.fillStyle = isSpace ? "rgba(255,240,220,0.1)" : "rgba(255,240,220,0.15)";
        ctx.beginPath();
        ctx.arc(W - 90, 90, 28, 0, Math.PI * 2);
        ctx.fill();
        const starColor = isSpace ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)";
        ctx.fillStyle = starColor;
        for(let i=0; i< (isSpace ? 20 : 10); i++){
            const x = (i * 47 + 13) % W;
            const y = 20 + (i * 37) % (gy * 0.5);
            const size = isSpace ? 1 + (i%3) : 1 + (i%2);
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        if(isSpace){
            const t = Date.now() / 1000;
            for(let i=0; i<5; i++){
                const x = (i * 73 + 17 + t * 5) % W;
                const y = 30 + (i * 53 + 11 + t * 3) % (gy * 0.4);
                const brightness = 0.3 + Math.sin(t * 2 + i) * 0.2;
                ctx.fillStyle = `rgba(255,255,255,${brightness})`;
                ctx.beginPath();
                ctx.arc(x, y, 1 + (i%2), 0, Math.PI * 2);
                ctx.fill();
            }
        }
    } else {
        ctx.fillStyle = isSpace ? "rgba(200,180,255,0.3)" : "rgba(255,230,180,0.7)";
        ctx.beginPath();
        ctx.arc(W - 90, 90, isSpace ? 30 : 35, 0, Math.PI * 2);
        ctx.fill();
        if(!isSpace){
            ctx.fillStyle = "rgba(255,255,255,0.25)";
            drawCloud(120, 100, 1);
            drawCloud(W * .55, 145, .7);
            drawCloud(W * .85, 80, .8);
        }
    }

    const groundColors = isNight ? theme.groundNight : theme.groundDay;
    const groundGrad = ctx.createLinearGradient(0, gy, 0, H);
    groundGrad.addColorStop(0, groundColors[0]);
    groundGrad.addColorStop(0.5, groundColors[1]);
    groundGrad.addColorStop(1, groundColors[2]);
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, gy, W, H - gy);
    
    ctx.fillStyle = isNight ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
    ctx.fillRect(0, gy, W, 3);

    if(isSpace){
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        for(let i=0; i<3; i++){
            const x = (i * 87 + 23) % W;
            const y = gy + 20 + (i * 43) % (H - gy - 30);
            ctx.beginPath();
            ctx.ellipse(x, y, 15 + i*5, 8 + i*3, 0, 0, Math.PI*2);
            ctx.fill();
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.beginPath();
            ctx.ellipse(x-4, y-2, 8 + i*3, 4 + i*2, 0, 0, Math.PI*2);
            ctx.fill();
            ctx.fillStyle = "rgba(0,0,0,0.08)";
        }
    }
}

function drawCloud(x,y,s){
    ctx.beginPath();
    ctx.arc(x, y, 20 * s, 0, Math.PI * 2);
    ctx.arc(x + 25 * s, y - 8 * s, 27 * s, 0, Math.PI * 2);
    ctx.arc(x + 52 * s, y, 20 * s, 0, Math.PI * 2);
    ctx.fill();
}

function drawPowerup(p) {
    const cx = p.x + p.w/2;
    const cy = p.y + p.h/2;
    p.pulse += 0.05;
    const scale = 1 + Math.sin(p.pulse) * 0.08;
    
    ctx.beginPath();
    ctx.arc(cx, cy, 18 * scale, 0, Math.PI * 2);
    ctx.fillStyle = p.color + '30';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(cx, cy, 14 * scale, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText(p.icon, cx, cy + 1);
}

function drawFox(){
    const x = fox.x;
    const y = fox.y;
    const running = fox.grounded ? Math.sin(fox.animation) * 4 : 0;
    const theme = getTheme();
    const isSpace = theme.isSpace || false;
    const skin = getSkin(currentSkinId);

    ctx.fillStyle = isSpace ? "rgba(100,80,150,0.15)" : "rgba(0,0,0,.12)";
    ctx.beginPath();
    ctx.ellipse(x + 30, ground() + 3, 28, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    let foxColor = skin.color;
    let trailColor = skin.trailColor || 'rgba(249,115,22,0.25)';
    
    if (skin.id === 'rainbow') {
        const hue = (Date.now() / 50) % 360;
        foxColor = `hsl(${hue}, 80%, 60%)`;
        trailColor = `hsla(${hue}, 80%, 60%, 0.2)`;
    }
    
    if (playing && fox.grounded && particles.length < MAX_PARTICLES) {
        createTrailParticle(x - 2, y + 22, trailColor);
        createTrailParticle(x - 6, y + 28, trailColor);
    }
    
    // Body
    ctx.fillStyle = foxColor;
    ctx.beginPath();
    ctx.moveTo(x + 15, y + 28);
    ctx.quadraticCurveTo(x - 22, y + 5 + running, x - 10, y - 10 + running);
    ctx.quadraticCurveTo(x + 5, y + 5, x + 20, y + 23);
    ctx.fill();

    ctx.fillStyle = isSpace ? "#d8c8f0" : "#f5e6d0";
    ctx.beginPath();
    ctx.moveTo(x - 10, y - 10 + running);
    ctx.quadraticCurveTo(x - 25, y, x - 14, y + 12);
    ctx.quadraticCurveTo(x - 5, y + 5, x + 1, y + 7);
    ctx.fill();

    ctx.fillStyle = foxColor;
    ctx.beginPath();
    ctx.ellipse(x + 29, y + 29, 27, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = isSpace ? "#d8c8f0" : "#f5e6d0";
    ctx.beginPath();
    ctx.ellipse(x + 34, y + 31, 14, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = isSpace ? "#9a7aba" : "#b86b3a";
    ctx.fillRect(x + 14, y + 39 + running, 10, 11);
    ctx.fillRect(x + 39, y + 39 - running, 10, 11);

    ctx.fillStyle = foxColor;
    ctx.beginPath();
    ctx.ellipse(x + 43, y + 18, 16, 17, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = isSpace ? "#9a7aba" : "#c47a3a";
    ctx.beginPath();
    ctx.ellipse(x + 52, y + 8, 21, 17, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = foxColor;
    ctx.beginPath();
    ctx.moveTo(x + 38, y - 3);
    ctx.lineTo(x + 39, y - 20);
    ctx.lineTo(x + 50, y - 6);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 53, y - 4);
    ctx.lineTo(x + 62, y - 19);
    ctx.lineTo(x + 68, y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = isSpace ? "#c8b8e0" : "#f5cba0";
    ctx.beginPath();
    ctx.moveTo(x + 41, y - 6);
    ctx.lineTo(x + 41, y - 14);
    ctx.lineTo(x + 47, y - 7);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = isSpace ? "#d8c8f0" : "#f5e6d0";
    ctx.beginPath();
    ctx.ellipse(x + 67, y + 13, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = skin.eyeColor || "#1a1a2a";
    ctx.beginPath();
    ctx.arc(x + 75, y + 10, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 58, y + 5, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = isSpace ? "#ccffdd" : "#fff";
    ctx.beginPath();
    ctx.arc(x + 59, y + 4, 1.2, 0, Math.PI * 2);
    ctx.fill();
}

function drawEgg(e){
    const cx = e.x + e.w / 2;
    const theme = getTheme();
    const isSpace = theme.isSpace || false;
    
    ctx.fillStyle = e.color;
    ctx.beginPath();
    ctx.moveTo(cx, e.y);
    ctx.bezierCurveTo(e.x + e.w, e.y + 5, e.x + e.w, e.y + 23, cx, e.y + e.h);
    ctx.bezierCurveTo(e.x, e.y + 23, e.x, e.y + 5, cx, e.y);
    ctx.fill();
    
    ctx.strokeStyle = isSpace ? "rgba(200,180,255,0.15)" : "rgba(0,0,0,.04)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(e.x + 6, e.y + 18);
    ctx.quadraticCurveTo(cx, e.y + 12, e.x + e.w - 6, e.y + 18);
    ctx.stroke();
    
    ctx.fillStyle = isSpace ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.ellipse(cx - 4, e.y + 8, 3, 6, -0.2, 0, Math.PI * 2);
    ctx.fill();
}

function drawObstacle(o){
    const theme = getTheme();
    const isSpace = theme.isSpace || false;
    
    if(o.type === "tree"){
        if(isSpace){
            ctx.fillStyle = "#4a2a6a";
            ctx.fillRect(o.x + 16, o.y + 27, 14, o.h - 27);
            ctx.fillStyle = "#6a3a8a";
            ctx.beginPath();
            ctx.arc(o.x + 23, o.y + 20, 22, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#8a5aaa";
            ctx.beginPath();
            ctx.arc(o.x + 7, o.y + 32, 14, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(o.x + 40, o.y + 32, 14, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillStyle = theme.treeColor || "#6a4a2a";
            ctx.fillRect(o.x + 16, o.y + 27, 14, o.h - 27);
            ctx.fillStyle = isNight ? "#3a4a3a" : "#23823c";
            ctx.beginPath();
            ctx.arc(o.x + 23, o.y + 20, 25, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = isNight ? "#2a3a2a" : "#2f9e44";
            ctx.beginPath();
            ctx.arc(o.x + 7, o.y + 32, 16, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(o.x + 40, o.y + 32, 16, 0, Math.PI * 2);
            ctx.fill();
        }
    }else if(o.type === "rock"){
        if(isSpace){
            ctx.fillStyle = "#4a3a5a";
            ctx.beginPath();
            ctx.moveTo(o.x, o.y + o.h);
            ctx.lineTo(o.x + 10, o.y + 10);
            ctx.lineTo(o.x + 28, o.y);
            ctx.lineTo(o.x + o.w, o.y + 15);
            ctx.lineTo(o.x + o.w - 8, o.y + o.h);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "rgba(200,180,255,0.08)";
            ctx.beginPath();
            ctx.ellipse(o.x + 15, o.y + 8, 10, 5, 0, 0, Math.PI*2);
            ctx.fill();
        } else {
            ctx.fillStyle = theme.rockColor || "#7a8a9a";
            ctx.beginPath();
            ctx.moveTo(o.x, o.y + o.h);
            ctx.lineTo(o.x + 10, o.y + 10);
            ctx.lineTo(o.x + 28, o.y);
            ctx.lineTo(o.x + o.w, o.y + 15);
            ctx.lineTo(o.x + o.w - 8, o.y + o.h);
            ctx.closePath();
            ctx.fill();
        }
    }else{
        if(isSpace){
            ctx.fillStyle = "#3a7a5a";
            ctx.fillRect(o.x + 9, o.y, 14, o.h);
            ctx.fillRect(o.x, o.y + 20, 13, 11);
            ctx.fillRect(o.x + 20, o.y + 38, 13, 11);
            ctx.fillStyle = "#2a6a4a";
            ctx.fillRect(o.x + 12, o.y + 5, 8, 5);
            ctx.fillRect(o.x + 3, o.y + 25, 7, 4);
            ctx.fillRect(o.x + 22, o.y + 43, 7, 4);
            ctx.fillStyle = "rgba(100,255,200,0.06)";
            ctx.beginPath();
            ctx.ellipse(o.x + 16, o.y + 8, 6, 3, 0, 0, Math.PI*2);
            ctx.fill();
        } else {
            ctx.fillStyle = "#25834a";
            ctx.fillRect(o.x + 9, o.y, 14, o.h);
            ctx.fillRect(o.x, o.y + 20, 13, 11);
            ctx.fillRect(o.x + 20, o.y + 38, 13, 11);
        }
    }
}

// ============================================================
// 10. توابع اصلی بازی
// ============================================================

function draw(){
    drawBackground();
    for(const e of eggs) drawEgg(e);
    for(const o of obstacles) drawObstacle(o);
    for(const p of powerups) drawPowerup(p);
    drawParticles();
    drawFox();
}

function createEgg(){
    const eggColors = getEggColors();
    let r = Math.random();
    let type = 0;
    
    if (gemActive) {
        if(r > .3) type = 1;
        if(r > .6) type = 2;
        if(r > .8) type = 3;
        if(r > .92) type = 4;
    } else {
        if(r > .55) type = 1;
        if(r > .78) type = 2;
        if(r > .91) type = 3;
        if(r > .98) type = 4;
    }
    
    const data = eggColors[type];
    eggs.push({
        x:W + 30,
        y: ground() - 50 - Math.random() * 130,
        w:25, h:34,
        color:data[0],
        value:data[1]
    });
}

function createObstacle(){
    const r = Math.random();
    let type;
    if(r < .45) type = "tree";
    else if(r < .75) type = "rock";
    else type = "cactus";
    let w = 45, h = 65;
    if(type === "rock"){ w = 55; h = 40; }
    if(type === "cactus"){ w = 32; h = 62; }
    obstacles.push({
        x:W + 40,
        y:ground() - h,
        w:w, h:h,
        type:type
    });
}

function createPowerup(type) {
    const config = POWERUP_CONFIG[type];
    if (!config) return;
    powerups.push({
        x: W + 30,
        y: ground() - 80 - Math.random() * 100,
        w: 30,
        h: 30,
        type: type,
        color: config.color,
        icon: config.icon,
        pulse: Math.random() * Math.PI * 2
    });
}

function trySpawnPowerup() {
    gameTime += 0.1;
    if (gameTime < 10) return;
    
    const chance = Math.random() * 100;
    const roll = 90;
    
    if (chance < roll) {
        const types = ['shield', 'speed', 'gem'];
        const type = types[Math.floor(Math.random() * types.length)];
        createPowerup(type);
    }
}

function collectEgg(e){
    combo++;
    comboTimer = 2;
    let multiplier = 1;
    if(combo >= 10) multiplier = 3;
    else if(combo >= 5) multiplier = 2;
    
    let earned = e.value * multiplier;
    if (gemActive) {
        earned = earned * 1.5;
    }
    
    score += earned;
    totalEggs += 1;
    totalScore += earned;
    saveWallet();
    updateSpeed();
    updateDayNight();
    updateUI();
    
    if(combo >= 2){
        comboBox.classList.add("show");
        comboValue.textContent = combo;
    }
    
    const skin = getSkin(currentSkinId);
    let burstColor = skin.color;
    
    if (skin.id === 'rainbow') {
        const hue = (Date.now() / 30) % 360;
        burstColor = `hsl(${hue}, 80%, 60%)`;
    }
    if (skin.id === 'galaxy') burstColor = '#818cf8';
    if (skin.id === 'shadow') burstColor = '#4ade80';
    if (skin.id === 'phoenix') burstColor = '#f97316';
    if (skin.id === 'neon') burstColor = '#f472b6';
    if (skin.id === 'crystal') burstColor = '#a78bfa';
    if (skin.id === 'golden') burstColor = '#fcd34d';
    if (skin.id === 'frost') burstColor = '#93c5fd';
    if (skin.id === 'ember') burstColor = '#ff6b35';
    
    createBurstParticles(e.x + e.w/2, e.y + e.h/2, burstColor, 6);
}

function applyPowerup(type) {
    const skin = getSkin(currentSkinId);
    const color = skin.glowColor || '#fbbf24';
    
    switch(type) {
        case 'shield':
            shieldActive = true;
            shieldHits = 1;
            shieldTimer = 15;
            createBurstParticles(fox.x + fox.w/2, fox.y + fox.h/2, '#4fc3f7', 5);
            if (shieldTimeout) clearTimeout(shieldTimeout);
            break;
        case 'speed':
            speedBoostActive = true;
            speedBoostTimer = 15;
            createBurstParticles(fox.x + fox.w/2, fox.y + fox.h/2, '#ffd54f', 5);
            break;
        case 'gem':
            gemActive = true;
            gemTimer = 12;
            createBurstParticles(fox.x + fox.w/2, fox.y + fox.h/2, '#f472b6', 5);
            break;
    }
    updatePowerupTimers();
}

function updatePowerupTimers() {
    shieldTimerItem.classList.add('hidden-timer');
    speedTimerItem.classList.add('hidden-timer');
    gemTimerItem.classList.add('hidden-timer');
    
    let anyActive = false;
    
    if (shieldActive) {
        shieldTimerItem.classList.remove('hidden-timer');
        shieldTimeDisplay.textContent = Math.ceil(shieldTimer);
        anyActive = true;
    }
    
    if (speedBoostActive) {
        speedTimerItem.classList.remove('hidden-timer');
        speedTimeDisplay.textContent = Math.ceil(speedBoostTimer);
        anyActive = true;
    }
    
    if (gemActive) {
        gemTimerItem.classList.remove('hidden-timer');
        gemTimeDisplay.textContent = Math.ceil(gemTimer);
        anyActive = true;
    }
    
    if (anyActive) {
        powerupTimer.classList.remove('hidden');
    } else {
        powerupTimer.classList.add('hidden');
    }
}

function update(dt){
    gameTime += dt;
    updateSpeed();

    fox.vy += fox.gravity * dt;
    fox.y += fox.vy * dt;
    if(fox.y + fox.h >= ground()){
        fox.y = ground() - fox.h;
        fox.vy = 0;
        fox.grounded = true;
    }
    fox.animation += dt * 15;

    updateDayNight();

    eggTimer -= dt;
    if(eggTimer <= 0){
        createEgg();
        eggTimer = .55 + Math.random() * .4;
    }
    
    for(let i = eggs.length - 1; i >= 0; i--){
        const e = eggs[i];
        e.x -= speed * dt;
        if(collision(fox,e)){
            collectEgg(e);
            eggs.splice(i, 1);
            continue;
        }
        if(e.x < -60) eggs.splice(i, 1);
    }

    obstacleTimer -= dt;
    if(obstacleTimer <= 0){
        createObstacle();
        obstacleTimer = 1.05 + Math.random() * .55;
    }
    for(let i = obstacles.length - 1; i >= 0; i--){
        const o = obstacles[i];
        o.x -= speed * dt;
        if(collision(fox,o)){
            if(shieldActive && shieldHits > 0) {
                shieldHits--;
                if(shieldHits === 0) shieldActive = false;
                obstacles.splice(i, 1);
                createBurstParticles(o.x + o.w/2, o.y + o.h/2, '#4fc3f7', 5);
                continue;
            }
            endGame();
            return;
        }
        if(o.x < -80) obstacles.splice(i, 1);
    }

    powerupTimerValue -= dt;
    if (powerupTimerValue <= 0) {
        trySpawnPowerup();
        powerupTimerValue = 2 + Math.random() * 3;
    }
    
    for(let i = powerups.length - 1; i >= 0; i--){
        const p = powerups[i];
        p.x -= speed * dt;
        if(collision(fox, p)){
            applyPowerup(p.type);
            powerups.splice(i, 1);
            continue;
        }
        if(p.x < -60) powerups.splice(i, 1);
    }
    
    if (shieldActive) {
        shieldTimer -= dt;
        if (shieldTimer <= 0) {
            shieldActive = false;
            shieldTimer = 0;
            if (shieldTimeout) {
                clearTimeout(shieldTimeout);
                shieldTimeout = null;
            }
        }
    }

    if (speedBoostActive) {
        speedBoostTimer -= dt;
        if (speedBoostTimer <= 0) {
            speedBoostActive = false;
            speedBoostTimer = 0;
        }
    }
    
    if (gemActive) {
        gemTimer -= dt;
        if (gemTimer <= 0) {
            gemActive = false;
            gemTimer = 0;
        }
    }

    updatePowerupTimers();

    document.getElementById('shieldIndicator').style.display = shieldActive ? 'block' : 'none';
    document.getElementById('speedIndicator').style.display = speedBoostActive ? 'block' : 'none';
    document.getElementById('gemIndicator').style.display = gemActive ? 'block' : 'none';

    if(combo > 0){
        comboTimer -= dt;
        if(comboTimer <= 0){
            combo = 0;
            comboBox.classList.remove("show");
        }
    }
    
    updateParticles(dt);
}

function loop(time){
    if(!playing) return;
    let dt = (time - lastTime) / 1000;
    lastTime = time;
    if(dt > .033) dt = .033;
    update(dt);
    draw();
    if(playing) requestAnimationFrame(loop);
}

function startGame(){
    stopMusicTimer();
    score = 0;
    speed = 330;
    eggTimer = .3;
    obstacleTimer = 1;
    combo = 0;
    comboTimer = 0;
    eggs.length = 0;
    obstacles.length = 0;
    powerups.length = 0;
    particles.length = 0;
    lastDayCycle = -1;
    isNight = false;
    gameTime = 0;
    shieldActive = false;
    shieldHits = 0;
    shieldTimer = 0;
    speedBoostActive = false;
    speedBoostTimer = 0;
    gemActive = false;
    gemTimer = 0;
    powerupTimerValue = 2;
    if (shieldTimeout) {
        clearTimeout(shieldTimeout);
        shieldTimeout = null;
    }
    gamesPlayed++;
    saveWallet();
    updateUI();
    comboBox.classList.remove("show");
    document.getElementById('shieldIndicator').style.display = 'none';
    document.getElementById('speedIndicator').style.display = 'none';
    document.getElementById('gemIndicator').style.display = 'none';
    powerupTimer.classList.add('hidden');
    resetFox();
    playing = true;
    menuButton.style.display = "none";
    menuPanel.style.display = "none";
    startScreen.style.display = "none";
    gameOver.style.display = "none";
    themeSelectorOverlay.style.display = "none";
    startMusic();
    lastTime = performance.now();
    requestAnimationFrame(loop);
}

function endGame(){
    playing = false;
    stopMusic();
    finalScore.textContent = score;
    if(score > best){
        best = score;
        recordText.style.display = "block";
        saveWallet();
    }else{
        recordText.style.display = "none";
    }
    updateUI();
    menuButton.style.display = "block";
    gameOver.style.display = "flex";
    powerupTimer.classList.add('hidden');
}

function handleInput(){
    if(!playing) startGame();
    else jump();
}

// ============================================================
// 11. توابع UI و زبان
// ============================================================

function updateUI(){
    const fa = language === "fa";
    const scoreLabel = fa ? "امتیاز: " : "Score: ";
    const bestLabel = fa ? "رکورد: " : "Best: ";
    
    scoreText.textContent = scoreLabel + score;
    bestText.textContent = bestLabel + best;
    
    gamesValue.textContent = gamesPlayed;
    walletBest.textContent = best;
    walletEggs.textContent = totalEggs;
    walletScore.textContent = totalScore;
    finalGames.textContent = gamesPlayed;
    finalEggs.textContent = totalEggs;
}

function buildThemeGrid() {
    const grid = document.getElementById('themeGrid');
    grid.innerHTML = '';
    
    const themeList = [
        'classic', 'city', 'beach', 'forest', 'space', 'night',
        'volcano', 'ocean', 'desert', 'magic', 'toon', 'cyberpunk'
    ];
    
    themeList.forEach(id => {
        const theme = themeConfigs[id];
        if (!theme) return;
        
        const div = document.createElement('div');
        div.className = 'theme-option';
        div.dataset.theme = id;
        if (id === currentTheme) div.classList.add('active');
        div.innerHTML = `
            <span class="icon">${theme.icon}</span>
            <div class="name">${language === 'fa' ? theme.nameFa : theme.nameEn}</div>
            <div class="desc">${language === 'fa' ? theme.descFa : theme.descEn}</div>
        `;
        grid.appendChild(div);
    });
}

function setTheme(themeId) {
    if (!themeConfigs[themeId]) return;
    currentTheme = themeId;
    localStorage.setItem("foxTheme", themeId);
    updateThemeUI();
    if (!playing) {
        drawBackground();
        drawFox();
    }
}

function updateThemeUI() {
    const theme = getTheme();
    const name = language === 'fa' ? theme.nameFa : theme.nameEn;
    currentThemeDisplay.textContent = name;
    startThemeLabel.textContent = language === 'fa' ? 'تغییر تم' : 'Change Theme';
    
    document.querySelectorAll('.theme-option').forEach(opt => {
        const tid = opt.dataset.theme;
        const t = themeConfigs[tid];
        if (!t) return;
        const isActive = tid === currentTheme;
        opt.classList.toggle('active', isActive);
        opt.querySelector('.name').textContent = language === 'fa' ? t.nameFa : t.nameEn;
        opt.querySelector('.desc').textContent = language === 'fa' ? t.descFa : t.descEn;
    });
    
    document.getElementById('themeSelectorTitle').textContent = language === 'fa' ? '🎨 انتخاب تم' : '🎨 Select Theme';
    document.getElementById('themeSelectorSub').textContent = language === 'fa' ? 'سبک ماجراجویی خود را انتخاب کنید' : 'Choose your adventure style';
    document.getElementById('applyThemeText').textContent = language === 'fa' ? 'اعمال تم' : 'Apply Theme';
    document.getElementById('changeThemeLabel').textContent = language === 'fa' ? 'تغییر تم' : 'Change Theme';
}

function renderSkinShop() {
    const grid = document.getElementById('skinShopGrid');
    if (!grid) return;
    
    const fa = language === 'fa';
    const ownedCount = purchasedSkins.length;
    document.getElementById('skinCount').textContent = ownedCount + '/' + FOX_SKINS.length;
    document.getElementById('totalScoreDisplay').textContent = totalScore.toLocaleString();
    
    const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
    const rarityLabels = {
        common: { fa: '⚪ معمولی', en: '⚪ Common', color: '#6b7280' },
        uncommon: { fa: '🟢 نادر', en: '🟢 Uncommon', color: '#22c55e' },
        rare: { fa: '🔵 کمیاب', en: '🔵 Rare', color: '#3b82f6' },
        epic: { fa: '🟣 حماسی', en: '🟣 Epic', color: '#8b5cf6' },
        legendary: { fa: '🟠 افسانه‌ای', en: '🟠 Legendary', color: '#f59e0b' },
        mythic: { fa: '🔴 اسطوره‌ای', en: '🔴 Mythic', color: '#ef4444' }
    };
    
    let html = '';
    
    rarityOrder.forEach(rarity => {
        const skinsInRarity = FOX_SKINS.filter(s => s.rarity === rarity);
        if (skinsInRarity.length === 0) return;
        
        const label = fa ? rarityLabels[rarity].fa : rarityLabels[rarity].en;
        const color = rarityLabels[rarity].color;
        
        html += `<div style="margin-top:12px;margin-bottom:6px;">`;
        html += `<div style="font-size:11px;font-weight:bold;color:${color};letter-spacing:0.5px;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:4px;">${label}</div>`;
        html += `<div style="display:grid;grid-template-columns:repeat(${skinsInRarity.length === 1 ? 1 : 2},1fr);gap:6px;margin-top:6px;">`;
        
        skinsInRarity.forEach(skin => {
            const owned = isSkinOwned(skin.id);
            const active = isSkinActive(skin.id);
            const canBuy = totalScore >= skin.price && !owned && skin.price > 0;
            const isFree = skin.price === 0;
            
            const colorStyle = skin.id === 'rainbow' 
                ? 'linear-gradient(45deg,red,orange,yellow,green,blue,indigo,violet)' 
                : skin.color;
            
            let statusText = '';
            let statusColor = '';
            let bgColor = 'rgba(255,255,255,0.03)';
            let borderColor = 'rgba(255,255,255,0.06)';
            let cursorStyle = 'pointer';
            
            if (active) {
                statusText = fa ? '✓ فعال' : '✓ Active';
                statusColor = '#4ade80';
                bgColor = 'rgba(74,222,128,0.1)';
                borderColor = '#4ade80';
            } else if (owned) {
                statusText = fa ? '✅ خریداری شده' : '✅ Owned';
                statusColor = '#60a5fa';
                bgColor = 'rgba(96,165,250,0.08)';
                borderColor = 'rgba(96,165,250,0.3)';
            } else if (isFree) {
                statusText = fa ? 'رایگان' : 'Free';
                statusColor = '#fbbf24';
            } else if (canBuy) {
                statusText = '💰 ' + skin.price.toLocaleString();
                statusColor = '#fbbf24';
            } else {
                statusText = '🔒 ' + skin.price.toLocaleString();
                statusColor = '#ef4444';
                bgColor = 'rgba(239,68,68,0.05)';
                cursorStyle = 'not-allowed';
            }
            
            const rarityLabel = fa ? getRarityLabel(skin.rarity) : getRarityLabel(skin.rarity);
            const descText = fa ? skin.desc : skin.desc;
            
            const isLocked = !owned && !canBuy && !isFree;
            
            html += `
                <div class="skin-option ${active ? 'active' : ''} ${owned ? 'owned' : ''} ${isLocked ? 'locked' : ''}" 
                     data-skin="${skin.id}"
                     style="background:${bgColor};border:2px solid ${borderColor};border-radius:10px;padding:8px;text-align:center;cursor:${cursorStyle};transition:all 0.2s;position:relative;${isLocked ? 'opacity:0.5;' : ''}">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                        <span style="font-size:10px;color:${statusColor};">${statusText}</span>
                        <span style="font-size:8px;color:rgba(255,255,255,0.2);">${rarityLabel}</span>
                    </div>
                    <div style="width:36px;height:36px;border-radius:50%;margin:0 auto 4px;background:${colorStyle};border:2px solid rgba(255,255,255,0.1);box-shadow:${active ? '0 0 15px ' + (skin.glowColor || 'rgba(249,115,22,0.3)') : 'none'};"></div>
                    <div style="font-size:11px;font-weight:bold;color:white;">${fa ? skin.nameFa : skin.name}</div>
                    <div style="font-size:8px;color:rgba(255,255,255,0.4);">${descText}</div>
                    ${active ? '<div style="position:absolute;top:-4px;right:-4px;font-size:12px;">⭐</div>' : ''}
                </div>
            `;
        });
        
        html += `</div></div>`;
    });
    
    grid.innerHTML = html;
    
    document.querySelectorAll('.skin-option').forEach(el => {
        el.addEventListener('click', function() {
            const skinId = this.dataset.skin;
            if (!this.classList.contains('locked')) {
                handleSkinClick(skinId);
            } else {
                const fa = language === 'fa';
                showToast(fa ? '❌ امتیاز کافی نیست!' : '❌ Not enough points!');
            }
        });
    });
}

function handleSkinClick(skinId) {
    const skin = getSkin(skinId);
    if (!skin) return;
    
    const owned = isSkinOwned(skinId);
    const fa = language === 'fa';
    
    if (owned) {
        currentSkinId = skinId;
        localStorage.setItem('foxSkin', skinId);
        renderSkinShop();
        updateUI();
        if (!playing) {
            drawBackground();
            drawFox();
        }
        showToast((fa ? '✅ رنگ ' : '✅ Skin ') + (fa ? skin.nameFa : skin.name) + (fa ? ' انتخاب شد!' : ' selected!'));
        return;
    }
    
    if (skin.price === 0) {
        purchasedSkins.push(skinId);
        localStorage.setItem('purchasedSkins', JSON.stringify(purchasedSkins));
        currentSkinId = skinId;
        localStorage.setItem('foxSkin', skinId);
        renderSkinShop();
        updateUI();
        if (!playing) {
            drawBackground();
            drawFox();
        }
        showToast((fa ? '✅ رنگ ' : '✅ Skin ') + (fa ? skin.nameFa : skin.name) + (fa ? ' فعال شد!' : ' activated!'));
        return;
    }
    
    if (totalScore >= skin.price) {
        if (confirm((fa ? 'آیا مطمئنی می‌خوای رنگ "' : 'Buy skin "') + (fa ? skin.nameFa : skin.name) + '" ' + (fa ? 'را به قیمت ' : 'for ') + skin.price.toLocaleString() + (fa ? ' امتیاز بخری؟' : ' points?'))) {
            totalScore -= skin.price;
            purchasedSkins.push(skinId);
            localStorage.setItem('purchasedSkins', JSON.stringify(purchasedSkins));
            currentSkinId = skinId;
            localStorage.setItem('foxSkin', skinId);
            saveWallet();
            renderSkinShop();
            updateUI();
            if (!playing) {
                drawBackground();
                drawFox();
            }
            showToast((fa ? '✅ رنگ "' : '✅ Skin "') + (fa ? skin.nameFa : skin.name) + '" ' + (fa ? 'خریداری شد!' : 'purchased!'));
        }
    } else {
        showToast((fa ? '❌ امتیاز کافی نیست! نیاز به ' : '❌ Not enough points! Need ') + skin.price.toLocaleString() + (fa ? ' امتیاز' : ' points'));
    }
}

function openThemeSelector() {
    themeSelectorOverlay.style.display = 'flex';
    buildThemeGrid();
    updateThemeUI();
    
    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.addEventListener('click', function() {
            const themeId = this.dataset.theme;
            setTheme(themeId);
            drawBackground();
            drawFox();
        });
    });
}

function closeThemeSelectorFn() {
    themeSelectorOverlay.style.display = 'none';
}

function applyLanguage(){
    const fa = language === "fa";
    document.documentElement.lang = fa ? "fa" : "en";
    document.documentElement.dir = fa ? "rtl" : "ltr";

    document.getElementById("menuTitle").textContent = fa ? "منو" : "Menu";
    document.getElementById("languageTitle").textContent = fa ? "زبان" : "Language";
    document.getElementById("soundTitle").textContent = fa ? "صدا" : "Sound";
    document.getElementById("themeMenuTitle").textContent = fa ? "🎨 تم" : "🎨 Theme";
    document.getElementById("gamesLabel").textContent = fa ? "تعداد بازی‌ها" : "Games Played";
    document.getElementById("bestLabel").textContent = fa ? "رکورد" : "Best Score";
    document.getElementById("eggsLabel").textContent = fa ? "کل تخم‌های جمع‌شده" : "Total Eggs";
    document.getElementById("walletScoreLabel").textContent = fa ? "امتیاز کل" : "Total Score";
    document.getElementById("referralCodeLabel").textContent = fa ? "کد دعوت من" : "My Invite Code";
    document.getElementById("referralCountLabel").textContent = fa ? "زیرمجموعه‌ها" : "Referrals";
    document.getElementById("skinShopTitle").textContent = fa ? "🎨 پوست روباه" : "🎨 Fox Skins";
    
    document.getElementById("startText").textContent = fa ? "تخم‌ها را جمع کن و رکورد بزن!" : "Collect eggs and beat your record!";
    startButton.textContent = fa ? "شروع بازی" : "Start Game";
    document.getElementById("controlText").textContent = fa ? "لمس صفحه یا Space برای پرش" : "Tap screen or Space to jump";
    document.getElementById("gameOverTitle").textContent = fa ? "باختی!" : "Game Over!";
    document.getElementById("finalScoreLabel").textContent = fa ? "امتیاز:" : "Score:";
    document.getElementById("gameCountLabel").textContent = fa ? "تعداد بازی‌ها:" : "Games:";
    document.getElementById("totalEggLabel").textContent = fa ? "کل تخم‌ها:" : "Total Eggs:";
    restartButton.textContent = fa ? "دوباره بازی کن" : "Play Again";
    recordText.textContent = fa ? "🏆 رکورد جدید!" : "🏆 New Record!";
    document.getElementById("startThemeLabel").textContent = fa ? "تغییر تم" : "Change Theme";
    document.getElementById("changeThemeLabel").textContent = fa ? "تغییر تم" : "Change Theme";

    updateSoundButtons();
    updateUI();
    updateThemeUI();
    renderSkinShop();
    buildThemeGrid();
}

function setLanguage(lang){
    language = lang;
    localStorage.setItem("foxLanguage", lang);
    applyLanguage();
    menuPanel.style.display = "none";
    const prompt = document.getElementById('referralPrompt');
    if (prompt) {
        const oldOverlay = prompt;
        const parent = oldOverlay.parentNode;
        if (parent) {
            parent.removeChild(oldOverlay);
            showReferralPrompt();
        }
    }
}

// ============================================================
// 12. رویدادها و شروع بازی
// ============================================================

window.addEventListener("online", function() {
    checkInternet();
});

window.addEventListener("offline", function() {
    showNoInternet();
});

retryBtn.addEventListener("click", function() {
    checkInternet();
    fetch(WEBHOOK_URL)
        .then(() => {
            if (navigator.onLine) {
                noInternetOverlay.style.display = 'none';
                isOnline = true;
                showReferralDataFromCache();
                syncReferralsWithServer().then(() => {
                    showReferralDataFromCache();
                });
            }
        })
        .catch(() => {
            showNoInternet();
        });
});

window.addEventListener("keydown", function(e){
    if(e.code === "Space" || e.code === "ArrowUp"){
        e.preventDefault();
        handleInput();
    }
    if(e.code === "Escape" && themeSelectorOverlay.style.display === 'flex') {
        closeThemeSelectorFn();
    }
});

canvas.addEventListener("pointerdown", function(e){
    e.preventDefault();
    handleInput();
}, { passive:false });

startButton.addEventListener("click", function(e){
    e.stopPropagation();
    startGame();
});

restartButton.addEventListener("click", function(e){
    e.stopPropagation();
    startGame();
});

document.getElementById("soundOnButton").addEventListener("click", function(e){
    e.stopPropagation();
    enableSound();
});

document.getElementById("soundOffButton").addEventListener("click", function(e){
    e.stopPropagation();
    disableSound();
});

menuButton.addEventListener("click", function(e){
    e.stopPropagation();
    if(playing) return;
    if (menuPanel.style.display === "block") {
        menuPanel.style.display = "none";
    } else {
        menuPanel.style.display = "block";
        updateUI();
        renderSkinShop();
        syncReferralsWithServer().then(() => {
            showReferralDataFromCache();
        });
    }
});

menuPanel.addEventListener("click", function(e){
    e.stopPropagation();
});

document.getElementById("faButton").addEventListener("click", function(e){
    e.stopPropagation();
    setLanguage("fa");
});

document.getElementById("enButton").addEventListener("click", function(e){
    e.stopPropagation();
    setLanguage("en");
});

copyBtn.addEventListener("click", copyReferralCode);

closeThemeSelector.addEventListener("click", closeThemeSelectorFn);
themeSelectorOverlay.addEventListener("click", function(e) {
    if (e.target === this) closeThemeSelectorFn();
});

changeThemeBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    openThemeSelector();
});

openThemeStartBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    openThemeSelector();
});

openThemeFromMenu.addEventListener("click", function(e) {
    e.stopPropagation();
    menuPanel.style.display = "none";
    openThemeSelector();
});

// ============================================================
// 13. شروع اولیه
// ============================================================

applyLanguage();
updateUI();
buildThemeGrid();
resetFox();
menuButton.style.display = "block";

const savedTheme = localStorage.getItem("foxTheme") || "classic";
setTheme(savedTheme);

ctx.fillStyle = "#87CEEB";
ctx.fillRect(0, 0, W, H);
drawBackground();
drawFox();

showReferralDataFromCache();
renderSkinShop();
powerupTimer.classList.add('hidden');

setTimeout(() => {
    if (navigator.onLine) {
        showReferralPrompt();
    } else {
        showNoInternet();
    }
}, 400);

setTimeout(() => {
    if (navigator.onLine) {
        syncReferralsWithServer().then(() => {
            showReferralDataFromCache();
        });
    }
}, 1000);

setTimeout(() => {
    checkInternet();
}, 300);

setInterval(() => {
    if (navigator.onLine && noInternetOverlay.style.display === 'flex') {
        checkInternet();
    } else if (!navigator.onLine) {
        showNoInternet();
    }
}, 10000);
