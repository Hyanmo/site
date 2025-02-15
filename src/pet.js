export function start() {
    let pet = document.getElementById('pet');
    let deg = 0;
    let deg_y = 0;
    let mousePosition = { x: 0, y: 0 };
    let position = { x: 0, y: 0 };
    let count = 0;
    let speed = 50;
    let isCatchUp = false;
    let isClick = false;
    let isIdle = true;

    let attack = { current: 0, max: 340 };
    let click = { current: 0, max: 40 };
    let walk = { current: 0, max: 130 };

    // 处理点击事件
    const onClick = () => {
        isClick = true;
    };

    // 鼠标和触摸事件通用函数
    const handleMouseMove = (event) => {
        // 判断是否是触摸事件还是鼠标事件
        const isTouchEvent = event.type.startsWith('touch');
        const clientX = isTouchEvent ? event.touches[0].clientX : event.clientX;
        const clientY = isTouchEvent ? event.touches[0].clientY : event.clientY;

        mousePosition.x = clientX - pet.offsetLeft - pet.clientWidth / 2;
        mousePosition.y = clientY - pet.offsetTop - pet.clientHeight / 2;

        deg = 360 * Math.atan(mousePosition.y / mousePosition.x) / (2 * Math.PI);

        if (pet.offsetLeft > clientX) {
            deg_y = -180;
        } else {
            deg_y = 0;
        }

        count = 0;
    };

    // 添加事件监听器，支持鼠标和触摸事件
    pet.addEventListener('click', onClick);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);

    // 每10毫秒执行一次，更新宠物的状态
    setInterval(() => {
        if (isCatchUp == false && isIdle == false) {
            catchUpState();
        } else if (isCatchUp == true && isIdle == false) {
            attackState();
        } else if (isClick == true) {
            clickState();
        }
    }, 10);

    function catchUpState() {
        if (walk.current === 0) {
            document.getElementById("pet").src = require("@/assets/image/Walk.gif");
            pet.style.width = "50px";
            walk.current++;
        } else if (walk.current < walk.max) {
            pet.style.transform = `rotateZ(${deg}deg) rotateY(${deg_y}deg)`;

            if (count < speed) {
                position.x += mousePosition.x / speed;
                position.y += mousePosition.y / speed;
            } else {
                isCatchUp = true;
                walk.current = 0;
            }

            pet.style.left = position.x + "px";
            pet.style.top = position.y + "px";
            count++;
            walk.current++;
        } else if (walk.current >= walk.max) {
            walk.current = 0;
            document.getElementById("pet").src = require("@/assets/image/Walk.gif");
        }
    }

    function attackState() {
        if (attack.current == 0) {
            document.getElementById("pet").src = require("@/assets/image/Attack.gif");
            pet.style.width = "100px";
            attack.current++;
        } else if (attack.current < attack.max) {
            attack.current++;
        } else if (attack.current >= attack.max) {
            isCatchUp = false;
            isIdle = true;
            attack.current = 0;
            document.getElementById("pet").src = require("@/assets/image/Idle.gif");
            pet.style.width = "50px";
        }
    }

    function clickState() {
        if (click.current == 0) {
            document.getElementById("pet").src = require("@/assets/image/Hit.gif");
            pet.style.width = "60px";
            click.current++;
        } else if (click.current < click.max) {
            click.current++;
        } else if (click.current >= click.max) {
            click.current = 0;
            document.getElementById("pet").src = require("@/assets/image/Walk.gif");
            pet.style.width = "50px";
            isClick = false;
            isIdle = false;
        }
    }
}
