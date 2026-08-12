/* Site behaviour for the static build: mobile menu, currency switching,
   the quick-exit safety button, and form handling. No framework, no build. */
(function () {
  "use strict";

  /* ---------------- Mobile menu ---------------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var panel = document.getElementById("mobile-nav");
  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = panel.hasAttribute("hidden");
      if (open) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", String(open));
      var label = toggle.querySelector("[data-menu-label]");
      var icon = toggle.querySelector("[data-menu-icon]");
      if (label) label.textContent = open ? "Close" : "Menu";
      if (icon) icon.textContent = open ? "✕" : "☰";
    });
  }

  /* ---------------- Currency ----------------
     PRICE_BOOK and CURRENCY_META are emitted by the build into data.js. */
  var STORAGE_KEY = "activator-currency";
  var CURRENCIES = ["NGN", "GBP", "USD"];

  function localeCurrency() {
    var locale = (navigator.language || "en-US").toLowerCase();
    if (locale.slice(-3) === "-ng") return "NGN";
    if (locale.slice(-3) === "-gb" || locale.slice(-3) === "-ie") return "GBP";
    return "USD";
  }

  function readCurrency() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (CURRENCIES.indexOf(saved) !== -1) return saved;
    } catch (e) {
      /* storage blocked — fall through to locale */
    }
    return localeCurrency();
  }

  function formatMoney(amount, currency) {
    var symbol = (window.CURRENCY_META && window.CURRENCY_META[currency]) || "";
    return symbol + amount.toLocaleString("en-US");
  }

  function applyCurrency(currency) {
    var book = window.PRICE_BOOK || {};

    document.querySelectorAll("[data-price]").forEach(function (node) {
      var entry = book[node.getAttribute("data-price")];
      if (entry) node.textContent = formatMoney(entry[currency], currency);
    });

    document.querySelectorAll("[data-currency]").forEach(function (btn) {
      var active = btn.getAttribute("data-currency") === currency;
      btn.setAttribute("aria-pressed", String(active));
      btn.className =
        "rounded-full px-2.5 py-1 text-xs font-medium transition " +
        (active ? "bg-sage-deep text-white" : "text-muted hover:bg-sage-mist hover:text-sage-dark");
    });
  }

  var currency = readCurrency();
  applyCurrency(currency);

  document.querySelectorAll("[data-currency]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      currency = btn.getAttribute("data-currency");
      try {
        localStorage.setItem(STORAGE_KEY, currency);
      } catch (e) {
        /* preference just won't persist */
      }
      applyCurrency(currency);
    });
  });

  /* ---------------- Quick exit ----------------
     Opens a neutral page and replaces this history entry so the back button
     cannot return here. Escape pressed three times does the same. */
  var SAFE_URL = "https://www.bbc.com/news";
  function leave() {
    try {
      window.open(SAFE_URL, "_blank", "noopener,noreferrer");
    } catch (e) {
      /* popup blocked — the replace below still gets them away */
    }
    window.location.replace(SAFE_URL);
  }

  var exitButton = document.querySelector("[data-quick-exit]");
  if (exitButton) exitButton.addEventListener("click", leave);

  var taps = 0;
  var tapTimer;
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    taps += 1;
    clearTimeout(tapTimer);
    if (taps >= 3) return leave();
    tapTimer = setTimeout(function () {
      taps = 0;
    }, 1200);
  });

  /* ---------------- Forms ----------------
     Static hosting has no server, so there are two paths:
       • window.FORM_ENDPOINT set (Formspree, Web3Forms, etc.) → POST to it
       • otherwise → open the visitor's mail client with the message prefilled
     Either way the message reaches the practice; nothing is silently dropped. */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setStatus(form, message, ok) {
    var status = form.querySelector(".js-status");
    if (!status) return;
    status.textContent = message;
    status.className =
      "js-status mt-4 text-sm leading-6 " + (ok ? "text-sage-deep" : "text-red-700");
  }

  function fieldError(form, name, message) {
    var holder = form.querySelector('[data-error-for="' + name + '"]');
    if (holder) holder.textContent = message || "";
    var input = form.elements[name];
    if (input && input.setAttribute) {
      if (message) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    }
  }

  function postOrMail(payload, subject, form, successMessage) {
    var endpoint = window.FORM_ENDPOINT;

    if (endpoint) {
      setStatus(form, "Sending…", true);
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("bad status " + res.status);
          form.reset();
          setStatus(form, successMessage, true);
        })
        .catch(function () {
          setStatus(
            form,
            "That didn't send. Please email " + window.PRACTICE_EMAIL + " directly and it will be picked up within two working days.",
            false,
          );
        });
      return;
    }

    var lines = Object.keys(payload).map(function (key) {
      return key + ": " + payload[key];
    });
    window.location.href =
      "mailto:" +
      window.PRACTICE_EMAIL +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(lines.join("\n"));
    setStatus(form, "Your email app should now be open with this message ready to send.", true);
  }

  /* Enquiry form */
  var enquiry = document.querySelector(".js-enquiry");
  if (enquiry) {
    enquiry.addEventListener("submit", function (event) {
      event.preventDefault();
      if (enquiry.elements.company && enquiry.elements.company.value) return; // honeypot

      var name = enquiry.elements.name.value.trim();
      var email = enquiry.elements.email.value.trim();
      var message = enquiry.elements.message.value.trim();
      var consent = enquiry.elements.consent.checked;
      var ok = true;

      fieldError(enquiry, "name", name.length < 2 ? "Please tell me what to call you." : "");
      if (name.length < 2) ok = false;
      fieldError(enquiry, "email", EMAIL_RE.test(email) ? "" : "Please enter an email address I can reply to.");
      if (!EMAIL_RE.test(email)) ok = false;
      fieldError(enquiry, "message", message.length < 10 ? "A sentence or two is enough — just enough to go on." : "");
      if (message.length < 10) ok = false;
      fieldError(enquiry, "consent", consent ? "" : "Please confirm you're happy for me to reply to you.");
      if (!consent) ok = false;

      if (!ok) return setStatus(enquiry, "Please check the highlighted fields.", false);

      postOrMail(
        {
          Name: name,
          Email: email,
          Topic: enquiry.elements.topic.value || "Not specified",
          "Preferred contact": enquiry.elements.preferredContact.value,
          Message: message,
        },
        "Website enquiry — " + (enquiry.elements.topic.value || "General") + " — " + name,
        enquiry,
        "Thank you, " + name + ". Your message is on its way. I reply to everything within two working days — and if your situation is urgent, please don't wait for me.",
      );
    });
  }

  /* Letter signup — may appear more than once per page */
  document.querySelectorAll(".js-subscribe").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = form.elements.email.value.trim();
      if (!EMAIL_RE.test(email)) return setStatus(form, "Please enter a valid email address.", false);
      postOrMail(
        { Email: email },
        "Activator Letter — please add me",
        form,
        "You're on the list. The next letter goes out at the start of the month.",
      );
    });
  });
})();
