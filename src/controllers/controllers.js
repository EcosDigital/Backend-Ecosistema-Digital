import { pool } from "../db.js";

/**RUTAS PARA GESTIONAR PROYECTOS */

export const createProjectRequest = async (req, res) => {
  //obetener datos de reqbody
  const { nombre, id_estado, id_tipo_proyecto } = req.body;
  //validar existencia por nombre
  const validate = await pool.query(
    "select * from cfg_proyectos where nombre = $1",
    [nombre]
  );
  if (validate.rows.length > 0) {
    return res
      .status(400)
      .json({ mensaje: "Ya existe un registro con este nombre" });
  }

  //insertar registro
  try {
    await pool.query(
      "INSERT INTO cfg_proyectos (nombre, fecha_inicio, id_estado, id_tipo_proyecto) VALUES ($1, $2, $3, $4) ",
      [nombre, new Date(), id_estado, parseInt(id_tipo_proyecto, 10)]
    );
    return res.status(200).json({ mensaje: "Registro exitoso!" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error inesperado!" });
  }
};

export const updateProjectRequest = async (req, res) => {
  try {
    //obtener datos de req body
    const { nombre, id_estado, id_tipo_proyecto } = req.body;

    const id_registro = req.params.id;

    if (isNaN(id_registro)) {
      // Responde con un error si el ID no es un numero valido
      return res
        .status(400)
        .json({ error: "El ID proporcionado no es un número válido." });
    }

    //validar si existe el registro antes de actualizar
    const validateRegistro = await pool.query(
      "select * from cfg_proyectos where id = $1",
      [id_registro]
    );

    if (validateRegistro.rows <= 0) {
      return res.status(404).json({ mensaje: "Registro no encontrado!" });
    }

    //actualizar registro
    await pool.query(
      "update cfg_proyectos set nombre = $1, id_estado = $2, id_tipo_proyecto = $3 where id = $4",
      [nombre, id_estado, parseInt(id_tipo_proyecto, 10), id_registro]
    );

    return res
      .status(200)
      .json({ mensaje: "Registro acutualizado con exito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Hubo un error inesperado" });
  }
};

export const deleteProjectRequest = async (req, res) => {
  try {
    const id_registro = req.params.id;
    await pool.query("delete from cfg_proyectos where id = $1", [id_registro]);

    return res.status(200).json({ mensaje: "Registro eliminado con exito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Hubo un error inesperado" });
  }
};

export const getProjectRequest = async (req, res) => {
  try {
    const id_registro = req.params.id;

    const results = await pool.query(
      "select * from cfg_proyectos where id = $1",
      [id_registro]
    );

    if (results.rows.length > 0) {
      return res.status(200).json(results.rows);
    }

    return res.status(400).json({ mensaje: "No se encontraon registros" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error de servidores!" });
  }
};

export const getTotalProjectsRequest = async (req, res) => {
  try {
    const results = await pool.query(
      "select p.id, p.nombre, tp.nombre as tipo, p.id_estado, p.fecha_inicio from cfg_proyectos p join ref_tipo_proyectos tp on p.id_tipo_proyecto = tp.id order by p.id"
    );
    if (results.rows.length > 0) {
      return res.status(200).json(results.rows);
    }
    return res.status(400).json({ mensaje: "No hay proyectos por mostrar" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error de servidor" });
  }
};

/**RUTAS PARA REFERENCIAS GENERA.ES */

export const getTipoProjectRequest = async (req, res) => {
  try {
    const results = await pool.query("select * from ref_tipo_proyectos");
    if (results.rows.length > 0) {
      return res.status(200).json(results.rows);
    }
    return res.status(400).json({ mensaje: "No hay informacion por mostrar" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error de servidor" });
  }
};

export const getTipoTareasRequest = async (req, res) => {
  try {
    const results = await pool.query("select * from ref_tipo_tareas");
    if (results.rows.length > 0) {
      return res.status(200).json(results.rows);
    }
    return res.status(400).json({ mensaje: "No hay informacion por mostrar" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error de servidor" });
  }
};

export const getEstadoTareasRequest = async (req, res) => {
  try {
    const results = await pool.query("select * from ref_estado_tareas");
    if (results.rows.length > 0) {
      return res.status(200).json(results.rows);
    }
    return res.status(400).json({ mensaje: "No hay informacion por mostrar" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error de servidor" });
  }
};

/**RUTAS PARA GESTIONAR TAREAS */

export const createTaskRequest = async (req, res) => {
  try {
    //obtener datos de req body
    const { titulo, descripcion, id_tipo_tarea } =
      req.body;
    const id_proyecto = req.params.id_project;
    //insertar registro
    await pool.query(
      "insert into cfg_tareas(id_proyecto, titulo_tarea, descripcion, id_tipo_tarea, id_estado_tarea, fecha_creacion, fecha_modificacion) values($1, $2, $3, $4, $5, $6, $7)",
      [
        id_proyecto,
        titulo,
        descripcion,
        parseInt(id_tipo_tarea,10),
        1,
        new Date(),
        new Date(),
      ]
    );

    return res.status(200).json({ mensaje: "Registro almacenado con exito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error de servidor!" });
  }
};

export const updateTaskRequest = async (req, res) => {
  try {
    //obtener datos de req body
    const { titulo, descripcion, id_tipo_tarea } = req.body;

    const id_registro = req.params.id_project;

    if (isNaN(id_registro)) {
      // Responde con un error si el ID no es un numero valido
      return res
        .status(400)
        .json({ error: "El ID proporcionado no es un número válido." });
    }

    //validar si existe el registro
    const results = await pool.query("select * from cfg_tareas where id = $1", [
      id_registro,
    ]);
    if (results.rows <= 0) {
      return res.status(400).json({ mensaje: "No se enconraron resultados!" });
    }

    //update for registro

    await pool.query(
      "update cfg_tareas set titulo_tarea = $1, descripcion = $2, id_tipo_tarea = $3,fecha_modificacion = $4 where id = $5",
      [titulo, descripcion, parseInt(id_tipo_tarea,10), new Date(), id_registro]
    );

    return res.status(200).json({ mensaje: "Registro actualizado con exito" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error de servidor" });
  }
};

export const deleteTaskRequest = async (req, res) => {
  try {
    const id_registro = req.params.id_project;
    await pool.query("delete from cfg_tareas where id = $1", [id_registro]);

    return res.status(200).json({ mensaje: "Registro eliminado con exito!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Hubo un error inesperado" });
  }
};

export const getTaskRequest = async (req, res) => {
  try {
    const id_registro = req.params.id;

    const results = await pool.query("select * from cfg_tareas where id = $1", [
      id_registro,
    ]);

    if (results.rows.length > 0) {
      return res.status(200).json(results.rows);
    }

    return res.status(400).json({ mensaje: "No se encontraon registros" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error de servidores!" });
  }
};

export const getTotalTaskRequest = async (req, res) => {
  try {

    const id_registro = req.params.id_project;

    const results = await pool.query("select t.id, t.id_proyecto, t.id_estado_tarea, t.titulo_tarea, t.descripcion, tt.nombre as prioridad  from cfg_tareas t join ref_tipo_tareas tt on tt.id = t.id_tipo_tarea where t.id_proyecto = $1 order by t.id", [id_registro]);
    if (results.rows.length > 0) {
      return res.status(200).json(results.rows);
    }
    return res.status(400).json({ mensaje: "No hay proyectos por mostrar" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error de servidor" });
  }
};

export const updateStatusTaskRequest = async (req, res) => {
  try {
    const id_registro = req.params.id;

  if (isNaN(id_registro)) {
    // Responde con un error si el ID no es un numero valido
    return res
      .status(400)
      .json({ error: "El ID proporcionado no es un número válido." });
  }

  //validar si existe el registro
  const results = await pool.query('select * from cfg_tareas where id = $1', [id_registro])
  if (results.rows <= 0) {
    return res.status(400).json({ mensaje: "No se enconraron resultados!" });
  }

  const estado_actual = results.rows[0].id_estado_tarea
  const estado_futuro = 
    estado_actual === 1 ? 2 :
    estado_actual === 2 ? 3 :
    estado_actual === 3 ? 2 :
    estado_actual;

  //actualizar registro
  await pool.query('update cfg_tareas set id_estado_tarea = $1 where id = $2', [estado_futuro, id_registro])
  return res.status(200).json({ mensaje: "Cambio de estado exitoso!" });
  } catch (error) {
    return res.status(500).json('Error de servidor')
  }

}