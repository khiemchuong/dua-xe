document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('.start-button');
    const resetButton = document.querySelector('.reset-button');
    const circles = document.querySelectorAll('.circle');
    const carImages = document.querySelectorAll('.anhxe');
    const finishLine = document.querySelector('.dich');

    let winningCar = null; // Biến để xác định xe chiến thắng
    let gameInProgress = false; // Biến để xác định trò chơi đang diễn ra hay không

    startButton.addEventListener('click', function () {
        if (!winningCar && !gameInProgress) {
            resetGame();
            gameInProgress = true;

            // Bắt đầu trò chơi
            addCircleClass(circles[0], 'red');
            removeCircleClass(circles[2], 'green');

            setTimeout(function () {
                removeCircleClass(circles[0], 'red');
                addCircleClass(circles[1], 'yellow');
            }, 1000);

            setTimeout(function () {
                removeCircleClass(circles[1], 'yellow');
                addCircleClass(circles[2], 'green');
                moveCarRandomSpeed(carImages[0], finishLine.offsetLeft);
                moveCarRandomSpeed(carImages[1], finishLine.offsetLeft);
            }, 2000);
        }
    });

    resetButton.addEventListener('click', function () {
        if (!gameInProgress) {
            resetGame();
            winningCar = null; // Reset xe chiến thắng khi bắt đầu lại trò chơi
        }
    });

    function moveCarRandomSpeed(car, finishLinePosition) {
        const animationDuration = 4 + Math.random() * 6;

        car.style.animation = `moveCarAnimation ${animationDuration}s linear infinite`;
        car.style.animationPlayState = 'running';

        const keyframes = `@keyframes moveCarAnimation {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(${finishLinePosition - car.offsetLeft}px);
            }
        }`;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = keyframes;
        document.head.appendChild(styleElement);

        car.addEventListener('animationiteration', function () {
            if (!winningCar) {
                winningCar = car;
                announceWinner();
            }
        });
    }

    function announceWinner() {
        if (winningCar) {
            const carNumber = winningCar.dataset.xe;
            alert(`Xe ${carNumber} chiến thắng!`);
            gameInProgress = false; // Dừng trò chơi khi có người chiến thắng
        }
    }

    function resetGame() {
        carImages.forEach(car => car.style.animation = 'none');
        gameInProgress = false; // Đặt lại trạng thái trò chơi khi bắt đầu lại
    }

    function addCircleClass(circle, className) {
        circle.classList.add(className);
    }

    function removeCircleClass(circle, className) {
        circle.classList.remove(className);
    }
});

function startAnimation() {
    const lights = document.querySelectorAll('.circle');

    lights.forEach(light => {
        light.classList.remove('stop-animation');
        light.style.animation = 'none';
        void light.offsetWidth;
    });

    lights[0].classList.add('do');
    lights[1].classList.add('vang');
    lights[2].classList.add('xanh');

    setTimeout(() => {
        lights[0].style.animation = 'doLight 2s 1';
        lights[0].classList.remove('stop-animation');
    }, 0);

    setTimeout(() => {
        lights[0].classList.add('stop-animation');
        lights[1].style.animation = 'vangLight 2s 1';
        lights[1].classList.remove('stop-animation');
    }, 1000);

    setTimeout(() => {
        lights[1].classList.add('stop-animation');
        lights[2].style.animation = 'xanhLight 2s 1';
        lights[2].classList.remove('stop-animation');
    }, 2000);

    // Tắt mờ cho tất cả các đèn khi kết thúc
    setTimeout(() => {
        lights.forEach(light => {
            light.classList.add('stop-animation');
        });
    }, 3000);
}

