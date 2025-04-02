let currentLanguage = "ru"; // Язык по умолчанию

// Пути к локальным JSON-файлам
const jsonFiles = {
    "ru": "articlesRu.json",
    "kz": "articlesKz.json"
};

// Функция загрузки JSON и обновления интерфейса
async function loadJson() {
    try {
        const response = await fetch(jsonFiles[currentLanguage]);
        if (!response.ok) throw new Error("Ошибка загрузки JSON");

        const data = await response.json();

        const sidebar = document.getElementById("sidebar").querySelector("ul");
        const content = document.getElementById("content");

        // Очистка списка тем
        sidebar.innerHTML = "";

        // Создаём список ссылок
        data.themes.forEach((theme) => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = theme.title;
            link.onclick = (event) => {
                event.preventDefault();
                content.innerHTML = `<h2>${theme.title}</h2><p>${theme.content.replace(/\n/g, '<br>')}</p>`;
            };
            li.appendChild(link);
            sidebar.appendChild(li);
        });

    } catch (error) {
        console.error("Ошибка загрузки JSON:", error);
    }
}

// Обработчики переключения языка
document.getElementById("ru-btn").addEventListener("click", function () {
    currentLanguage = "ru";
    setActiveLang(this);
    loadJson();
});

document.getElementById("kz-btn").addEventListener("click", function () {
    currentLanguage = "kz";
    setActiveLang(this);
    loadJson();
});

// Функция смены активной ссылки
function setActiveLang(activeElement) {
    document.querySelectorAll(".lang-switch a").forEach(link => link.classList.remove("active"));
    activeElement.classList.add("active");
}

// Загрузка статей при старте страницы
loadJson();
