/* The Relationship Self-Audit and Relational Risk Assessment.
   Reads window.ASSESSMENT and window.ASSESSMENT_COPY, both emitted inline by
   the build from content/assessments.json. Nothing is sent anywhere: answers
   live in memory and vanish when the page is closed.

   Each answer scores 1–4 (Rarely true … Consistently true), so a dimension of
   three questions scores 3–12 and the whole instrument 15–60. The safety
   question is never part of the score. */
(function () {
  "use strict";

  var root = document.getElementById("assessment");
  var data = window.ASSESSMENT;
  var copy = window.ASSESSMENT_COPY;
  if (!root || !data || !copy) return;

  var CONCERNS = ["yes", "unsure"];

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
      var score = dim.questions.reduce(function (sum, _q, index) {
        var value = answers[key(dim.id, index)];
        return sum + (value === undefined ? 0 : value + 1);
      }, 0);
      return { dimension: dim, score: score, max: dim.questions.length * data.scale.length };
    });
    var total = perDimension.reduce(function (s, e) { return s + e.score; }, 0);
    var max = perDimension.reduce(function (s, e) { return s + e.max; }, 0);
    // Ties go to the dimension asked first, so the result is stable.
    var strongest = perDimension.reduce(function (a, b) { return b.score > a.score ? b : a; });
    var attention = perDimension.reduce(function (a, b) { return b.score < a.score ? b : a; });
    return { perDimension: perDimension, total: total, max: max, strongest: strongest, attention: attention };
  }

  function band(score) {
    return data.bands.find(function (b) { return score >= b.min && score <= b.max; }) || data.bands[0];
  }

  function esc(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function paragraphs(list, cls) {
    return list.map(function (text) { return '<p class="' + cls + '">' + esc(text) + "</p>"; }).join("");
  }

  function stepComplete() {
    var dim = data.dimensions[step];
    if (!dim) return true;
    return dim.questions.every(function (_q, index) {
      return answers[key(dim.id, index)] !== undefined;
    });
  }

  function progressBar() {
    if (stage !== "questions" && stage !== "safety") return "";
    var current = stage === "questions" ? step + 1 : totalSteps;
    var pct = Math.round((current / totalSteps) * 100);
    return (
      '<div class="mb-8">' +
      '<div class="flex items-center justify-between text-xs text-muted"><span>' + esc(copy.stepLabel) + " " + current + " " + esc(copy.ofLabel) + " " + totalSteps + "</span><span>" + pct + esc(copy.completeLabel) + "</span></div>" +
      '<div class="mt-2 h-1.5 overflow-hidden rounded-full bg-sage-mist" role="progressbar" aria-valuenow="' + current + '" aria-valuemin="0" aria-valuemax="' + totalSteps + '" aria-label="' + esc(copy.progressLabel) + '">' +
      '<div class="h-full rounded-full bg-sage-deep transition-all duration-300" style="width:' + pct + '%"></div></div></div>'
    );
  }

  var PRIMARY = "inline-flex items-center justify-center rounded-full bg-sage-deep px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-sage-dark";
  var OUTLINE = "inline-flex items-center justify-center rounded-full border border-sage-deep/35 px-8 py-4 text-[0.9375rem] text-sage-dark transition hover:bg-sage-mist";
  var TEXT_LINK = "mt-6 text-sm text-muted underline-offset-4 hover:text-sage-deep hover:underline";

  function viewIntro() {
    return (
      '<p class="eyebrow">' + esc(data.eyebrow) + "</p>" +
      '<h2 class="mt-4 font-display text-[2rem] leading-tight text-ink">' + esc(copy.introTitle) + "</h2>" +
      '<ul class="mt-6 space-y-3 text-[0.9375rem] leading-7 text-ink-soft">' +
      data.introPoints.map(function (point) {
        return '<li class="flex gap-3.5"><span aria-hidden="true" class="mt-3 h-1 w-1 shrink-0 rounded-full bg-sage"></span>' + esc(point) + "</li>";
      }).join("") +
      "</ul>" +
      (data.scaleHelp ? '<p class="mt-6 text-[0.9375rem] leading-7 text-muted">' + esc(data.scaleHelp) + "</p>" : "") +
      '<button type="button" data-action="begin" class="mt-8 rounded-full bg-sage-deep px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-sage-dark">' + esc(copy.beginPrefix) + " " + totalQuestions + " " + esc(copy.beginSuffix) + "</button>"
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
          (missing ? '<p class="mt-2 text-sm text-red-700">' + esc(copy.unansweredError) + "</p>" : "") +
          "</fieldset>"
        );
      })
      .join("");

    return (
      '<p class="eyebrow">' + esc(copy.dimensionLabel) + " " + (step + 1) + " " + esc(copy.ofLabel) + " " + data.dimensions.length + "</p>" +
      '<h2 class="mt-3 font-display text-[2rem] leading-tight text-ink">' + esc(dim.title) + "</h2>" +
      (dim.description ? '<p class="mt-3 text-[0.9375rem] leading-7 text-muted">' + esc(dim.description) + "</p>" : "") +
      '<div class="mt-8 space-y-8">' + fields + "</div>" +
      '<div class="mt-10 flex items-center justify-between gap-4">' +
      '<button type="button" data-action="back" class="rounded-full border border-line px-6 py-3 text-sm text-ink-soft transition hover:bg-sage-mist">' + esc(copy.backLabel) + "</button>" +
      '<button type="button" data-action="next" class="rounded-full bg-sage-deep px-8 py-3.5 text-sm font-medium text-white transition hover:bg-sage-dark">' +
      esc(step < data.dimensions.length - 1 ? copy.nextLabel : copy.continueLabel) +
      "</button></div>"
    );
  }

  function viewSafety() {
    var safety = data.safety;
    return (
      '<p class="eyebrow">' + esc(safety.eyebrow) + "</p>" +
      '<h2 class="mt-3 font-display text-[2rem] leading-tight text-ink">' + esc(safety.question) + "</h2>" +
      (safety.help ? '<p class="mt-4 text-[0.9375rem] leading-7 text-muted">' + esc(safety.help) + "</p>" : "") +
      '<div class="mt-8 grid gap-2 sm:grid-cols-2">' +
      safety.options.map(function (option) {
        return '<button type="button" data-action="safety" data-value="' + esc(option.value) + '" class="rounded-2xl border border-line bg-cream px-4 py-3 text-sm text-ink-soft transition hover:border-sage/50 hover:bg-sage-mist">' + esc(option.label) + "</button>";
      }).join("") +
      "</div>" +
      '<button type="button" data-action="back" class="' + TEXT_LINK + '">' + esc(copy.safetyBackLabel) + "</button>"
    );
  }

  function viewSafeExit() {
    return (
      '<h2 class="font-display text-[2rem] leading-tight text-ink">' + esc(copy.safeExitTitle) + "</h2>" +
      '<div class="mt-6 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">' + paragraphs(copy.safeExitParagraphs, "") + "</div>" +
      '<div class="mt-8 flex flex-wrap gap-3">' +
      '<a href="' + esc(copy.safeExitContactCta.href) + '" class="' + PRIMARY + '">' + esc(copy.safeExitContactCta.label) + "</a>" +
      (data.safety.bypassResults ? "" : '<button type="button" data-action="results" class="' + OUTLINE + '">' + esc(copy.safeExitResultsLabel) + "</button>") +
      "</div>" +
      '<button type="button" data-action="restart" class="' + TEXT_LINK + '">' + esc(copy.restartLabel) + "</button>"
    );
  }

  function dimensionCard(entry) {
    var b = band(entry.score);
    var pct = Math.round((entry.score / entry.max) * 100);
    var detail = entry.dimension.guidance || entry.dimension.description;
    return (
      '<div class="rounded-3xl border border-line bg-white p-6">' +
      '<div class="flex items-baseline justify-between gap-4"><h4 class="font-display text-2xl leading-snug text-ink">' + esc(entry.dimension.title) + "</h4>" +
      '<p class="shrink-0 font-display text-3xl text-sage-deep">' + entry.score + '<span class="text-base text-muted">/' + entry.max + "</span></p></div>" +
      '<div class="mt-3 h-2 overflow-hidden rounded-full bg-sage-mist"><div class="h-full rounded-full bg-sage-deep" style="width:' + pct + '%"></div></div>' +
      '<p class="mt-4 text-sm font-medium text-sage-deep">' + esc(b.label) + "</p>" +
      '<p class="mt-1 text-sm leading-6 text-ink-soft">' + esc(b.summary) + "</p>" +
      (detail ? '<p class="mt-4 border-t border-line-soft pt-4 text-sm leading-6 text-muted">' + esc(detail) + "</p>" : "") +
      "</div>"
    );
  }

  function viewResult() {
    var s = scores();
    var highlight = function (label, entry) {
      return (
        '<div class="rounded-3xl bg-sage-mist p-6"><p class="text-xs uppercase tracking-[0.14em] text-muted">' + esc(label) + "</p>" +
        '<p class="mt-2 font-display text-2xl leading-snug text-ink">' + esc(entry.dimension.title) + "</p>" +
        '<p class="mt-1 text-sm text-muted">' + entry.score + "/" + entry.max + " · " + esc(band(entry.score).label) + "</p></div>"
      );
    };

    return (
      '<p class="eyebrow">' + esc(copy.resultEyebrow) + "</p>" +
      (data.resultsIntro.length
        ? '<div class="mt-5 max-w-2xl space-y-3 text-[1.0625rem] leading-[1.8] text-ink-soft">' + paragraphs(data.resultsIntro, "") + "</div>"
        : "") +
      '<h3 class="mt-9 font-display text-2xl text-ink">' + esc(copy.perDimensionTitle) + "</h3>" +
      '<div class="mt-5 grid gap-4 sm:grid-cols-2">' + s.perDimension.map(dimensionCard).join("") + "</div>" +
      '<p class="mt-4 text-xs leading-5 text-muted">' + esc(data.bandsNote) + "</p>" +
      '<div class="mt-8 grid gap-4 sm:grid-cols-2">' +
      highlight(copy.strongestLabel, s.strongest) +
      highlight(copy.attentionLabel, s.attention) +
      "</div>" +
      '<p class="mt-6 text-[0.9375rem] text-ink-soft">' + esc(copy.overallLabel) + ': <span class="font-display text-2xl text-sage-deep">' + s.total + "</span>/" + s.max + "</p>" +
      '<div class="mt-9 rounded-3xl border border-line p-7">' +
      '<h3 class="font-display text-2xl text-ink">' + esc(data.nextStep.title) + "</h3>" +
      '<p class="mt-3 text-[0.9375rem] leading-7 text-ink-soft">' + esc(data.nextStep.body) + "</p>" +
      '<div class="mt-6 flex flex-wrap gap-3">' +
      '<a href="' + esc(data.ctaHref) + '" class="' + PRIMARY + '">' + esc(data.ctaLabel) + "</a>" +
      '<button type="button" data-action="print" class="' + OUTLINE + '">' + esc(copy.printLabel) + "</button>" +
      "</div>" +
      (data.printNote ? '<p class="mt-5 text-sm leading-6 text-muted">' + esc(data.printNote) + "</p>" : "") +
      "</div>" +
      '<div class="mt-8 border-t border-line-soft pt-6 text-sm leading-6 text-muted">' +
      (data.disclaimerTitle ? '<p class="font-medium text-ink-soft">' + esc(data.disclaimerTitle) + "</p>" : "") +
      '<div class="mt-2 space-y-2">' + paragraphs(data.disclaimer, "") + "</div>" +
      "</div>" +
      '<button type="button" data-action="restart" class="' + TEXT_LINK + '">' + esc(copy.retakeLabel) + "</button>"
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
    } else if (action === "safety") {
      stage = CONCERNS.indexOf(trigger.getAttribute("data-value")) >= 0 ? "safe-exit" : "result";
    } else if (action === "results") {
      // Only offered when the instrument allows it; never for the RRA.
      if (!data.safety.bypassResults) stage = "result";
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
