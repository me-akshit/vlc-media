const video_input= document.querySelector("#video-input")
const open_btn= document.querySelector("#open-btn")
const videoVu= document.querySelector('#videoVu')
const volumeUp= document.querySelector('#volumeUp')
const volumeDown= document.querySelector('#volumeDown')
const speedUp=document.querySelector('#speedUp')
const speedDown=document.querySelector('#speedDown')
const toast= document.querySelector('#toast')
const backward= document.querySelector('#backward')
const play= document.querySelector('#play')
const pause= document.querySelector('#pause')
const forward= document.querySelector('#forward')
const expand= document.querySelector('#expand')
const seekBar=document.querySelector('#seekBar')
const currentTime=document.querySelector('#currentTime')
const totalDuration=document.querySelector('#totalDuration')

open_btn.addEventListener("click", function(){
    video_input.click()
})

video_input.addEventListener('change', function(event){
    videoVu.src=URL.createObjectURL(event.target.files[0])
    videoVu.play()
    play.style.display='none'
    pause.style.display='block'
})

volumeUp.addEventListener('click', function(){
    if(videoVu.src && videoVu.volume<1){
        videoVu.volume=Math.min(1,videoVu.volume+0.1)
        toastCall(Math.round(videoVu.volume*100) + '%')
    }
})

volumeDown.addEventListener('click', function(){
    if(videoVu.src && videoVu.volume>0){
        videoVu.volume=Math.max(0,videoVu.volume-0.1)
        toastCall(Math.round(videoVu.volume*100) + '%')

    }
})

speedUp.addEventListener('click',function(){
    if(videoVu.src && videoVu.playbackRate<3){
        videoVu.playbackRate+=0.25;
        toastCall(videoVu.playbackRate + 'x')


    }
})

speedDown.addEventListener('click',function(){
    if(videoVu.src && videoVu.playbackRate>0.25){
        videoVu.playbackRate-=0.25;
        toastCall(videoVu.playbackRate + 'x')

    }
})

function toastCall(message){
    toast.innerHTML=message
    toast.style.display='block'
    setTimeout(function(){
        toast.style.display='none'
    },1000)
}

expand.addEventListener('click',function(){
    if(videoVu.src){
        videoVu.requestFullscreen()
    }

})


pause.addEventListener('click',function(){
    if(videoVu.src){
        videoVu.pause()
        play.style.display='block'
        pause.style.display='none'
    }
} )

play.addEventListener('click',function(){
    if(videoVu.src && videoVu.currentTime===videoVu.duration){ seekBar.value=0
    }
    if(videoVu.src){
        videoVu.play()
        videoVu.currentTime=seekBar.value
        play.style.display='none'
        pause.style.display='block'
    }
})

document.addEventListener('fullscreenchange',function(){
    if(document.fullscreenElement===videoVu){}
    else{
        if(videoVu.paused){
            play.style.display='block'
            pause.style.display='none'
        }
        else{
            play.style.display='none'
            pause.style.display='block'
        }
    }
})

videoVu.addEventListener('ended', function(){
    pause.style.display='none'
    play.style.display='block'
    cancelAnimationFrame(updateTime)
    updateTime=null
})

forward.addEventListener('click', function(){
    if(videoVu.src && videoVu.currentTime<=videoVu.duration-10){
        videoVu.currentTime+=10
    }
    else if(videoVu.src && videoVu.currentTime+10>videoVu.duration){
        videoVu.currentTime=videoVu.duration
    }
})

backward.addEventListener('click', function(){
    if(videoVu.src && videoVu.currentTime-10>=0){
        videoVu.currentTime-=10
    }
    else if(videoVu.src && videoVu.currentTime-10 < 0){
        videoVu.currentTime=0
    }
})

videoVu.addEventListener('loadedmetadata',function(){
    seekBar.max=Math.floor(videoVu.duration)
    totalDuration.innerHTML=formatTime(videoVu.duration)

})

let updateTime

videoVu.addEventListener('timeupdate', function(){
    if(!updateTime){
        updateTime=requestAnimationFrame(updateTimeCallback)
    }

})

videoVu.addEventListener('pause',function(){
    cancelAnimationFrame(updateTime)
    updateTime=null
})

videoVu.addEventListener('play', function(){
    if(!updateTime){
        updateTime=requestAnimationFrame(updateTimeCallback)
    }
})

function updateTimeCallback() {
    updateTime = null;
    currentTime.innerHTML = formatTime(videoVu.currentTime);
    seekBar.value = videoVu.currentTime;
    updateTime = requestAnimationFrame(updateTimeCallback);
  }

seekBar.addEventListener('input', function(){
    if(!videoVu.src){
        seekBar.value=0
    }
    videoVu.currentTime=seekBar.value
})

function formatTime(seconds){
    const hours= Math.floor(seconds/3600)
    const minutes=Math.floor((seconds%3600)/60)
    const second=Math.floor(seconds%60)

    return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${second.toString().padStart(2,'0')}`
}



