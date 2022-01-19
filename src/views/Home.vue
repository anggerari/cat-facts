<template>
  <div class="home">
    <el-row :gutter="48">
      <el-col
          v-for="(fact, index) in facts"
          :key="fact._id"
          :offset="index === 0 ? 2 : 0"
          :span="4"
      >
        <el-card style="cursor: pointer" shadow="hover" @click="selectFact(fact)">
          {{ fact.text }}
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config';
import { ElNotification } from 'element-plus';

export default {
  name: 'Home',
  data() {
    return {
      facts: [],
      deleteDialog: false,
    };
  },
  /**
   * When the component is mounted, we call this method.
   */
  mounted() {
    this.getFacts();
  },
  methods: {
    async getFacts() {
      const { status, data } = await axios.get(`${config.baseURL}/api/getListCats`);

      if (status === 200) {
        const { data: [facts] } = data;
        this.facts = facts;
      }
    },
    async selectFact(fact) {
      try {
        const { status, data } = await axios.post(`${config.baseURL}/api/add-fact-cats`, {
          fact: fact.text,
        });
        if (status !== 200) {
          ElNotification({
            title: 'Saving Failed.',
            message: data.message,
          });
        }

        ElNotification({
          title: 'Saving Completed.',
          message: data.message,
          type: 'success',
        });
      } catch (e) {
        ElNotification({
          title: 'Saving Failed.',
          message: e.response.data.message,
          type: 'error',
        });
      } finally {
        this.deleteDialog = false;
      }
    },
  },
};
</script>

<style>
.home {
  margin: 50px;
}
</style>
