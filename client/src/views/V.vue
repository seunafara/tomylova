<template>
   <div id="ov-main" v-if="sentence" :class="gradient">
      <div class="heart-wrapper">
         <div class="heart x1"></div>
         <div class="heart x2"></div>
         <div class="heart x3"></div>
         <div class="heart x4"></div>
         <div class="heart x5"></div>
         <div class="altheart x6"></div>
      </div>
      <div class="ov-page-container">
         <Navbar />
         <div class="ov-letter-wrapper">
            <h2 id="luv-leta" :class="font">
               {{ letter }}
            </h2>
            <div class="ov-v-actions" id="ov-v-actions">
               <router-link to="/" class="ov-create-new-btn"
                  >Create a<span style="color:red;margin-left:12px"
                     >Letter</span
                  ></router-link
               >
               <button
                  type="button"
                  @click.prevent="generatePhoto"
                  class="ov-create-new-btn ov-filter-btn ov-capture-btn"
               >
                  <i class="las la-camera"></i>
                  Download Letter
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar';
import { appURL } from '@/Warehouse/url.js';
import axios from 'axios';
import FileSaver from 'file-saver';
import domtoimage from 'dom-to-image';
export default {
   name: 'Home',
   data() {
      return {
         counter: 1,
         name: 'Daniella',
         old_name: '',
         sentence: 'Hi my name is {{ name }}',
         gradient: '',
         font: '',
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
               if (res) {
                  if (res.data.success) {
                     this.name = res.data.letter.name;
                     this.sentence = res.data.letter.content.content.replace(
                        '{{name}}',
                        this.name
                     );
                     this.gradient = res.data.letter.gradient;
                     this.font = res.data.letter.font;
                  }
               }
            })
            .catch((err) => {
               if (err.response.status == 404) {
                  this.sentence = 'Oops 😢, We could not find this letter.';
               }
            });
      },
      generatePhoto() {
         let { id } = this.$route.params;
         document.getElementById('ov-v-actions').style.display = 'none';
         document.getElementById('luv-leta').style.fontSize = '24px';
         domtoimage.toBlob(document.getElementById('ov-main')).then((blob) => {
            FileSaver.saveAs(blob, `${id}-capture.png`);
            document.getElementById('ov-v-actions').style.display = 'flex';
            document.getElementById('luv-leta').style.fontSize = '55px';
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
