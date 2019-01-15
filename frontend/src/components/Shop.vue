<template>
<div class="shop">
  <div class="shopsDetails">
    <img :src="list.imageUrl" :alt="list.title">
    <h3>{{ list.title }}</h3>
    <p>{{ list.description }}</p>
  </div>
</div>
</template>


<script>
  export default {
    props: ['list'],
    name: 'shop'
  }
</script>

<style>
.shop {
  background: #F5F5F5;
  display: inline-block;
  margin: 0 0 1em;
  width: 100%;
  cursor: pointer;
  -webkit-perspective: 1000;
  -webkit-backface-visibility: hidden;
  transition: all 100ms ease-in-out;
  }
  .shop:hover {
    transform: translateY(-0.5em);
    background: #EBEBEB;
  }
  img {
    display: block;
    width: 100%;
  }
</style>