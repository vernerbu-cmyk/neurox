document.body.insertAdjacentHTML("beforeend", `

<button id="neurox-menu-btn">
☰
</button>

<div id="neurox-overlay"></div>

<div id="neurox-drawer">

<div class="nx-title">
🧠 NeuroX
</div>


<a class="nx-item" href="../index.html">
🏠 Главное меню
</a>


<a class="nx-item" href="../preschool/index.html">
🧸 Дошколятам
</a>


<a class="nx-item" href="../reading/index.html">
📖 Скорочтение
</a>


<a class="nx-item" href="../math/index.html">
🧮 Скоросчёт
</a>


<a class="nx-item" href="../other/index.html">
🎲 Другое
</a>


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



function openMenu() {

    drawer.classList.add("open");
    overlay.style.display = "block";

}


function closeMenu() {

    drawer.classList.remove("open");
    overlay.style.display = "none";

}



button.onclick = openMenu;


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