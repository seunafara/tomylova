<template>
   <div id="app">
      <div>
         <router-view />
      </div>
      <div id="font-loader">
         <p style="font-family: 'OhDarling' !important;">I love you</p>
         <p style="font-family: 'Andalusia' !important;">I love you</p>
         <p style="font-family: 'VanillaDaisy' !important;">I love you</p>
         <p style="font-family: 'angelova' !important;">I love you</p>
         <p style="font-family: 'Lovefern' !important;">I love you</p>
      </div>
   </div>
</template>
<script>
export default {
   mounted() {
      window.onload = () => {
         document.getElementById('font-loader').style.display = 'none';
         localStorage.removeItem('share_id');
      };
   },
};
</script>
<style>
@import './assets/css/style.css';
</style>
