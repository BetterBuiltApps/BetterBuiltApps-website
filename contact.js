/* Contact form submit, ported from the Lifting Lab site's Contact.jsx.
   Everything the form sends is a field in the markup (including access_key
   and subject), so FormData collects the whole payload in one step. */

(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var form = document.getElementById('contact-form');
  if (!form) return;
  var button = form.querySelector('button[type="submit"]');
  var statusEl = form.querySelector('.form-status');
  // idle -> sending -> sent | error
  var state = 'idle';

  function setState(next, note) {
    state = next;
    statusEl.dataset.state = next;
    statusEl.setAttribute('role', next === 'error' ? 'alert' : 'status');
    statusEl.textContent = note || '';
    button.disabled = next === 'sending';
    button.textContent = next === 'sending' ? 'Sending' : 'Send';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    // Double-click, or Enter held in a field, both fire submit twice.
    if (state === 'sending') return;
    setState('sending');
    try {
      var res = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      var data = await res.json().catch(function () { return {}; });
      // res.ok is not enough: Web3Forms answers 200 with success:false when
      // the key is wrong or the submission is filtered.
      if (res.ok && data.success) {
        form.reset();
        setState('sent', "Message sent. We'll get back to you by email.");
      } else {
        setState('error', data.message || 'That did not send. Try again in a moment.');
      }
    } catch (err) {
      setState('error', 'Could not reach the server. Check your connection and try again.');
    }
  });
})();
