<script setup>
import { RouterLink } from "vue-router";
defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <RouterLink
    class="story-link"
    :class="$route.name == id ? 'high' : ''"
    style="padding: 10px"
    :to="{ name: id }"
  >
    <h3 style="margin-bottom: 5px">
      <strong>
        {{ title }}
      </strong>
    </h3>
    <i>
      {{ text }}
    </i>
  </RouterLink>
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
.story-link {
  border: 1px solid hsla(0, 100%, 18%, 0.322) !important;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
  color: rgb(255, 255, 255) !important;
}
.story-link:hover {
  border: 1px solid hsla(100, 85%, 35%, 0.37) !important;
  transform: scale(1.02);
}
.high {
  background-color: hsla(100, 100%, 18%, 0.37);
}
.high:hover {
  background-color: hsla(100, 85%, 35%, 0.37) !important;
}
strong {
  font-weight: bold;
}
</style>
