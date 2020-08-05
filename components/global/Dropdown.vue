<template>
  <div class="dropdown">
    <button class="dropbtn">
      {{ name }}

      <img :src="pathImage" class="image-icon" />
    </button>
    <div class="dropdown-content">
      <a
        v-for="(option, i) in optionsDrop"
        :key="i"
        href="javascript: void(0)"
        @click="selectOption(option)"
        >{{ option }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    pathImage: {
      type: String,
      required: true,
    },
    optionsDrop: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectOption(option) {
      this.$emit('update-category', option)
    },
  },
}
</script>

<style>
.dropbtn {
  background-color: #fff;
  color: #000;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.2px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 1px 1px 10px #00000026;
  font-family: 'Exo', sans-serif;
  text-transform: capitalize;
}

.dropbtn:focus {
  outline: none;
}

.dropdown {
  position: relative;
  display: inline-block;
  margin-left: 5px;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-transform: capitalize;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
  border-radius: 5px;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #272729;
  color: #fff;
}

.dropdown:hover .image-icon {
  filter: invert(100%) sepia(1%) saturate(3%) hue-rotate(6deg) brightness(103%)
    contrast(101%);
}

.image-icon {
  width: 16px;
  vertical-align: -3px;
  filter: grayscale(100%);
}
</style>
