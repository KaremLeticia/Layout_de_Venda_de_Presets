const sliderBars = document.querySelectorAll('.slider-bar');
const handles = document.querySelectorAll('.handle');
const containers = document.querySelectorAll('.container, .container1, .container2, .container3');
const afterImages = document.querySelectorAll('.after');

let isDragging = false;

const startDrag = () => {
    isDragging = true;
};

const stopDrag = () => {
    isDragging = false;
};

const onDrag = (event) => {
    if (!isDragging) return;
    const containerIndex = Array.from(containers).findIndex(container => container.contains(event.target));
    const container = containers[containerIndex];
    const rect = container.getBoundingClientRect();
    let offsetX = event.clientX - rect.left;

    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    sliderBars[containerIndex].style.left = `${percentage}%`;
    afterImages[containerIndex].style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
};

sliderBars.forEach((sliderBar) => {
    sliderBar.addEventListener('mousedown', startDrag);
});

handles.forEach((handle) => {
    handle.addEventListener('mousedown', startDrag);
});

window.addEventListener('mouseup', stopDrag);
window.addEventListener('mousemove', onDrag);



