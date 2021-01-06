<template>
  <v-card
    height="400"
    width="256"
    class="mx-auto"
  >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            导航
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          { title: '河长管理', icon: 'mdi-account' },
          { title: '巡河管理', icon: 'mdi-waves' },
          { title: '施工建设管理', icon: 'mdi-wrench' },
          { title: '一张图平台', icon: 'mdi-map-marker' },
          { title: '大数据平台', icon: 'mdi-database' },
          { title: '系统管理', icon: 'mdi-cog' },
        ],
        right: null,
      }
    },
  }
</script>