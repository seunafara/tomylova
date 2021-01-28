<template>
   <div id="ov-main" class="ov-gradient-1">
      <div class="ov-page-container">
         <Navbar />
         <div class="ov-letter-wrapper">
            <h2 id="luv-leta">
               {{ letter }}
            </h2>
            <router-link to="/" class="ov-create-new-btn"
               >Create a Letter</router-link
            >
         </div>
      </div>
   </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar';
import { appURL } from '@/Warehouse/url.js';
import axios from 'axios';
export default {
   name: 'Home',
   data() {
      return {
         counter: 1,
         name: 'Daniella',
         old_name: '',
         sentence: 'Hi my name is {{ name }}',
      };
   },
   computed: {
      letter() {
         return this.sentence.replace('{{ name }}', this.name);
      },
   },
   components: {
      Navbar,
   },
   watch: {
      sentence(newValue) {
         this.sentence = newValue.replace('{{ name }}', this.name);
      },
   },
   methods: {
      fetchLetter() {
         let { id } = this.$route.params;
         axios
            .get(`${appURL}/api/content/letter/${id}`)
            .then((res) => {
               console.log(res);
               if (res) {
                  if (res.data.success) {
                     this.name = res.data.letter.name;
                     this.sentence = res.data.letter.content.content.replace(
                        '{{name}}',
                        this.name
                     );
                  }
               }
            })
            .catch((err) => {
               if (err.response.status == 404) {
                  this.sentence = 'Oops 😢, We could not find this letter.';
               }
            });
      },
      changeName() {
         if (this.name != '') {
            this.old_name = this.name;
            var modal = document.getElementById('shareModal');
            modal.style.display = 'none';
         }
      },
   },
   created() {
      this.fetchLetter();
   },
};
</script>

<style scoped></style>
