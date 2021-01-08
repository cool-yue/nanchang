<template>
  <div class="app_container">
    <v-app v-if="is_login">
      <v-navigation-drawer app dark v-if="show_nav">
        <v-list-item-group v-model="selected_item">
          <v-list dense nav>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              @click="change_current_componemnt(item.title)"
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
        </v-list-item-group>
      </v-navigation-drawer>
      <v-app-bar app class="blue darken-1">
        <v-app-bar-nav-icon class="white--text" @click="show_nav = !show_nav">
        </v-app-bar-nav-icon>
        <v-toolbar-title class="white--text"
          >昆明智慧水利信息管理系统</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <w-drop class="mr-12">admin</w-drop>
      </v-app-bar>
      <v-main class="grey lighten-4">
        <v-container class="app__container">
          <components :is="current_component" />
        </v-container>
      </v-main>
      <v-footer app class="blue darken-1">
        <div class="mx-auto white--text">&copy;昆明xxx公司</div>
      </v-footer>
    </v-app>
    <v-app v-else>
        <v-main>
            <login  @login-success="hanlde_success_login" />
        </v-main>
    </v-app>
  </div>
</template>

<script>
import Chief from "./views/chief";
import Building from "./views/building";
import Analysis from "./views/analysis";
import Patrol from "./views/patrol";
import OneMap from "./views/map";
import System from "./views/system";

//import WNav from "./components/wNav";
import WDrop from "./components/wDrop";

import Login from "./Login.vue";
export default {
  name: "App",
  data() {
    return {
      is_login: false,
      selected_item: 0,
      show_nav: true,
      current_component: "Chief",
      items: [
        { title: "河长管理", icon: "mdi-account" },
        { title: "巡河管理", icon: "mdi-waves" },
        { title: "施工建设管理", icon: "mdi-wrench" },
        { title: "一张图平台", icon: "mdi-map-marker" },
        { title: "大数据平台", icon: "mdi-database" },
        { title: "系统管理", icon: "mdi-cog" }
      ]
    };
  },
  components: {
    Chief,
    Building,
    Analysis,
    Patrol,
    WDrop,
    OneMap,
    System,
    Login
  },
  beforeMount() {
    if (sessionStorage) {
      this.is_login = sessionStorage.getItem("is_login") || false;
    }
  },
  methods: {
    change_current_componemnt(title) {
      console.log(title);
      if (title === "河长管理") {
        this.current_component = "Chief";
      } else if (title === "巡河管理") {
        this.current_component = "Patrol";
      } else if (title === "施工建设管理") {
        this.current_component = "Building";
      } else if (title === "一张图平台") {
        this.current_component = "OneMap";
      } else if (title === "大数据平台") {
        this.current_component = "Analysis";
      } else if (title === "系统管理") {
        this.current_component = "System";
      }
    },
    hanlde_success_login() {
      this.is_login = true;
      sessionStorage = sessionStorage.setItem("is_login", true)
    }
  }
};
</script>
<style>
.app__footer {
  text-align: center;
}
.app__main {
  display: flex;
}
.app__container {
  height: 100%;
}
</style>
