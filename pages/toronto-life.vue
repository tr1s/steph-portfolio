<template>
  <div>
    <section class="inner-wrapper project">
      <h1 class="project-title">Toronto Life</h1>
      <div class="project-credits">
        <div>
          <p>Art Director</p>
          <p>Brian Wong</p>
        </div>
      </div>
      <div v-lazy-container="{ selector: 'img' }" class="content">
        <img
          :data-src="require('../assets/images/toronto-life/TL-01.jpg')"
          alt="Image from Toronto Life magazine designed by Stephanie Firka."
        />
        <div class="img-container">
          <img
            :data-src="require('../assets/images/toronto-life/TL-02.jpg')"
            alt="Image from Toronto Life magazine designed by Stephanie Firka."
          />
          <img
            :data-src="require('../assets/images/toronto-life/TL-03.jpg')"
            alt="Image from Toronto Life magazine designed by Stephanie Firka."
          />
        </div>
        <img
          :data-src="require('../assets/images/toronto-life/TL-04.jpg')"
          alt="Image from Toronto Life magazine designed by Stephanie Firka."
        />
        <img
          :data-src="require('../assets/images/toronto-life/TL-05.jpg')"
          alt="Image from Toronto Life magazine designed by Stephanie Firka."
        />
        <img
          :data-src="require('../assets/images/toronto-life/TL-06.jpg')"
          alt="Image from Toronto Life magazine designed by Stephanie Firka."
        />
      </div>
    </section>
    <div class="next-project pavillion">
      <nav>
        <nuxt-link to="/me">
          Stephanie
          <span>Firka</span>
        </nuxt-link>
        <div class="line"></div>
        <nuxt-link to="/">Projects</nuxt-link>
      </nav>
      <img v-lazy="require('../assets/images/top-hat.jpg')" class="next-project-img" />

      <nuxt-link class="next-project-link" to="/top-hat">Top Hat</nuxt-link>

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
      title: 'Stephanie Firka - Toronto Life',
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
.project-credits {
  display: flex;
  justify-content: center;
  max-width: 669px;
  margin: 0 auto;
}

.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  img:nth-of-type(1) {
    width: 100%;
    max-width: 900px;
    align-self: flex-end;
    margin-bottom: 24rem;
    @include respond-to('mobile-large') {
      margin-bottom: 10rem;
    }
  }
  .img-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 3rem;
    @include respond-to('mobile-large') {
      margin-bottom: 10rem;
    }
    img:first-child {
      width: 100%;
      max-width: 410px;
      align-self: flex-start;
    }
    img:last-child {
      width: 100%;
      max-width: 818px;
      align-self: flex-start;
      position: relative;
      top: 17.5rem;
      left: -10rem;
      @include respond-to('desktop-13') {
        position: initial;
        top: 0;
        left: 0;
      }
    }
  }
  img:nth-of-type(2) {
    width: 100%;
    max-width: 1089px;
    align-self: flex-start;
    margin-bottom: 25rem;
    @include respond-to('mobile-large') {
      margin-bottom: 0rem;
    }
  }
  img:nth-of-type(3) {
    width: 100%;
    max-width: 818px;
    align-self: flex-end;
    margin-bottom: 10rem;
    margin-right: 8rem;
    @include respond-to('tablet-large') {
      margin-right: 0;
    }
    @include respond-to('mobile-large') {
      margin-top: 10rem;
      margin-bottom: 10rem;
    }
  }
  img:nth-of-type(4) {
    width: 100%;
    align-self: center;
    max-width: 1105px;
    margin-bottom: 0;
  }
}
</style>
