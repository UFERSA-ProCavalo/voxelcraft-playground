# Debug: Unlock All Challenges

## Quick Unlock/Lock for All Challenges

You can unlock or re-lock all challenges for development or demo purposes using the following global helper in the browser console:

```js
// Unlock all challenges and reload the page
window.debug_unlock_all(true);

// Restore normal progression and reload the page
window.debug_unlock_all(false);
```

This will set or remove a localStorage flag (`UNLOCK_ALL_CHALLENGES`) and reload the page automatically.

## Manual (Advanced)

If you want to do it manually:

```js
// Unlock all challenges (manual)
localStorage.setItem("UNLOCK_ALL_CHALLENGES", "1");
location.reload();

// Restore normal progression (manual)
localStorage.removeItem("UNLOCK_ALL_CHALLENGES");
location.reload();
```

---

> The old `window.__UNLOCK_ALL_CHALLENGES__` flag is no longer used. Use the methods above for all future debugging.
