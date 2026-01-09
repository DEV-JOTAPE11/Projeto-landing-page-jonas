document.addEventListener('DOMContentLoaded', function() {
    // Selecionando Elementos
    const video = document.getElementById('mainVideo');
    const overlay = document.getElementById('videoOverlay');
    const progressBar = document.getElementById('progressBar');
    const btnPlayPause = document.getElementById('btnPlayPause');
    const iconPlay = btnPlayPause.querySelector('.icon-play');
    const iconPause = btnPlayPause.querySelector('.icon-pause');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    
    // Botões Extras
    const btnVolume = document.getElementById('btnVolume');
    const btnForward = document.getElementById('btnForward');
    const btnRewind = document.getElementById('btnRewind');
    const btnFullscreen = document.getElementById('btnFullscreen');
    const btnResumeOverlay = document.getElementById('btnResumeOverlay');
    const btnRestartOverlay = document.getElementById('btnRestartOverlay');

    // --- FUNÇÕES ---

    // 1. Alternar Play/Pause
    function togglePlay() {
        if (video.paused || video.ended) {
            video.play();
        } else {
            video.pause();
        }
    }

    // 2. Atualizar Ícones e Overlay
    function updatePlayState() {
        if (video.paused) {
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
            overlay.classList.add('active'); 
        } else {
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
            overlay.classList.remove('active'); 
        }
    }

    // 3. Formatar Tempo (00:00)
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // 4. Atualizar Barra de Progresso e Cores
    function updateProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.value = percent;
        currentTimeEl.textContent = formatTime(video.currentTime);

       
        progressBar.style.background = `linear-gradient(to right, #8257e5 ${percent}%, rgba(255,255,255,0.3) ${percent}%)`;
    }

    
    function skip(seconds) {
        video.currentTime += seconds;
    }

    // --- EVENTOS ---

    // Play/Pause
    btnPlayPause.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updatePlayState);
    video.addEventListener('pause', updatePlayState);

    // Progresso
    video.addEventListener('timeupdate', updateProgress);
    
    // Arrastar a barra (Seek)
    progressBar.addEventListener('input', function() {
        const time = (progressBar.value / 100) * video.duration;
        video.currentTime = time;
    });

    
    video.addEventListener('loadedmetadata', function() {
        durationEl.textContent = formatTime(video.duration);
    });

    
    btnForward.addEventListener('click', () => skip(10)); 
    btnRewind.addEventListener('click', () => skip(-10)); 

    // Volume (Mute/Unmute)
    btnVolume.addEventListener('click', () => {
        video.muted = !video.muted;
        
        btnVolume.style.color = video.muted ? '#ff4757' : '#fff';
    });

    // Tela Cheia
    btnFullscreen.addEventListener('click', () => {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); 
        }
    });

    // Botões do Overlay
    btnResumeOverlay.addEventListener('click', (e) => {
        e.stopPropagation(); 
        video.play();
    });
    
    btnRestartOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
        video.currentTime = 0;
        video.play();
    });
});


document.addEventListener("DOMContentLoaded", function () {
  const scrollers = document.querySelectorAll(".scroll-inner");

  scrollers.forEach((scroller) => {
    // 1. Pega os itens originais do HTML
    const originalContent = Array.from(scroller.children);
    
    // 2. Clona o conteúdo 3 VEZES. 
    // Com o original, teremos 4 conjuntos de cards.
    // Isso garante largura suficiente para telas 4K e para a animação de 50%.
    for (let i = 0; i < 3; i++) {
      originalContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true); // Bom para acessibilidade (leitores de tela ignoram)
        scroller.appendChild(duplicatedItem);
      });
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');

      // 1. Alterna a classe 'active' no item clicado
      item.classList.toggle('active');

      // 2. Controla a altura para animação (Slide Down / Slide Up)
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + "px"; // Abre
      } else {
        answer.style.maxHeight = null; // Fecha
      }

      // 3. (OPCIONAL) Fecha os outros itens quando um abre (Acordeão Clássico)
      // Se quiser que vários fiquem abertos ao mesmo tempo, apague esse bloco abaixo.
      faqQuestions.forEach(otherQuestion => {
        const otherItem = otherQuestion.parentElement;
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      
    });
  });
});