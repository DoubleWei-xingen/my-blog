<template>
  <div class="edit-container">
    <EditProject mode="add"/>
  </div>
</template>

<script>
import EditProject from '@/components/EditProject'
export default {
  components:{
    EditProject
  }
}
</script>

<style>
.edit-container{
  padding: 4px 10px 0px 10px;
}
</style>