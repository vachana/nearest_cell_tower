<template>
  <v-container class="spacing-playground pa-1600">
    <div>
      <template>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <v-data-table
        :headers="headers"
        :items="buildings"
        sort-by="['building_id', 'building_name']"
        :items-per-page="5"
        :search="search"
        class="['elevation-1' && item.selected && 'selected']"
        :custom-filter="filterOnlyCapsText"
        @click:row="handleClick"
      >
      </v-data-table>
      <tower ref="modal"></tower>
    </div>
  </v-container>
</template>

<style>
.selected {
  background-color: rgb(38, 0, 255);
}
</style>

<script>
import axios from "axios";
import Tower from "./Tower.vue";
export default {
  components: { Tower },
  name: "buildings-display",
  mounted: function () {
    this.getBuildings();
    console.log(process.env.BUILDINGS_API);
  },
  data: function () {
    return {
      search: "",
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
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLocaleUpperCase()
          .indexOf(search.toLocaleUpperCase()) !== -1
      );
    },

    handleClick(value) {
      console.log("onclick", value.building_id);
      this.$refs.modal.showModal(value);
    },

    getBuildings: function () {
      var self = this;
      const url = process.env.VUE_APP_ROOT_API + "buildings";
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
