<template>
  <nuxt-link :to="article.path">
    <div class="card">
      <div class="card-post-tag">
        <span class="tag">{{ article.tag }}</span>
      </div>
      <div class="card-post-date">
        <p class="date">
          <img src="/icon/calendar.svg" class="icon-calendar" />
          <span>{{ formatDate(article.createdAt) }}</span>
        </p>
      </div>
      <div class="card-post-image">
        <img :src="article.img" class="image-card" />
      </div>

      <div class="card-post-title">
        <h2>{{ article.title }}</h2>
      </div>
      <div class="card-post-description">
        <p class="description">
          {{ article.description }}
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('pt-br', options)
    },
  },
}
</script>

<style>
.card {
  background: #272729;
  border-radius: 5px;
  margin: 15px;
  padding: 20px 20px;
  color: #fff;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: auto auto auto auto auto;
  gap: 1px 1px;
  grid-template-areas: 'card-post-tag card-post-tag card-post-tag card-post-image' 'card-post-date card-post-date card-post-date card-post-image' 'card-post-title card-post-title card-post-title card-post-title' 'card-post-description card-post-description card-post-description card-post-description';
  transition: all 0.2s;
}

.card:hover {
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -ms-transform: scale(1.05);
  -o-transform: scale(1.05);
  transform: scale(1.05);
}

.card-post-date {
  grid-area: card-post-date;
}

.card-post-tag {
  grid-area: card-post-tag;
}

.card-post-image {
  grid-area: card-post-image;
  display: flex;
  justify-content: flex-end;
}

.card-post-title {
  grid-area: card-post-title;
}

.card-post-description {
  grid-area: card-post-description;
}

.image-card {
  width: 25px;
  position: absolute;
}

.card-post-tag .tag {
  background-color: #b22727;
  padding: 2px 10px;
  font-size: 10px;
  font-weight: 600;
  border-radius: 5px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.card-post-date .date {
  font-size: 12px;
  margin: 10px 0;
  letter-spacing: 1px;
}

.card-post-date .icon-calendar {
  width: 12px;
  vertical-align: -1px;
}

.card h2 {
  font-size: 20px;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.card-post-description .description {
  font-size: 14px;
  margin-bottom: 15px;
  font-weight: 400;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

@media (max-width: 800px) {
  .card {
    margin: 10px;
    padding: 10px 15px;
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
  .card h2 {
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .card-post-description .description {
    font-size: 12px;
  }
}

@media (max-width: 450px) {
  .card-post-description .description {
    font-size: 12px;
  }
}
</style>
