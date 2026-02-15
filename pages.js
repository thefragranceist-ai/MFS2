const targets = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach((e)=>{if(e.isIntersecting){e.target.classList.add('show'); obs.unobserve(e.target);}})
},{threshold:0.15});
targets.forEach((t)=>obs.observe(t));

const form = document.getElementById('applicationForm');
const status = document.getElementById('formStatus');
if (form && status) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = 'Bewerbung wird gesendet...';
    try {
      const res = await fetch('/api/apply', { method: 'POST', body: new FormData(form) });
      if (!res.ok) throw new Error('failed');
      form.reset();
      status.textContent = 'Vielen Dank! Ihre Bewerbung wurde versendet.';
    } catch {
      status.textContent = 'Senden fehlgeschlagen. Bitte später erneut versuchen.';
    }
  });
}
