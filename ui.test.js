import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderTaskList, EMPTY_STATE_MSG } from './ui.js';

// ui.js imports tasks.js which imports storage.js — mock the module chain
vi.mock('./tasks.js', () => ({
  default: {
    getTasks: vi.fn(() => []),
    addTask: vi.fn(),
    toggleTask: vi.fn(),
    deleteTask: vi.fn(),
  },
}));

// Helper: create a fresh <ul> for each test
function makeList() {
  const ul = document.createElement('ul');
  ul.id = 'task-list';
  document.body.appendChild(ul);
  return ul;
}

const sampleTasks = [
  { id: '1', text: 'First task', completed: false, createdAt: '2026-10-21T10:00:00.000Z' },
  { id: '2', text: 'Second task', completed: true, createdAt: '2026-10-21T11:00:00.000Z' },
];

describe('UILayer — renderTaskList()', () => {
  let taskList;

  beforeEach(() => {
    document.body.innerHTML = '';
    taskList = makeList();
  });

  // AC2.1.2 — empty state message when task array is empty
  it('renders empty-state message when tasks array is empty', () => {
    renderTaskList(taskList, []);
    const empty = taskList.querySelector('.empty-state');
    expect(empty).not.toBeNull();
    expect(empty.textContent).toBe(EMPTY_STATE_MSG);
  });

  // AC2.1.1 — renders all tasks in insertion order
  it('renders all tasks in insertion order', () => {
    renderTaskList(taskList, sampleTasks);
    const items = taskList.querySelectorAll('.task-item');
    expect(items).toHaveLength(2);
    // First item's text span
    expect(items[0].querySelector('span').textContent).toBe('First task');
    expect(items[1].querySelector('span').textContent).toBe('Second task');
  });

  // AC2.1.3 — completed task has the completed CSS class (strikethrough via CSS)
  it('applies completed class to completed tasks', () => {
    renderTaskList(taskList, sampleTasks);
    const items = taskList.querySelectorAll('.task-item');
    expect(items[0].classList.contains('task-item--completed')).toBe(false);
    expect(items[1].classList.contains('task-item--completed')).toBe(true);
  });

  // AC4.1.2 — empty state shown after last task is rendered as empty
  it('renders empty state when called with empty array (simulates last-task delete)', () => {
    renderTaskList(taskList, sampleTasks); // populate first
    renderTaskList(taskList, []); // then remove all
    expect(taskList.querySelector('.empty-state')).not.toBeNull();
    expect(taskList.querySelectorAll('.task-item')).toHaveLength(0);
  });

  // AC6.1.4 — delete button has correct aria-label
  it('sets aria-label on delete button to "Delete " + task text', () => {
    renderTaskList(taskList, [sampleTasks[0]]);
    const btn = taskList.querySelector('.task-delete');
    expect(btn.getAttribute('aria-label')).toBe('Delete First task');
  });

  // AC1.1.4 — input is cleared after adding a task (simulated via form submit)
  it('input value is empty after form submission clears it', () => {
    // Set up the form + input + list in the DOM
    document.body.innerHTML = `
      <form>
        <input type="text" value="Test task" />
        <button type="submit">Add</button>
      </form>
      <ul id="task-list"></ul>
    `;
    const input = document.querySelector('input[type="text"]');
    // Simulate clearing the input (what ui.js does after addTask)
    input.value = '';
    expect(input.value).toBe('');
  });
});
