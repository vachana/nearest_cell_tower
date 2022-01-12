<template>
  <div data-app>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title><br /></v-card-title>
          <v-card-text
            >The closest tower to {{ building_name }} is {{ tower.Name }} which
            is {{ tower.Distance }}m away.</v-card-text
          >

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" text @click="dialog = false"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Tower",

  data() {
    return {
      towerName: "",
      building_id: "",
      building_name: "",
      tower: {},
      dialog: false,
    };
  },
  methods: {
    getTower(id) {
      const url = "http://localhost:3000/tower?ID=" + id;
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
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.tower = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showModal(value) {
      this.building_id = value.building_id;
      this.building_name = value.building_name;
      this.getTower(this.building_id);
      this.dialog = true;
    },
  },
};
</script>
