import storage from './storage.js';

/**
 * TaskDomain — owns the in-memory task array and enforces all business rules
 * for creating, toggling, and deleting tasks. Delegates persistence to
 * StorageLayer after every mutation.
 */
class TaskDomain {
  #tasks = [];
  #storage;

  constructor(storageLayer) {
    this.#storage = storageLayer;
    this.#tasks = this.#storage.load();
  }

  /**
   * Generate a unique task ID.
   * @returns {string}
   */
  #generateId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return Date.now().toString();
  }

  /**
   * Add a new task. Silently ignores empty or whitespace-only input.
   * @param {string} text - The task description.
   */
  addTask(text) {
    const trimmed = typeof text === 'string' ? text.trim() : '';
    if (!trimmed) return;

    const task = {
      id: this.#generateId(),
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this.#tasks.push(task);
    this.#storage.save(this.#tasks);
  }

  /**
   * Toggle the completed status of a task by ID.
   * @param {string} id
   */
  toggleTask(id) {
    const task = this.#tasks.find((t) => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    this.#storage.save(this.#tasks);
  }

  /**
   * Delete a task by ID.
   * @param {string} id
   */
  deleteTask(id) {
    this.#tasks = this.#tasks.filter((t) => t.id !== id);
    this.#storage.save(this.#tasks);
  }

  /**
   * Return a shallow copy of the task array in insertion order (oldest first).
   * @returns {Array}
   */
  getTasks() {
    return [...this.#tasks];
  }
}

export default new TaskDomain(storage);
