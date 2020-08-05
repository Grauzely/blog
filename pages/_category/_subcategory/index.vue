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
      .skip(12 * (page - 1))
      .limit(12)
      .fetch()
  },
  async getNumberOfPages($content, category, filter) {
    return Math.ceil(
      (await $content(category, { deep: true }).only([]).fetch()).length / 12
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
    const url = params.subcategory
      ? params.category + '/' + params.subcategory
      : params.category

    const [articles, pageCount, languages] = await Promise.all([
      pagination.getArticlesOfPage($content, page, url, 'desc', null),
      pagination.getNumberOfPages($content, url, null),
      filter.getFilterOfLanguages($content, params.category),
    ])

    return { articles, page, pageCount, languages }
  },
  data() {
    return {
      articles: [],
      sortName: 'Mais Recentes',
      filterName: this.getFilterName(),
      sort: 'desc',
      filter: this.getFilterName(),
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
    getFilterName() {
      return this.$route.params.subcategory
        ? this.$route.params.subcategory
        : this.$route.params.category
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

<style>
.paginator {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.paginator .btn-left {
  background: #272729;
  padding: 9px 8px 5px 8px;
  border-radius: 5px 0 0 5px;
  border-color: transparent;
}

.paginator .btn-left:active {
  transform: scale(0.95);
}

.paginator .btn-left:focus {
  outline: 0px;
}

.paginator .btn-right {
  background: #272729;
  padding: 9px 8px 5px 8px;
  border-radius: 0 5px 5px 0;
  border-color: transparent;
}

.paginator .btn-right:active {
  transform: scale(0.95);
}

.paginator .btn-right:focus {
  outline: 0px;
}

.paginator span {
  background: #272729;
  padding: 13.2px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  margin: 0 2px;
}
</style>
