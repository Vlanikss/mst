document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("background-video");
    const masks = document.querySelectorAll(".video-mask");

    masks.forEach(mask => {
        const x = mask.getAttribute("data-x");
        const y = mask.getAttribute("data-y");

       
        const clonedVideo = video.cloneNode(true);
        clonedVideo.style.position = "absolute";
        clonedVideo.style.left = `-${x}px`;
        clonedVideo.style.top = `-${y}px`;
        clonedVideo.style.visibility = "visible"; 

        mask.appendChild(clonedVideo);
    });

    
    video.play();
});
