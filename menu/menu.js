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
    ],

    reading: [
        {icon:"📋", title:"Шульте", file:"reading/shulte.html"},
        {icon:"📖", title:"Читалка", file:"reading/chitaem/chitalka.html"},
        {icon:"🅰", title:"Алфавит", file:"reading/alfabet.html"},
        {icon:"🧠", title:"Анаграммы", file:"reading/putal.html"},
        {icon:"🌈", title:"Радуга", file:"reading/raduga.html"},
        {icon:"🔄", title:"Перевёртыши", file:"reading/pereverton.html"},
        {icon:"🐌", title:"Столбики", file:"reading/stolbiky/stolby.html"},
        {icon:"🏔", title:"Лавина", file:"reading/bystro_chitaem/lavina.html"},
        {icon:"🔤", title:"Слоги", file:"reading/slogi/slogi.html"}
    ],

    math: [
        {icon:"🏠", title:"Домики", file:"math/domiky.html"},
        {icon:"🔎", title:"Найди число", file:"math/findnumber.html"},
        {icon:"🔲", title:"Магический квадрат", file:"math/magic.html"},
        {icon:"🧮", title:"Считалочка", file:"math/primery.html"},
        {icon:"✖", title:"Таблица умножения", file:"math/tablitsa.html"},
        {icon:"⚫", title:"Точки", file:"math/tochki.html"}
    ],

    other: [
        {icon:"🌀", title:"Лабиринт", file:"other/labyrint.html"},
        {icon:"🃏", title:"Мемо", file:"other/memo.html"},
        {icon:"👀", title:"Что изменилось?", file:"other/peremeny.html"},
        {icon:"🚦", title:"Светофор", file:"other/stoplight.html"},
        {icon:"🔤", title:"Алфавит", file:"other/alf/letalf.html"}
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

            link.href = "/neurox/" + item.file;

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
