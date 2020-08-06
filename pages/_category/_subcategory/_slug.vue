<template>
  <article class="article">
    <div class="header-article">
      <div class="article-tag">
        <span class="tag">{{ article.tag }}</span>
      </div>
      <div class="article-date-post">
        <p class="date">
          <img src="/icon/calendar.svg" class="icon-calendar" />
          <span>{{ formatDate(article.createdAt) }}</span>
        </p>
      </div>
      <div class="article-image">
        <img :src="article.img" class="image" />
      </div>
      <div class="acticle-title">
        <h1>{{ article.title }}</h1>
      </div>
    </div>
    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content(
      params.category + '/' + params.subcategory,
      params.slug
    ).fetch()
    return { article }
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
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('pt-br', options)
    },
  },
}
</script>

<style>
.article {
  padding: 80px 15% 20px 15%;
}

.header-article {
  padding: 20px;
  background: #272729;
  color: #fff;
  border-radius: 5px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: auto auto auto auto;
  gap: 1px 1px;
  grid-template-areas: 'article-tag article-tag article-tag article-image' 'article-date-post article-date-post article-date-post article-image' 'acticle-title acticle-title acticle-title article-image';
}

.article-tag {
  grid-area: article-tag;
}

.article-tag .tag {
  background-color: #b22727;
  padding: 2px 10px;
  font-size: 10px;
  font-weight: 600;
  border-radius: 5px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.article-image {
  grid-area: article-image;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.article-image .image {
  width: 150px;
  filter: opacity(0.5);
}

.article-date-post {
  grid-area: article-date-post;
}

.article-date-post .date {
  font-size: 12px;
  letter-spacing: 1px;
  margin: 10px 0;
}

.article-date-post .icon-calendar {
  width: 12px;
  vertical-align: -1px;
}

.acticle-title {
  grid-area: acticle-title;
}

.acticle-title h1 {
  font-size: 34px;
  margin: 10px 0;
  letter-spacing: 1px;
}

.nuxt-content {
  margin: 30px 0;
}

.nuxt-content h1 {
  margin: 40px 0;
  font-size: 30px;
  letter-spacing: 1px;
}

.nuxt-content h2 {
  margin: 40px 0;
  font-size: 26px;
  letter-spacing: 0.5px;
}

.nuxt-content p {
  margin-top: 20px;
  font-size: 20px;
  line-height: 30px;
}

.nuxt-content ul li {
  margin-top: 20px;
  font-size: 20px;
  line-height: 30px;
}

.nuxt-content ol {
  font-size: 20px;
}

.nuxt-content img {
  width: 100%;
}

code {
  font-size: 14px;
}

@media (max-width: 600px) {
  .article {
    padding: 125px 10px 20px 10px;
  }

  .article-image .image {
    width: 60px;
  }

  .acticle-title h1 {
    font-size: 20px;
  }

  .article-info .info {
    width: 90%;
  }

  .nuxt-content p {
    font-size: 14px;
  }

  .nuxt-content li {
    font-size: 14px;
  }

  .nuxt-content ul li {
    font-size: 14px;
  }

  .nuxt-content h2 {
    margin: 30px 0;
    font-size: 20px;
  }
}
</style>
