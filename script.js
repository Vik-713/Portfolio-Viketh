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

// node-graph signature (multi-agent motif)
(function () {
    const svgNS = "http://www.w3.org/2000/svg";
    const lines = document.getElementById('lines');
    const nodes = document.getElementById('nodes');
    if (!lines || !nodes) return;
    const pts = [
        [200, 60], [80, 140], [320, 140], [60, 260], [200, 220], [340, 260],
        [120, 340], [280, 340], [200, 340]
    ];
    const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7], [6, 8], [7, 8], [4, 8]];
    edges.forEach(([a, b], i) => {
        const l = document.createElementNS(svgNS, 'line');
        l.setAttribute('x1', pts[a][0]); l.setAttribute('y1', pts[a][1]);
        l.setAttribute('x2', pts[b][0]); l.setAttribute('y2', pts[b][1]);
        l.setAttribute('class', i % 4 === 0 ? 'pulse-line' : '');
        lines.appendChild(l);
    });
    pts.forEach((p, i) => {
        const c = document.createElementNS(svgNS, 'circle');
        c.setAttribute('cx', p[0]); c.setAttribute('cy', p[1]);
        c.setAttribute('r', i === 4 ? 9 : 6);
        c.setAttribute('class', 'node' + (i % 3 === 0 ? ' accent' : ''));
        nodes.appendChild(c);
    });
})();