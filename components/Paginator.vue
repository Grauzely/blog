<template>
  <div class="paginator">
    <button class="btn-left" @click="prevPage">
      <img src="/left.svg" />
    </button>
    <span>{{ pageCurrent }} de {{ pageTotal }}</span>
    <button class="btn-right" @click="nextPage">
      <img src="/right.svg" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    pageCurrent: {
      type: Number,
      required: true,
    },
    pageTotal: {
      type: Number,
      required: true,
    },
  },
  methods: {
    prevPage() {
      this.$emit('prev-page')
    },
    nextPage() {
      this.$emit('next-page')
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
