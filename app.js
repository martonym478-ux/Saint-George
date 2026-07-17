window.addEventListener("load", () => {

    document.body.style.opacity = "1";

    createMenu();

});

function createMenu() {

    document.body.insertAdjacentHTML("afterbegin", `
        <button class="menuButton" onclick="openMenu()">☰</button>

        <div id="overlay"></div>

        <div id="sidebar" class="sidebar">

            <div class="sidebar-header">
                <h2>القائمة</h2>
                <button onclick="closeMenu()">✖</button>
            </div>

           <ul>
    <li id="homeBtn">🏠 الرئيسية</li>
    <li id="churchBtn">⛪ كنيسة مارجرجس</li>
    <li id="favoritesBtn">❤️ المفضلة</li>
    <li id="continueReadingBtn">📖 أكمل القراءة</li>
    <li id="searchBtn">🔍 البحث</li>
    <li id="themeToggle">🌙 الوضع الليلي</li>
    <li id="aboutBtn">ℹ️ نبذة عن</li>
</ul>

        </div>
    `);

    initMenu();
}

// ==========================================
// Saints Stories
// app.js
// ==========================================

// معرفة الصفحة الحالية
const page = window.location.pathname.split("/").pop();

// أسماء ملفات القصص
const homeSaints = [
    "george-roman",
    "abanoub",
    "marmina",
    "demiana",
    "antonios",
    "peter",
    "mark",
    "simon-kharaz",
    "kirillos-vi",
    "virgin-mary",
    "cyril-the-pillar",
    "abaskhiron"
];

const churchSaints = [
    "george-roman",
    "marmina",
    "george-alex",
    "bishoy",
    "mozahim",
    "akhmim-martyrs",
    "fayoum-martyrs",
    "semaan-akhmimi",
    "habib-girgis",
    "bishoy-kamel"
];

let currentSection = localStorage.getItem("section") || "home";

const saintInfo = {

    "george-roman": {
        name: "القديس مارجرجس الروماني",
        image: "images/george-roman.png"
    },

    "abanoub": {
        name: "القديس أبانوب",
        image: "images2/abanoub.png"
    },

    "marmina": {
        name: "القديس مارمينا",
        image: "images/marmina.png"
    },

    "demiana": {
        name: "القديسة دميانة",
        image: "images2/demiana.png"
    },

    "antonios": {
        name: "القديس الأنبا أنطونيوس",
        image: "images2/antonios.png"
    },

    "peter": {
        name: "القديس بطرس الرسول",
        image: "images/peter.png"
    },

    "george-alex": {
        name: "القديس مارجرجس السكندري",
        image: "images2/george-alex.png"
    },

    "bishoy": {
        name: "القديس الأنبا بيشوي",
        image: "images2/bishoy.png"
    },

    "mozahim": {
        name: "القديس مارجرجس المزاحم",
        image: "images/mozahim.png"
    },

    "akhmim-martyrs": {
        name: "شهداء أخميم",
        image: "images2/akhmim-martyrs.png"
    },

    "fayoum-martyrs": {
        name: "شهداء الفيوم",
        image: "images2/fayoum-martyrs.png"
    },

    "semaan-akhmimi": {
        name: "القديس سمعان الأخميمي",
        image: "images/semaan-akhmimi.png"
    },

    "habib-girgis": {
        name: "حبيب جرجس",
        image: "images/habib-girgis.png"
    },

    "mark": {
    name: "القديس مارمرقس الرسول",
    image: "images/mark.png"
    },

    "simon-kharaz": {
    name: "القديس سمعان الخراز",
    image: "images/simon-kharaz.png"
    },

    "kirillos-vi": {
    name: "البابا كيرلس السادس",
    image: "images/kirillos-vi.png"
    },

    "virgin-mary": {
    name: "القديسة السيدة العذراء مريم",
    image: "images/virgin-mary.png"
    },

    "cyril-the-pillar": {
    name: "البابا كيرلس عمود الدين",
    image: "images2/cyril-the-pillar.png"
    },

    "abaskhiron": {
    name: "الشهيد أباسخيرون القليني",
    image: "images2/abaskhiron.png"
    },

    "bishoy-kamel": {
    name: "أبونا بيشوي كامل",
    image: "images2/bishoy-kamel.png"
    }

};
const saints =
currentSection === "church"
? churchSaints
: homeSaints;

function renderCards() {

    const container = document.getElementById("cardsContainer");

    if (!container) return;

    container.innerHTML = "";

    saints.forEach(id => {
        console.log(id);
        const saint = saintInfo[id];

        console.log(id, saint);

        container.innerHTML += `
        <div class="card" data-saint="${id}">

            <span class="favorite">🤍</span>

            <img src="${saint.image}">

            <h2>${saint.name}</h2>

        </div>
        `;

    });

}
renderCards();
setupCards();

function setupCards() {

    document.querySelectorAll(".card").forEach(card => {

        // فتح القصة
        card.addEventListener("click", () => {

            localStorage.setItem("saint", card.dataset.saint);

            document.body.classList.add("fade-out");

            setTimeout(() => {

                location.href = "story.html";

            }, 300);

        });

        // علامة تمت القراءة
        const saint = card.dataset.saint;

        if (localStorage.getItem("finished_" + saint) === "true") {

            const badge = document.createElement("div");

            badge.className = "doneBadge";

            badge.textContent = "✅";

            card.appendChild(badge);

        }

        // المفضلة
        const btn = card.querySelector(".favorite");

        if (localStorage.getItem("favorite_" + saint) === "true") {

            btn.textContent = "❤️";
            btn.classList.add("active");

        }

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

            if (btn.textContent === "🤍") {

                btn.textContent = "❤️";
                btn.classList.add("active");

                localStorage.setItem("favorite_" + saint, "true");

            } else {

                btn.textContent = "🤍";
                btn.classList.remove("active");

                localStorage.removeItem("favorite_" + saint);

            }

        });

    });

}

const pageTitle = document.getElementById("pageTitle");

if (pageTitle) {

    if (currentSection === "church") {

        pageTitle.textContent = "⛪ كنيسة الشهيد العظيم مارجرجس دمنهور";

    } else {

        pageTitle.textContent = "✝ القديسون ✝";

    }

}

// ==========================================
// صفحة القصة
// ==========================================

if (page == "story.html") {

    loadStory();

}

let currentPart = 0;
let storyData = null;

async function loadStory() {

    const saint = localStorage.getItem("saint");

    if (!saint) {
        location.href = "index.html";
        return;
    }

    const response = await fetch("stories/" + saint + ".json");
    storyData = await response.json();

    document.getElementById("saintName").textContent = storyData.name;
    document.getElementById("saintImage").src = storyData.image;

    // عنوان المديح
    document.getElementById("hymnTitle").textContent =
    "🎵 مديح " + storyData.name;

    document.getElementById("bibleVerse").textContent =
        storyData.verse;

const hymnText = document.getElementById("hymnText");
hymnText.innerHTML = "";

if (Array.isArray(storyData.hymn)) {

storyData.hymn.forEach(row => {

    const columns = row
        .map(text => `<span>${text || ""}</span>`)
        .join("");

    hymnText.innerHTML += `
<div class="hymnRow columns-${row.length}">
    ${columns}
</div>
`;

});

} else if (storyData.hymn) {

    hymnText.innerHTML =
        `<p style="white-space:pre-line">${storyData.hymn}</p>`;

} else {

    hymnText.innerHTML =
        "<p>لا يوجد مديح لهذه القصة.</p>";

}

const playBtn = document.getElementById("playHymn");

const audio = document.getElementById("hymnAudio");
const audioPlayer = document.querySelector(".audioPlayer");

if (storyData.audio) {

    audio.src = storyData.audio;
    audioPlayer.style.display = "";

} else {

    audioPlayer.innerHTML = `
        <div style="
            width:100%;
            text-align:center;
            padding:12px;
            font-weight:bold;
            color:#777;
        ">
            🔇 لا يوجد صوت
        </div>
    `;

}

    // الفضائل
    const list = document.getElementById("virtuesList");
    list.innerHTML = "";

    storyData.virtues.forEach(v => {

        list.innerHTML += `<li>${v}</li>`;

    });

// استرجاع آخر جزء لهذا القديس
const savedPart = localStorage.getItem("lastReading_" + saint);

if (savedPart !== null) {
    currentPart = parseInt(savedPart);
}

showPart();

}

   function showPart() {

    document.getElementById("storyText").textContent =
        storyData.story[currentPart];

    document.getElementById("pageNumber").textContent =
        (currentPart + 1) + " / " + storyData.story.length;

    document.getElementById("progressBar").style.width =
        ((currentPart + 1) / storyData.story.length) * 100 + "%";

// حفظ آخر جزء لهذا القديس
const currentSaint = localStorage.getItem("saint");

localStorage.setItem(
    "lastReading_" + currentSaint,
    currentPart
);

// إذا انتهت القصة
if (currentPart === storyData.story.length - 1) {

    localStorage.setItem(
        "finished_" + currentSaint,
        "true"
    );

    document.getElementById("finishOverlay").style.display = "block";
    document.getElementById("finishBox").style.display = "block";
} else {

    document.getElementById("finishOverlay").style.display = "none";
    document.getElementById("finishBox").style.display = "none";

}
}

document.getElementById("nextBtn")?.addEventListener("click", () => {

    if (currentPart < storyData.story.length - 1) {

        currentPart++;

        showPart();

    }

});

document.getElementById("prevBtn")?.addEventListener("click", () => {

    if (currentPart > 0) {

        currentPart--;

        showPart();

    }

});

// ==========================================
// أكمل القراءة
// ==========================================

if (page === "index.html" || page === "") {

    const lastSaint = localStorage.getItem("saint");

    const finished = localStorage.getItem("finished_" + lastSaint);

if (lastSaint && finished !== "true") {

        const lastPart = parseInt(
            localStorage.getItem("lastReading_" + lastSaint)
        ) + 1;

        document.getElementById("continueText").innerHTML =

    "<b>" + saintInfo[lastSaint].name + "</b><br><br>" +

    "وصلت إلى الصفحة " +

    lastPart;

        document.getElementById("continueBtn").style.display = "inline-block";

        document.getElementById("continueBtn").onclick = () => {

            localStorage.setItem("saint", lastSaint);

            location.href = "story.html";

        };

    }

    else if (lastSaint && finished === "true") {

    document.getElementById("continueText").innerHTML =
        "🎉 لقد أنهيت آخر قصة قرأتها.";

    document.getElementById("continueBtn").style.display = "none";

}

}
// ==========================================
// اقرأ قصة جديدة
// ==========================================

document.getElementById("newStoryBtn")?.addEventListener("click", () => {

    // أولاً: قديسي الصفحة الرئيسية
    for (let saint of homeSaints) {

        if (!localStorage.getItem("finished_" + saint)) {

            localStorage.setItem("section", "home");
            localStorage.setItem("saint", saint);
            location.href = "story.html";
            return;

        }

    }

    // ثانياً: قديسي كنيسة مارجرجس
    for (let saint of churchSaints) {

        if (!localStorage.getItem("finished_" + saint)) {

            localStorage.setItem("section", "church");
            localStorage.setItem("saint", saint);
            location.href = "story.html";
            return;

        }

    }

    // لو خلص الكل
    location.href = "index.html?finished=true";

});

// ==========================================
// إعادة قراءة القصة
// ==========================================

document.getElementById("restartStory")?.addEventListener("click", () => {

    const saint = localStorage.getItem("saint");

    // إزالة علامة انتهاء القصة
    localStorage.removeItem("finished_" + saint);

    // امسح آخر صفحة محفوظة
    localStorage.removeItem("lastReading_" + saint);

    // ابدأ من أول القصة
    currentPart = 0;

    // اقفل نافذة النهاية
    document.getElementById("finishOverlay").style.display = "none";
    document.getElementById("finishBox").style.display = "none";

    // اعرض أول صفحة
    showPart();

});

// ==========================================
// فتح وغلق القائمة
// ==========================================

function openMenu() {

    document.getElementById("sidebar").classList.add("open");

    document.getElementById("overlay").classList.add("show");

}

function closeMenu() {

    document.getElementById("sidebar").classList.remove("open");

    document.getElementById("overlay").classList.remove("show");

}

document.getElementById("overlay")?.addEventListener("click", closeMenu);

// ==========================================
// الوضع الليلي
// ==========================================

function toggleDarkMode() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("darkMode", "true");

    } else {

        localStorage.setItem("darkMode", "false");

    }

    updateThemeButton();

}

// استرجاع الوضع الليلي

if (localStorage.getItem("darkMode") === "true") {

    document.body.classList.add("dark");

}

updateThemeButton();

const themeToggle = document.getElementById("themeToggle");

function updateThemeButton() {

    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) return;

    if (document.body.classList.contains("dark")) {

        themeToggle.innerHTML = "☀️ الوضع النهاري";

    } else {

        themeToggle.innerHTML = "🌙 الوضع الليلي";

    }

}

// ==========================================
// الرئيسية
// ==========================================

document.getElementById("homeBtn")?.addEventListener("click", () => {

    localStorage.setItem("section", "home");

    location.reload();

});
// ==========================================
// مشاركة القصة
// ==========================================

document.getElementById("shareStory")?.addEventListener("click", async () => {

    const saint = localStorage.getItem("saint");

    const title = storyData.name;

    const text =
        "📖 اقرأ قصة " + title +
        "\n\n❤️ ربنا معاك دايمًا.";

    if (navigator.share) {

        try {

            await navigator.share({

                title: title,

                text: text,

                url: window.location.href

            });

        } catch (err) {

            console.log("تم إلغاء المشاركة");

        }

    } else {

        navigator.clipboard.writeText(text + "\n" + window.location.href);

        alert("✅ تم نسخ معلومات القصة.");

    }

});

// ==========================================
// عداد التقدم
// ==========================================

if (page === "index.html" || page === "") {

    const allSaints = [

    ...new Set([
        ...homeSaints,
        ...churchSaints
    ])

];

const totalStories = allSaints.length;

let finishedStories = 0;

allSaints.forEach(saint => {

    if (localStorage.getItem("finished_" + saint) === "true") {

        finishedStories++;

    }

});

    const percent = (finishedStories / totalStories) * 100;

    const progressText = document.getElementById("progressText");

    const progressBar = document.getElementById("homeProgressBar");

    if (progressText && progressBar) {

        progressText.textContent =
            finishedStories + " من " + totalStories + " قصص";

        progressBar.style.width = percent + "%";

    }

}

// ==========================================
// البحث
// ==========================================

const searchInput = document.getElementById("search");

searchInput?.addEventListener("input", () => {

    const value = searchInput.value.trim().toLowerCase();

    let found = false;

    document.querySelectorAll(".card").forEach(card => {

        const name = card.querySelector("h2").textContent.toLowerCase();

        if (name.includes(value)) {

            card.style.display = "";

            found = true;

        } else {

            card.style.display = "none";

        }

    });

    document.getElementById("noResults").style.display =
        found ? "none" : "block";

});

// ==========================================
// زر البحث
// ==========================================

document.getElementById("searchBtn")?.addEventListener("click", () => {

    closeMenu();

    const search = document.getElementById("search");

    search.focus();

    search.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

});

// ==========================================
// زر أكمل القراءة
// ==========================================

document.getElementById("continueReadingBtn")?.addEventListener("click", () => {

    const lastSaint = localStorage.getItem("saint");

    if (!lastSaint) {

        alert("📖 لا توجد قراءة محفوظة.");

        return;

    }

    localStorage.setItem("saint", lastSaint);

    window.location.href = "story.html";

});

// ==========================================
// رسالة انتهاء جميع القصص
// ==========================================

if (window.location.search.includes("finished=true")) {

    const msg = document.getElementById("noStories");

    if (msg) {

        msg.style.display = "block";

    }

}

// ==========================================
// قسم كنيسة مارجرجس
// ==========================================

document.getElementById("churchBtn")?.addEventListener("click", () => {

    localStorage.setItem("section", "church");

    location.reload();

});

// ==========================================
// المديح
// ==========================================

const hymnContainer =
document.getElementById("hymnContainer");

document.getElementById("showHymn")
?.addEventListener("click", () => {

    if (hymnContainer.style.display === "none") {

        hymnContainer.style.display = "block";

        document.getElementById("showHymn").textContent =
        "📕 إخفاء المديح";

    } else {

        hymnContainer.style.display = "none";

        document.getElementById("showHymn").textContent =
        "📖 عرض المديح";

    }

});

const audio = document.getElementById("hymnAudio");

const playBtn = document.getElementById("playPause");
const restartBtn = document.getElementById("restartAudio");
const progress = document.getElementById("audioProgress");
const current = document.getElementById("currentTime");
const total = document.getElementById("duration");

// تشغيل وإيقاف
playBtn?.addEventListener("click", () => {

    if (audio.paused) {

        audio.play();
        playBtn.textContent = "⏸";

    } else {

        audio.pause();
        playBtn.textContent = "▶️";

    }

});

// عند تحميل الملف
audio?.addEventListener("loadedmetadata", () => {

    progress.max = Math.floor(audio.duration);

    total.textContent = formatTime(audio.duration);

});

// تحديث الشريط
audio?.addEventListener("timeupdate", () => {

    progress.value = Math.floor(audio.currentTime);

    current.textContent = formatTime(audio.currentTime);

});

// تحريك الشريط
progress?.addEventListener("input", () => {

    audio.currentTime = progress.value;

});

// إعادة من البداية
restartBtn?.addEventListener("click", () => {

    audio.currentTime = 0;

    audio.play();

    playBtn.textContent = "⏸";

});

// انتهاء التشغيل
audio?.addEventListener("ended", () => {

    playBtn.textContent = "▶️";

    progress.value = 0;

});

// تحويل الثواني لدقائق
function formatTime(seconds){

    seconds = Math.floor(seconds);

    const m = Math.floor(seconds / 60);

    const s = seconds % 60;

    return `${m}:${s.toString().padStart(2,"0")}`;

}

function initMenu() {

    document.getElementById("aboutBtn")
?.addEventListener("click", () => {

    location.href = "about.html";

});

    document.getElementById("overlay")
        ?.addEventListener("click", closeMenu);

    document.getElementById("homeBtn")
        ?.addEventListener("click", () => {

            localStorage.setItem("section", "home");
            location.href = "index.html";

        });

    document.getElementById("churchBtn")
        ?.addEventListener("click", () => {

            localStorage.setItem("section", "church");
            location.href = "index.html";

        });

    document.getElementById("searchBtn")
        ?.addEventListener("click", () => {

            if (page === "story.html") {
                location.href = "index.html";
                return;
            }

            closeMenu();

            document.getElementById("search")
                ?.focus();

        });

    document.getElementById("continueReadingBtn")
        ?.addEventListener("click", () => {

            const saint = localStorage.getItem("saint");

            if (!saint) {
                alert("لا توجد قراءة محفوظة.");
                return;
            }

            location.href = "story.html";

        });

    document.getElementById("themeToggle")
        ?.addEventListener("click", toggleDarkMode);

    document.getElementById("favoritesBtn")
        ?.addEventListener("click", showFavorites);

}

function showFavorites() {

    if (page === "story.html") {

        location.href = "index.html?favorites=true";
        return;

    }

    const container = document.getElementById("cardsContainer");

    if (!container) return;

    container.innerHTML = "";

    const allSaints = [...new Set([
        ...homeSaints,
        ...churchSaints
    ])];

    let hasFavorites = false;

    allSaints.forEach(id => {

        if (localStorage.getItem("favorite_" + id) === "true") {

            const saint = saintInfo[id];

            container.innerHTML += `
            <div class="card" data-saint="${id}">
                <span class="favorite active">❤️</span>
                <img src="${saint.image}">
                <h2>${saint.name}</h2>
            </div>
            `;

            hasFavorites = true;

        }

    });

    setupCards();

    const noFav = document.getElementById("noFavorites");

    if (noFav) {

        noFav.style.display = hasFavorites ? "none" : "block";

    }

    closeMenu();

}