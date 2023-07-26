<template>
  <div>
    <section class="inner-wrapper project">
      <h1 class="project-title">Canadian Business</h1>
      <div class="project-credits">
        <p>Art Director</p>
        <p>John Montgomery</p>
      </div>
      <div v-lazy-container="{ selector: 'img' }" class="content">
        <img
          :data-src="require('../assets/images/canadian-business/CB17_JAN2017_HI-16.jpg')"
          alt="Image from Canadian Business magazine designed by Stephanie Firka."
        />
        <img
          :data-src="require('../assets/images/canadian-business/CB17_JAN2017_HI-17.jpg')"
          alt="Image from Canadian Business magazine designed by Stephanie Firka."
        />
        <div class="img-container">
          <img
            :data-src="require('../assets/images/canadian-business/BestPackagenew.jpg')"
            alt="Image from Canadian Business magazine designed by Stephanie Firka."
          />
          <img
            :data-src="require('../assets/images/canadian-business/BestPackage3new.jpg')"
            alt="Image from Canadian Business magazine designed by Stephanie Firka."
          />
        </div>
        <img
          :data-src="require('../assets/images/canadian-business/CB-RonWhite-white.jpg')"
          alt="Image from Canadian Business magazine designed by Stephanie Firka."
        />
        <div class="img-container-2">
          <img
            :data-src="require('../assets/images/canadian-business/CB07–08_SUM2016-HI-16.jpg')"
            alt="Image from Canadian Business magazine designed by Stephanie Firka."
          />
          <img
            :data-src="require('../assets/images/canadian-business/CB07–08_SUM2016-HI-17.jpg')"
            alt="Image from Canadian Business magazine designed by Stephanie Firka."
          />
          <img
            :data-src="require('../assets/images/canadian-business/CB07–08_SUM2016-HI-20.jpg')"
            alt="Image from Canadian Business magazine designed by Stephanie Firka."
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
      <img v-lazy="require('../assets/images/toronto-life.jpg')" class="next-project-img" />

      <nuxt-link class="next-project-link" to="/toronto-life">Toronto Life</nuxt-link>

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
      title: 'Stephanie Firka - Canadian Business',
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
.project-title {
  line-height: 1;
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  img:nth-of-type(1) {
    width: 95%;
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 10rem;
    @include respond-to('tablet') {
      width: 100%;
      margin-bottom: 16rem;
    }
    @include respond-to('mobile-large') {
      margin-bottom: 10rem;
    }
  }
  img:nth-of-type(2) {
    width: 100%;
    max-width: 900px;
    align-self: flex-start;
    margin-bottom: 30rem;
    @include respond-to('mobile-large') {
      margin-bottom: 10rem;
    }
  }
  .img-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 22rem;
    @include respond-to('tablet-large') {
      margin-bottom: 10rem;
    }
    @include respond-to('mobile-large') {
      margin-bottom: 0;
    }
    img:first-child {
      width: 100%;
      max-width: 986px;
      align-self: flex-start;
      margin-bottom: 0;
    }
    img:last-child {
      width: 100%;
      max-width: 416px;
      align-self: flex-end;
      position: relative;
      top: -9.3rem;
      right: 4rem;
      margin-bottom: 0;
      @include respond-to('tablet') {
        position: initial;
        top: 0;
        left: 0;
        margin-top: 10rem;
        margin-bottom: 10rem;
      }
    }
  }
  img:nth-of-type(3) {
    width: 100%;
    max-width: 805px;
    align-self: flex-start;
    margin-bottom: 30rem;
    margin-left: 12rem;
    @include respond-to('tablet-large') {
      margin-left: 0;
      align-self: center;
    }
    @include respond-to('mobile-large') {
      margin-bottom: 10rem;
    }
  }
  .img-container-2 {
    display: flex;
    align-items: flex-start;
    margin-bottom: 0rem;
    position: relative;
    @include respond-to('desktop-15') {
      margin-bottom: 60rem;
    }
    @include respond-to('tablet-large') {
      flex-direction: column;
      align-items: center;
      margin-bottom: 0;
    }
    @include respond-to('mobile-small') {
      margin-bottom: -3.5rem;
    }
    img:nth-of-type(1) {
      width: 100%;
      max-width: 364px;
      margin: 0;
      margin-right: 4rem;
      @include respond-to('tablet-large') {
        margin-right: 0;
        margin-bottom: 20rem;
      }
      @include respond-to('mobile-large') {
        margin-bottom: 10rem;
        max-width: 100%;
      }
    }
    img:nth-of-type(2) {
      width: 100%;
      max-width: 364px;
      position: relative;
      margin: 0;
      @include respond-to('desktop-13') {
        position: initial;
        top: 0;
        left: 0;
      }
      @include respond-to('tablet-large') {
        margin-bottom: 20rem;
      }
      @include respond-to('mobile-large') {
        max-width: 100%;
        margin-bottom: 10rem;
      }
    }
    img:nth-of-type(3) {
      width: 100%;
      max-width: 791px;
      position: relative;
      align-self: flex-end;
      top: 23rem;
      left: -17rem;
      margin: 0;
      margin-bottom: 23rem;
      @include respond-to('desktop-15') {
        align-self: center;
        position: absolute;
        top: 65rem;
        left: 50%;
        transform: translateX(-50%);
      }
      @include respond-to('tablet-large') {
        align-self: center;
        position: initial;
        top: 0;
        left: 0;
        transform: initial;
        margin-bottom: 0;
      }
      @include respond-to('mobile-small') {
        margin-bottom: 3.5rem;
      }
    }
  }
}
</style>
