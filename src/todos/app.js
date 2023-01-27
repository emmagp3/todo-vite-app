import todoStore, { Filters } from '../stores/todo.store';
import html from './app.html?raw';
import { renderTodos } from './uses-cases';

const ElementIds = {
  ClearCompleted: '.clear-completed',
  NewTodoInput: '#new-todo-input',
  PendingCount: '#pending-count',
  TodoFilters: '.filtro',
  TodoList: '.todo-list',
}

export const App = (elementId) => {
  const displayTodos = () => {
    const strongPendingCount = document.querySelector(ElementIds.PendingCount);
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIds.TodoList, todos);
    strongPendingCount.textContent = todoStore.getTodos(Filters.Pending).length;
  }

  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
  const todoListUl = document.querySelector(ElementIds.TodoList);
  const clearCompletedButton = document.querySelector(ElementIds.ClearCompleted);
  const filtersUl = document.querySelectorAll(ElementIds.TodoFilters);

  newDescriptionInput.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = '';
  });

  todoListUl.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    todoStore.toggleTodo(element.getAttribute('data-id'));
    if (event.target.className === "destroy") {
      todoStore.deleteTodo(element.getAttribute('data-id'));
    }
    displayTodos();
  });

  clearCompletedButton.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersUl.forEach((element) => {
    element.addEventListener('click', (element) => {
      filtersUl.forEach(e => e.classList.remove('selected'));
      element.target.classList.add('selected');

      switch (element.target.id) {
        case 'all':
          todoStore.setFilter(Filters.All);
          break;
        case 'pending':
          todoStore.setFilter(Filters.Pending);
          break;
        case 'completed':
          todoStore.setFilter(Filters.Completed);
          break;
        default:
          throw new Error(`Selected filter ${element.target.text} is not valid`);
      }

      displayTodos();
    })
  })
};

