// =====================
// DANE USŁUG
// =====================
const bookingServices = {
    pies: [
        { name: 'Kąpiel i strzyżenie',  time: '2h',   price: 'od 100 zł' },
        { name: 'Kąpiel i wyczesanie',  time: '1.5h', price: 'od 100 zł' },
        { name: 'Trymowanie i kąpiel',  time: '2h',   price: 'od 130 zł' },
    ],
    kot: [
        { name: 'Wyczesywanie krótkowłosy', time: '1h',   price: '100–150 zł' },
        { name: 'Wyczesywanie długowłosy',  time: '1.5h', price: '150–250 zł' },
        { name: 'Usuwanie kołtunów',        time: '1h+',  price: '+100 zł'    },
    ],
    krolik: [
        { name: 'Wyczesywanie krótkowłosy', time: '45 min', price: '80 zł'      },
        { name: 'Strzyżenie Karełek Teddy', time: '1h',     price: '100–120 zł' },
    ]
};

const bookingExtras = [
    { name: 'Kąpiel w wannie ozonowej',             time: '30 min', price: '60 zł'  },
    { name: 'Czyszczenie zębów szczoteczką',         time: '20 min', price: '20 zł'  },
    { name: 'Czyszczenie zatok okołoodbytniczych',   time: '15 min', price: '20 zł'  },
    { name: 'Obcinanie pazurów',                     time: '15 min', price: '20 zł'  },
];

const extrasPerAnimal = {
    pies:   [0, 1, 2, 3],
    kot:    [1, 3],
    krolik: [3]
};

const dogSizes = [
    { id: 'maly',   label: 'Mały',   desc: 'do 10 kg'      },
    { id: 'sredni', label: 'Średni', desc: '10–20 kg'       },
    { id: 'duzy',   label: 'Duży',   desc: 'powyżej 20 kg'  },
];

const dogBreeds = {
    maly:   ['Yorkshire Terrier', 'Maltańczyk', 'Shih Tzu', 'Szpic miniaturowy', 'Hawańczyk / Maltipoo'],
    sredni: ['West Highland White Terrier', 'Sznaucer miniaturowy', 'Pudel miniaturowy', 'Cocker Spaniel / Cockapoo / Cavapoo', 'Cavalier King Charles Spaniel', 'Lagotto Romagnolo'],
};

let selectedDogSize  = null;
let selectedDogBreed = null;

const availableSlots = {
    '2026-03-09': ['9:00','10:30','13:00','14:30'],
    '2026-03-10': ['9:00','11:00'],
    '2026-03-12': ['10:00','11:30','14:00'],
    '2026-03-16': ['10:30','12:00','15:00'],
    '2026-03-17': ['9:00','11:00','14:00'],
    '2026-03-19': ['10:00','13:00'],
    '2026-03-23': ['10:00','12:30','14:00'],
    '2026-03-24': ['9:00','13:00','15:30'],
};

// =====================
// STAN APLIKACJI
// =====================
let selectedAnimal   = 'pies';
let selectedService  = null;
let selectedExtras   = [];
let selectedDate     = null;
let selectedTime     = null;
let calYear          = new Date().getFullYear();
let calMonth         = new Date().getMonth();

// =====================
// KROK 1 — WYBÓR USŁUGI
// =====================
function selectAnimal(animal, tabEl) {
    selectedAnimal  = animal;
    selectedService = null;
    selectedExtras  = [];
    selectedDogSize  = null;
    selectedDogBreed = null;

    document.querySelectorAll('.animal-tab').forEach(t => t.classList.remove('active'));
    tabEl.classList.add('active');

    document.getElementById('dog-size-section').style.display = 'none';
    document.getElementById('dog-breed-section').innerHTML = '';

    renderBookingServices(animal);
    renderBookingExtras(animal);
    updateBookingBtn();
}

function renderBookingServices(animal) {
    const grid = document.getElementById('booking-services-list');
    grid.innerHTML = '';

    bookingServices[animal].forEach((service, index) => {
        const card = document.createElement('div');
        card.className = 'booking-service-card';
        card.innerHTML = `
            <div class="bs-name">${service.name}</div>
            <div class="bs-meta">
                <span>${service.time}</span>
                <span class="bs-price">${service.price}</span>
            </div>
        `;
        card.onclick = () => selectMainService(card, index);
        grid.appendChild(card);
    });
}

function renderBookingExtras(animal) {
    const grid = document.querySelector('.booking-services-grid');
    grid.innerHTML = '';

    const allowedIndexes = extrasPerAnimal[animal];

    allowedIndexes.forEach(index => {
        const extra = bookingExtras[index];
        const card = document.createElement('div');
        card.className = 'booking-service-card';
        card.innerHTML = `
            <div class="bs-name">${extra.name}</div>
            <div class="bs-meta">
                <span>${extra.time}</span>
                <span class="bs-price">${extra.price}</span>
            </div>
        `;
        card.onclick = () => toggleExtra(card);
        grid.appendChild(card);
    });
}

function selectMainService(cardEl, index) {
    document.querySelectorAll('.booking-service-card').forEach(c => c.classList.remove('selected'));
    cardEl.classList.add('selected');
    selectedService = index;

    const dogSizeSection = document.getElementById('dog-size-section');
    if (selectedAnimal === 'pies') {
        dogSizeSection.style.display = 'block';
    } else {
        dogSizeSection.style.display = 'none';
    }

    selectedDogSize  = null;
    selectedDogBreed = null;
    document.getElementById('dog-breed-section').innerHTML = '';
    updateBookingBtn();
}

function toggleExtra(cardEl) {
    cardEl.classList.toggle('selected');
    const name = cardEl.querySelector('.bs-name').textContent;

    if (cardEl.classList.contains('selected')) {
        selectedExtras.push(name);
    } else {
        selectedExtras = selectedExtras.filter(e => e !== name);
    }
}

function updateBookingBtn() {
    const btn = document.getElementById('booking-btn-next');
    if (selectedAnimal === 'pies') {
        btn.disabled = selectedService === null || selectedDogSize === null || selectedDogBreed === null;
    } else {
        btn.disabled = selectedService === null;
    }
}

function selectDogSize(sizeId, cardEl) {
    selectedDogSize  = sizeId;
    selectedDogBreed = null;

    document.querySelectorAll('.dog-size-card').forEach(c => c.classList.remove('selected'));
    cardEl.classList.add('selected');

    const breedSection = document.getElementById('dog-breed-section');

    if (sizeId === 'duzy') {
        breedSection.innerHTML = `
    <div class="dog-size-alert">
        <i data-lucide="phone"></i>
        <div>
            <strong>Duże psy - prosimy o kontakt telefoniczny</strong>
            <p>Pielęgnacja dużych psów to wyjątkowe wyzwanie - wizyta może trwać od 2 do nawet 3 godzin, w zależności od stanu sierści i temperamentu czworonoga, dlatego duże psy planujemy zawsze na koniec dnia, aby Twój pupil otrzymał pełną uwagę i spokojną opiekę.</p>
            <p>Zadzwoń, a wspólnie znajdziemy najlepszy termin!</p>
            <p>Zadzwoń do nas: <a href="tel:539916720">539 916 720</a></p>
        </div>
    </div>
`;
        document.getElementById('booking-btn-next').disabled = true;
    } else {
        renderDogBreeds(sizeId);
    }

    lucide.createIcons();
}

function renderDogBreeds(sizeId) {
    const breeds = dogBreeds[sizeId];
    const section = document.getElementById('dog-breed-section');

    section.innerHTML = `
        <p class="booking-extra-label">Wybierz rasę</p>
        <div class="dog-breeds-grid">
            ${breeds.map(breed => `
                <div class="dog-breed-card" onclick="selectDogBreed(this, '${breed}')">
                    ${breed}
                </div>
            `).join('')}
            <div class="dog-breed-card dog-breed-other" onclick="selectDogBreed(this, 'inny')">
                Inny pies
            </div>
        </div>
        <div id="dog-breed-other-input" style="display:none" class="booking-form-group">
            <label>Wpisz rasę</label>
            <input type="text" id="dog-breed-custom" placeholder="">
        </div>
    `;

    document.getElementById('booking-btn-next').disabled = true;
}

function selectDogBreed(cardEl, breed) {
    document.querySelectorAll('.dog-breed-card').forEach(c => c.classList.remove('selected'));
    cardEl.classList.add('selected');

    const otherInput = document.getElementById('dog-breed-other-input');

    if (breed === 'inny') {
        selectedDogBreed = null;
        otherInput.style.display = 'block';
        document.getElementById('dog-breed-custom').oninput = (e) => {
            selectedDogBreed = e.target.value.trim();
            document.getElementById('booking-btn-next').disabled = selectedDogBreed === '';
        };
    } else {
        selectedDogBreed = breed;
        otherInput.style.display = 'none';
        document.getElementById('booking-btn-next').disabled = false;
    }
}

// =====================
// NAWIGACJA MIĘDZY KROKAMI
// =====================
function goToStep2() {
    if (selectedAnimal === 'pies' && (selectedDogSize === null || selectedDogBreed === null)) {
        return;
    }

    const service = bookingServices[selectedAnimal][selectedService];

    const iconMap = { pies: 'dog', kot: 'cat', krolik: 'rabbit' };
    document.getElementById('summary-animal-icon').innerHTML =
        `<i data-lucide="${iconMap[selectedAnimal]}"></i>`;
    document.getElementById('summary-service-name').textContent = service.name;
    lucide.createIcons();

    document.getElementById('booking-step-1').style.display = 'none';
    document.getElementById('booking-step-2').style.display = 'block';

    document.getElementById('step-dot-1').classList.remove('active');
    document.getElementById('step-dot-1').classList.add('done');
    document.getElementById('step-dot-2').classList.add('active');

    selectedDate = null;
    selectedTime = null;
    document.getElementById('booking-time-section').style.display = 'none';
    document.getElementById('booking-btn-step2').disabled = true;

    renderCalendar();
}

function goToStep1() {
    document.getElementById('booking-step-2').style.display = 'none';
    document.getElementById('booking-step-1').style.display = 'block';

    document.getElementById('step-dot-2').classList.remove('active');
    document.getElementById('step-dot-1').classList.remove('done');
    document.getElementById('step-dot-1').classList.add('active');
}

function goToStep3() {
    const service = bookingServices[selectedAnimal][selectedService];
    alert(`✅ Dziękujemy!\n\nUsługa: ${service.name}\nData: ${selectedDate}\nGodzina: ${selectedTime}\n\nWkrótce dodamy potwierdzenie przez e-mail!`);
}

// =====================
// KALENDARZ
// =====================
function renderCalendar() {
    const monthNames = [
        'Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
        'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'
    ];
    const dayNames = ['Pon','Wt','Śr','Czw','Pt','Sob','Nd'];

    document.getElementById('cal-title').textContent =
        `${monthNames[calMonth]} ${calYear}`;

    const grid = document.getElementById('booking-cal-grid');
    grid.innerHTML = '';

    // nagłówki dni
    dayNames.forEach(d => {
        const cell = document.createElement('div');
        cell.className = 'booking-cal-day-name';
        cell.textContent = d;
        grid.appendChild(cell);
    });

    const firstDay = new Date(calYear, calMonth, 1);
    let startDow = firstDay.getDay(); // 0=niedziela
    startDow = (startDow === 0) ? 6 : startDow - 1; // przesuń: pon=0

    // puste komórki przed 1-szym
    for (let i = 0; i < startDow; i++) {
        const empty = document.createElement('div');
        grid.appendChild(empty);
    }

    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let d = 1; d <= daysInMonth; d++) {
        const cell  = document.createElement('div');
        const date  = new Date(calYear, calMonth, d);
        const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

        cell.className = 'booking-cal-day';
        cell.textContent = d;

        if (date < today) {
            cell.classList.add('past');
        } else if (availableSlots[dateStr]) {
            cell.classList.add('available', 'has-slots');
            if (dateStr === selectedDate) cell.classList.add('selected');
            cell.onclick = () => selectDate(dateStr, d);
        } else {
            cell.classList.add('unavailable');
        }

        grid.appendChild(cell);
    }
}

function prevMonth() {
    if (calMonth === 0) { calMonth = 11; calYear--; }
    else calMonth--;
    selectedDate = null;
    selectedTime = null;
    document.getElementById('booking-time-section').style.display = 'none';
    document.getElementById('booking-btn-step2').disabled = true;
    renderCalendar();
}

function nextMonth() {
    if (calMonth === 11) { calMonth = 0; calYear++; }
    else calMonth++;
    selectedDate = null;
    selectedTime = null;
    document.getElementById('booking-time-section').style.display = 'none';
    document.getElementById('booking-btn-step2').disabled = true;
    renderCalendar();
}

function selectDate(dateStr, day) {
    selectedDate = dateStr;
    selectedTime = null;
    document.getElementById('booking-btn-step2').disabled = true;
    renderCalendar();
    renderTimeSlots(dateStr);
}

function renderTimeSlots(dateStr) {
    const slots = availableSlots[dateStr] || [];
    const section = document.getElementById('booking-time-section');
    const container = document.getElementById('booking-time-slots');

    document.getElementById('booking-time-title-text').textContent =
        `Dostępne godziny — ${selectedDate}`;

    container.innerHTML = '';
    slots.forEach(time => {
        const btn = document.createElement('div');
        btn.className = 'booking-time-slot';
        btn.textContent = time;
        btn.onclick = () => selectTime(btn, time);
        container.appendChild(btn);
    });

    section.style.display = 'block';
}

function selectTime(el, time) {
    selectedTime = time;
    document.querySelectorAll('.booking-time-slot').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('booking-btn-step2').disabled = false;
}

// =====================
// PYTANIA O PSA
// =====================
function showDogQuestions() {
    const section = document.getElementById('dog-extra-questions');
    if (selectedAnimal === 'pies') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}

function setVisited(visited) {
    const behaviorSection = document.getElementById('dog-behavior-section');
    const btnYes = document.getElementById('btn-visited-yes');
    const btnNo  = document.getElementById('btn-visited-no');

    btnYes.classList.toggle('active', visited);
    btnNo.classList.toggle('active', !visited);

    if (visited) {
        behaviorSection.style.display = 'none';
    } else {
        behaviorSection.style.display = 'block';
    }
}

// =====================
// KROK 3 — POTWIERDZENIE
// =====================
function goToStep3() {
    const service = bookingServices[selectedAnimal][selectedService];
    const animalNames = { pies: 'Pies', kot: 'Kot', krolik: 'Królik' };
    const iconMap = { pies: 'dog', kot: 'cat', krolik: 'rabbit' };

    document.getElementById('confirm-animal-icon').innerHTML =
        `<i data-lucide="${iconMap[selectedAnimal]}"></i>`;
    document.getElementById('confirm-animal-name').textContent =
        animalNames[selectedAnimal];
    document.getElementById('confirm-service-name').textContent =
        service.name;
    document.getElementById('confirm-datetime').textContent =
        `${selectedDate} o ${selectedTime}`;

    document.getElementById('booking-step-2').style.display = 'none';
    document.getElementById('booking-step-3').style.display = 'block';

    document.getElementById('step-dot-2').classList.remove('active');
    document.getElementById('step-dot-2').classList.add('done');
    document.getElementById('step-dot-3').classList.add('active');

    showDogQuestions();
    lucide.createIcons();
}

function goToStep2fromStep3() {
    document.getElementById('booking-step-3').style.display = 'none';
    document.getElementById('booking-step-2').style.display = 'block';

    document.getElementById('step-dot-3').classList.remove('active');
    document.getElementById('step-dot-2').classList.remove('done');
    document.getElementById('step-dot-2').classList.add('active');
}

function submitBooking() {
    const name  = document.getElementById('confirm-name').value.trim();
    const phone = document.getElementById('confirm-phone').value.trim();

    if (!name || !phone) {
        alert('Proszę wypełnić imię i numer telefonu.');
        return;
    }

    const service = bookingServices[selectedAnimal][selectedService];
    const animalNames = { pies: 'Pies', kot: 'Kot', krolik: 'Królik' };

    document.getElementById('success-datetime').textContent =
        `${selectedDate} o godzinie ${selectedTime}`;
    document.getElementById('success-service').innerHTML =
        `${service.name} • ${animalNames[selectedAnimal]}`;

    document.getElementById('booking-step-3').style.display = 'none';
    document.getElementById('booking-success').style.display = 'block';

    document.getElementById('step-dot-3').classList.remove('active');
    document.getElementById('step-dot-3').classList.add('done');

    lucide.createIcons();
}

function resetBooking() {
    selectedAnimal   = 'pies';
    selectedService  = null;
    selectedExtras   = [];
    selectedDate     = null;
    selectedTime     = null;
    selectedDogSize  = null;
    selectedDogBreed = null;

    document.getElementById('booking-success').style.display  = 'none';
    document.getElementById('booking-step-1').style.display   = 'block';

    document.querySelectorAll('.booking-step').forEach(s => {
        s.classList.remove('active', 'done');
    });
    document.getElementById('step-dot-1').classList.add('active');

    document.getElementById('confirm-name').value  = '';
    document.getElementById('confirm-phone').value = '';
    document.getElementById('confirm-notes').value = '';

    renderBookingServices('pies');
    renderBookingExtras('pies');
    document.getElementById('dog-size-section').style.display = 'none';
    document.getElementById('dog-breed-section').innerHTML = '';
    document.querySelectorAll('.animal-tab').forEach((t, i) => {
        t.classList.toggle('active', i === 0);
    });
}

// =====================
// INICJALIZACJA
// =====================
document.addEventListener('DOMContentLoaded', () => {
    renderBookingServices('pies');
    renderBookingExtras('pies');
});