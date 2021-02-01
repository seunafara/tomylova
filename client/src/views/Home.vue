<template>
   <div id="ov-main" class="ov-gradient-1">
      <div id="shareModal" class="ov-share-modal">
         <!-- Modal content -->
         <div class="ov-share-modal-content" style="width:55%">
            <form @submit.prevent="changeName">
               <p>Enter name below for the letter:</p>
               <input type="text" v-model="name" />
               <button v-if="!notLoading" type="submit">SAVE AND SHARE</button>
               <button
                  v-if="!notLoading"
                  @click.prevent="closeChange"
                  type="button"
                  class="ov-share-modal-close-btn"
               >
                  Close
               </button>
               <div v-else class="loading-spinner-container">
                  <div class="loading-spinner"></div>
               </div>
            </form>
         </div>
      </div>
      <div id="shareDialog" class="ov-share-modal">
         <!-- Modal content -->
         <div class="ov-share-modal-content" style="width:70%">
            <button
               @click.prevent="closeShare"
               class="ov-share-close-btn"
               type="button"
            >
               <i class="las la-times-circle"></i>
            </button>
            <lottie-player
               v-pre
               src="https://assets10.lottiefiles.com/packages/lf20_wMezg6.json"
               background="transparent"
               speed="1"
               style="width: 200px; height: 200px;margin-top:20px"
               loop
               autoplay
            ></lottie-player>
            <div id="ov-share-link" class="ov-share-modal-link">
               https://localhost:8080/shaiqoq1
            </div>
            <button type="button" class="ov-share-link-copy">
               <i class="las la-clipboard"></i> Copy
            </button>
         </div>
      </div>
      <div class="ov-page-container">
         <button
            v-if="!fetching"
            @click.prevent="fetchRand"
            type="button"
            class="ov-filter-btn"
         >
            <i class="las la-random"></i>
         </button>
         <div
            v-else
            class="loading-spinner-container loading-spinner-container-fetch"
         >
            <div class="loading-spinner loading-spinner-fetch"></div>
         </div>
         <Navbar />
         <div class="ov-letter-wrapper">
            <h2 id="luv-leta">
               {{ sentence }}
            </h2>
         </div>
      </div>
      <Sidebar />
   </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { appURL } from '@/Warehouse/url.js';
import axios from 'axios';
export default {
   name: 'Home',
   data() {
      return {
         counter: 1,
         name: 'Daniella',
         old_name: '',
         sentence_id: '',
         share_id: '',
         is_edited: false,
         notLoading: false,
         fetching: false,
         sentence:
            "If I could give you one thing in life, I'd give you the ability to see yourself through my eyes, only then would you realize how special you are to me. {{ name }}",
      };
   },
   computed: {
      letter() {
         return this.sentence.replace('{{ name }}', this.name);
      },
   },
   components: {
      Navbar,
      Sidebar,
   },
   watch: {
      sentence(newValue) {
         this.sentence = newValue.replace('{{ name }}', this.name);
      },
      name(newValue, oldValue) {
         this.sentence = this.sentence.replace(oldValue, newValue);
      },
   },
   methods: {
      fetchRand() {
         this.fetching = true;
         axios.get(`${appURL}/api/content/`).then((res) => {
            if (res.data.success) {
               this.fetching = false;
               this.sentence_id = res.data.content._id;
               this.sentence = res.data.content.content.replace(
                  '{{name}}',
                  this.name
               );
            }
         });
      },
      changeName() {
         if (this.name != '') {
            this.notLoading = true;
            var gradient, font;
            // set gradient for db
            let colorList = Object.values(
               document.querySelector('#ov-main').classList
            );

            if (colorList.length == 0) {
               gradient = 'ov-gradient-1';
            } else {
               gradient = colorList.slice(-1)[0];
            }
            // set font for db
            let fontList = Object.values(
               document.querySelector('#luv-leta').classList
            );
            if (fontList.length == 0) {
               font = 'ov-font-1';
            } else {
               font = fontList.slice(-1)[0];
            }
            // create the data for db
            let data = {
               name: this.name,
               content: this.sentence_id,
               gradient,
               font,
            };
            axios.post(`${appURL}/api/content/lcreate`, data).then((res) => {
               if (res.data.success) {
                  this.old_name = this.name;
                  this.notLoading = false;
                  this.closeChange();
                  this.share_id = res.data.letter.share_id;
                  localStorage.setItem('name', res.data.letter.name);
                  localStorage.setItem('content', res.data.letter.content);
                  localStorage.setItem('share_id', res.data.letter.share_id);
                  this.showShareDialog();
               }
            });
         }
      },
      showShareDialog() {
         let share_id = localStorage.getItem('share_id');
         let link = document.getElementById('ov-share-link');
         if (share_id != '') {
            link.innerText = window.location.href + share_id;
            document.getElementById('shareDialog').style.display = 'flex';
         }
      },
      closeShare() {
         document.getElementById('shareDialog').style.display = 'none';
      },
      closeChange() {
         var modal = document.getElementById('shareModal');
         modal.style.display = 'none';
      },
   },
   mounted() {
      this.fetchRand();
      this.sentence = this.sentence.replace('{{ name }}', this.name);
   },
};
</script>

<style scoped></style>
