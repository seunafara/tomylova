<template>
   <div class="an-sidebar-wrapper">
      <div class="an-sidebar-blur"></div>
      <div class="an-sidebar-container">
         <button @click="changeUser" type="button">
            <i class="las la-user-circle"></i>
         </button>
         <button @click.prevent="showShareDialog" type="button">
            <i class="las la-external-link-alt"></i>
         </button>
         <button
            type="button"
            @click.prevent="changeFont"
            class="ov-sidebar-btn"
         >
            <i class="las la-font"></i>
         </button>

         <button type="button" id="ov-btn-c" @click.prevent="changeBG"></button>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         counter: 1,
         fontCounter: 1,
      };
   },
   methods: {
      showShareDialog() {
         let share_id = localStorage.getItem('share_id');
         let link = document.getElementById('ov-share-link');
         if (share_id != '') {
            document.getElementById('shareDialog').style.display = 'flex';
            link.innerText = window.location.href + share_id;
         }
      },
      changeUser() {
         // Get the modal
         var modal = document.getElementById('shareModal');
         // get page container
         //  var page = document.getElementById('auth-screen');

         if (modal.style.display == 'none') {
            modal.style.display = 'flex';
            // page.classList.add('an-ov-page-blur');
         } else {
            modal.style.display = 'none';
            // page.classList.remove('an-ov-page-blur');
         }
      },
      changeBG() {
         let main = document.getElementById('ov-main');
         let changer = document.getElementById('ov-btn-c');

         if (this.counter < 7) {
            this.counter++;
            main.classList.add(`ov-gradient-${this.counter}`);
            main.className += ' ' + `ov-gradient-${this.counter}`;
            changer.classList.add(`ov-gradient-${this.counter}`);
            changer.className += ' ' + `ov-gradient-${this.counter}`;
         } else {
            main.removeAttribute('class');
            changer.removeAttribute('class');
            this.counter = 1;
         }
      },
      changeFont() {
         let font = document.getElementById('luv-leta');

         if (this.fontCounter < 5) {
            this.fontCounter++;
            font.classList.add(`ov-font-${this.fontCounter}`);
            font.className += ' ' + `ov-font-${this.fontCounter}`;
         } else {
            font.removeAttribute('class');
            this.fontCounter = 1;
         }
      },
   },
};
</script>

<style scoped>
.router-link-exact-active {
   color: white;
}
</style>
