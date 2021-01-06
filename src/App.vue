<template>
<v-app>
 <v-navigation-drawer app>
          <nav class="app__nav">
            <w-nav />
        </nav>
  </v-navigation-drawer>
  <v-app-bar app class="indigo">
      <v-avatar color="red">
          <v-icon dark>
             mdi-account-circle
          </v-icon>
    </v-avatar>
  </v-app-bar>
  <v-main>
        <div class="app__content">
          <components :is="current_component" />
        </div>
  </v-main>
  <v-footer class="app__footer">
        <span>&copy;昆明智慧水利管理信息系统</span>
  </v-footer>
</v-app>
</template>

<script>
import Chief from "./views/chief";
import Building from "./views/building";
import Analysis from "./views/analysis";
import Patrol from "./views/patrol";

import WNav from "./components/wNav";

export default {
  name: 'App',
  data() {
    return {
      current_component: "Chief"
    };
  },
  components: {
    Chief,
    Building,
    Analysis,
    Patrol,
    WNav
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
</style>