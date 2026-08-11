/* The Self-Audit and Relational Risk Assessment.
   Reads window.ASSESSMENT, emitted inline by the build. Nothing is sent
   anywhere: answers live in memory and vanish when the page is closed. */
(function () {
  "use strict";

  var root = document.getElementById("assessment");
  var data = window.ASSESSMENT;
  if (!root || !data) return;

  var MAX = 3; // highest Likert index
  var answers = {};
  var step = 0;
  var stage = "intro";
  var showIncomplete = false;

  var totalQuestions = data.dimensions.reduce(function (n, d) {
    return n + d.questions.length;
  }, 0);
  var totalSteps = data.dimensions.length + 1;

  function key(dimensionId, index) {
    return dimensionId + ":" + index;
  }

  function scores() {
    var perDimension = data.dimensions.map(function (dim) {
      var raw = dim.questions.reduce(function (sum, _q, index) {
        var value = answers[key(dim.id, index)];
        return sum + (value === undefined ? 0 : value);
      }, 0);
      var max = dim.questions.length * MAX;
      return { dimension: dim, raw: raw, max: max, percentage: Math.round((raw / max) * 100) };
    });
    var raw = perDimension.reduce(function (s, e) { return s + e.raw; }, 0);
    var max = perDimension.reduce(function (s, e) { return s + e.max; }, 0);
    var lowest = perDimension.slice().sort(function (a, b) { return a.percentage - b.percentage; })[0];
    return { perDimension: perDimension, percentage: Math.round((raw / max) * 100), lowest: lowest };
  }

  function band(percentage) {
    var match = data.bands.slice().reverse().find(function (b) { return percentage >= b.min; });
    return match || data.bands[0];
  }

  function esc(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function stepComplete() {
    var dim = data.dimensions[step];
    if (!dim) return true;
    return dim.questions.every(function (_q, index) {
      return answers[key(dim.id, index)] !== undefined;
    });
  }

  function progressBar() {
    if (stage === "intro" || stage === "safe-exit") return "";
    var current = stage === "questions" ? step + 1 : totalSteps;
    var pct = Math.round((current / totalSteps) * 100);
    return (
      '<div class="mb-8">' +
      '<div class="flex items-center justify-between text-xs text-muted"><span>Step ' + current + " of " + totalSteps + "</span><span>" + pct + '% complete</span></div>' +
      '<div class="mt-2 h-1.5 overflow-hidden rounded-full bg-sage-mist" role="progressbar" aria-valuenow="' + current + '" aria-valuemin="0" aria-valuemax="' + totalSteps + '" aria-label="Assessment progress">' +
      '<div class="h-full rounded-full bg-sage-deep transition-all duration-300" style="width:' + pct + '%"></div></div></div>'
    );
  }

  function viewIntro() {
    return (
      '<p class="eyebrow">' + esc(data.eyebrow) + "</p>" +
      '<h2 class="mt-4 font-display text-[2rem] leading-tight text-ink">Before you begin</h2>' +
      '<ul class="mt-6 space-y-3 text-[0.9375rem] leading-7 text-ink-soft">' +
      "<li>Answer honestly rather than aspirationally. An accurate low score is worth more than a flattering high one.</li>" +
      "<li>Nothing you enter leaves your browser. There is no account, no submission, and no record kept — refreshing the page clears it.</li>" +
      "<li>This is not a diagnosis and it will not tell you what to do. It shows you where you are solid and where you are thin.</li>" +
      "</ul>" +
      '<button type="button" data-action="begin" class="mt-8 rounded-full bg-sage-deep px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-sage-dark">Begin — ' + totalQuestions + " questions</button>"
    );
  }

  var LABEL_BASE =
    "cursor-pointer rounded-2xl border px-4 py-3 text-center text-sm transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sage-deep ";
  var LABEL_ON = "border-sage-deep bg-sage-deep text-white";
  var LABEL_OFF = "border-line bg-cream text-ink-soft hover:border-sage/50 hover:bg-sage-mist";

  function viewQuestions() {
    var dim = data.dimensions[step];
    var fields = dim.questions
      .map(function (question, index) {
        var name = key(dim.id, index);
        var value = answers[name];
        var missing = showIncomplete && value === undefined;
        var options = data.scale
          .map(function (label, scaleIndex) {
            var selected = value === scaleIndex;
            return (
              '<label class="' + LABEL_BASE + (selected ? LABEL_ON : LABEL_OFF) +
              '"><input type="radio" name="' + name + '" value="' + scaleIndex + '"' + (selected ? " checked" : "") + ' class="sr-only" data-q="' + name + '"/>' + esc(label) + "</label>"
            );
          })
          .join("");
        return (
          '<fieldset class="' + (missing ? "rounded-2xl bg-red-50/60 p-4 -m-1" : "") + '">' +
          '<legend class="text-[1.0625rem] leading-7 text-ink">' + esc(question) + "</legend>" +
          '<div class="mt-4 grid gap-2 sm:grid-cols-4">' + options + "</div>" +
          (missing ? '<p class="mt-2 text-sm text-red-700">Please choose an answer.</p>' : "") +
          "</fieldset>"
        );
      })
      .join("");

    return (
      '<p class="eyebrow">Dimension ' + (step + 1) + " of " + data.dimensions.length + "</p>" +
      '<h2 class="mt-3 font-display text-[2rem] leading-tight text-ink">' + esc(dim.title) + "</h2>" +
      '<div class="mt-8 space-y-8">' + fields + "</div>" +
      '<div class="mt-10 flex items-center justify-between gap-4">' +
      '<button type="button" data-action="back" class="rounded-full border border-line px-6 py-3 text-sm text-ink-soft transition hover:bg-sage-mist">Back</button>' +
      '<button type="button" data-action="next" class="rounded-full bg-sage-deep px-8 py-3.5 text-sm font-medium text-white transition hover:bg-sage-dark">' +
      (step < data.dimensions.length - 1 ? "Next dimension" : "Continue") +
      "</button></div>"
    );
  }

  function viewSafety() {
    return (
      '<p class="eyebrow">One more question</p>' +
      '<h2 class="mt-3 font-display text-[2rem] leading-tight text-ink">' + esc(data.safetyQuestion) + "</h2>" +
      '<p class="mt-4 text-[0.9375rem] leading-7 text-muted">' + esc(data.safetyHelp) + "</p>" +
      '<div class="mt-8 flex flex-wrap gap-3">' +
      '<button type="button" data-action="safety-yes" class="rounded-full border border-sage-deep/40 px-8 py-3.5 text-sm text-sage-dark transition hover:bg-sage-mist">Yes, or I&rsquo;m not sure</button>' +
      '<button type="button" data-action="safety-no" class="rounded-full bg-sage-deep px-8 py-3.5 text-sm font-medium text-white transition hover:bg-sage-dark">No — show my results</button>' +
      "</div>" +
      '<button type="button" data-action="back" class="mt-6 text-sm text-muted underline-offset-4 hover:text-sage-deep hover:underline">← Back to the last dimension</button>'
    );
  }

  function viewSafeExit() {
    return (
      '<h2 class="font-display text-[2rem] leading-tight text-ink">Thank you for answering that honestly.</h2>' +
      '<div class="mt-6 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">' +
      "<p>I am not going to show you a score, because a score is not what this needs and it would be the wrong response to what you have just told me.</p>" +
      "<p>Where there is harm in a relationship, couples work is not the right first step — it can make things more dangerous, not less. What matters first is your safety, and there are people whose specific job that is.</p>" +
      "<p>If you would like to talk to me directly, you are welcome to. Nothing you say obliges you to do anything, and I will not push you towards any service.</p>" +
      "</div>" +
      '<div class="mt-8 flex flex-wrap gap-3">' +
      '<a href="/crisis" class="inline-flex items-center justify-center rounded-full bg-sage-deep px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-sage-dark">Crisis and safety resources</a>' +
      '<a href="/contact" class="inline-flex items-center justify-center rounded-full border border-sage-deep/35 px-8 py-4 text-[0.9375rem] text-sage-dark transition hover:bg-sage-mist">Speak to me directly</a>' +
      "</div>" +
      '<button type="button" data-action="restart" class="mt-6 text-sm text-muted underline-offset-4 hover:text-sage-deep hover:underline">Start the assessment again</button>'
    );
  }

  function viewResult() {
    var s = scores();
    var b = band(s.percentage);
    var rows = s.perDimension
      .map(function (entry) {
        var colour = entry.percentage >= 75 ? "bg-sage-deep" : entry.percentage >= 50 ? "bg-sage" : "bg-amber-500/80";
        return (
          "<div>" +
          '<div class="flex items-baseline justify-between gap-4"><p class="text-[0.9375rem] font-medium text-ink">' + esc(entry.dimension.title) + '</p><p class="text-sm text-muted">' + entry.raw + "/" + entry.max + "</p></div>" +
          '<div class="mt-2 h-2 overflow-hidden rounded-full bg-sage-mist"><div class="h-full rounded-full ' + colour + '" style="width:' + Math.max(entry.percentage, 3) + '%"></div></div>' +
          '<p class="mt-2 text-sm leading-6 text-muted">' + esc(entry.percentage >= 60 ? entry.dimension.strong : entry.dimension.thin) + "</p>" +
          "</div>"
        );
      })
      .join("");

    return (
      '<p class="eyebrow">Your result</p>' +
      '<div class="mt-5 flex flex-wrap items-end gap-x-6 gap-y-2"><p class="font-display text-6xl leading-none text-sage-deep">' + s.percentage + '%</p><p class="font-display text-3xl text-ink">' + esc(b.label) + "</p></div>" +
      '<p class="mt-5 max-w-2xl text-[1.0625rem] leading-[1.8] text-ink-soft">' + esc(b.summary) + "</p>" +
      '<div class="mt-10 space-y-6"><h3 class="font-display text-2xl text-ink">Dimension by dimension</h3>' + rows + "</div>" +
      '<div class="mt-10 rounded-3xl bg-sage-mist p-7">' +
      '<h3 class="font-display text-2xl text-ink">Your thinnest point: ' + esc(s.lowest.dimension.title) + "</h3>" +
      '<p class="mt-3 text-[0.9375rem] leading-7 text-ink-soft">' + esc(s.lowest.dimension.thin) + "</p>" +
      '<p class="mt-3 text-[0.9375rem] leading-7 text-ink-soft">If you do one thing with this result, make it this dimension. It is where the next difficulty is most likely to originate, and it is the cheapest thing on the list to work on now rather than later.</p>' +
      "</div>" +
      '<div class="mt-9 flex flex-wrap gap-3">' +
      '<a href="' + data.ctaHref + '" class="inline-flex items-center justify-center rounded-full bg-sage-deep px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-sage-dark">' + esc(data.ctaLabel) + "</a>" +
      '<button type="button" data-action="print" class="rounded-full border border-sage-deep/35 px-8 py-4 text-[0.9375rem] text-sage-dark transition hover:bg-sage-mist">Print or save as PDF</button>' +
      "</div>" +
      '<p class="mt-8 border-t border-line-soft pt-6 text-sm leading-6 text-muted">This is a reflective instrument, not a clinical diagnosis, and it has not been psychometrically validated. It is designed to start an honest conversation — with yourself, with a partner, or with me. <a href="/contact" class="text-sage-deep underline-offset-4 hover:underline">Book a free conversation</a> if you would like to go through it properly.</p>' +
      '<button type="button" data-action="restart" class="mt-6 text-sm text-muted underline-offset-4 hover:text-sage-deep hover:underline">Take it again</button>'
    );
  }

  function render(focus) {
    var view =
      stage === "intro" ? viewIntro()
      : stage === "questions" ? viewQuestions()
      : stage === "safety" ? viewSafety()
      : stage === "safe-exit" ? viewSafeExit()
      : viewResult();

    root.innerHTML = progressBar() + view;
    if (focus) root.focus();
  }

  root.addEventListener("change", function (event) {
    var input = event.target.closest("input[data-q]");
    if (!input) return;

    var name = input.getAttribute("data-q");
    answers[name] = Number(input.value);

    /* Restyle just this question. Re-rendering the whole panel here would
       tear down the DOM on every answer and throw keyboard focus back to
       the top of the step. */
    root.querySelectorAll('input[data-q="' + name + '"]').forEach(function (radio) {
      var label = radio.closest("label");
      if (label) label.className = LABEL_BASE + (radio.checked ? LABEL_ON : LABEL_OFF);
    });

    var fieldset = input.closest("fieldset");
    if (fieldset) {
      fieldset.className = "";
      var warning = fieldset.querySelector("p.text-red-700");
      if (warning) warning.remove();
    }
  });

  root.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-action]");
    if (!trigger) return;
    var action = trigger.getAttribute("data-action");

    if (action === "begin") {
      stage = "questions";
    } else if (action === "next") {
      if (!stepComplete()) {
        showIncomplete = true;
        return render(false);
      }
      showIncomplete = false;
      if (step < data.dimensions.length - 1) step += 1;
      else stage = "safety";
    } else if (action === "back") {
      showIncomplete = false;
      if (stage === "safety") {
        stage = "questions";
        step = data.dimensions.length - 1;
      } else if (step > 0) {
        step -= 1;
      } else {
        stage = "intro";
      }
    } else if (action === "safety-yes") {
      stage = "safe-exit";
    } else if (action === "safety-no") {
      stage = "result";
    } else if (action === "restart") {
      answers = {};
      step = 0;
      showIncomplete = false;
      stage = "intro";
    } else if (action === "print") {
      return window.print();
    }

    render(true);
  });

  render(false);
})();
