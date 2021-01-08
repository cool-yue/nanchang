<template>
  <div class="login">

  <v-card
    class="mx-auto logn__form"
    max-width="500"
    height="400"
  >
       <v-card-title>
          <span class="headline">云南智慧水利信息管理系统</span>
        </v-card-title>
        <v-card-text>
            <v-container>

      <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="用户名"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="密码"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        label="记住密码"
        required
      ></v-checkbox>
      </v-form>
            </v-container>
        </v-card-text>
      <v-card-actions class="d-flex justify-center">

      <v-btn color="success" class="mr-4" @click="validate">
        登录
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        重置
      </v-btn>

      </v-card-actions>

  </v-card>

  </div>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "用户名必填"
    ],
    email: "",
    emailRules: [
      v => !!v || "密码必填",
    ],
    checkbox: false
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$emit("login-success", true);
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style>
.login {
  height: 100%;
  position: relative;
  background-image: linear-gradient(45deg, #2196F3, #3F51B5);
}

.logn__form {
  top: 25%;
}
.login_button {
  text-align: center;
}
</style>
