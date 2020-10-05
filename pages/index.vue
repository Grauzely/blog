<template>
  <div class="container-home">
    <div class="header-home">
      <div class="title-home">
        <h1>
          GrauZ Knowledge - Repositório de Conhecimentos
        </h1>
        <p>
          A idea desse blog é ser um repositório de conhecimentos onde eu posso
          consultar todos conhecimentos, ideias, macetes dentre outras coisas
          que eu adquiri no decorrer da minha carreira e também uma forma ajudar
          outros desenvolvedores quem tiverem intersse no conteúdo. O foco dos
          artigos sempre vão tecnlogias que eu uso para desenvolver meus
          projetos no dia-a-dia.
        </p>
      </div>
      <div class="perfil-home">
        <img class="image-perfil" src="/perfil.jpg" />
      </div>
      <div class="schema-home">
        <img src="/schema.png" />
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
.container-home {
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
  padding: 60px 100px 10px 250px;
  grid-area: title-home;
}

.title-home h1 {
  color: #fff;
  font-size: 30px;
  padding-bottom: 10px;
}

.title-home h2 {
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

@media (max-width: 1024px) {
  .title-home {
    padding: 40px 0 7px 44px;
  }
  .image-perfil {
    margin-left: 70px;
  }
  .body-home {
    padding: 0px 20px;
  }
}

@media (max-width: 800px) {
  .title-home {
    padding: 80px 10px 10px 70px;
  }
  .title-home h1 {
    font-size: 24px;
  }
  .title-home p {
    font-size: 14px;
  }
  .schema-home {
    margin-top: 20px;
  }
  .schema-home img {
    width: 500px;
  }
  .title-body h1 {
    font-size: 20px;
  }
  .body-home {
    padding: 0 50px;
  }
  .card-post-tag .tag {
    font-size: 8px;
  }
  .image-card {
    width: 20px;
  }
  .card-post-date .date {
    font-size: 10px;
  }
}

@media (max-width: 450px) {
  .body-home {
    padding: 0 10px;
    margin-bottom: 40px;
  }

  .title-home {
    padding: 85px 10px 10px 20px;
  }

  .title-home h1 {
    font-size: 19px;
  }

  .title-home h2 {
    font-size: 16px;
  }

  .schema-home img {
    width: 250px;
  }

  .schema-home {
    margin-top: 5px;
  }

  .image-perfil {
    width: 100px;
    margin-top: 80px;
  }

  .title-home p {
    font-size: 12px;
    line-height: 15px;
    margin-top: 0;
  }

  .column {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
