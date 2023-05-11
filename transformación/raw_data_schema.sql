use role avanzado;
CREATE DATABASE sesion_real_time_db;


CREATE OR REPLACE TABLE viaje
(
    id VARCHAR(50),
    usuario VARCHAR(50),
    fecha_finalizacion VARCHAR(50),
    fecha_recogida VARCHAR(50),
    fecha_contratacion VARCHAR(50),
    numero_pasajeros VARCHAR(20),
    zona_origen VARCHAR(50),
    zona_destino VARCHAR(50),
    tiempo VARCHAR(50),
    distancia VARCHAR(50),
    cantidad VARCHAR(50),
    rating VARCHAR(40)
);

CREATE OR REPLACE TABLE visita
(
    id VARCHAR(50),
    usuario VARCHAR(50),
    pagina VARCHAR(50),
    timestamp VARCHAR(50),    
    dispositivo VARCHAR(50)
);

CREATE OR REPLACE TABLE usuario
(
    id VARCHAR(50),    
    uuid VARCHAR(50),
    edad VARCHAR(50),
    id_zona VARCHAR(50)
);

CREATE OR REPLACE TABLE pagina
(
    id VARCHAR(50),
    nombre VARCHAR(50),
    descripcion VARCHAR(100)    
);

CREATE OR REPLACE TABLE dispositivo
(
    id VARCHAR(50),
    nombre VARCHAR(50),
    descripcion VARCHAR(100)    
);

CREATE OR REPLACE TABLE zona
(
    id VARCHAR(50),
    nombre VARCHAR(50),
    descripcion VARCHAR(100)    
);