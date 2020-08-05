<template>
  <nav class="nav-top">
    <div class="nav-desktop">
      <div class="logo">
        <img src="/logo.svg" width="80" />
      </div>
      <div class="nav-menu">
        <ul>
          <li
            v-for="(menu, index) in itensMenu"
            :key="index"
            ref="menuDesktop"
            @click="setMenuSelect(index)"
          >
            <NuxtLink :to="menu.path">{{ menu.name }}</NuxtLink>
          </li>
        </ul>
        <hr class="nav-menu-select" :style="getStylesSelectMenu" />
      </div>
      <div class="nav-search">
        <AppSearchInput />
      </div>
    </div>
    <div class="nav-mobile">
      <div id="menu-mobile" class="nav-menu-mobile">
        <ul>
          <li
            v-for="(menu, index) in itensMenu"
            :key="index"
            ref="menuMobile"
            @click="setMenuSelect(index)"
          >
            <NuxtLink :to="menu.path">{{ menu.name }}</NuxtLink>
          </li>
        </ul>
        <hr class="nav-menu-select-mobile" :style="getStylesSelectMenu" />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      underlinePosition: 0,
      menuSize: 0,
      itensMenu: [
        {
          name: 'HOME',
          path: '/',
        },
        {
          name: 'FRONTEND',
          path: '/frontend',
        },
        {
          name: 'BACKEND',
          path: '/backend',
        },
        {
          name: 'MOBILE',
          path: '/mobile',
        },
        {
          name: 'DATABASE',
          path: '/database',
        },
        {
          name: 'SERVER',
          path: '/server',
        },
        {
          name: 'TEST',
          path: '/test',
        },
      ],
    }
  },
  computed: {
    indexMenuUrl() {
      if (this.$route.params.category === 'frontend') return 1
      if (this.$route.params.category === 'backend') return 2
      if (this.$route.params.category === 'mobile') return 3
      if (this.$route.params.category === 'database') return 4
      if (this.$route.params.category === 'server') return 5
      if (this.$route.params.category === 'test') return 6
      return 0
    },
    isMobile() {
      if (this.$refs.menuMobile[this.indexMenuUrl].offsetWidth > 0) return true
      return false
    },
    marginLeft() {
      return `${this.underlinePosition}px`
    },
    getStylesSelectMenu() {
      return [
        { width: `${this.menuSize}px` },
        { 'margin-left': this.marginLeft },
      ]
    },
  },
  mounted() {
    this.initMenuSelect()
  },
  methods: {
    initMenuSelect() {
      if (this.isMobile) {
        this.setMenuSelectMobile(this.indexMenuUrl)
      } else {
        this.setMenuSelectDesktop(this.indexMenuUrl)
      }
    },
    showInitMenuSelect() {
      this.setMenuSelectDesktop(this.indexMenuUrl)
    },
    showOverMenuSelect(indexMenuLoop) {
      this.setMenuSelectDesktop(indexMenuLoop)
    },
    setMenuSelect(indexMenuLoop) {
      if (this.isMobile) {
        this.setMenuSelectMobile(indexMenuLoop)
      } else {
        this.setMenuSelectDesktop(indexMenuLoop)
      }
    },
    setMenuSelectMobile(indexMenu) {
      this.menuSize = this.$refs.menuMobile[indexMenu].offsetWidth
      this.underlinePosition =
        this.$refs.menuMobile[indexMenu].offsetLeft -
        this.$refs.menuMobile[0].offsetLeft
      const menuMobile = this.$el.querySelector('#menu-mobile')
      if (indexMenu > 2) menuMobile.scrollLeft = this.underlinePosition
      if (indexMenu <= 2) menuMobile.scrollLeft = 0
    },
    setMenuSelectDesktop(indexMenu) {
      this.menuSize = this.$refs.menuDesktop[indexMenu].offsetWidth
      this.underlinePosition =
        this.$refs.menuDesktop[indexMenu].offsetLeft -
        this.$refs.menuDesktop[0].offsetLeft
    },
  },
}
</script>

<style>
.nav-top {
  background-color: #272729;
  padding: 0 15%;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 5px 10px #00000059;
  position: fixed;
  width: 100%;
  z-index: 99;
}

.nav-desktop {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.nav-menu {
  text-align: center;
  margin: 0 auto;
}

.nav-menu ul {
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
  margin-bottom: 16px;
  margin-top: 17px;
}

.nav-menu ul li {
  display: inline;
}

.nav-menu ul li a {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1.2px;
  margin: 0 15px;
}

.nav-menu-select {
  height: 5px;
  margin: 0;
  background: #b22727;
  border-radius: 15px 0;
  border: none;
  transition: margin 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-mobile {
  display: none;
}

@media (max-width: 600px) {
  .nav-top {
    padding: 0 20px;
    justify-content: space-between;
    height: 110px;
  }

  .nav-desktop {
    margin-top: 10px;
  }

  .nav-menu {
    display: none;
  }

  .nav-mobile {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .nav-menu-mobile {
    text-align: center;
    margin: 0 auto;
    overflow: auto;
    white-space: nowrap;
  }

  .nav-menu-mobile::-webkit-scrollbar {
    display: none;
  }

  .nav-menu-mobile {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .nav-menu-mobile ul {
    list-style-type: none;
    margin: 0 auto;
    padding: 0;
    margin-bottom: 8px;
    margin-top: 17px;
  }

  .nav-menu-mobile ul li {
    display: inline;
  }

  .nav-menu-mobile ul li a {
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1.2px;
    margin: 0 17px;
  }

  .nav-menu-select-mobile {
    height: 5px;
    margin: 0;
    background: #b22727;
    border-radius: 15px 0;
    border: none;
    transition: margin 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
}
</style>
