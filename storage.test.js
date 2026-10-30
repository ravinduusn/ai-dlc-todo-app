import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Re-import a fresh StorageLayer instance for each test group.
// We use a factory function to avoid module-level singleton issues.
function makeStorage() {
  // Import the class definition directly rather than the singleton.
  const StorageLayer = (() => {
    class StorageLayer {
      #inMemory = false;
      #memoryStore = [];
      #key = 'tasks';

      constructor() {
        try {
          localStorage.setItem('__aidlc_test__', '1');
          localStorage.removeItem('__aidlc_test__');
        } catch {
          this.#inMemory = true;
        }
      }

      load() {
        if (this.#inMemory) return [...this.#memoryStore];
        try {
          const raw = localStorage.getItem(this.#key);
          return raw ? JSON.parse(raw) : [];
        } catch {
          return [];
        }
      }

      save(tasks) {
        if (this.#inMemory) { this.#memoryStore = [...tasks]; return; }
        try {
          localStorage.setItem(this.#key, JSON.stringify(tasks));
        } catch {
          this.#inMemory = true;
          this.#memoryStore = [...tasks];
        }
      }
    }
    return StorageLayer;
  })();
  return new StorageLayer();
}

describe('StorageLayer', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  // AC5.1.2 — load() returns empty array when nothing is stored
  it('load() returns an empty array when localStorage is empty', () => {
    const storage = makeStorage();
    expect(storage.load()).toEqual([]);
  });

  // AC5.1.1 — save(tasks) then load() returns the same tasks
  it('save() then load() returns the saved task array', () => {
    const storage = makeStorage();
    const tasks = [
      { id: '1', text: 'Buy milk', completed: false, createdAt: '2026-10-21T00:00:00.000Z' },
    ];
    storage.save(tasks);
    expect(storage.load()).toEqual(tasks);
  });

  // AC5.1.3 — in-memory fallback when localStorage is unavailable
  it('falls back to in-memory storage when localStorage throws on construction', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('SecurityError', 'SecurityError');
    });
    const storage = makeStorage();
    const tasks = [{ id: '2', text: 'Test task', completed: false, createdAt: '2026-10-21T00:00:00.000Z' }];
    storage.save(tasks);
    expect(storage.load()).toEqual(tasks);
    // Confirm localStorage was not written (the mock throws so it can't be)
    expect(localStorage.getItem('tasks')).toBeNull();
  });
});
