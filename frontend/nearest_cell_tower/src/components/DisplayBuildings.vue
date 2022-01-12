<template>
  <div class="buildings-display">
   

    <v-data-table
      :headers="headers"
      :items="buildings"
      sort-by="['building_id', 'building_name']"
      :items-per-page="5"
      class="['elevation-1' && item.selected && 'selected']"
      @click:row="handleClick"
      
    >
  
    </v-data-table>
      <tower ref="modal"></tower>
  </div>
</template>


<style>
.selected {
  background-color: rgb(38, 0, 255);
}
</style>


<script>
import axios from "axios";
import Tower from './Tower.vue';
export default {
  components: { Tower },
  name: "buildings-display",
  mounted: function () {
    this.getBuildings();
  },
  data: function () {
    return {
      buildings: [],
      temp: "",
      headers: [
        {
          text: "Building ID",
          align: "start",
          filterable: true,
          sortable: true,
          value: "building_id",
        },
        {
          text: "Building Name",
          align: "start",
          filterable: true,
          sortable: true,
          value: "building_name",
        },
      ],
    };
  },
  methods: {
    handleClick(value) {
      console.log("onclick", value.building_id);
      this.$refs.modal.showModal(value);


    },

    getBuildings: function () {
      var self = this;
      const url = "http://localhost:3000/buildings";
      axios
        .get(url, {
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
        })
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          for (let buildingId in response.data) {
            self.buildings.push({
              building_id: buildingId,
              building_name: response.data[buildingId].Name,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
