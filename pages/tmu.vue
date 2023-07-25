<template>
  <div>
    <section class="inner-wrapper project">
      <h1 class="project-title">TMU</h1>
      <div class="project-credits">
        <p>Creative Director</p>
        <p>Aleeza Balita</p>
      </div>
      <div v-lazy-container="{ selector: 'img' }" class="content">
        <img
          class="image-1"
          :data-src="require('../assets/images/tmu/TMU-01.jpg')"
          alt="Image from Nightizm branding designed by Stephanie Firka."
        />
        <img
          class="image-2"
          :data-src="require('../assets/images/tmu/TMU-02.jpg')"
          alt="Image from Nightizm branding designed by Stephanie Firka."
        />
        <div class="img-container">
          <img
            :data-src="require('../assets/images/tmu/TMU-03.jpg')"
            alt="Image from Nightizm branding designed by Stephanie Firka."
          />
          <img
            :data-src="require('../assets/images/tmu/TMU-04.jpg')"
            alt="Image from Nightizm branding designed by Stephanie Firka."
          />
          <img
            :data-src="require('../assets/images/tmu/TMU-05.jpg')"
            alt="Image from Nightizm branding designed by Stephanie Firka."
          />
        </div>
        <img
          class="image-6"
          :data-src="require('../assets/images/tmu/TMU-06.jpg')"
          alt="Image from Nightizm branding designed by Stephanie Firka."
        />
      </div>
    </section>
    <div class="next-project block">
      <nav>
        <nuxt-link to="/me">
          Stephanie
          <span>Firka</span>
        </nuxt-link>
        <div class="line"></div>
        <nuxt-link to="/">Projects</nuxt-link>
      </nav>
      <img v-lazy="require('../assets/images/canadian-business.jpg')" class="next-project-img" />

      <nuxt-link class="next-project-link" to="/canadian-business">Canadian Business</nuxt-link>

      <footer class="footer">
        <nuxt-link to="/golden-girls">
          Golden
          <span>Girls</span>
        </nuxt-link>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Stephanie Firka - Nightizm',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Graphic Designer & Number One Golden Girls Fan, based in Toronto, Canada.'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  img.image-1 {
    width: 100%;
    max-width: 730px;
    align-self: flex-end;
    margin-right: 6rem;
    margin-bottom: 20rem;
    @include respond-to('desktop-13') {
      margin-right: 0;
    }
    @include respond-to('mobile-large') {
      margin-bottom: 10rem;
    }
  }
  img.image-2 {
    width: 100%;
    max-width: 1240px;
    align-self: flex-start;
    margin-bottom: 8rem;
  }
  .img-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-left: 8rem;
    margin-bottom: 25rem;
    img {
      width: 100%;
      max-width: 308px;
    }
  }
  img.image-6 {
    width: 100%;
    max-width: 1200px;
    align-self: flex-end;
    margin-bottom: 20rem;
    @include respond-to('mobile-large') {
      margin-bottom: 10rem;
    }
  }
}
</style>
