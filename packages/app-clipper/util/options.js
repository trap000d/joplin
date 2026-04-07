async function saveOptions(e) {
  e.preventDefault();
  await browser.storage.sync.set({
    color: document.querySelector("#color").value
  });
}

async function restoreOptions() {
  try {
    let res = await browser.storage.managed.get('color');
    document.querySelector("#managed-color").innerText = res.color || "Could not find 'color' in managed storage.";
  } catch(error) {
    if (error.message === "Managed storage manifest not found") {
      document.querySelector("#managed-color").innerText = "Managed storage manifest not found. Make sure it's stored in an appropriate location.";
    } else {
      document.querySelector("#managed-color").innerText = `Unexpected managed storage error: ${error.message}`;
    }
  }

  res = await browser.storage.sync.get('color');
  document.querySelector("#color").value = res.color || 'Firefox red';
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
