<template>
  <div class="container-category">
    <div class="header-category">
      <h1>{{ nameCategory }}</h1>
      <div class="btn-category">
        <Dropdown
          :name="sortName"
          path-image="/icon/sort.svg"
          :options-drop="optionsSort"
          @update-category="updateCategory"
        />
        <Dropdown
          :name="filterName"
          path-image="/icon/filter.svg"
          :options-drop="optionsFilter"
          @update-category="updateCategory"
        />
      </div>
    </div>
    <div class="body-category">
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
  props: {
    sortName: {
      type: String,
      required: true,
    },
    filterName: {
      type: String,
      required: true,
    },
    nameCategory: {
      type: String,
      required: true,
    },
    articles: {
      type: Array,
      required: true,
    },
    optionsSort: {
      type: Array,
      required: true,
    },
    optionsFilter: {
      type: Array,
      required: true,
    },
  },
  methods: {
    updateCategory(option) {
      this.$emit('update-page', option)
    },
  },
}
</script>

<style>
.container-category {
  padding-top: 60px;
}

.header-category {
  margin: 0px 15% 2px 15%;
  border-bottom: 2px solid #b22727;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 30px;
}

.header-category h1 {
  font-size: 24px;
  text-transform: uppercase;
}

.body-category {
  padding: 0 14% 30px 14%;
}

.btn-category {
  display: flex;
  flex-direction: row;
}

@media (max-width: 1024px) {
  .header-category {
    margin: 0px 40px 2px 40px;
  }
  .body-category {
    padding: 0 25px 30px 25px;
  }
}

@media (max-width: 800px) {
  .container-category {
    padding-top: 100px;
  }
  .header-category {
    margin: 0px 67px 2px 67px;
  }
  .body-category {
    padding: 0 57px 30px 57px;
  }
}

@media (max-width: 450px) {
  .header-category {
    margin: 0px 10px 10px 10px;
    border-bottom: 0px;
    font-size: 18px;
    flex-direction: column;
    align-items: center;
  }

  .header-category h1 {
    font-size: 24px;
    text-transform: uppercase;
    border-bottom: 2px solid #b22727;
    margin-bottom: 10px;
  }

  .body-category {
    padding: 0 10px 10px 10px;
    margin-bottom: 40px;
  }
}
</style>
