// --- STATE MANAGEMENT ---
let totalXP = 0;
let progressSelesai = 0;
const totalModul = 2;

// --- FITUR DARK MODE ---
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun" style="color: #fbbf24;"></i>';
    }
});

// --- LOGIKA MINI KUIS ---
// Fungsi ini mengecek apakah jawaban siswa benar. Jika benar, tombol Selesai akan aktif.
function cekKuis(modulId, jawabanUser, jawabanBenar) {
    const feedback = document.getElementById('feedback' + modulId);
    const btnSelesai = document.getElementById('btnSelesaiModul' + modulId);

    if (jawabanUser === jawabanBenar) {
        feedback.textContent = "✅ Jawaban Benar! Analisa yang tepat. Silakan klik tombol di bawah untuk melanjutkan.";
        feedback.className = "feedback-msg text-success";
        
        // Membuka kunci tombol Selesai
        btnSelesai.disabled = false;
        btnSelesai.classList.remove('btn-disabled');
        btnSelesai.innerHTML = '<i class="fas fa-check-circle"></i> Tandai Selesai & Klaim XP';
    } else {
        feedback.textContent = "❌ Jawaban Salah. Coba baca ulang materinya perlahan-lahan!";
        feedback.className = "feedback-msg text-danger";
        
        // Mengunci kembali jika siswa menekan jawaban yang salah setelah menekan yang benar
        btnSelesai.disabled = true;
        btnSelesai.classList.add('btn-disabled');
        btnSelesai.innerHTML = '<i class="fas fa-lock"></i> Selesaikan Kuis Untuk Lanjut';
    }
}

// --- LOGIKA UNLOCK MODUL & GAMIFIKASI ---
function selesaikanModul(modulId, nextModulId, xpReward) {
    // 1. Kunci kembali tombol dan ubah status
    const btn = document.getElementById('btnSelesaiModul' + modulId);
    btn.innerHTML = '<i class="fas fa-check-double"></i> Modul Selesai';
    btn.classList.add('status-completed');
    btn.disabled = true;

    // 2. Tambah XP dan Update UI
    totalXP += xpReward;
    document.getElementById('xpCounter').textContent = totalXP;
    tampilkanNotifikasi(`Bagus sekali! Anda mendapatkan +${xpReward} XP.`);

    // 3. Update Progress Bar
    progressSelesai++;
    const persentase = (progressSelesai / totalModul) * 100;
    document.getElementById('courseProgress').style.width = persentase + '%';

    // 4. Buka Modul Selanjutnya
    if (nextModulId !== null) {
        bukaModul(nextModulId);
    } else {
        setTimeout(() => alert("🎉 Luar biasa! Anda telah menyelesaikan semua modul dasar pemrograman hari ini. Anda pantas naik level!"), 1500);
    }
}

function bukaModul(modulId) {
    const modul = document.getElementById('module' + modulId);
    const content = document.getElementById('contentModul' + modulId);
    const iconLock = document.getElementById('iconLock' + modulId);
    const badge = document.getElementById('badgeModul' + modulId);

    // Animasi dan hapus status terkunci
    modul.classList.remove('locked');
    content.classList.remove('hidden');
    
    // Update tampilan badge
    iconLock.className = 'fas fa-book-open';
    badge.textContent = 'Aktif';
    badge.className = 'status-badge status-active';
    
    // Gulir layar otomatis ke modul yang baru terbuka
    modul.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function tampilkanNotifikasi(pesan) {
    const notif = document.getElementById('achievementNotif');
    document.getElementById('achievementText').textContent = pesan;
    
    notif.classList.remove('hidden');
    
    // Menghilangkan notifikasi setelah 4 detik
    setTimeout(() => {
        notif.classList.add('hidden');
    }, 4000);
}