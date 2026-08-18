// smooth scroll for in-page nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
            const el = document.querySelector(id);
            if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
        }
    });
});

// project category filter
const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.proj-card');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        cards.forEach(c => {
            c.dataset.hidden = (f !== 'all' && c.dataset.cat !== f) ? 'true' : 'false';
        });
    });
});

// toolbox — tabbed panel with pagination
const TOOL_CATEGORIES = [
    { name: 'Programming', items: ['Python', 'JavaScript', 'SQL', 'HTML / CSS'] },
    { name: 'Frontend', items: ['React', 'Tailwind CSS', 'Figma'] },
    { name: 'Backend', items: ['Node.js / Express', 'FastAPI · Uvicorn', 'Flask', 'REST & GraphQL'] },
    { name: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Firebase', 'SQLAlchemy'] },
    { name: 'AI / ML', items: ['Logistic Regression', 'TF-IDF', 'K-Means Clustering', 'NLP · Multi-Agent (exploring)'] },
    { name: 'Data & Real-Time', items: ['RabbitMQ', 'Event Ingestion', 'Analytics Pipelines'] },
    { name: 'Dev Tools', items: ['Git & GitHub', 'Docker', 'Docker Compose'] },
    { name: 'IoT', items: ['ESP8266', 'Sensors & Servos', 'Sinric Pro · Alexa'] }
];

const tabsBar = document.getElementById('tabsBar');
const tabPanels = document.getElementById('tabPanels');
const tabPagination = document.getElementById('tabPagination');

TOOL_CATEGORIES.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (i === 0 ? ' active' : '');
    btn.textContent = String(i + 1).padStart(2, '0');
    btn.title = cat.name;
    btn.addEventListener('click', () => showTab(i));
    tabsBar.appendChild(btn);

    const panel = document.createElement('div');
    panel.className = 'tab-panel' + (i === 0 ? ' active' : '');
    panel.innerHTML = `<ul>${cat.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
    tabPanels.appendChild(panel);
});

function showTab(index) {
    document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', i === index));
    document.querySelectorAll('.tab-panel').forEach((p, i) => p.classList.toggle('active', i === index));
    tabPagination.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span> / ${String(TOOL_CATEGORIES.length).padStart(2, '0')} — ${TOOL_CATEGORIES[index].name}`;
}
showTab(0);

// contact form -> sends to your inbox via Formspree (https://formspree.io)
const FORMSPREE_ID = 'mdenlgab';

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    submitBtn.disabled = true;
    submitBtn.textContent = '…';
    formNote.textContent = '';
    formNote.className = 'form-note';

    try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            contactForm.reset();
            submitBtn.textContent = '✓';
            formNote.textContent = "Thanks — I'll get back to you soon.";
            formNote.className = 'form-note success';
            setTimeout(() => { submitBtn.textContent = '↑'; submitBtn.disabled = false; }, 2200);
        } else {
            throw new Error('Request failed');
        }
    } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = '↑';
        formNote.textContent = 'Something went wrong — please try again, or email me directly.';
        formNote.className = 'form-note error';
    }
});

// single, restrained scroll-reveal (fade/slide-up on section entry — no per-card stagger)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');
if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('in-view'));
} else {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
}

// count-up stats
function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const dur = 1100;
    const start = performance.now();
    function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}
document.querySelectorAll('.stat .num').forEach(el => {
    if (el.dataset.static) { el.textContent = el.dataset.static; }
});
if (prefersReducedMotion) {
    document.querySelectorAll('.stat .num[data-count]').forEach(el => {
        el.textContent = el.dataset.count + (el.dataset.suffix || '');
    });
} else {
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat .num[data-count]').forEach(animateCount);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    const statsRow = document.querySelector('.stats-row');
    if (statsRow) statObserver.observe(statsRow);
}

// node-graph signature — slow auto-rotating 3D network (multi-agent motif)
// Note: the theme brief calls for "no cursor-follow effects", so unlike earlier
// versions this no longer tilts toward the mouse — it just turns steadily.
(function () {
    const canvas = document.getElementById('nodeCanvas');
    const container = canvas ? canvas.parentElement : null;
    if (!canvas || !container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    function resize() {
        const w = container.clientWidth, h = container.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    const group = new THREE.Group();
    scene.add(group);

    // nodes placed on a sphere (fibonacci distribution) — reads as a network, not a blob
    const NODE_COUNT = 14;
    const radius = 3;
    const nodePositions = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NODE_COUNT; i++) {
        const y = 1 - (i / (NODE_COUNT - 1)) * 2;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = goldenAngle * i;
        nodePositions.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
    }

    // theme-matched palette: accent blue + a muted ink tone, no amber
    const blueColor = 0x7cc3f0;
    const inkColor = 0x5c5c60;

    const sphereGeo = new THREE.SphereGeometry(0.08, 16, 16);
    nodePositions.forEach((pos, i) => {
        const color = i % 3 === 0 ? blueColor : inkColor;
        const mesh = new THREE.Mesh(sphereGeo, new THREE.MeshBasicMaterial({ color }));
        mesh.position.copy(pos);
        group.add(mesh);
    });

    // connect each node to its nearest neighbors so it reads as a network
    const K = 3;
    const lineMat = new THREE.LineBasicMaterial({ color: blueColor, transparent: true, opacity: 0.28 });
    const seenEdges = new Set();
    nodePositions.forEach((a, i) => {
        const byDistance = nodePositions
            .map((b, j) => ({ j, d: i === j ? Infinity : a.distanceTo(b) }))
            .sort((p, q) => p.d - q.d);
        for (let k = 0; k < K; k++) {
            const j = byDistance[k].j;
            const key = [Math.min(i, j), Math.max(i, j)].join('-');
            if (seenEdges.has(key)) continue;
            seenEdges.add(key);
            const geo = new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]]);
            group.add(new THREE.Line(geo, lineMat));
        }
    });

    function animate() {
        requestAnimationFrame(animate);
        if (!prefersReducedMotion) {
            group.rotation.y += 0.0016;
            group.rotation.x += 0.0004;
        }
        renderer.render(scene, camera);
    }
    animate();
})();