<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="输入关键字综合查询"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>河长列表</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                添加
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
                        label="姓名"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.gender"
                        label="性别"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.level"
                        label="职务等级"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.duty_river"
                        label="负责河流"
                      ></v-text-field>
                    </v-col>
                    <!--
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.duration"
                      label="巡河时长（小时）"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.times"
                      label="巡河次数"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.distance"
                      label="巡河里程（公里）"
                    ></v-text-field>
                  </v-col>-->
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  确定
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  保存
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">确定删除么?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >取消</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >删除</v-btn
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
  </v-card>
</template>

<script>
export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    headers1: [
      {
        text: "姓名",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "性别", value: "gender" },
      { text: "职务等级", value: "level" },
      { text: "负责河流", value: "duty_river" },
      { text: "巡河时长(小时)", value: "duration" },
      { text: "巡河次数", value: "times" },
      { text: "巡河里程(公里)", value: "distance" },
      { text: "任务处置数量", value: "disposal_number" },
      { text: "任务待处置数量", value: "pending_disposal_number" },
      { text: "操作", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      gender: "",
      level: "",
      duty_river: "",
      duration: 0,
      times: 0,
      distance: 0
    },
    defaultItem: {
      name: "",
      gender: "",
      level: "",
      duty_river: "",
      duration: 0,
      times: 0,
      distance: 0
    }
  }),
  props: {
    tableHeader: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableData: {
        type: Array,
        default: () => {
          return [];
        }
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "添加" : "编辑";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    tableData: {
      handler(newValue, oldValue) {
        this.desserts = newValue;
        console.log("tabledata");
      },
      immediate: true
    },
    tableHeader: {
      handler(newValue, oldValue) {
        this.headers = newValue;
        console.log("header");
      },
      immediate: true
    }
  },

  created() {
    // this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "河长1",
          gender: "男",
          level: "科员",
          duty_river: "古城河",
          duration: 500,
          times: 50,
          distance: 4000,
          disposal_number: 30,
          pending_disposal_number: 10
        },
        {
          name: "河长1",
          gender: "男",
          level: "科员",
          duty_river: "古城河",
          duration: 500,
          times: 50,
          distance: 4000,
          disposal_number: 30,
          pending_disposal_number: 10
        },
        {
          name: "河长1",
          gender: "男",
          level: "科员",
          duty_river: "古城河",
          duration: 500,
          times: 50,
          distance: 4000,
          disposal_number: 30,
          pending_disposal_number: 10
        },
        {
          name: "河长1",
          gender: "男",
          level: "科员",
          duty_river: "古城河",
          duration: 500,
          times: 50,
          distance: 4000,
          disposal_number: 30,
          pending_disposal_number: 10
        },
        {
          name: "河长2",
          gender: "男",
          level: "科员",
          duty_river: "古城河",
          duration: 500,
          times: 50,
          distance: 4000,
          disposal_number: 30,
          pending_disposal_number: 10
        },
        {
          name: "河长1",
          gender: "男",
          level: "科员",
          duty_river: "古城河",
          duration: 500,
          times: 50,
          distance: 4000,
          disposal_number: 30,
          pending_disposal_number: 10
        },
        {
          name: "河长1",
          gender: "男",
          level: "科员",
          duty_river: "古城河",
          duration: 500,
          times: 50,
          distance: 4000,
          disposal_number: 30,
          pending_disposal_number: 10
        },
        {
          name: "河长1",
          gender: "男",
          level: "科员",
          duty_river: "古城河",
          duration: 500,
          times: 50,
          distance: 4000,
          disposal_number: 30,
          pending_disposal_number: 10
        },
        {
          name: "河长1",
          gender: "男",
          level: "科员",
          duty_river: "古城河",
          duration: 500,
          times: 50,
          distance: 4000,
          disposal_number: 30,
          pending_disposal_number: 10
        }
      ];
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
