// Map our commands to the classList methods
const fnmap = {
  toggle: "toggle",
  show: "add",
  hide: "remove"
};

const collapse = (selector, cmd) => {
  const targets = Array.from(document.querySelectorAll(selector));
  targets.forEach(target => {
    target.classList[fnmap[cmd]]("show");
  });
};

// Grab all trigger elements on the page
const triggers = Array.from(
  document.querySelectorAll('[data-toggle="collapse"]')
);

// Listen for click events, but only on our triggers
window.addEventListener(
  "click",
  ev => {
    const element = ev.target;
    if (triggers.includes(element)) {
      const selector = element.getAttribute("data-target");
      collapse(selector, "toggle");
    }
  },
  false
);
