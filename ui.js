import taskDomain from './tasks.js';

/**
 * UILayer — renders the task list and handles all DOM events.
 * Translates user actions into calls on TaskDomain, then re-renders.
 *
 * Security: all user-supplied text is written via textContent (never innerHTML).
 * Events: all listeners use addEventListener (no on* attributes in HTML).
 */

const EMPTY_STATE_MSG = 'No tasks yet. Add one above.';

/**
 * Render the task list from the current task array.
 * @param {HTMLElement} taskList - The <ul> element.
 * @param {Array} tasks
 */
function renderTaskList(taskList, tasks) {
  // Clear existing children safely (avoids innerHTML = '' with potential XSS
  // concerns on future changes; replaceChildren is idiomatic).
  taskList.replaceChildren();

  if (tasks.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = EMPTY_STATE_MSG; // textContent — safe
    taskList.appendChild(empty);
    return;
  }

  for (const task of tasks) {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' task-item--completed' : '');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.dataset.taskId = task.id;
    checkbox.setAttribute('aria-label', 'Mark complete'); // supplemental label

    // Label — wraps checkbox so clicking label also toggles
    const label = document.createElement('label');
    label.className = 'task-label';
    label.appendChild(checkbox);

    const span = document.createElement('span');
    span.textContent = task.text; // textContent — never innerHTML
    label.appendChild(span);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'task-delete';
    deleteBtn.dataset.taskId = task.id;
    // aria-label names the specific task — dynamic, set via setAttribute
    deleteBtn.setAttribute('aria-label', 'Delete ' + task.text);
    deleteBtn.textContent = '✕';

    li.appendChild(label);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
}

/**
 * Find the next focusable element after deletion, or fall back to the input.
 * @param {string} deletedId
 * @param {HTMLElement} taskList
 * @param {HTMLElement} input
 * @returns {HTMLElement}
 */
function nextFocusAfterDelete(deletedId, taskList, input) {
  const items = [...taskList.querySelectorAll('.task-item')];
  const idx = items.findIndex((li) =>
    li.querySelector('[data-task-id="' + deletedId + '"]')
  );
  // Try the next item, then the previous, then fall back to input
  const next = items[idx + 1] || items[idx - 1];
  if (next) {
    const btn = next.querySelector('.task-delete');
    if (btn) return btn;
  }
  return input;
}

/**
 * Initialise the UI once the DOM is ready.
 */
function init() {
  const form = document.querySelector('form');
  const input = document.querySelector('input[type="text"]');
  const taskList = document.getElementById('task-list');

  if (!form || !input || !taskList) return; // Guard for non-app contexts (tests)

  // Initial render
  renderTaskList(taskList, taskDomain.getTasks());

  // Add task on form submit (Enter key or Add button click)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    taskDomain.addTask(input.value);
    input.value = '';
    renderTaskList(taskList, taskDomain.getTasks());
    input.focus();
  });

  // Event delegation on task list for checkbox and delete button clicks
  taskList.addEventListener('click', (e) => {
    const checkbox = e.target.closest('input[type="checkbox"][data-task-id]');
    const deleteBtn = e.target.closest('button.task-delete[data-task-id]');

    if (checkbox) {
      taskDomain.toggleTask(checkbox.dataset.taskId);
      renderTaskList(taskList, taskDomain.getTasks());
    }

    if (deleteBtn) {
      const focusTarget = nextFocusAfterDelete(deleteBtn.dataset.taskId, taskList, input);
      taskDomain.deleteTask(deleteBtn.dataset.taskId);
      renderTaskList(taskList, taskDomain.getTasks());
      focusTarget.focus();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);

// Export for testing
export { renderTaskList, init, EMPTY_STATE_MSG };
