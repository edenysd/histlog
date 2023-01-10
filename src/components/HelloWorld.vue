<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="greetings">
    <h1>{{ msg }}</h1>
    <h3>
      <b><white>Histlog</white></b> es una plataforma de historias interactivas
      donde podrás refinar tus habilidades en
      <i><white>Prolog</white></i> divirtiéndote y enfrentando retos 😱
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
  color: white;
}

h3 {
  font-size: 1.2rem;
  color: rgb(108, 177, 144);
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

b {
  font-weight: bold;
}
white {
  color: rgb(214, 224, 213);
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
