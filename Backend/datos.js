const db = require('./config');
const bcrypt = require('bcrypt'); 

const guardarConversacion = async (usuario_id) => {
    const sql = 'INSERT INTO vital_talk.conversaciones (usuario_id) VALUES (?)';
    const values = [usuario_id];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al guardar en la base de datos:', err);
                return reject(err);
            }

            console.log('Conversación guardada con ID:', result.insertId); 
            resolve(result.insertId); 
        });
    });
};



const guardarMensajes = (conversacion_id, usuario_id, contenido) =>{
    let contenidoParseado = JSON.stringify(contenido);
    console.log("conversacion",conversacion_id,usuario_id,contenido );
    const sql = "INSERT INTO vital_talk.mensajes(conversacion_id, usuario_id, contenido) VALUES(?,?,?)";
    const values = [conversacion_id, usuario_id, contenidoParseado];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al guardar en la base de datos:', err);
            return; 
        }
        console.log('Mensaje Guardado con ID:', result.insertId); 
    });
}

const verificarUsuario = async (usuario_id) => {
    const sql = 'SELECT * FROM vital_talk.usuario WHERE id = ?';
    const values = [usuario_id];

    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al verificar el usuario:', err);
                return reject(err); 
            }

            const existe = result.length > 0 ? 1 : 0; 
            resolve(existe); 
        });
    });
};



const registrarUsuario = async (datos) => {
    let { nombre, apellido, email, contrasenia } = datos;

    try {
        const hashedPassword = await bcrypt.hash(contrasenia, 10);

        const sql = 'INSERT INTO vital_talk.usuario(nombre, apellido, email, contrasenia) VALUES (?, ?, ?, ?)';
        const values = [nombre, apellido, email, hashedPassword];

        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        console.error('Error: Email ya en uso.');
                        return reject(new Error('El correo electrónico ya está en uso.'));
                    }

                    console.error('Error al guardar en la base de datos:', err);
                    return reject(err);
                }

                console.log('Usuario insertado con ID:', result);
                const resultado = {
                    user_id: result.insertId,
                    nombre: nombre,
                    apellido: apellido
                };
                console.log(resultado);

                resolve(resultado);
            });
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
    }
};
const actualizarDatos = async (usuarioId,nombre,apellido,email) => {
    const sql='update vital_talk.usuario set nombre = ?,apellido=?,email=? where id = ?'
    const values = [nombre,apellido,email,usuarioId]
    
    return new Promise((resolve, reject) =>{
        db.query(sql,values,(err, result) =>{
            if (err)  {
                console.error('error al actualizar datos')
                return reject(err);
            }
            console.log('datos actualizados', result);
            const resultado = {
                mensaje:'El usuario ha sido actualizado con exito'
            }
            resolve(resultado);
        })
    })
}
const borrar = async (id) => {
    const sql = "delete  from vital_talk.usuario where id = ?";
    const valor = [id]
    console.log('====================================');
    console.log("entro aca");
    console.log('====================================');
    return new Promise((resolve, reject) =>{
        db.query(sql,valor,(err, result) =>{
            if (err)  {
                console.error('Error al eliminar el registro')
                return reject(err);
            }
            console.log('datos actualizados', result);
            const resultado = {
                mensaje:'El Usuario fue eliminado con exito'
            }
            resolve(resultado);
        })
    })

}


const login = async (email, contrasenia, res, req) => {
    try {
        const sql = 'SELECT * FROM vital_talk.usuario WHERE email = ?';

        db.query(sql, [email], async (err, results) => {
            if (err) {
                console.error('Error al buscar el usuario:', err);
                return res.status(500).json({
                    error: 'Error interno del servidor',
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    error: 'Usuario no encontrado',
                });
            }

            const usuario = results[0];

            const match = await bcrypt.compare(contrasenia, usuario.contrasenia);

            if (!match) {
                return res.status(401).json({
                    error: 'Contraseña incorrecta',
                });
            }

            return res.status(200).json({
                mensaje: 'Inicio de sesión exitoso',
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                },
            });
        });
    } catch (error) {
        console.error('Error en /login:', error.message);
        return res.status(500).json({
            error: 'Error interno del servidor',
        });
    }
};






module.exports ={
    guardarMensajes,
    guardarConversacion,
    verificarUsuario,
    registrarUsuario,
    login,
    actualizarDatos,
    borrar
}