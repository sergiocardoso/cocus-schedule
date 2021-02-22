<template>
    <div class="logo-base col-auto">
        <div class="text-center">
            <img :src="black === 'true' ? imgUrl('calendar.black.svg') : imgUrl('calendar.white.svg')">
            <h3 :style="black === 'true' ? {color: 'black'} : {color: 'white'}" class="text">Cocus<br/>Schedule</h3>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

const images = require.context('../assets/img/', false, /\.svg$/);

@Component
export default class Logo extends Vue 
{
    @Prop() private black!: string;

    imgUrl(path: string): string {
        return images('./' + path);
    }
}
</script>

<style lang="scss">
    .logo-base{
        width: 70px;
        margin: 10% auto;
    }

    .logo-base img{
        
        margin-bottom: 10px;
    }

    .text{
        font-weight: 700;
        color:white;
        line-height: 1em;
        margin-top:5px;
        font-size: 1.2rem;
        text-align:left;
    }
</style>