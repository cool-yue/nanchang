<template>
  <div class="w-tree">
    <v-treeview
      activatable
      :items="treeData"
      :search="search"
      :filter="filter"
      :open.sync="open"
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
      items: [],
      open: [1, 2],
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
    }
  }
};
</script>

<style>
.w-tree {
  min-width: 320px;
}
</style>
