<template>
  <div class="w-tree">
    <v-treeview
      activatable
      :items="treeData"
      :search="search"
      :filter="filter"
      :open.sync="open"
      v-model="selection"
      selection-type="independent"
      @update:active="handleInput"
      dense
    >
      <template v-slot:prepend="{ item }">
        <v-icon
          v-if="item.children"
          v-text="`mdi-${item.id === 1 ? 'home-city' : 'home-variant'}`"
        ></v-icon>
      </template>
    </v-treeview>
  </div>
</template>

<script>
export default {
  name: "wTree",
  data() {
    return {
      selection: [],
      items: [],
      open: ["530100000000"],
      search: null,
      caseSensitive: false
    };
  },
  props: {
    treeData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    handleInput(checked_arr) {
      console.log(checked_arr);
      this.$emit("input", checked_arr);
    }
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    }
  },
  watch: {
    treeData(newValue) {
      console.log(newValue);
    },
    selection(newValue) {
      console.log(newValue);
    }
  }
};
</script>

<style>
.w-tree {
  min-width: 320px;
}
</style>
