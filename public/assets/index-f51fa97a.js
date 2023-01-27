(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&d(r)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();let h;const w=new Uint8Array(16);function T(){if(!h&&(h=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!h))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return h(w)}const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function v(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}const C=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),f={randomUUID:C};function S(e,t,i){if(f.randomUUID&&!t&&!e)return f.randomUUID();e=e||{};const d=e.random||(e.rng||T)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){i=i||0;for(let o=0;o<16;++o)t[i+o]=d[o];return t}return v(d)}class L{constructor(t){this.id=S(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"completed",Pending:"pending"},l={todos:[],filter:a.All},E=()=>{y(),console.log("InitStore 🥑")},y=()=>{if(!localStorage.getItem("state"))return;const{todos:e,filter:t}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},m=()=>{localStorage.setItem("state",JSON.stringify(l))},k=(e=a.All)=>{switch(e){case a.All:return[...l.todos];case a.Completed:return l.todos.filter(t=>t.done);case a.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},A=e=>{if(!e)throw new Error("Description is required");l.todos.push(new L(e)),m()},I=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),m()},U=e=>{l.todos=l.todos.filter(t=>t.id!==e),m()},x=()=>{l.todos=l.todos.filter(e=>!e.done),m()},P=(e=a.All)=>{if(Object.entries(a).includes(e))throw new Error(`Filter ${e} is not valid`);l.filter=e,m()},q=()=>l.filter,c={addTodo:A,deleteCompleted:x,deleteTodo:U,getCurrentFilter:q,getTodos:k,initStore:E,loadStore:y,setFilter:P,toggleTodo:I},F=`<section class="todoapp">\r
  <header class="header">\r
    <h1>Tareas</h1>\r
    <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
  </header>\r
\r
  <!-- This section should be hidden by default and shown when there are todos -->\r
  <section class="main">\r
    <input id="toggle-all" class="toggle-all" type="checkbox">\r
    <label for="toggle-all">Mark all as complete</label>\r
    <ul class="todo-list">\r
      <!-- These are here just to show the structure of the list items -->\r
      <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
      <!-- <li class="completed" data-id="abc">\r
        <div class="view">\r
          <input class="toggle" type="checkbox" checked>\r
          <label>Probar JavaScript</label>\r
          <button class="destroy"></button>\r
        </div>\r
        <input class="edit" value="Create a TodoMVC template">\r
      </li> -->\r
      <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
    </ul>\r
  </section>\r
\r
  <!-- This footer should hidden by default and shown when there are todos -->\r
  <footer class="footer">\r
    <!-- This should be "0 items left" by default -->\r
    <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
    <!-- Remove this if you don't implement routing -->\r
    <ul class="filters">\r
      <li>\r
        <a class="selected filtro" id="all">Todos</a>\r
      </li>\r
      <li>\r
        <a class="filtro" id="pending">Pendientes</a>\r
      </li>\r
      <li>\r
        <a class="filtro" id="completed">Completados</a>\r
      </li>\r
    </ul>\r
    <!-- Hidden if no completed items are left ↓ -->\r
    <button class="clear-completed">Borrar completados</button>\r
  </footer>\r
</section>\r
\r
\r
<footer class="info">\r
  <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
  <!-- Change this out with your name and url ↓ -->\r
  <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
  <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`,M=e=>{if(!e)throw new Error("Todo object is required");const{done:t,description:i,id:d}=e,o=`
  <div class="view">
      <input class="toggle" type="checkbox" ${t?"checked":""}>
      <label>${i}</label>
      <button class="destroy"></button>
    </div>
  <input class="edit" value="Create a TodoMVC template">`,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",d),t&&n.classList.add("completed"),n};let g;const D=(e,t=[])=>{if(g||(g=document.querySelector(e)),!e)throw new Error(`elementId ${e} not found`);g.innerHTML="",t.forEach(i=>{g.append(M(i))})},p={ClearCompleted:".clear-completed",NewTodoInput:"#new-todo-input",PendingCount:"#pending-count",TodoFilters:".filtro",TodoList:".todo-list"},N=e=>{const t=()=>{const r=document.querySelector(p.PendingCount),u=c.getTodos(c.getCurrentFilter());D(p.TodoList,u),r.textContent=c.getTodos(a.Pending).length};(()=>{const r=document.createElement("div");r.innerHTML=F,document.querySelector(e).append(r),t()})();const i=document.querySelector(p.NewTodoInput),d=document.querySelector(p.TodoList),o=document.querySelector(p.ClearCompleted),n=document.querySelectorAll(p.TodoFilters);i.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(c.addTodo(r.target.value),t(),r.target.value="")}),d.addEventListener("click",r=>{const u=r.target.closest("[data-id]");c.toggleTodo(u.getAttribute("data-id")),r.target.className==="destroy"&&c.deleteTodo(u.getAttribute("data-id")),t()}),o.addEventListener("click",()=>{c.deleteCompleted(),t()}),n.forEach(r=>{r.addEventListener("click",u=>{switch(n.forEach(b=>b.classList.remove("selected")),u.target.classList.add("selected"),u.target.id){case"all":c.setFilter(a.All);break;case"pending":c.setFilter(a.Pending);break;case"completed":c.setFilter(a.Completed);break;default:throw new Error(`Selected filter ${u.target.text} is not valid`)}t()})})};c.initStore();N("#app");
