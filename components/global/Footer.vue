<template>
  <div class="footer">
    <h5>Copyright © 2020 GrauZ Tecnologia - Todos os direitos reservados</h5>
  </div>
</template>

<script>
export default {}
</script>

<style>
.footer {
  width: 100%;
  height: 40px;
  background-color: #272729;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.footer h5 {
  color: #fff;
}

@media (max-width: 600px) {
  .footer h5 {
    text-align: center;
    font-weight: 500;
  }
}
</style>
