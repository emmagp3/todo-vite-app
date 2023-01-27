import todoStore from '../stores/todo.store';
import html from './app.html?raw';
import { renderTodos } from './uses-cases';

const ElementIds = {
  ClearCompleted: '.clear-completed',
  Filters: '.filters',
  NewTodoInput: '#new-todo-input',
  TodoList: '.todo-list',
}

export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIds.TodoList, todos);
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
  const filtersButtons = document.querySelector(ElementIds.Filters);

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
};

