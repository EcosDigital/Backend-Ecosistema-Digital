import { Router } from "express";
import {
  createProjectRequest,
  createTaskRequest,
  deleteProjectRequest,
  deleteTaskRequest,
  getEstadoTareasRequest,
  getProjectRequest,
  getTaskRequest,
  getTipoProjectRequest,
  getTipoTareasRequest,
  getTotalProjectsRequest,
  getTotalTaskRequest,
  updateProjectRequest,
  updateStatusBackTaskRequest,
  updateStatusTaskRequest,
  updateTaskRequest,
} from "../controllers/controllers.js";

// imporatar controladores

const router = Router();

//rutas de trabajo
router.post("/createProject", createProjectRequest);

router.put("/updateProject/:id", updateProjectRequest);

router.delete("/deleteProject/:id", deleteProjectRequest);

router.get("/getProject/:id", getProjectRequest);

router.get("/getTotalProjects", getTotalProjectsRequest)

//rutas para informacion de referencia

router.get("/getTipoProject", getTipoProjectRequest)

router.get("/getTipoTareas", getTipoTareasRequest)

router.get("/getEstadoTareas", getEstadoTareasRequest)

//rutas para gestionar tareas

router.post("/createTask/:id_project", createTaskRequest)

router.put("/updateTask/:id_project", updateTaskRequest)

router.delete("/deleteTask/:id_project", deleteTaskRequest)

router.get("/getTask/:id", getTaskRequest)

router.get("/getTotalTasks/:id_project", getTotalTaskRequest)

router.put("/updateStatusTask/:id", updateStatusTaskRequest)

router.put("/updateStatusBack/:id", updateStatusBackTaskRequest)

export default router;
