// --- STATE MANAGEMENT ---
let totalXP = 0;
let progressSelesai = 0;

// --- DATABASE 20 MODUL MATERI & KUIS ---
const dataModul = [
    { title: "HTML Dasar", desc: "Tag HTML yang mendefinisikan sebuah paragraf adalah?", opsiA: "<p>", opsiB: "<h1>", opsiC: "<br>", benar: "A" },
    { title: "HTML Form", desc: "Elemen apa yang digunakan untuk membuat kolom input teks?", opsiA: "<button>", opsiB: "<input>", opsiC: "<table>", benar: "B" },
    { title: "CSS Styling", desc: "Sintaks CSS untuk mengubah warna teks menjadi merah adalah?", opsiA: "color: red;", opsiB: "bg: red;", opsiC: "text: red;", benar: "A" },
    { title: "Logika Boolean", desc: "Tipe data Boolean hanya memiliki dua nilai, yaitu:", opsiA: "0 dan 10", opsiB: "Karakter dan Angka", opsiC: "True dan False", benar: "C" },
    { title: "Algoritma Flowchart", desc: "Simbol Belah Ketupat (Diamond) dalam Flowchart berfungsi sebagai?", opsiA: "Mulai/Selesai", opsiB: "Keputusan (Decision)", opsiC: "Input Data", benar: "B" },
    { title: "Variabel JS", desc: "Kata kunci modern untuk membuat variabel di JavaScript yang nilainya bisa diubah adalah?", opsiA: "let", opsiB: "const", opsiC: "var", benar: "A" },
    { title: "Konsep UI", desc: "UI singkatan dari User Interface, yang artinya berfokus pada...", opsiA: "Tampilan Visual", opsiB: "Kecepatan Server", opsiC: "Keamanan Data", benar: "A" },
    { title: "Konsep UX", desc: "UX (User Experience) lebih berfokus kepada...", opsiA: "Warna tombol", opsiB: "Kenyamanan pengguna", opsiC: "Jenis font", benar: "B" },
    { title: "Basis Data", desc: "Apa fungsi utama Primary Key dalam tabel database?", opsiA: "Menghapus data", opsiB: "Membedakan tiap baris secara unik", opsiC: "Mewarnai tabel", benar: "B" },
    { title: "Sistem Operasi", desc: "OS yang paling sering digunakan untuk server hosting website karena gratis dan open-source adalah?", opsiA: "Windows", opsiB: "MacOS", opsiC: "Linux", benar: "C" },
    { title: "Version Control", desc: "Perintah Git untuk mengirim kode dari laptop ke GitHub adalah?", opsiA: "git push", opsiB: "git pull", opsiC: "git commit", benar: "A" },
    { title: "Konsep OOP", desc: "Cetak biru (Blueprint) dari sebuah objek dalam Pemrograman Berorientasi Objek disebut?", opsiA: "Method", opsiB: "Class", opsiC: "Function", benar: "B" },
    { title: "Access Modifier", desc: "Hak akses yang membuat variabel HANYA bisa diakses dari dalam class itu sendiri adalah?", opsiA: "Public", opsiB: "Private", opsiC: "Protected", benar: "B" },
    { title: "Struktur Array", desc: "Dalam bahasa pemrograman, index pertama dari sebuah Array selalu dimulai dari angka?", opsiA: "0", opsiB: "1", opsiC: "-1", benar: "A" },
    { title: "Looping (Perulangan)", desc: "Perintah yang digunakan untuk mengulang kode selama kondisinya benar (True) adalah?", opsiA: "IF", opsiB: "SWITCH", opsiC: "WHILE", benar: "C" },
    { title: "SDLC", desc: "Tahapan pertama dalam pembuatan perangkat lunak (SDLC) adalah?", opsiA: "Testing (Uji Coba)", opsiB: "Planning (Perencanaan)", opsiC: "Coding (Pengkodean)", benar: "B" },
    { title: "Debugging", desc: "Proses mencari dan memperbaiki error/bug dalam kode disebut?", opsiA: "Testing", opsiB: "Debugging", opsiC: "Deploying", benar: "B" },
    { title: "Operator Logika", desc: "Operator logika yang mensyaratkan KEDUA kondisi harus True adalah?", opsiA: "OR (||)", opsiB: "AND (&&)", opsiC: "NOT (!)", benar: "B" },
    { title: "Event Listener", desc: "Di JavaScript, event yang aktif saat pengguna mengeklik tombol adalah?", opsiA: "onhover", opsiB: "onscroll", opsiC: "onclick", benar: "C" },
    { title: "PBL", desc: "Tahap akhir dari Project Based Learning (PBL) bagi siswa PPLG adalah?", opsiA: "Mendengarkan guru", opsiB: "Mengerjakan tugas tertulis", opsiC: "Mengkomunikasikan hasil/Karya", benar: "C" }
];

const totalModul = dataModul.length; // Total 20 Modul

// --- FUNGSI RENDER OTOMATIS KE HTML ---
function renderSemuaModul() {
    const container = document.getElementById('moduleContainer');
    let html = '';

    dataModul.forEach((modul, index) => {
        const id = index + 1;
        const nextId = (id === totalModul) ? null : id + 1;
        const isLocked = (id === 1) ? '' : 'locked';
        const isHidden = (id === 1) ? '' : 'hidden';
        const icon = (id === 1) ? 'fa-book-open' : 'fa-lock';
        const badgeClass = (id === 1) ? 'status-active' : 'status-locked';
        const badgeText = (id === 1) ? 'Aktif' : 'Terkunci';
        const xpReward = 50; // Tiap modul dapat 50 XP

        html += `
        <div class="module-card ${isLocked} fade-in" id="module${id}">
            <div class="module-header">
                <h2><i class="fas ${icon}" id="iconLock${id}"></i> Bab ${id}: ${modul.title}</h2>
                <span class="status-badge ${badgeClass}" id="badgeModul${id}">${badgeText}</span>
            </div>
            
            <div class="module-content ${isHidden}" id="contentModul${id}">
                <div class="mini-quiz">
                    <h4><i class="fas fa-question-circle"></i> Misi Kuis #${id}</h4>
                    <p>${modul.desc}</p>
                    <div class="quiz-options">
                        <button onclick="cekKuis(${id}, 'A', '${modul.benar}')">A. ${modul.opsiA}</button>
                        <button onclick="cekKuis(${id}, 'B', '${modul.benar}')">B. ${modul.opsiB}</button>
                        <button onclick="cekKuis(${id}, 'C', '${modul.benar}')">C. ${modul.opsiC}</button>
                    </div>
                    <p id="feedback${id}" class="feedback-msg"></p>
                </div>
                
                <div class="module-footer">
                    <button class="btn-action btn-disabled" id="btnSelesaiModul${id}" onclick="selesaikanModul(${id}, ${nextId}, ${xpReward})" disabled>
                        <i class="fas fa-lock"></i> Selesaikan Kuis Untuk Lanjut
                    </button>
                </div>
            </div>
        </div>
        `;
    });

    container.innerHTML = html;
}

// Panggil fungsi render saat web dimuat
renderSemuaModul();

// --- FITUR DARK MODE ---
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun" style="color: #fbbf24;"></i>';
    }
});

// --- LOGIKA KUIS & GAMIFIKASI ---
function cekKuis(modulId, jawabanUser, jawabanBenar) {
    const feedback = document.getElementById('feedback' + modulId);
    const btnSelesai = document.getElementById('btnSelesaiModul' + modulId);

    if (jawabanUser === jawabanBenar) {
        feedback.textContent = "✅ Tepat Sekali! Silakan klaim XP Anda di bawah.";
        feedback.className = "feedback-msg text-success";
        
        btnSelesai.disabled = false;
        btnSelesai.classList.remove('btn-disabled');
        btnSelesai.innerHTML = '<i class="fas fa-check-circle"></i> Buka Bab Selanjutnya (+50 XP)';
    } else {
        feedback.textContent = "❌ Jawaban kurang tepat. Coba analisa kembali!";
        feedback.className = "feedback-msg text-danger";
        
        btnSelesai.disabled = true;
        btnSelesai.classList.add('btn-disabled');
        btnSelesai.innerHTML = '<i class="fas fa-lock"></i> Selesaikan Kuis Untuk Lanjut';
    }
}

function selesaikanModul(modulId, nextModulId, xpReward) {
    // 1. Kunci tombol bab saat ini
    const btn = document.getElementById('btnSelesaiModul' + modulId);
    btn.innerHTML = '<i class="fas fa-check-double"></i> Misi Selesai';
    btn.classList.add('status-completed');
    btn.disabled = true;

    // 2. Tambah XP
    totalXP += xpReward;
    document.getElementById('xpCounter').textContent = totalXP;
    tampilkanNotifikasi(`Bagus sekali! +${xpReward} XP ditambahkan.`);

    // 3. Update Progress Bar Utama (Berdasarkan rasio 20 bab)
    progressSelesai++;
    const persentase = (progressSelesai / totalModul) * 100;
    document.getElementById('courseProgress').style.width = persentase + '%';

    // 4. Buka Modul Berikutnya atau Tamat
    if (nextModulId !== null) {
        bukaModul(nextModulId);
    } else {
        setTimeout(() => alert("🏆 SELAMAT! Anda telah menyelesaikan 20 Modul Dasar PPLG Fase E. Anda adalah seorang juara!"), 1000);
    }
}

function bukaModul(modulId) {
    const modul = document.getElementById('module' + modulId);
    const content = document.getElementById('contentModul' + modulId);
    const iconLock = document.getElementById('iconLock' + modulId);
    const badge = document.getElementById('badgeModul' + modulId);

    // Hapus class terkunci, agar konten bisa di-klik dan berwarna terang
    modul.classList.remove('locked');
    content.classList.remove('hidden');
    
    // Ubah status label
    iconLock.className = 'fas fa-book-open';
    badge.textContent = 'Aktif';
    badge.className = 'status-badge status-active';
    
    // Gulir perlahan ke bab yang baru dibuka
    modul.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function tampilkanNotifikasi(pesan) {
    const notif = document.getElementById('achievementNotif');
    document.getElementById('achievementText').textContent = pesan;
    
    notif.classList.remove('hidden');
    
    setTimeout(() => {
        notif.classList.add('hidden');
    }, 4000); // Hilang setelah 4 detik
}
