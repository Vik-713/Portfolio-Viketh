// mobile nav toggle placeholder link -> smooth scroll already via CSS
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
            const el = document.querySelector(id);
            if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
        }
    });
});

// project filter
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

// contact form -> sends to your inbox via Formspree (https://formspree.io)
// 1. Create a free account at formspree.io and verify the email you want messages sent to.
// 2. Create a new form there — it gives you a form ID like "xyzabcde".
// 3. Replace YOUR_FORM_ID below with that ID.
const FORMSPREE_ID = 'mdenlgab';

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (FORMSPREE_ID === 'YOUR_FORM_ID') {
        formNote.textContent = 'Form not connected yet — add your Formspree form ID in the code to enable real sending.';
        formNote.className = 'form-note error';
        return;
    }

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
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
            submitBtn.textContent = 'Message sent →';
            formNote.textContent = "Thanks — I'll get back to you soon.";
            formNote.className = 'form-note success';
            setTimeout(() => { submitBtn.textContent = 'Send message →'; submitBtn.disabled = false; }, 2500);
        } else {
            throw new Error('Request failed');
        }
    } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message →';
        formNote.textContent = 'Something went wrong — please try again, or email me directly.';
        formNote.className = 'form-note error';
    }
});

// scroll-triggered reveals
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const prefersReducedMotion = reduceMotion;
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
if (reduceMotion) {
    revealEls.forEach(el => el.classList.add('in-view'));
} else {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
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
if (reduceMotion) {
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

// node-graph signature — 3D version (multi-agent motif) via Three.js
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

    const signalColor = 0x3654ff;
    const amberColor = 0xff8a3d;
    const inkColor = 0x2a2e37;

    const sphereGeo = new THREE.SphereGeometry(0.09, 16, 16);
    nodePositions.forEach((pos, i) => {
        const color = i % 4 === 0 ? amberColor : (i % 3 === 0 ? signalColor : inkColor);
        const mesh = new THREE.Mesh(sphereGeo, new THREE.MeshBasicMaterial({ color }));
        mesh.position.copy(pos);
        group.add(mesh);
    });

    // connect each node to its nearest neighbors so it reads as a network
    const K = 3;
    const lineMat = new THREE.LineBasicMaterial({ color: signalColor, transparent: true, opacity: 0.32 });
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

    // mouse parallax tilt
    let targetTiltX = 0, targetTiltY = 0;
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const mx = (e.clientX - rect.left) / rect.width - 0.5;
        const my = (e.clientY - rect.top) / rect.height - 0.5;
        targetTiltY = mx * 0.6;
        targetTiltX = -my * 0.6;
    });
    container.addEventListener('mouseleave', () => { targetTiltX = 0; targetTiltY = 0; });

    let spin = 0;
    function animate() {
        requestAnimationFrame(animate);
        if (!prefersReducedMotion) spin += 0.0025;
        group.rotation.y += ((spin + targetTiltY) - group.rotation.y) * 0.05;
        group.rotation.x += (targetTiltX - group.rotation.x) * 0.05;
        renderer.render(scene, camera);
    }
    animate();
})();

// 3D tilt on hover for project and "now" cards
if (!prefersReducedMotion) {
    function apply3DTilt(selector, maxDeg, scale) {
        document.querySelectorAll(selector).forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width;
                const py = (e.clientY - rect.top) / rect.height;
                const rotY = (px - 0.5) * maxDeg;
                const rotX = -(py - 0.5) * maxDeg;
                card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }
    apply3DTilt('.proj-card', 5, 1.015);
    apply3DTilt('.now-card', 7, 1.03);
}