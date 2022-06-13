const musiccontainer = document.querySelector('.music-container');
const playbtn = document.querySelector('#play');
const prevbtn = document.querySelector('#prev');
const nextbtn = document.querySelector('#next');
const btn = document.querySelector('#videoBtn');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progresscontainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const volumecontainer = document.querySelector('.volume-container');
const volume = document.querySelector('.volume');
const video = document.querySelector('#myVideo');

// Songs

const songs = ['Nirvana - Something In The Way ', 'Unknown', 'Miki Matsubara - Stay With Me']

//keep track of songs

let songIndex = 2;

//Update song detail

function loadSong(song){
    title.innerText = song; 
    audio.src = `musics/${song}.mp3`;
    cover.src = `Images/${song}.jpg`;
}

loadSong(songs[songIndex]);

function playsong(){
    musiccontainer.classList.add('play');
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pausesong(){

    musiccontainer.classList.remove('play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');
    playbtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

function nextsong(){
    songIndex = (songIndex - 1 + 3) % 3;
    loadSong(songs[songIndex]);
    playsong();
    
}

function prevsong(){
    songIndex = (songIndex + 1) % 3;
    loadSong(songs[songIndex]);
    playsong();
}

function setvolume(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const vol = audio.volume;
    console.log(width);
    console.log(clickX);
    audio.volume = (clickX / width) / 1;
    console.log(audio.volume);
    const curvol = audio.volume;
    const volpercent = curvol * 100;
    volume.style.width = `${volpercent}%`;
    console.log(`${volpercent}%`)
}
function updateprogress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}
function videostate(){
    console.log(1);
    if(!video.paused){
        video.pause();
        btn.querySelector('i.fa-solid').classList.remove('fa-circle-stop');
        btn.querySelector('i.fa-solid').classList.add('fa-circle-play');
    }
    else{
        video.play();
        btn.querySelector('i.fa-solid').classList.remove('fa-circle-play');
        btn.querySelector('i.fa-solid').classList.add('fa-circle-stop');
    }
}
function setprogress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

playbtn.addEventListener('click', () => {
    const isplaying = musiccontainer.classList.contains('play');
    if(isplaying == 0){
        playsong();
    }
    else{
        pausesong();
    }
})
btn.addEventListener('click', videostate)
nextbtn.addEventListener('click', () => {
    nextsong();

})
prevbtn.addEventListener('click', () => {
    prevsong();
})

audio.addEventListener('timeupdate', updateprogress)
audio.addEventListener('ended', nextsong)
video.addEventListener('click', videostate)
progresscontainer.addEventListener('click', setprogress)
volumecontainer.addEventListener('click', setvolume)