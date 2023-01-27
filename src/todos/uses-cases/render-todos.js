import { Todo } from "../../stores/models/todo.model";
import { createTodoHTML } from "./create-todo-html";

let element;
/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = []) => {
  if (!element) {
    element = document.querySelector(elementId);
  }
  if (!elementId) {
    throw new Error(`elementId ${elementId} not found`);
  }

  element.innerHTML = '';
  todos.forEach(todo => {
    element.append(createTodoHTML(todo))
  });
}