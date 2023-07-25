<template>
  <div>
    <section class="inner-wrapper project">
      <h1 class="project-title">Top Hat</h1>
      <div class="project-credits">
        <p>Creative Director</p>
        <p>Mark Ocampo</p>
      </div>
      <div v-lazy-container="{ selector: 'img' }" class="content">
        <div class="img-container">
          <img
            :data-src="require('../assets/images/top-hat/TH-01.jpg')"
            alt="Image from Block magazine designed by Stephanie Firka."
          />
          <img
            :data-src="require('../assets/images/top-hat/TH-02.jpg')"
            alt="Image from Block magazine designed by Stephanie Firka."
          />
        </div>
        <img
          class="image-3"
          :data-src="require('../assets/images/top-hat/TH-03.jpg')"
          alt="Image from Block magazine designed by Stephanie Firka."
        />
        <img
          class="image-4"
          :data-src="require('../assets/images/top-hat/TH-04.jpg')"
          alt="Image from Block magazine designed by Stephanie Firka."
        />
        <img
          class="image-5"
          :data-src="require('../assets/images/top-hat/TH-05.jpg')"
          alt="Image from Block magazine designed by Stephanie Firka."
        />
        <div class="img-container-2">
          <img
            :data-src="require('../assets/images/top-hat/TH-06.jpg')"
            alt="Image from Block magazine designed by Stephanie Firka."
          />
          <img
            :data-src="require('../assets/images/top-hat/TH-07.jpg')"
            alt="Image from Block magazine designed by Stephanie Firka."
          />
          <img
            :data-src="require('../assets/images/top-hat/TH-08.jpg')"
            alt="Image from Block magazine designed by Stephanie Firka."
          />
        </div>
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
      <img v-lazy="require('../assets/images/pavilion-project.jpg')" class="next-project-img" />

      <nuxt-link class="next-project-link" to="/pavilion-project">Pavilion Project</nuxt-link>

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
      title: 'Stephanie Firka - Block',
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
  .img-container {
    display: flex;
    flex-wrap: wrap;
    @include respond-to('desktop-13') {
      justify-content: center;
    }
    img:first-child {
      align-self: flex-start;
      width: 100%;
      max-width: 408px;
      position: relative;
      top: 7rem;
      left: 16rem;
      margin-bottom: 10rem;
      @include respond-to('desktop-13') {
        left: 0;
      }
    }
    img:last-child {
      width: 100%;
      max-width: 565px;
      margin-bottom: 0;
      position: relative;
      left: 19rem;
      right: 0;
      @include respond-to('desktop-13') {
        left: 2rem;
        right: 0;
      }
      @include respond-to('tablet') {
        left: 0rem;
      }
    }
  }
  img.image-3 {
    width: 100%;
    max-width: 355px;
    align-self: flex-end;
    margin-top: 9rem;
    position: relative;
    right: 22.6rem;
    @include respond-to('tablet') {
      right: 0rem;
    }
  }
  img.image-4 {
    width: 100%;
    max-width: 1000px;
    margin-top: 14rem;
    position: relative;
    align-self: flex-end;
  }
  img.image-5 {
    width: 100%;
    max-width: 956px;
    margin-top: -7rem;
    margin-bottom: 25rem;
    position: relative;
    right: 26rem;
    align-self: flex-end;
    @include respond-to('desktop-13') {
      right: 0rem;
      align-self: flex-start;
    }
  }
  .img-container-2 {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2.6rem;
    img {
      width: 100%;
      max-width: 414px;
    }
  }
}
</style>
