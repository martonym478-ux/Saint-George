window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});

// ==========================================
// Saints Stories
// app.js
// ==========================================

// معرفة الصفحة الحالية
const page = window.location.pathname.split("/").pop();

// أسماء ملفات القصص
const saints = [
    "george",
    "abanoub",
    "marmina",
    "demiana",
    "antonios",
    "peter"
];

// ==========================================
// عند الضغط على أي قديس
// ==========================================

if (document.querySelectorAll(".card").length > 0) {

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {

card.addEventListener("click", () => {

    localStorage.setItem("saint", saints[index]);

    card.style.transform = "scale(.95)";

    document.body.classList.add("fade-out");

    setTimeout(() => {

        location.href = "story.html";

    }, 300);

});

    });

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

    document.getElementById("bibleVerse").textContent =
        storyData.verse;

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
// إظهار علامة تمت القراءة
// ==========================================

if (page === "index.html" || page === "") {

    document.querySelectorAll(".card").forEach(card => {

        const saint = card.dataset.saint;

        if (localStorage.getItem("finished_" + saint) === "true") {

            const badge = document.createElement("div");

            badge.className = "doneBadge";

            badge.textContent = "✅";

            card.appendChild(badge);

        }

    });

}
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

        const names = {

            george: "القديس مارجرجس",

            abanoub: "القديس أبانوب",

            marmina: "القديس مارمينا",

            demiana: "القديسة دميانة",

            antonios: "الأنبا أنطونيوس",

            peter: "القديس بطرس الرسول"

        };

        document.getElementById("continueText").innerHTML =

            "<b>" + names[lastSaint] + "</b><br><br>" +

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

    const order = [

        "george",

        "abanoub",

        "marmina",

        "demiana",

        "antonios",

        "peter"

    ];

    for (let saint of order) {

        if (!localStorage.getItem("finished_" + saint)) {

            localStorage.setItem("saint", saint);

            location.href = "story.html";

            return;

        }

    }

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
// المفضلة
// ==========================================

document.querySelectorAll(".favorite").forEach(btn => {

    const card = btn.closest(".card");

    const saint = card.dataset.saint;
if(localStorage.getItem("favorite_" + saint) === "true"){

    btn.textContent = "❤️";
    btn.classList.add("active");

}

    btn.addEventListener("click",(e)=>{

        e.stopPropagation();

        if(btn.textContent==="🤍"){

            btn.textContent="❤️";
            btn.classList.add("active");

            localStorage.setItem("favorite_"+saint,"true");

        }else{

            btn.textContent="🤍";
            btn.classList.remove("active");

            localStorage.removeItem("favorite_"+saint);

        }

    });

});

// ==========================================
// عرض المفضلة فقط
// ==========================================

document.getElementById("favoritesBtn")?.addEventListener("click", () => {

    const cards = document.querySelectorAll(".card");

    let hasFavorites = false;

    cards.forEach(card => {

        const saint = card.dataset.saint;

        if (localStorage.getItem("favorite_" + saint) === "true") {

            card.style.display = "";

            hasFavorites = true;

        } else {

            card.style.display = "none";

        }

    });

    closeMenu();

const noFavorites = document.getElementById("noFavorites");

if (!hasFavorites) {

    noFavorites.style.display = "block";

} else {

    noFavorites.style.display = "none";

}

});

// ==========================================
// الرئيسية
// ==========================================

document.getElementById("homeBtn")?.addEventListener("click", () => {

    // لو في الصفحة الرئيسية
    if (page === "index.html" || page === "") {

        document.querySelectorAll(".card").forEach(card => {

            card.style.display = "";

        });

        document.getElementById("noFavorites").style.display = "none";

        closeMenu();

    } else {

        // لو في صفحة القصة
        window.location.href = "index.html";

    }

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

    const totalStories = saints.length;

    let finishedStories = 0;

    saints.forEach(saint => {

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