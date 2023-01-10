<script>
import { RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import HistoryLink from "./components/HistoryLink.vue";

export default {
  name: "App",
  components: {
    RouterView,
    HelloWorld,
    HistoryLink,
  },
  data() {
    return {
      stories: [
        {
          id: "spider",
          title: "Spider",
          text: "¿Por qué el título está en inglés? Acaso es porque la historia es de otro mundo",
        },
      ],
    };
  },
};
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Bienvenido a Histlog!" />
      <nav style="margin-bottom: 20px">
        <HistoryLink
          v-for="storie in stories"
          :key="storie.id"
          :id="storie.id"
          :title="storie.title"
          :text="storie.text"
        />
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

@media (max-width: 450px) {
  .wrapper {
    display: none;
  }
}
</style>
