--Agrupados
CREATE OR REPLACE TABLE agrupado_viaje
(
    dia VARCHAR(50),
    minuto VARCHAR(50),    
    total_viajes INT NULL,
    media_tiempo_espera FLOAT NULL,
    total_cantidad FLOAT NULL,
    media_distancia FLOAT NULL
);

--Streams
CREATE STREAM stream_viaje ON TABLE viaje;

--Materializaciones
CREATE OR REPLACE MATERIALIZED VIEW mv_total_visitas
    COMMENT='total_visitas'
    AS
    SELECT COUNT(*) as total_visitas FROM visita;

CREATE OR REPLACE MATERIALIZED VIEW mv_total_viajes
    COMMENT='total_viajes'
    AS
    SELECT COUNT(*) as total_viajes FROM viaje; 

--Task para agrupado
CREATE OR REPLACE TASK ingesta_agrupado_viajes
  WAREHOUSE = WH_BASICO
  SCHEDULE = '1 MINUTE'
AS
insert into agrupado_viaje
select TO_DATE(to_timestamp(fecha_finalizacion)) as dia,
       concat(HOUR(to_timestamp(fecha_finalizacion)),':',right(concat('00',MINUTE(to_timestamp(fecha_finalizacion))),2))  as minuto,  
       --zona_origen,
       count(1) as total_viajes,
       avg(tiempo_espera) as media_tiempo_espera,
       sum(cantidad) as total_cantidad,
       avg(distancia/1000) as media_distancia
       
from
(
    select fecha_finalizacion,
           datediff(minute,fecha_contratacion,fecha_recogida) as tiempo_espera,
           cantidad,
           distancia,
           z.id as zona_origen
        from stream_viaje v
    inner join zona z on z.nombre = v.zona_origen
) t
group by TO_DATE(to_timestamp(fecha_finalizacion)),
         concat(HOUR(to_timestamp(fecha_finalizacion)),':',right(concat('00',MINUTE(to_timestamp(fecha_finalizacion))),2));
         --zona_origen;

ALTER TASK ingesta_agrupado_viajes SUSPEND;