<template>
    <div class="item">
       <h3>{{props.title}}</h3> 

        <div class="row mb-5">
            <div class="col-6">
                <TotalCard :title="'Total Visitas'" :total="totalVisitas" style="width: 100%"/>
            </div>            
            <div class="col-6">                
                <TotalCard :title="'Total Viajes'" :total="totalViajes" style="width: 100%"/>                                                                                    
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="card" >     
                    <div class="card-body">                        
                        <apexchart width="100%" height="600px" type="line" :options="chartOptions" :series="series"></apexchart>
                    </div>
                </div>
            </div>                        
        </div>

    </div>
</template>

<script setup lang="ts">

    import { useRealtimeStore } from '../stores/realtimeStore'   
    import { SnowflakeApi } from '@/service/SnowflakeApi';
    import {computed, onBeforeMount, ref, reactive} from 'vue' 
    import TotalCard from './TotalCard.vue';

    interface RealTimeProps {
        title:string        
    }
    const props = defineProps<RealTimeProps>();   
    
    const store = useRealtimeStore();

    const token =  computed(() => {                                
        return store.accessToken;
    })        

    // const options = reactive({
    //     chart: {
    //       id: 'vuechart-example'
    //     },
    //     xaxis: {
    //       categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    //     }
    // })

    // const series = reactive([{
    //     name: 'series-1',
    //     data: [30, 40, 45, 50, 49, 60, 70, 91]
    //   }]
    // )

    const series = reactive(
        [
            {
                type: 'line',
                name: "Media Tiempo Espera (Minutos)",
                data: new Array<any>()
            },
            {
                type: 'bar',
                name: "Total Viajes",
                data: new Array<any>()
            }
        ]
    );
    const chartOptions = reactive({
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: true
            }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Viajes',
            align: 'left'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
            }
        },
        markers: {
            size: 1
        },
        xaxis: {
            type: 'category',           
            title: {
                text: 'Últimos 60 minutos'
            },
            labels:{
                rotate : -45
            }            
        },
        yaxis: [{
            title: {
                text: 'Minutos'
            },
            min: 0,
            labels:{
                formatter : (val:number) =>{return Number(val?.toFixed(0)).toLocaleString('de')}
            }           
        },
        {
            opposite: true,
            title: {
                text: 'Viajes'
            },
            min: 0,
            labels:{
                formatter : (val:number) =>{return Number(val?.toFixed(0)).toLocaleString('de')}
            }           
        }
        ],
        legend: {
            position: 'top',
            horizontalAlign: 'right'                        
        }
    });

    const totalVisitas = ref(0);
    const totalViajes = ref(0);
    
    
    onBeforeMount(async ()=>{      
        getData();
        setInterval(async () => {
            getData();
        }, 6000);                    
    })

    async function getData(){
        const snowflakeApi = new SnowflakeApi(true,token.value);    
        try{ 
            const resultTotalVisitas = await snowflakeApi.getTotalVisitas();     
            totalVisitas.value = resultTotalVisitas[0][0];
        }catch(err){
            console.error(err);
        }
        try{
            const resultTotalViajes = await snowflakeApi.getTotalViajes();        
            totalViajes.value = resultTotalViajes[0][0]; 
        }catch(err){
            console.error(err);
        }

        try{
            const resultAgrupadoViajes:Array<any> = await snowflakeApi.getAgrupadoViajes();             
            series[0].data = new Array<number>();
            series[1].data = new Array<number>();
            //chartOptions.xaxis.categories = new Array<string>();
            for(let resultadoViaje of resultAgrupadoViajes.reverse()){
                series[0].data.push({x:resultadoViaje[1], y:resultadoViaje[2]});                
                series[1].data.push({x:resultadoViaje[1], y:resultadoViaje[3]});                                
            }                       
        }catch(err){
            console.error(err);
        }
    }

</script>


<style scoped>

</style>
  