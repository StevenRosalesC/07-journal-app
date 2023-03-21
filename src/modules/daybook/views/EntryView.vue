<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p2">
      <div>
        <span class="text-success fs-5 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-5">{{ month }}</span>
        <span class="mx-2 fw-light">{{ yearDay }}</span>
      </div>
      <div class="buttons">
        <input type="file"
        @change="onSelectedImage"
        ref="imageSelector"
        v-show="false"
        accept="image/*"
        >
        <button
          class="btn btn-danger mx-2"
          @click="onDeleteEntry"
          v-if="entry.id"
        >
          Borrar
          <i class="fas fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary"
          @click="onSelectImage">
          Subir foto
          <i class="fas fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />

    <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
    </div>
  </template>
  <Fab icon="fa-save" @on:click="saveEntry" />
  <img
    v-if="entry.picture && !localImage"
    :src="entry.picture"
    alt="entry-picture"
    class="img-thumbnail"
  />
  <img
    v-if="localImage"
    :src="localImage"
    alt="entry-picture"
    class="img-thumbnail"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex"; //importamos el mapGetters para poder usarlo en el computed
import Swal from 'sweetalert2'

import getDayMonthYear from "../helpers/getDayMonthYear";
import uploadImage from "../helpers/uploadImage";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab-button.vue")),
  },
  data() {
    return {
      entry: null,
      localImage:null,
      file: null,
    };
  },
  computed: {
    ...mapGetters("journal", ["getEntriesById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },
  methods: {
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),
    loadEntry() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntriesById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }
      this.entry = entry;
    },
    async saveEntry() {
      new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false
            })
            Swal.showLoading()
            const picture = await uploadImage( this.file )
            
            this.entry.picture = picture
            
            if ( this.entry.id  ) {
              // Actualizar
              await this.updateEntry( this.entry )
            } else {
              // Crear una nueva entrada
              const id = await this.createEntry( this.entry )
              this.$router.push({ name: 'entry', params: { id } })
            }
            this.file = null
            this.localImage = null
            Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
    },
    async onDeleteEntry() {

      const {isConfirmed} = await Swal.fire({

        title:'¿Estás seguro?',
        text:'No podrás revertir esta acción',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Sí, borrar',
        cancelButtonText:'Cancelar'

      })

      if(isConfirmed){
        new Swal({

          title:'Espere por favor',
          alllowOutsideClick:false

        })
        Swal.showLoading();
        await this.deleteEntry(this.entry.id);
        this.$router.push({ name: "no-entry"});
        this.file=null
        Swal.fire('Eliminado','Entrada eliminada con éxito','success')
      }
    },
    onSelectedImage(event){
      console.log(event.target.files[0]);
      const file = event.target.files[0]

      if(!file){

        this.localImage=null
        this.file=null
        return

      }

      this.file=file
      const imagen= new FileReader()
      imagen.onload=()=> this.localImage=imagen.result
      imagen.readAsDataURL(file)

    },
    onSelectImage(){
      this.$refs.imageSelector.click()
      
    }
  },
  created() {

    console.log(this.id);
    this.loadEntry();

  },

  watch: {
    id() {

      this.loadEntry();

    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  border: none;
  outline: none;
  resize: none;
  font-size: 20px;
  font-weight: 500;
  height: 100%;
  &:focus {
    border: none;
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000, $alpha: 0.2);
}
.buttons {
  padding-top: 10px;
}
</style>