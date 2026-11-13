// --- GATEKEEPER & MASUK APLIKASI ---
function passDevice() {
    tampilkanPertanyaanGanteng();
}
// --- MODAL DESKTOP PENGAMAN ---
function openModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.remove('opacity-0', 'pointer-events-none');
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.add('opacity-0', 'pointer-events-none');
    
    // Dari PC, dropdown turun pelan ke Step 2
    tampilkanPertanyaanGanteng();
}

// --- GATEKEEPER & MASUK APLIKASI ---
function unlockApp() {
    const music = document.getElementById('bg-music');
    if (music) music.play().catch(e => console.log("Audio autoplay restricted"));
    
    const stepQuestion = document.getElementById('step-question');
    const gateScreen = document.getElementById('gate-screen');
    const mainApp = document.getElementById('main-app');
    
    if (stepQuestion && gateScreen && mainApp) {
        // 1. Kotak pertanyaan perlahan meluncur turun dan memudar transparan
        stepQuestion.style.transition = 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 1s ease';
        stepQuestion.style.transform = 'translateY(80px)';
        stepQuestion.style.opacity = '0';
        
        // 2. Background gate screen ikut memudar lembut bersamaan
        gateScreen.style.transition = 'opacity 1.2s ease';
        gateScreen.style.opacity = '0';
        
        // 3. Setelah animasi selesai, sembunyikan gate dan tampilkan aplikasi utama dengan pop-up halus
        setTimeout(() => {
            gateScreen.classList.add('hidden');
            mainApp.classList.remove('hidden');
            startCounter();
            
            // Trigger efek pop-up lembut di card utama "Happy Birthday Sayangku!"
            const heroCard = document.getElementById('hero-card');
            if (heroCard) {
                heroCard.classList.add('pop-up-anim');
            }

            if (typeof AOS !== 'undefined') AOS.refresh(); 
            fireConfetti();
        }, 1100);
    }
}

// Fungsi transisi dropdown pelan, lembut, dan mulus dari Step 1 ke Step 2
function tampilkanPertanyaanGanteng() {
    const stepDevice = document.getElementById('step-device');
    const stepQuestion = document.getElementById('step-question');
    
    if (stepDevice && stepQuestion) {
        // Step 1 naik/memudar lembut ke atas
        stepDevice.style.transition = 'all 0.5s ease';
        stepDevice.style.transform = 'translateY(-30px)';
        stepDevice.style.opacity = '0';
        
        setTimeout(() => {
            stepDevice.classList.add('hidden');
            stepQuestion.classList.remove('hidden');
            
            // Posisikan Step 2 di atas layar dengan opacity 0
            stepQuestion.style.transform = 'translateY(-90px)';
            stepQuestion.style.opacity = '0';
            stepQuestion.style.transition = 'none';
            
            // Trigger reflow biar browser ngebaca posisi awal
            stepQuestion.offsetHeight;
            
            // Dropdown masuk secara perlahan, lembut, dan mulus (durasi 0.9 detik dengan soft ease-out)
            stepQuestion.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease';
            stepQuestion.style.transform = 'translateY(0)';
            stepQuestion.style.opacity = '1';
        }, 450);
    }
}

// --- INIT EVENT LISTENER SAAT HALAMAN SELESAI DIMUAT ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Inisialisasi AOS (Animasi Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: false, offset: 50 });
    }

    // 2. Logika Tombol Lari Gatekeeper (PC & HP Friendly)
    const btnLari = document.getElementById('btn-lari');
    const btnContainer = document.getElementById('btn-container');

    if (btnLari && btnContainer) {
        function moveButton() {
            const maxX = btnContainer.clientWidth - btnLari.clientWidth - 10;
            const maxY = btnContainer.clientHeight - btnLari.clientHeight - 10;
            const randomX = Math.floor(Math.random() * (maxX > 0 ? maxX : 100));
            const randomY = Math.floor(Math.random() * (maxY > 0 ? maxY : 100));
            
            btnLari.style.left = `${randomX}px`;
            btnLari.style.top = `${randomY}px`;
        }

        btnLari.addEventListener('mouseover', moveButton);
        btnLari.addEventListener('touchstart', (e) => {
            e.preventDefault(); 
            moveButton();
        });
        btnLari.addEventListener('click', (e) => {
            e.preventDefault();
            moveButton();
        });
    }

    // 3. Generate Partikel Melayang Estetik
    const bgBlobs = document.querySelector('.bg-blobs');
    if (bgBlobs) {
        for (let i = 0; i < 20; i++) {
            let particle = document.createElement('div');
            particle.classList.add('particle');
            let size = Math.random() * 6 + 4; 
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`; 
            particle.style.animationDelay = `${Math.random() * 5}s`;
            bgBlobs.appendChild(particle);
        }
    }

    // 4. Fitur Zoom Klik Polaroid Galeri
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach(p => {
        p.addEventListener('click', function(e) {
            e.stopPropagation(); 
            const isEnlarged = this.classList.contains('enlarged');
            polaroids.forEach(other => other.classList.remove('enlarged'));
            if (!isEnlarged) {
                this.classList.add('enlarged');
            }
        });
    });

    document.addEventListener('click', () => {
        polaroids.forEach(p => p.classList.remove('enlarged'));
    });
});

// --- FUNGSI ANIMASI PARTY POPPER CONFETTI ---
function fireConfetti() {
    const duration = 2500; 
    const end = Date.now() + duration;
    const colors = ['#8b7355', '#c6b299', '#e2d1bb', '#ffffff'];

    (function frame() {
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 1 },
                colors: colors, zIndex: 100
            });
            confetti({
                particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 1 },
                colors: colors, zIndex: 100
            });
        }
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// --- PENGHITUNG WAKTU MUNDUR ULANG TAHUN YAYU ---
const targetDate = new Date("2026-11-15T00:00:00").getTime();

function startCounter() {
    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            clearInterval(timerInterval);
            document.getElementById('c-days').innerText = "0";
            document.getElementById('c-hours').innerText = "0";
            document.getElementById('c-minutes').innerText = "0";
            document.getElementById('c-seconds').innerText = "0";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const elD = document.getElementById('c-days');
        const elH = document.getElementById('c-hours');
        const elM = document.getElementById('c-minutes');
        const elS = document.getElementById('c-seconds');

        if (elD) elD.innerText = days;
        if (elH) elH.innerText = hours;
        if (elM) elM.innerText = minutes;
        if (elS) elS.innerText = seconds;
    }, 1000);
}

// --- GENERATOR ISI HATI & KEJUJURAN ---
// --- GENERATOR ISI HATI & KEJUJURAN ---
const honestyMessages = [
    "Karena seberapa jutek atau ngambeknya kamu, aku tetep pengen jadi orang pertama yang ngajak ngobrol pas kamu capek.",
    "Karena denger kamu cerita random soal hal-hal kecil di luar sana aja udah bikin aku betah.",
    "Karena aku udah sering mikirin rencana-rencana ke depan kita, dari hal-hal kecil sampai serius.",
    "Karena nyari kerjaan emang susah banget, tapi nyari cewek seloyal dan sepeduli kamu itu jauh lebih susah.",
    "Karena di balik sikap cuek kamu, aku tahu kamu cuma butuh diyakinin kalau aku gak bakal ke mana-mana.",
    "Karena tiap kita lagi adu argumen atau berantem, rasa takut kehilangan kamu selalu jauh lebih besar dari ego aku.",
    "Karena aku inget banget omongan kamu pas mau nemenin dari bawah, dan itu yang bikin aku gak mau nyerah.",
    "Karena aku minta maaf kalau kadang masih kurang peka soal waktu atau hal-hal sepele, padahal aslinya cuma pengen bareng kamu.",
    "Karena kamu itu tahan banting banget ngadepin kerjaan dan urusan ribet sendirian. Aku beneran bangga.",
    "Karena kita udah sempet bahas target-target masa depan, dan aku pengen wujudin itu semua bareng kamu.",
    "Makasih udah selalu ngingetin hal-hal baik setiap kali aku lagi down atau capek.",
    "Karena pas kamu bilang pengen serius sambil sedih, di situ aku makin buatin tekad buat cepet mapan.",
    "Karena walau kemarin sempat ada rencana atau hal yang batal, aku yakin jalannya bakal diatur yang terbaik buat kita.",
    "Karena maaf kalau kadang repot atau jalan sendiri, aslinya pengen selalu nemenin kamu terus.",
    "Because pada akhirnya, seberapa sering pun kita debat, ujung-ujungnya kita emang sebucin itu satu sama lain.",
    "Karena aku bakal usaha terus buat nurutin hal-hal kecil yang bikin kamu seneng, kayak jajan atau barang incaran kamu.",
    "Karena kamu gak perlu ngerasa berjuang sendirian lagi, ada aku yang bakal selalu back-up kamu.",
    "Karena pas hari ultah kamu nanti, aku bakal pastikan kita jalan-jalan santai tanpa ada beban pikiran.",
    "Karena chat panjang dan debat kita itu bukti kalau kita berdua sama-sama peduli dan gak mau kehilangan.",
    "You are my 'Upah'. Apapun badai yang lewat, tujuannya tetep satu: senang-senang dan bahagia bareng kamu selamanya."
];

let availableMessages = [...honestyMessages]; 

function generateHonesty() {
    const textEl = document.getElementById('honesty-text');
    if (!textEl) return;

    if (availableMessages.length === 0) {
        availableMessages = [...honestyMessages];
    }

    const randomIndex = Math.floor(Math.random() * availableMessages.length);
    const selectedMessage = availableMessages[randomIndex];
    availableMessages.splice(randomIndex, 1);

    textEl.style.opacity = '0';
    setTimeout(() => {
        textEl.innerText = `"${selectedMessage}"`;
        textEl.style.opacity = '1';
    }, 300);
}

// --- KONTROL MUSIK SPOTIFY VS BACKGROUND ---
function fadeAudio(audio, targetVolume, duration = 800) {
    if (!audio) return;
    if (audio.fadeInterval) clearInterval(audio.fadeInterval);
    
    const steps = 20;
    const stepTime = duration / steps;
    
    if (targetVolume > 0 && audio.paused) {
        audio.volume = 0;
        audio.play().catch(err => console.log("Gagal memutar audio:", err));
    }
    
    const currentVol = audio.volume;
    const volStep = (targetVolume - currentVol) / steps;
    let stepCount = 0;

    audio.fadeInterval = setInterval(() => {
        stepCount++;
        let nextVol = currentVol + (volStep * stepCount);
        if (nextVol > 1) nextVol = 1;
        if (nextVol < 0) nextVol = 0;
        
        audio.volume = nextVol;

        if (stepCount >= steps) {
            clearInterval(audio.fadeInterval);
            audio.volume = targetVolume;
            if (targetVolume === 0) {
                audio.pause();
            }
        }
    }, stepTime);
}

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('spotify-embed');
    if (!element) return;
    
    const options = {
        width: '100%',
        height: '152',
        uri: 'spotify:track:7EkTXoaED7peReoRytElSi'
    };
    
    const callback = (EmbedController) => {
        EmbedController.addListener('playback_update', e => {
            const bgMusic = document.getElementById('bg-music');
            if (!bgMusic) return;

            if (!e.data.isPaused) {
                fadeAudio(bgMusic, 0, 800); 
            } else {
                fadeAudio(bgMusic, 1, 800); 
            }
        });
    };
    
    IFrameAPI.createController(element, options, callback);
};

// --- LOGIKA VESPA DINAMIS ---
let stepVespa = 0;
function gasVespaDinamis() {
    const container = document.getElementById('dynamic-vespa-container');
    const motor = document.getElementById('vespa-motor');
    const stops = document.querySelectorAll('.vespa-stop');
    const btn = document.getElementById('btn-gas-dinamis');

    if (stepVespa < stops.length) {
        let posisiStop = [20, 170, 320, 470, 620, 770];
        let targetY = posisiStop[stepVespa];
        
        container.style.height = (targetY + 130) + 'px'; 
        motor.style.top = targetY + 'px';
        stops[stepVespa].style.opacity = '1';
        stops[stepVespa].style.transform = 'translateX(0)';

        stepVespa++;

        if (stepVespa >= stops.length) {
            btn.innerHTML = 'Udah Nyampe Rumah Upah! 🎉';
            btn.classList.remove('btn-pulse');
            btn.classList.add('opacity-50', 'cursor-not-allowed');
            btn.disabled = true;

            if (typeof fireConfetti === 'function') {
                fireConfetti();
                setTimeout(fireConfetti, 600);
            }
        }
    }
}

// --- VARIABEL & FUNGSI OUTFIT / FOOD BUILDER ---
let userOutfit = { atasan: '', atasanWarna: '', bawahan: '', bawahanWarna: '', sepatu: '', sepatuWarna: '' };
let userFood = '';

function selectOutfit(category, value, btnElement) {
    userOutfit[category] = value;
    const group = document.querySelectorAll(`.outfit-${category}`);
    group.forEach(b => {
        b.classList.remove('bg-[#8b7355]', 'text-white');
        b.classList.add('border', 'border-[#8b7355]', 'text-[#8b7355]');
    });
    btnElement.classList.remove('border', 'border-[#8b7355]', 'text-[#8b7355]');
    btnElement.classList.add('bg-[#8b7355]', 'text-white');
}

function selectColor(category, value, btnElement) {
    userOutfit[category] = value;
    const group = document.querySelectorAll(`.color-${category}`);
    group.forEach(b => {
        b.classList.remove('ring-4', 'ring-[#8b7355]');
    });
    btnElement.classList.add('ring-4', 'ring-[#8b7355]');
}

function selectFood(food, btnElement) {
    userFood = food;
    const buttons = document.querySelectorAll('.food-btn');
    buttons.forEach(b => {
        b.classList.remove('bg-[#8b7355]', 'text-white');
        b.classList.add('border', 'border-[#8b7355]', 'text-[#8b7355]');
    });
    btnElement.classList.remove('border', 'border-[#8b7355]', 'text-[#8b7355]');
    btnElement.classList.add('bg-[#8b7355]', 'text-white');
}

// --- FUNGSI PINDAH HALAMAN BAWA DATA (URL PARAMETERS) & WAKTU LAGU ---
function pindahKeHalamanForm() {
    let a = userOutfit.atasan || 'Bebas';
    let aw = userOutfit.atasanWarna || 'Bebas';
    let b = userOutfit.bawahan || 'Bebas';
    let bw = userOutfit.bawahanWarna || 'Bebas';
    let s = userOutfit.sepatu || 'Bebas';
    let sw = userOutfit.sepatuWarna || 'Bebas';
    let m = userFood || 'Belum dipilih';

    let audio = document.getElementById('bg-music');
    let detikLagu = audio ? audio.currentTime : 0;

    let urlTujuan = `form.html?atasan=${encodeURIComponent(a)}&atasanWarna=${encodeURIComponent(aw)}&bawahan=${encodeURIComponent(b)}&bawahanWarna=${encodeURIComponent(bw)}&sepatu=${encodeURIComponent(s)}&sepatuWarna=${encodeURIComponent(sw)}&makanan=${encodeURIComponent(m)}&lagu=${detikLagu}`;
    
    window.location.href = urlTujuan;
}
