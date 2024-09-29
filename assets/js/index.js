const listaTareas = document.getElementById("lista-tareas");
const form = document.getElementById("form");
const btnAgregar = document.getElementById("btn");
const input = document.getElementById("input");
const label = document.querySelector(".form-label");
const totalTareas = document.getElementById("total-tareas");
const totalRealizadas = document.getElementById("total-realizadas");

const tareas = [];

const agregarTarea = () => {
  if (input.value.trim()) {
    const newTarea = {
      id: Date.now(),
      descripcion: input.value.trim(),
      realizada: false,
    };
    tareas.push(newTarea);
    inicialTareas();
    label.innerHTML = "";
  } else {
    label.innerHTML = "Debes ingresar el nombre de la tarea";
  }
  form.reset();
  contabilizarTareas();
};

btnAgregar.addEventListener("click", agregarTarea);

const inicialTareas = () => {
  let template = "";
  for (const tarea of tareas) {
    template += crearElementoTarea(tarea);
  }
  listaTareas.innerHTML = template;
};

const crearElementoTarea = (tarea) => {
  return `
    <li style="display: flex">
        <div>${tarea.descripcion}</div>
        <div>
            <input type="checkbox" ${
              tarea.realizada ? "checked" : ""
            } onclick="realizadaTarea(${tarea.id})"/>
            <button onclick="borrarTarea(${tarea.id})">x</button>
        </div>
    </li>`;
};

const realizadaTarea = (id) => {
  const indexTarea = tareas.findIndex((tarea) => tarea.id === id);
  tareas[indexTarea].realizada = tareas[indexTarea].realizada ? false : true;
  contabilizarTareas();
};

const borrarTarea = (id) => {
  const indexTarea = tareas.findIndex((tarea) => tarea.id === id);
  tareas.splice(indexTarea, 1);
  inicialTareas();
  contabilizarTareas();
};

const contabilizarTareas = () => {
  const realizadas = tareas.filter((t) => t.realizada).length;
  totalRealizadas.innerHTML = realizadas;
  const total = tareas.length;
  totalTareas.innerHTML = total;
};
