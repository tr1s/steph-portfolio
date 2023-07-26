<template>
  <div>
    <ul class="projects">
      <li>
        <nuxt-link to="/toronto-life">Toronto Life</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/top-hat">Top Hat</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/pavilion-project">Pavilion Project</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/tmu">TMU</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/canadian-business">Canadian Business</nuxt-link>
      </li>
    </ul>
    <Footer />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Stephanie Firka',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Graphic Designer & Number One Golden Girls Fan, based in Toronto, Canada.'
        }
      ],
      bodyAttrs: {
        class: 'home'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.projects {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 0.1rem;
  font-size: 9rem;
  list-style: none;
  padding: 0;
  margin: 0;
  @include respond-to('tablet') {
    font-size: 6.9rem;
  }
  @media (max-width: 549px) {
    font-size: 4.4rem;
  }
  @include respond-to('mobile-large') {
    font-size: 4rem;
  }
  @include respond-to('mobile-small') {
    font-size: 3.8rem;
  }
}
ul li {
  margin-top: -0.5rem;
  margin-bottom: -0.5rem;
}
ul li a {
  text-decoration: none;
  font-family: $font-heading;
  color: #000;
}
ul li a:hover,
ul li a:focus {
  color: #0000f9;
}
</style>
