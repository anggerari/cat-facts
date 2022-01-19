<template>
  <div class="facts">
    <!-- Display the data with a structured table, element-ui is ready for use -->
    <el-row>
      <el-col :offset="6" :span="12">
        <el-row :gutter="20">
          <el-col :span="20">
            <el-input
                v-model="newFact"
                placeholder="Please input"
                clearable
                @keyup.enter="submitFact"
            />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" :icon="Upload" @click="submitFact">Submit</el-button>
          </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-table :data="facts" style="width: 100%">
          <el-table-column prop="fact" label="Fact" />
          <el-table-column prop="created_at" label="Created At" />
          <el-table-column prop="updated_at" label="Updated At" />
          <el-table-column fixed="right" label="Operations">
            <template #default="{ row }">
<!--              <el-button type="primary" size="small">-->
<!--                Detail-->
<!--              </el-button>-->
              <el-button type="primary" size="small" @click="showEditDialog(row.id, row.fact)">
                Edit
              </el-button>
              <el-button type="danger" size="small" @click="showDeleteDialog(row.id)">
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog v-model="editDialog" title="Edit Facts">
        <el-form-item label="Fact Name" :label-width="100">
          <el-input v-model="selectedFactValue" autocomplete="off"></el-input>
        </el-form-item>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialog = false">Cancel</el-button>
        <el-button type="primary" @click="UpdateMyFact">Confirm</el-button>
      </span>
      </template>
    </el-dialog>

    <!-- Confirm Delete Fact Dialogue -->
    <el-dialog
        v-model="deleteDialog"
        title="Are you sure you want to delete?"
        width="30%"
    >
      <span>You can not revert this action.</span>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialog = false">
            Cancel
          </el-button>
          <el-button type="danger" @click="deleteMyFact">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config';

import { ElNotification } from 'element-plus';
import { Upload } from '@element-plus/icons-vue';

export default {
  name: 'MyFacts',
  data() {
    return {
      deleteDialog: false,
      editDialog: false,
      facts: [],
      newFact: '',
      selectedFactId: null,
      selectedFactValue: null,
      Upload,
    };
  },
  mounted() {
    this.fetchMyFacts();
  },
  methods: {
    /**
     * Set selectedFactId for further reference then show delete dialog.
     * @param factId
     */
    showDeleteDialog(factId) {
      this.deleteDialog = true;
      this.selectedFactId = factId;
    },

    /**
     * Set selectedFactId & Fact Value for further reference then show edit dialog.
     * @param factId
     * @param factValue
     */
    showEditDialog(factId, factValue) {
      this.editDialog = true;
      this.selectedFactId = factId;
      this.selectedFactValue = factValue;
    },

    /**
     * API Calls to getCatFacts.
     * @returns {Promise<void>}
     */
    async fetchMyFacts() {
      const { status, data } = await axios.get(`${config.baseURL}/api/getCatFacts`);

      if (status === 200) {
        const { data: dataFacts } = data;
        this.facts = dataFacts;
      }
    },

    /**
     *
     * API Call Insert Fact Cats
     *
     * @returns {Promise<void>}
     */
    async submitFact() {
      try {
        const { status, data } = await axios.post(`${config.baseURL}/api/add-fact-cats`, {
          fact: this.newFact,
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
        await this.fetchMyFacts();
        this.newFact = '';
      } catch (e) {
        ElNotification({
          title: 'Saving Failed.',
          message: e.response.data.message,
          type: 'error',
        });
      }
    },

    /**
     * API Calls to deleteMyFact.
     * @returns {Promise<void>}
     */
    async deleteMyFact() {
      try {
        const { status, data } = await axios.delete(`${config.baseURL}/api/delete-fact-cats/${this.selectedFactId}`);

        if (status === 200) {
          ElNotification({
            title: 'Delete Success.',
            message: data.message,
            type: 'success',
          });

          await this.fetchMyFacts();
        }
      } catch (err) {
        ElNotification({
          title: 'Delete Failed.',
          message: err.message,
          type: 'error',
        });
      } finally {
        this.deleteDialog = false;
      }
    },

    /**
     * API Calls to UpdateMyFact
     * @returns {Promise<void>}
     */

    async UpdateMyFact() {
      try {
        const { status, data } = await axios.put(`${config.baseURL}/api/update-fact-cats/${this.selectedFactId}`, {
          fact: this.selectedFactValue,
        });

        if (status === 200) {
          ElNotification({
            title: 'Update Success.',
            message: data.message,
            type: 'success',
          });

          await this.fetchMyFacts();
        }
      } catch (err) {
        ElNotification({
          title: 'Update Failed.',
          message: err.message,
          type: 'error',
        });
      } finally {
        this.editDialog = false;
      }
    },
  },
};
</script>

<style>
.facts {
  margin: 1rem 2rem;
}
</style>
