/**
 * StorageLayer — abstracts persistence behind a simple load/save interface.
 * Transparently uses localStorage or an in-memory fallback when localStorage
 * is unavailable (private browsing, quota exceeded, SecurityError).
 */
class StorageLayer {
  #inMemory = false;
  #memoryStore = [];
  #key = 'tasks';

  constructor() {
    // Detect localStorage availability once at construction time.
    try {
      localStorage.setItem('__aidlc_test__', '1');
      localStorage.removeItem('__aidlc_test__');
    } catch {
      this.#inMemory = true;
    }
  }

  /**
   * Load the task array from localStorage (or in-memory store).
   * @returns {Array} The stored task array, or [] if nothing is stored.
   */
  load() {
    if (this.#inMemory) {
      return [...this.#memoryStore];
    }
    try {
      const raw = localStorage.getItem(this.#key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  /**
   * Save the task array to localStorage (or in-memory store).
   * @param {Array} tasks - The full task array to persist.
   */
  save(tasks) {
    if (this.#inMemory) {
      this.#memoryStore = [...tasks];
      return;
    }
    try {
      localStorage.setItem(this.#key, JSON.stringify(tasks));
    } catch {
      // If a mid-session quota error occurs, fall back to in-memory.
      this.#inMemory = true;
      this.#memoryStore = [...tasks];
    }
  }
}

export default new StorageLayer();
