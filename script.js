const video=document.querySelector('video');
const progressRange=document.querySelector('.progress-range');
const progressBar=document.querySelector('.progress-bar');
const playBtn=document.getElementById("play-btn");
const volumeIcon=document.querySelector('#volume-icon');
const volumeRange=document.querySelector('.volume-range');
const volumeBar=document.querySelector('.volume-bar');
const currentTime=document.querySelector(".time-elapsed");
const duration=document.querySelector(".time-duration");
const fullscreenBtn=document.querySelector(".fullscreen");
const speed=document.querySelector(".player-speed");


// Play & Pause ----------------------------------- //

//show play icon
function showPlayIcon(){
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function togglePlay(){
    if(video.paused){
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    }else{
        video.pause();
        showPlayIcon();
    }
}

// Progress Bar ---------------------------------- //

//returns time in minutes an seconds
function displayTime(time){
    const minutes=Math.floor(time / 60);
    let seconds=Math.floor(time % 60);
    seconds=seconds>9?seconds:`0${seconds}`;
    return `${minutes}:${seconds}`;
}

//Function to update progress bar
function updateProgressBar(){
    // console.log(video.currentTime, video.duration);
    progressBar.style.width=`${(video.currentTime/video.duration)*100}%`;
    currentTime.textContent=`${displayTime(video.currentTime)} /`;
    duration.textContent=`${displayTime(video.duration)}`;
}

//function to to see and set the progress of the video to th point where user has clicked
function setProgressBar(e){
    const newTime=e.offsetX/progressRange.offsetWidth;
    progressBar.style.width=`${newTime*100}%`;
    video.currentTime=newTime*video.duration;
}

// Volume Controls --------------------------- //

let lastVolume=1;

//CHnage volumeIcon classes according to the volume
function changeVolumeIcon(volume){
    if(volume>0.7){
        volumeIcon.classList.add('fas', 'fa-volume-up');
    }else if(volume<=0.7 && volume>0){
        volumeIcon.classList.add('fas', 'fa-volume-down');
    }else if(volume===0){
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }
    volumeIcon.setAttribute('title', 'Mute');
}

//Change volume
function changeVolume(e){
    let volume=e.offsetX/volumeRange.offsetWidth;
    if(volume<0.1){
        volume=0;
    }
    if(volume>0.9){
        volume=1;
    }
    volumeBar.style.width=`${volume*100}%`;
    video.volume=volume;
    lastVolume=volume;
    //set volume icon
    volumeIcon.className='';
   changeVolumeIcon(volume);
    
}



//function to mute and unmute
function toggleMute(){
    if(video.volume){
        lastVolume=video.volume;
        video.volume=0;
        volumeBar.style.width=0;
        volumeIcon.className='';
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'UnMute');
    }else{
        video.volume=lastVolume;
        volumeBar.style.width=`${video.volume*100}%`;
        changeVolumeIcon(video.volume);
    }
}

// Change Playback Speed -------------------- //
function changePlaybackSpeed(){
    console.log('playback speed', video.playbackRate);    
    console.log('selected speed', speed.value);
    video.playbackRate=speed.value;
}


// Fullscreen ------------------------------- //


//Event listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('ended',showPlayIcon);
video.addEventListener('timeupdate', updateProgressBar);
video.addEventListener('canplay', updateProgressBar);
progressRange.addEventListener('click', setProgressBar);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener("change", changePlaybackSpeed);