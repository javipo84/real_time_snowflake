import axios from 'axios'; 

const baseURL:string = `https://civicapartner.west-europe.azure.snowflakecomputing.com/api/v2/statements`;


export class SnowflakeApi<PrimaryType, PayloadType = Record<string, unknown>> {
  url: string;
  axiosConfig = {};
  SnowflakeApi;

  constructor(useAuth = false, token : string = '') {    
    this.url = baseURL;
    this.SnowflakeApi = axios.create({
      baseURL:this.url
    });
     if (useAuth) {
       this.axiosConfig = {
         ...this.axiosConfig,
         headers: {
           Authorization: `Bearer ${token}`,
           "X-Snowflake-Authorization-Token-Type": "KEYPAIR_JWT",
           "Content-Type": "application/json",    
           "Accept": "application/json"    
         }
       };
     }
  }

  async getTotalViajes(): Promise<any> {
    const bodyParams:string = `{ 
      "statement": "select * from mv_total_viajes",
      "timeout": 60,
      "database": "SESION_REAL_TIME_DB",
      "schema": "PUBLIC",
      "warehouse": "WH_AVANZADO",
      "role": "AVANZADO" 
    }`

    let result = null;
    try{
      const response = await this.SnowflakeApi.post(
        `${this.url}`,
        bodyParams,
        this.axiosConfig
      );    
      result = response.data.data;
    }catch(err){
      console.error(err);
      result = null;
    }     
    return result;    
  }  

  async getTotalVisitas(): Promise<any> {
    const bodyParams:string = `{ 
      "statement": "select * from mv_total_visitas",
      "timeout": 60,
      "database": "SESION_REAL_TIME_DB",
      "schema": "PUBLIC",
      "warehouse": "WH_AVANZADO",
      "role": "AVANZADO" 
    }`

    let result = null;
    try{
      const response = await this.SnowflakeApi.post(
        `${this.url}`,
        bodyParams,
        this.axiosConfig
      );    
      result = response.data.data;
    }catch(err){
      console.error(err);
      result = null;
    }
     
    return result;    
  }  
  
  async getAgrupadoViajes(): Promise<Array<any>> {
    const bodyParams:string = `{ 
      "statement": "select top 60 DIA,MINUTO,avg(MEDIA_TIEMPO_ESPERA) as MEDIA_TIEMPO_ESPERA,sum(TOTAL_VIAJES) as TOTAL_VIAJES,SUM(TOTAL_CANTIDAD) as TOTAL_CANTIDAD,AVG(MEDIA_DISTANCIA) as MEDIA_DISTANCIA from agrupado_viaje group by DIA,MINUTO order by dia desc,minuto desc;",
      "timeout": 60,
      "database": "SESION_REAL_TIME_DB",
      "schema": "PUBLIC",
      "warehouse": "WH_AVANZADO",
      "role": "AVANZADO" 
    }`

    let result = null;
    try{
      const response = await this.SnowflakeApi.post(
        `${this.url}`,
        bodyParams,
        this.axiosConfig
      );          
      result = response.data.data;
    }catch(err){
      console.error(err);
      result = null;
    }
     
    return result;    
  }  

  

  async getInfo(): Promise<any> {
    const bodyParams:string = `{ 
      "statement": "select top 100 * from pagina",
      "timeout": 60,
      "database": "SESION_REAL_TIME_DB",
      "schema": "PUBLIC",
      "warehouse": "WH_AVANZADO",
      "role": "AVANZADO" 
    }`

    let result = null;
    try{
      const response = await this.SnowflakeApi.post(
        `${this.url}`,
        bodyParams,
        this.axiosConfig
      );    
      result = response.data.data;
    }catch(err){
      console.error(err);
      result = null;
    }     
    return result;    
  }  

  
}