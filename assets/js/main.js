
const gallery = document.getElementById("gallery");

window.onmousemove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const xDecimal = mouseX / window.innerWidth;
    const yDecimal = mouseY / window.innerHeight;

    const maxX = gallery.offsetWidth - window.innerWidth;
    const maxY = gallery.offsetHeight - window.innerHeight;

    const panX = maxX - xDecimal * -1;
    const panY = maxY - yDecimal * -1;


    gallery.animate({
        transform: `translate(${panX}px, ${panY}px)`
    }, {
        duration: 4000,
        fill: 'forwards',
        easing: "ease"
    });
};


const radius = 300;
const blocks = document.querySelectorAll(".block");
const radius2 = radius * radius;
const container = document.querySelector("#gallery");
const maxScale = 2;

blocks.forEach((block) => {
    let b = block.getBoundingClientRect();
    block.cx = b.left + b.width / 2 + window.pageXOffset;
    block.cy = b.top + b.height / 2 + window.pageYOffset;

    block.tween = gsap.to(block, {
        scale: maxScale,
        ease: "power1.in",
        paused: true
    })
        .progress(1)
        .progress(0);

    document.addEventListener("mousemove", (e) => {
        let i = blocks.length;
        let dx, dy, block;

        while (i--) {
            block = blocks[i];
            dx = (block.cx - e.pageX) ** 2;
            dy = (block.cy - e.pageY) ** 2;
            block.tween.progress(1 - (dx + dy) / radius2);
        }
    });
})






















