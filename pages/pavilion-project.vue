<template>
  <div>
    <section class="inner-wrapper project">
      <h1 class="project-title">Pavilion Project</h1>
      <div class="project-credits">
        <p>Creative Director</p>
        <p>Whitman Emorson</p>
      </div>
      <div v-lazy-container="{ selector: 'img' }" class="content">
        <div class="img-container">
          <img
            :data-src="require('../assets/images/pavilion-project/MemberCard_PAV_170131.jpg')"
            alt="Image from Pavilion Project branding designed by Stephanie Firka."
          />
          <img
            :data-src="require('../assets/images/pavilion-project/Tote2-a_PAV_170131.jpg')"
            alt="Image from Pavilion Project branding designed by Stephanie Firka."
          />
        </div>
        <img
          :data-src="require('../assets/images/pavilion-project/Postcards_PAV_170131.jpg')"
          alt="Image from Pavilion Project branding designed by Stephanie Firka."
        />
        <div class="img-container-2">
          <img
            :data-src="require('../assets/images/pavilion-project/Credentals_PAV_170131.jpg')"
            alt="Image from Pavilion Project branding designed by Stephanie Firka."
          />
          <img
            :data-src="require('../assets/images/pavilion-project/Bags_PAV_170131.jpg')"
            alt="Image from Pavilion Project branding designed by Stephanie Firka."
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
      <img v-lazy="require('../assets/images/tmu.jpg')" class="next-project-img" />

      <nuxt-link class="next-project-link" to="/tmu">TMU</nuxt-link>

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
      title: 'Stephanie Firka - Pavilion Project',
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
    justify-content: space-between;
    margin-bottom: 36rem;
    @include respond-to('mobile-large') {
      margin-bottom: 10rem;
    }
    img:first-child {
      width: 100%;
      max-width: 440px;
      align-self: flex-start;
    }
    img:last-child {
      width: 100%;
      max-width: 635px;
      align-self: flex-end;
      position: relative;
      top: 17.5rem;
      right: 0rem;
      @include respond-to('desktop-13') {
        position: initial;
        top: 0;
        left: 0;
      }
    }
  }
  img:nth-of-type(1) {
    width: 100%;
    max-width: 1260px;
    align-self: flex-start;
    margin-bottom: 24rem;
    @include respond-to('mobile-large') {
      margin-bottom: 10rem;
    }
  }
  .img-container-2 {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 0;
    @include respond-to('desktop-13') {
      margin-bottom: 0rem;
    }
    img:first-child {
      width: 100%;
      max-width: 635px;
      align-self: flex-end;
      margin-bottom: 0;
      @include respond-to('desktop-13') {
        margin-bottom: 20rem;
      }
      @include respond-to('mobile-large') {
        margin-bottom: 10rem;
      }
    }
    img:last-child {
      width: 100%;
      max-width: 1100px;
      align-self: center;
      position: relative;
      top: -6rem;
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
    margin-bottom: -6rem;
    @include respond-to('mobile-large') {
      margin-bottom: 0;
    }
  }
}
</style>
