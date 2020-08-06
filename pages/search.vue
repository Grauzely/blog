<template>
  <div class="container">
    <div class="body-search">
      <div class="title-body">
        <h1>Resultados da busca "{{ this.$route.query.value }}"</h1>
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
  async asyncData({ $content, params, query }) {
    const articles = await $content('/', { deep: true })
      .search(query.value)
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
    async searchArticle(valueSearch) {
      this.articles = await this.$content('/', { deep: true })
        .search(valueSearch)
        .fetch()
      this.$store.commit('SET_VALUE_SEARCH', '')
    },
  },
}
</script>

<style>
@media (max-width: 600px) {
  .body-search {
    margin-top: 50px;
  }
}
</style>
