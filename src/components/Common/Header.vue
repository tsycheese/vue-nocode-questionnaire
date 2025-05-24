<template>
  <div class="header">
    <div class="left">
      <el-button circle size="small" :icon="ArrowLeft" @click="router.push('/')" />
    </div>
    <div class="center">
      <div v-if="isEditor">
        <el-button class="btn" type="success" size="small" @click="handleSaveSurvey">
          保存问卷
        </el-button>
      </div>
    </div>
    <div class="right">
      <img :src="imgUrl" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useEditorStore } from '@/stores/editorStore.ts';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { SurveyDBData } from '@/types/db.ts';

defineProps({
  isEditor: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const imgUrl = ref('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif');
const editorStore = useEditorStore();

const handleSaveSurvey = () => {
  ElMessageBox.prompt('请输入问卷标题', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info',
  })
    .then(({ value }) => {
      const surveyData: SurveyDBData = {
        createDate: new Date().getTime(),
        updateDate: new Date().getTime(),
        title: value,
        surveyCount: editorStore.surveyCount,
        coms: editorStore.coms,
      };
      editorStore
        .saveSurveyToDB(surveyData)
        .then(() => {
          ElMessage.success('问卷保存成功');
        })
        .catch((error) => {
          ElMessage.error('问卷保存失败');
        });
    })
    .catch(() => {
      ElMessage.info('取消保存');
    });
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--white);
}

.left {
  height: 100%;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--border-color);
}

.right {
  height: 100%;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid var(--border-color);

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}

.center {
  flex: 1;
  display: flex;
  align-items: center;

  .btn {
    margin-left: 20px;
  }
}
</style>
