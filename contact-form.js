/* =========================================================
   KBSN Technology — Contact Form (Afrihost / PHP + MySQL)
   -----------------------------------------------------------
   Submits the contact form to contact-handler.php via fetch so
   the page never reloads. contact-handler.php stores the message
   in your MySQL database and emails a notification.

   See README.md for the one-time Afrihost/cPanel setup (create
   database + user, run db/schema.sql, fill in config.php).
   ========================================================= */
(function () {
  const form = document.getElementById("kbsn-contact-form");
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const btnLabel = submitBtn.querySelector(".btn-label");
  const statusEl = form.querySelector(".submit-msg");
  const originalLabel = btnLabel.textContent;

  function showStatus(text, isError) {
    statusEl.textContent = text;
    statusEl.style.color = isError ? "#FF6B6B" : "var(--accent)";
    statusEl.style.display = "block";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    btnLabel.textContent = "Sending…";
    statusEl.style.display = "none";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data && data.success) {
        showStatus(data.message || "Thanks — your message has been sent.", false);
        form.reset();
      } else {
        showStatus(
          (data && data.message) || "Something went wrong sending your message. Please try again or email us directly.",
          true
        );
      }
    } catch (err) {
      console.error(err);
      showStatus("Couldn't reach the server. Please check your connection and try again.", true);
    } finally {
      submitBtn.disabled = false;
      btnLabel.textContent = originalLabel;
    }
  });
})();
