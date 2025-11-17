export function setupAudio({ audioId, progressId, currentId, durationId, volumeId }) {
  const audio = document.getElementById(audioId);
  const progress = document.getElementById(progressId);
  const current = document.getElementById(currentId);
  const duration = document.getElementById(durationId);
  const volume = document.getElementById(volumeId);

  if (!audio) return;

  // حجم الصوت الابتدائي
  audio.volume = volume ? parseFloat(volume.value) : 1;

  // حدث عندما يكون الصوت جاهز للتشغيل بالكامل
  audio.addEventListener("canplaythrough", () => {
    if (progress) progress.max = Math.floor(audio.duration);
    if (duration) duration.textContent = formatTime(audio.duration);
  });

  // تحديث الوقت الحالي والعداد
  audio.addEventListener("timeupdate", () => {
    if (progress) progress.value = Math.floor(audio.currentTime);
    if (current) current.textContent = formatTime(audio.currentTime);
  });

  // التحكم في progress
  if (progress) {
    progress.addEventListener("input", () => {
      audio.currentTime = parseFloat(progress.value);
    });
  }

  // التحكم في الصوت
  if (volume) {
    volume.addEventListener("input", () => {
      audio.volume = parseFloat(volume.value);
    });
  }

  // دوال التشغيل والإيقاف وإعادة التشغيل
  return {
    play: () => audio.play(),
    pause: () => audio.pause(),
    restart: () => { audio.currentTime = 0; audio.play(); }
  };
}

// تحويل الثواني إلى دقيقة:ثانية
function formatTime(sec){
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' + s : s}`;
}
