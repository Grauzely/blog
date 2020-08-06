<template>
  <div class="container">
    <div class="header-home">
      <div class="title-home">
        <h1>BEM-VINDO A GRAUZ TECNOLOGIA</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div class="perfil-home">
        <img class="image-perfil" src="/perfil.jpg" />
      </div>
      <div class="schema-home">
        <img src="/schema.svg" />
      </div>
    </div>
    <div class="body-home">
      <div class="title-body">
        <h1>NOVOS ARTIGOS</h1>
      </div>
      <div class="row">
        <div v-for="(article, i) in articles" :key="i" class="column">
          <Card :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('/', { deep: true })
      .sortBy('createdAt', 'desc')
      .limit(6)
      .fetch()

    return {
      articles,
    }
  },
  data() {
    return {
      articles: [],
    }
  },
  mounted() {
    this.$store.watch(this.$store.getters.getValueSearch, (valueSearch) => {
      if (valueSearch !== '') this.searchArticle(valueSearch)
    })
  },
  methods: {
    searchArticle(valueSearch) {
      this.$router.push({
        path: '/search',
        query: { value: valueSearch },
      })
    },
  },
}
</script>

<style>
.container {
  padding-top: 60px;
}

.header-home {
  background: linear-gradient(0deg, #272729d1, #272729d1), url(/bg.svg);
  height: 450px;
  background-position: center;
  background-size: cover;
  display: grid;
  grid-template-columns: 1.4fr 0.6fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px 1px;
  grid-template-areas: 'title-home perfil-home' 'schema-home schema-home';
}

a:-webkit-any-link {
  text-decoration: none;
}

.title-home {
  padding: 100px 100px 10px 250px;
  grid-area: title-home;
}

.title-home h1 {
  color: #fff;
}

.title-home p {
  color: #fff;
  line-height: 26px;
  margin-top: 5px;
}

.perfil-home {
  grid-area: perfil-home;
}

.image-perfil {
  width: 150px;
  margin-top: 85px;
  border-radius: 100px;
  border: 2px solid #b22727;
}

.schema-home {
  grid-area: schema-home;
  text-align: center;
  margin-top: 30px;
}

.body-home {
  padding: 0 200px;
  margin-bottom: 40px;
}

.title-body {
  text-align: center;
}

.title-body h1 {
  font-size: 24px;
  margin: 30px auto;
  border-bottom: 2px solid #b22727;
  display: inline-block;
}

.row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
}

.column {
  flex: 0 0 33.33%;
  max-width: 33.33%;
}

@media (max-width: 600px) {
  .body-home {
    padding: 0 10px;
    margin-bottom: 40px;
  }

  .title-home {
    padding: 140px 10px 10px 20px;
  }

  .title-home h1 {
    font-size: 19px;
  }

  .schema-home img {
    width: 250px;
  }

  .image-perfil {
    width: 100px;
    margin-top: 120px;
  }

  .title-home p {
    font-size: 12px;
  }

  .column {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
