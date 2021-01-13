<template>
  <div class="building">
    <div class="building__search"></div>
    <div class="building__records">
      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="calories"
        class="elevation-1"
        dense
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>水利工程项目</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  新建项目
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Dessert name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.calories"
                          label="Calories"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.fat"
                          label="Fat (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.carbs"
                          label="Carbs (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.protein"
                          label="Protein (g)"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <div class="building__chart">
        <div class="building__options">
            <v-row>
                <v-col md="3">
                    <v-select
                      :items="['年份', '施工单位', '施工部位', '施工类型']"
                      label="选择指标"
                      dense
                      solo
                    ></v-select>
                </v-col>
            </v-row>
        </div>
        <div class="building__chartlist">
             <div class="building_apex"
              v-for="(item, i) in charts"
              :key="i"
             ></div>
        </div>
    </div>
  </div>
</template>
<script>
import projectData from "./data.building.js";
console.log(projectData);
export default {
  data: () => ({
    charts:[{},{},{}],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "项目名称",
        align: "start",
        sortable: false,
        value: "name"
      },
       { text: "项目编号", value: "project_code" },
       { text: "项目设计年份", value: "project_design_year" },
       { text: "项目开工年份", value: "project_begin_date" },
       { text: "项目类型", value: "project_type" },
       { text: "施工单位", value: "project_unit" },
       { text: "施工部位", value: "project_position" },
       { text: "问题数", value: "project_problems" },
       { text: "问题处理率", value: "project_handle_rate" },
       { text: "工程进度", value: "project_process" },
       { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = projectData.projectList;
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style>
.building__chart {
  margin-top: 1em;
  padding: 1em;
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.building__chartlist {
  display: flex;
  overflow-x: auto;
  flex: 1;
}
.building_apex {
  width: 500px;
  background-color: #90CAF9;
  flex-shrink: 0;
}
.building__chartlist * + * {
  margin-left:1em;
}
</style>