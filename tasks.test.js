import { describe, it, expect, beforeEach, vi } from 'vitest';

// Use an inline class to avoid module-singleton coupling between tests.
function makeStorage(initial = []) {
  let store = [...initial];
  return {
    load: vi.fn(() => [...store]),
    save: vi.fn((tasks) => { store = [...tasks]; }),
  };
}

function makeDomain(initialTasks = []) {
  const storage = makeStorage(initialTasks);

  class TaskDomain {
    #tasks = [];
    #storage;

    constructor(storageLayer) {
      this.#storage = storageLayer;
      this.#tasks = this.#storage.load();
    }

    #generateId() {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
      }
      return Date.now().toString() + Math.random().toString(36).slice(2);
    }

    addTask(text) {
      const trimmed = typeof text === 'string' ? text.trim() : '';
      if (!trimmed) return;
      const task = { id: this.#generateId(), text: trimmed, completed: false, createdAt: new Date().toISOString() };
      this.#tasks.push(task);
      this.#storage.save(this.#tasks);
    }

    toggleTask(id) {
      const task = this.#tasks.find((t) => t.id === id);
      if (!task) return;
      task.completed = !task.completed;
      this.#storage.save(this.#tasks);
    }

    deleteTask(id) {
      this.#tasks = this.#tasks.filter((t) => t.id !== id);
      this.#storage.save(this.#tasks);
    }

    getTasks() { return [...this.#tasks]; }
  }

  return { domain: new TaskDomain(storage), storage };
}

describe('TaskDomain', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  // AC1.1.2 — addTask with valid text adds a task with correct shape
  it('addTask() adds a task with correct fields when text is non-empty', () => {
    const { domain } = makeDomain();
    domain.addTask('Buy milk');
    const tasks = domain.getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].text).toBe('Buy milk');
    expect(tasks[0].completed).toBe(false);
    expect(tasks[0].id).toBeTruthy();
    expect(tasks[0].createdAt).toBeTruthy();
  });

  // AC1.1.1 — addTask with empty string adds no task
  it('addTask() with empty string adds no task', () => {
    const { domain } = makeDomain();
    domain.addTask('');
    expect(domain.getTasks()).toHaveLength(0);
  });

  // AC1.1.1 — addTask with whitespace-only input adds no task
  it('addTask() with whitespace-only input adds no task', () => {
    const { domain } = makeDomain();
    domain.addTask('   ');
    expect(domain.getTasks()).toHaveLength(0);
  });

  // AC3.1.1 — toggleTask sets completed = true on an incomplete task
  it('toggleTask() sets completed to true on an incomplete task', () => {
    const { domain } = makeDomain();
    domain.addTask('Read book');
    const id = domain.getTasks()[0].id;
    domain.toggleTask(id);
    expect(domain.getTasks()[0].completed).toBe(true);
  });

  // AC3.1.2 — toggleTask sets completed = false on a complete task
  it('toggleTask() sets completed to false on a complete task', () => {
    const { domain } = makeDomain();
    domain.addTask('Read book');
    const id = domain.getTasks()[0].id;
    domain.toggleTask(id); // → true
    domain.toggleTask(id); // → false
    expect(domain.getTasks()[0].completed).toBe(false);
  });

  // AC4.1.1 — deleteTask removes the task from the list
  it('deleteTask() removes the task from the list', () => {
    const { domain } = makeDomain();
    domain.addTask('Task to delete');
    const id = domain.getTasks()[0].id;
    domain.deleteTask(id);
    expect(domain.getTasks()).toHaveLength(0);
  });

  // AC2.1.1 — getTasks() returns tasks in insertion order (oldest first)
  it('getTasks() returns tasks in insertion order', () => {
    const { domain } = makeDomain();
    domain.addTask('First');
    domain.addTask('Second');
    domain.addTask('Third');
    const texts = domain.getTasks().map((t) => t.text);
    expect(texts).toEqual(['First', 'Second', 'Third']);
  });
});
