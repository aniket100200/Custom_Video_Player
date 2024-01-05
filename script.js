const container = document.querySelector(".container"),
    mainVideo = container.querySelector("video"),
    videoTimeline = container.querySelector(".video-timeline"),
    progressBar = container.querySelector(".progress-bar"),
    volumeBtn = container.querySelector(".volume i"),
    volumeSlider = container.querySelector(".left input"),
    currentVidTime = container.querySelector(".current-time"),
    videoDuration = container.querySelector(".video-duration"),
    skipBackward = container.querySelector(".skip-backward i"),
    skipForward = container.querySelector(".skip-forward i"),
    playPauseBtn = container.querySelector(".play-pause i"),
    speedBtn = container.querySelector(".playback-speed span"),
    speedOptions = container.querySelector(".speed-options"),
    picInPicBtn = container.querySelector(".pic-in-pic span"),
    fullScreenBtn = container.querySelector(".fullscreen i");

    let timer;

    const hideControls= ()=>{
      timer=setTimeout(()=>{
            container.classList.remove("show-controls");
        },3000);
    };
    hideControls();
    container.addEventListener('mousemove',()=>{
        container.classList.add("show-controls");
        clearTimeout(timer);
        hideControls();
    });

const formatTime = time => {
    let seconds = Math.floor(time % 60),
        minutes = Math.floor(time / 60) % 60,
        hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if (hours == 0) {
        return `${minutes}:${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
}
mainVideo.addEventListener('timeupdate', (e) => {
    let { currentTime, duration } = e.target; //getting current time and duration of the video..
    let percent = (currentTime / duration) * 100; //getting the percentage..
    progressBar.style.width = `${percent}%` //passing as % progress width..
    currentVidTime.innerHTML = formatTime(currentTime);
});

mainVideo.addEventListener('loadeddata', (e) => {
    videoDuration.innerHTML = formatTime(e.target.duration);
})

videoTimeline.addEventListener('click', (e) => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

const dragableProgressBar = (e) => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width=`${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerHTML=formatTime(mainVideo.currentTime);
};

videoTimeline.addEventListener('mousedown', () => {
    videoTimeline.addEventListener('mousemove', dragableProgressBar);
});

container.addEventListener('mouseup', () => {
    videoTimeline.removeEventListener('mousemove', dragableProgressBar);
});

videoTimeline.addEventListener('mousemove',(e)=>{
    const progressTime= videoTimeline.querySelector("span");
    let offsetX=e.offsetX;
    progressTime.style.left=`${offsetX}px`;

    let timelineWidth = videoTimeline.clientWidth;
    let percent= (e.offsetX / timelineWidth) * mainVideo.duration; //getting percentage

    progressTime.innerText=formatTime(percent);
});

volumeBtn.addEventListener('click', () => {
    if (!volumeBtn.classList.contains("fa-volume-high")) {
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high")
        mainVideo.volume = 0.5; //passing the 0.5 valuse as video volument
    }
    else {
        mainVideo.volume = 0.0; //passing the 0.0 valuse as video volument
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark")
    }

    volumeSlider.value = mainVideo.volume; //updates the slider value according to the video volume
});

volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value;
    console.log(e.target.value);
    if (e.target.value <= 0) {
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    else {
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high")
    }
});

speedBtn.addEventListener('click', () => {
    speedOptions.classList.toggle("show");
});

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener('click', () => {
        mainVideo.playbackRate = option.dataset.speed; //passing option dataset value as video playback value..

        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");

    });
});


document.addEventListener('click', (e) => {
    if (e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-outlined") {
        speedOptions.classList.remove("show");
    }
});


picInPicBtn.addEventListener('click', () => {
    mainVideo.requestPictureInPicture(); //changing the video mode to pic in pic
});

fullScreenBtn.addEventListener('click', () => {
    container.classList.toggle("fullscreen");

    if (!container.classList.contains("fullscreen")) {
        //if video is already in fullscree mode
        fullScreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen;
    }

    fullScreenBtn.classList.replace("fa-expand", "fa-compress")
    container.requestFullscreen;

})


skipBackward.addEventListener('click', () => {
    mainVideo.currentTime -= 5;
});

skipForward.addEventListener('click', () => {
    mainVideo.currentTime += 5;
})

playPauseBtn.addEventListener('click', () => {
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});

/*Play Pause Event Added*/


mainVideo.addEventListener('play', () => {
    playPauseBtn.classList.replace("fa-play", "fa-pause")
});
mainVideo.addEventListener('pause', () => {
    playPauseBtn.classList.replace("fa-pause", "fa-play");
});

document.addEventListener('keyup', (e) => {
    if (e.code === "Space") {
        playPauseBtn.click();
    }

    if (e.code === "KeyM") {
        volumeBtn.click();
    }

});


/*My Concepts*/