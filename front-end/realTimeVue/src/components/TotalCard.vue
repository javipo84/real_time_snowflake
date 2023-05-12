<template>
    <div class="card" >     
        <div class="card-body" style="word-wrap: normal;">
            <div class="centrar">        
                <u><h5 class="card-title mb-4 centrar" style="text-align: center">{{ props.title }}</h5></u>
                <number class="total card-text centrar mb-3 " style="display: block;text-align: center"
                    ref="number1"
                    :from="0"
                    :to="props.total"            
                    :duration="2"
                    :delay="0.3"
                    :format="(value:number)=> Number(value.toFixed(0)).toLocaleString('de')"
                    easing="Power0.easeOut"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    
    import {computed, onBeforeMount, ref, reactive} from 'vue' 

    interface TotalCardProps {
        title:string,
        total:number
    }
    const props = defineProps<TotalCardProps>();   
               
    onBeforeMount(async ()=>{      
     
    })

</script>


<style scoped>
.total {
    font-style: normal;
    font-weight: 700;
    font-size: 3.2rem;
    line-height: 16px;
    color: #333333;          
}

.centrar {
    margin: auto;    
}

</style>
  