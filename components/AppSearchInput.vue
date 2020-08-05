<template>
  <div class="search">
    <input
      v-model="valueSearch"
      class="input-search"
      type="search"
      autocomplete="off"
      placeholder="Buscar..."
      @keypress.enter="searchArticles"
    />
    <button class="btn-search" @click="searchArticles">
      <img src="/icon/search.svg" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueSearch: '',
    }
  },
  methods: {
    searchArticles() {
      if (this.valueSearch !== '') {
        this.$store.commit('SET_VALUE_SEARCH', this.valueSearch)
      }
    },
  },
}
</script>

<style>
.search {
  display: flex;
}

.input-search {
  height: 30px;
  padding: 0 10px;
  border-radius: 5px 0 0 5px;
  font-family: 'Exo', sans-serif;
  font-weight: 500;
  border-color: transparent;
}

.input-search:focus {
  outline: 0px;
}

.btn-search {
  background-color: #b22727;
  color: #fff;
  font-family: 'Exo', sans-serif;
  font-weight: 500;
  height: 30px;
  border-radius: 0 5px 5px 0;
  border-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-search:active {
  transform: scale(0.95);
}

.btn-search:focus {
  outline: 0px;
}
</style>
