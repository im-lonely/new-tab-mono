let shortcutArray = [];

if (typeof Storage !== "undefined") {
  if (localStorage.getItem("mono-shortcuts") === null) {
    localStorage.setItem("mono-shortcuts", JSON.stringify(shortcutArray));
  } else {
    JSON.parse(localStorage.getItem("mono-shortcuts")).forEach((shortcut) => {
      shortcutArray.push(shortcut);
      add(shortcut.name, shortcut.url);
    });
    if (shortcutArray.length >= 8)
      document.querySelector(".shortcut-add").style.display = "none";
  }
}

document.querySelector(".none").addEventListener("click", function (e) {
  document.querySelector(".shortcut-modal").style.display = "grid";
});

document
  .querySelector(".shortcut-modal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      this.style.display = "none";
      document.querySelector(".invalid").style.display = "none";
    }
  });

document.getElementById("add").addEventListener("click", function (e) {
  const url = document.querySelector(".shortcut-form input#url");
  const name = document.querySelector(".shortcut-form input#name");

  if (
    !/https?:\/\/(?:www\.|(?!www)[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
      url.value
    ) ||
    !name.value
  )
    return (document.querySelector(".invalid").style.display = "initial");

  add(name.value, url.value);

  shortcutArray.push({
    name: name.value,
    url: url.value,
  });

  localStorage.setItem("mono-shortcuts", JSON.stringify(shortcutArray));

  if (shortcutArray.length >= 8)
    document.querySelector(".shortcut-add").style.display = "none";

  url.value = name.value = "";
  document.querySelector(".shortcut-modal").style.display = "none";
  document.querySelector(".invalid").style.display = "none";
});

const greeting = document.getElementById("greeting");
const greetings = [
  "hello again!",
  "how are you today?",
  "hi, anything new?",
  "hey, what's up?",
  "good to see you!",
  "it's been a while",
  "yo, nice to meet you!",
];
greeting.innerText = greetings[Math.floor(Math.random() * greetings.length)];

const time = document.getElementById("time");
time.innerText = new Date().toLocaleTimeString();
setInterval(() => {
  time.innerText = new Date().toLocaleTimeString();
}, 1000);

function add(name, url) {
  const a = document.createElement("a");
  a.id = name + url;
  a.href = url;
  const c = document.createElement("div");
  c.classList.add("shortcut-container");
  const s = document.createElement("div");
  s.classList.add("shortcut");
  const i = document.createElement("img");
  i.src = `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`;
  s.appendChild(i);
  c.appendChild(s);
  const t = document.createElement("h4");
  t.classList.add("shortcut-name");
  t.innerText = name;
  c.appendChild(t);
  a.appendChild(c);
  a.addEventListener("contextmenu", function (e) {
    if (e.target === s || e.target === i) {
      e.preventDefault();
      shortcutArray = shortcutArray.filter((s) => this.id !== s.name + s.url);
      localStorage.setItem("mono-shortcuts", JSON.stringify(shortcutArray));
      if (shortcutArray.length <= 7)
        document.querySelector(".shortcut-add").style.display = "flex";
      this.remove();
    }
  });
  a.addEventListener("click", function (e) {
    if (e.target !== s && e.target !== i) e.preventDefault();
  });
  document
    .querySelector(".shortcut-grid")
    .insertBefore(a, document.querySelector(".shortcut-add"));
  return a;
}
