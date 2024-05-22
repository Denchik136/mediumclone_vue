<template>
  <nav calss="navbar navbar-light">
    <router-link class="navbar-brand" :to="{nme: 'home'}"
      >MediumClone</router-link
    >
    <ul class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
      </li>
      <template v-if="isLoggedIn">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{name: 'home'}"
            active-class="active"
            exact
          >
            <i class="ion-compose"></i> &nbsp; New Article
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{name: 'home'}"
            active-class="active"
          >
            <i class="ion-gear-a"></i> &nbsp; Settings
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{name: 'home', params: {slug: currentUser.username}}"
            active-class="active"
          >
            <img class="user-pic" :src="currentUser.image" />
            &nbsp; {{ currentUser.username }}
          </router-link>
        </li>
      </template>
      <template v-if="!isLoggedIn"
        ><li class="nav-item">
          <router-link
            class="nav-link"
            :to="{name: 'login'}"
            active-class="active"
          >
            Sing in
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{name: 'register'}"
            active-class="active"
          >
            Sing up
          </router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'McvTopbar',
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.auth.isLoggedIn,
      currentUser: (state) => state.auth.currentUser,
    }),
  },
}
</script>
