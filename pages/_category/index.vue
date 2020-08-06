<template>
  <div>
    <PageCategory
      :name-category="$route.params.category"
      :articles="articles"
      :sort-name="sortName"
      :filter-name="filterName"
      :options-sort="optionsSort"
      :options-filter="optionsFilter"
      @update-page="orderOrFilterPage"
    />
    <Paginator
      v-show="pageCount > 0"
      :page-current="page"
      :page-total="pageCount"
      @prev-page="prevPage"
      @next-page="nextPage"
    />
  </div>
</template>

<script>
const pagination = {
  getArticlesOfPage($content, page, category, sort, filter) {
    return $content(category, { deep: true })
      .sortBy('createdAt', sort)
      .skip(9 * (page - 1))
      .limit(9)
      .fetch()
  },
  async getNumberOfPages($content, category, filter) {
    return Math.ceil(
      (await $content(category, { deep: true }).only([]).fetch()).length / 9
    )
  },
}

const filter = {
  getFilterOfLanguages($content, category) {
    return $content(category, { deep: true }).only(['language']).fetch()
  },
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

export default {
  async asyncData({ $content, query, params }) {
    const page = parseInt(query.page || '1') || 1

    const [articles, pageCount, languages] = await Promise.all([
      pagination.getArticlesOfPage(
        $content,
        page,
        params.category,
        'desc',
        null
      ),
      pagination.getNumberOfPages($content, params.category, null),
      filter.getFilterOfLanguages($content, params.category),
    ])

    return { articles, page, pageCount, languages }
  },
  data() {
    return {
      articles: [],
      sortName: 'Mais Recentes',
      filterName: 'Todos',
      sort: 'desc',
      filter: null,
      page: 1,
      pageCount: 1,
      languages: [],
      optionsSort: ['Mais Recentes', 'Mais Antigos'],
    }
  },
  computed: {
    optionsFilter() {
      return [
        'Todos',
        ...this.languages
          .map((language) => language.language)
          .filter(onlyUnique)
          .sort(),
      ]
    },
  },
  watch: {
    async page() {
      let routerFilter = this.$route.params.category
      if (this.filter) {
        routerFilter = this.$route.params.category + '/' + this.filter
      }
      this.$router.replace({
        path: '/' + this.$route.params.category,
        query: { page: this.page },
      })
      this.articles = await pagination.getArticlesOfPage(
        this.$content,
        this.page,
        routerFilter,
        this.sort,
        this.filter
      )
    },
    async sort() {
      let routerFilter = this.$route.params.category
      if (this.filter) {
        routerFilter = this.$route.params.category + '/' + this.filter
      }
      this.articles = await pagination.getArticlesOfPage(
        this.$content,
        this.page,
        routerFilter,
        this.sort,
        this.filter
      )
    },
    async filter() {
      let routerFilter = this.$route.params.category
      if (this.filter !== 'Todos') {
        routerFilter = this.$route.params.category + '/' + this.filter
        this.$router.push({
          path: '/' + this.$route.params.category + '/' + this.filter,
        })
      } else {
        this.$router.push({
          path: '/' + this.$route.params.category,
        })
      }
      this.pageCount = await pagination.getNumberOfPages(
        this.$content,
        routerFilter,
        this.filter
      )
      this.articles = await pagination.getArticlesOfPage(
        this.$content,
        this.page,
        routerFilter,
        this.sort,
        this.filter
      )
    },
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
    orderOrFilterPage(option) {
      if (option.includes('Recentes')) {
        this.sort = 'desc'
        this.sortName = option
      } else if (option.includes('Antigos')) {
        this.sort = 'asc'
        this.sortName = option
      } else {
        this.filter = option
        this.filterName = option
      }
    },
    nextPage() {
      if (this.page < this.pageCount) this.page += 1
    },
    prevPage() {
      if (this.page > 1) this.page -= 1
    },
  },
}
</script>

<style></style>
