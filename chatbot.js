/* =========================================================
   KBSN Technology — Chat Widget
   -----------------------------------------------------------
   This file only handles the UI and talks to YOUR OWN backend
   endpoint (see /server-example/chat-api-example.js). It never
   calls the Anthropic API directly and never holds an API key —
   doing that from the browser would expose your key to anyone
   who opens dev tools.
   ========================================================= */
(function () {
  const CHAT_ENDPOINT = "chat-handler.php"; // PHP endpoint, same folder as index.html (Afrihost/cPanel hosting)

  const toggle = document.getElementById("kbsn-chat-toggle");
  const panel = document.getElementById("kbsn-chat-panel");
  const iconOpen = document.getElementById("kbsn-chat-icon-open");
  const iconClose = document.getElementById("kbsn-chat-icon-close");
  const messages = document.getElementById("kbsn-chat-messages");
  const form = document.getElementById("kbsn-chat-form");
  const input = document.getElementById("kbsn-chat-input");
  const sendBtn = document.getElementById("kbsn-chat-send");

  const SYSTEM_PROMPT =
    "You are the KBSN Technology website assistant. Answer briefly and honestly about KBSN's " +
    "services (custom software, websites, web apps, mobile apps, automation, APIs, cloud, databases, " +
    "maintenance), the process (Discovery, Requirements, Planning, UI/UX, Development, Testing, " +
    "Deployment, Support), and encourage visitors to use the contact form for a free consultation. " +
    "Never invent client names, testimonials, statistics, or completed projects that aren't on the site.";

  let history = []; // { role: 'user' | 'assistant', content: string }
  let isOpen = false;

  function addMessage(role, text) {
    const el = document.createElement("div");
    el.className = "kbsn-msg " + (role === "user" ? "user" : "bot");
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  function showTyping() {
    const el = document.createElement("div");
    el.className = "kbsn-msg bot typing";
    el.innerHTML = "<span></span><span></span><span></span>";
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  function openPanel() {
    isOpen = true;
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    iconOpen.style.display = "none";
    iconClose.style.display = "block";
    if (messages.children.length === 0) {
      addMessage(
        "bot",
        "Hi! I'm the KBSN Technology assistant. Ask me about our services, process, or how to get a project started."
      );
    }
    input.focus();
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    iconOpen.style.display = "block";
    iconClose.style.display = "none";
  }

  toggle.addEventListener("click", () => (isOpen ? closePanel() : openPanel()));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    history.push({ role: "user", content: text });
    input.value = "";
    input.disabled = true;
    sendBtn.disabled = true;

    const typingEl = showTyping();

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      });

      if (!res.ok) throw new Error("Chat request failed: " + res.status);

      const data = await res.json();
      const reply = data.reply || "Sorry, I didn't get a response. Please try again.";
      console.log("Status:", res.status);
      console.log("Response:", await res.text());
      typingEl.remove();
      addMessage("bot", reply);
      history.push({ role: "assistant", content: reply });
    } catch (err) {
      typingEl.remove();
      addMessage(
        "bot",
        "I'm having trouble connecting right now. Please try again shortly, or use the contact form below."
      );
      console.error(err);
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closePanel();
  });
})();
