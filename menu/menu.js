document.body.insertAdjacentHTML("beforeend", `

<button id="neurox-menu-btn">
☰
</button>

<button id="fullscreen-btn">
⛶
</button>

<div id="neurox-overlay"></div>

<div id="neurox-drawer">

<div class="nx-title">
🧠 NeuroX
</div>


<a class="nx-item" href="../index.html">
🏠 Главное меню
</a>


<div class="nx-item nx-section" data-section="preschool">
🧸 Дошколятам
</div>

<div class="nx-submenu" id="submenu-preschool"></div>

<div class="nx-item nx-section" data-section="reading">
📖 Скорочтение
</div>

<div class="nx-submenu" id="submenu-reading"></div>

<div class="nx-item nx-section" data-section="math">
🧮 Скоросчёт
</div>

<div class="nx-submenu" id="submenu-math"></div>

<div class="nx-item nx-section" data-section="other">
🎲 Другое
</div>

<div class="nx-submenu" id="submenu-other"></div>


<hr>


<a class="nx-item" href="#">
❔ Руководство
</a>


<a class="nx-item" href="#">
⚙ Настройки
</a>


<a class="nx-item" href="#" onclick="toggleFullscreen()">
⛶ Полный экран
</a>

</div>

`);


const drawer = document.getElementById("neurox-drawer");
const overlay = document.getElementById("neurox-overlay");
const button = document.getElementById("neurox-menu-btn");
const fullscreenButton = document.getElementById("fullscreen-btn");

const MENU = {

    preschool: [
        // пока пусто
    ],

    reading: [
        {icon:"📋", title:"Шульте", file:"Shulte.html"},
        {icon:"📖", title:"Читалка", file:"chitaem/chitalka.html"},
        {icon:"🅰", title:"Алфавит", file:"alfabet.html"},
        {icon:"🧠", title:"Анаграммы", file:"putal.html"},
        {icon:"🌈", title:"Радуга", file:"raduga.html"},
        {icon:"🔄", title:"Перевёртыши", file:"pereverton.html"},
        {icon:"🐌", title:"Столбики", file:"stolbiky/stolby.html"},
        {icon:"🏔", title:"Лавина", file:"bystro_chitaem/lavina.html"},
        {icon:"🔤", title:"Слоги", file:"slogi/index.html"}
    ],

    math: [
        {icon:"🏠", title:"Домики", file:"domiky.html"},
        {icon:"🔎", title:"Найди число", file:"findnumber.html"},
        {icon:"🔲", title:"Магический квадрат", file:"magic.html"},
        {icon:"🧮", title:"Считалочка", file:"primery.html"},
        {icon:"✖", title:"Таблица умножения", file:"tablitsa.html"},
        {icon:"⚫", title:"Точки", file:"tochki.html"}
    ],

    other: [
        {icon:"🌀", title:"Лабиринт", file:"labyrint.html"},
        {icon:"🃏", title:"Мемо", file:"memo.html"},
        {icon:"👀", title:"Что изменилось?", file:"peremeny.html"},
        {icon:"🚦", title:"Светофор", file:"stoplight.html"}
    ]

};

function buildMenu(){

    Object.keys(MENU).forEach(section=>{

        const container = document.getElementById("submenu-"+section);

        if(!container) return;

        container.innerHTML = "";
        
        MENU[section].forEach(item=>{

            const link = document.createElement("a");

            link.className = "nx-subitem";

            link.innerHTML = `${item.icon} ${item.title}`;

            link.href = item.file;

            container.appendChild(link);

        });

    });

}

buildMenu();

document.querySelectorAll(".nx-section").forEach(section=>{

    section.onclick = function(){

        const id = this.dataset.section;

        const submenu = document.getElementById("submenu-"+id);

        const isOpen = submenu.style.display === "block";

        document.querySelectorAll(".nx-submenu").forEach(menu=>{

            menu.style.display = "none";

        });

        if(!isOpen){

            submenu.style.display = "block";

        }

    };

});



function openMenu() {

    drawer.classList.add("open");
    overlay.style.display = "block";

}


function closeMenu() {

    drawer.classList.remove("open");
    overlay.style.display = "none";

}



button.onclick = openMenu;
fullscreenButton.onclick = toggleFullscreen;
overlay.onclick = closeMenu;



// ---------- СВАЙП СЛЕВА ----------

let startX = 0;
let startY = 0;


document.addEventListener("touchstart", function (e) {

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;

});



document.addEventListener("touchend", function (e) {

    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;


    let diffX = endX - startX;
    let diffY = Math.abs(endY - startY);



    // открытие меню:
    // только если начали у самого левого края

    if (startX <= 40 && diffX > 80 && diffY < 100) {

        openMenu();

    }



    // закрытие свайпом влево

    if (diffX < -80 && diffY < 100) {

        closeMenu();

    }

});




// ---------- ПОЛНЫЙ ЭКРАН ----------


async function toggleFullscreen() {

    if (!document.fullscreenElement) {

        await document.documentElement.requestFullscreen();

    } else {

        await document.exitFullscreen();

    }

}
