<template>
  <div class="header">
    <div class="left">
      <el-button circle size="small" :icon="ArrowLeft" @click="router.push('/')" />
    </div>
    <div class="center">
      <div v-if="isEditor" class="btn-group">
        <div v-if="surveyId">
          <el-button class="btn" type="warning" size="small" @click="handleUpdateSurvey">
            更新问卷
          </el-button>
        </div>
        <div v-else>
          <el-button class="btn" type="danger" size="small" @click="handleRestoreSurvey">
            重置问卷
          </el-button>
          <el-button class="btn" type="success" size="small" @click="handleSaveSurvey">
            保存问卷
          </el-button>
        </div>
        <div>
          <el-button class="btn" type="primary" size="small" @click="goToPreview"> 预览 </el-button>
        </div>
      </div>
    </div>
    <div class="right">
      <img :src="imgUrl" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
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
const route = useRoute();
const surveyId = route.params.id;
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

const handleUpdateSurvey = () => {
  ElMessageBox.confirm('是否更新问卷？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    editorStore
      .updateSurveyToDB(Number(surveyId))
      .then(() => {
        ElMessage.success('问卷更新成功');
      })
      .catch((error) => {
        ElMessage.error('问卷更新失败');
      });
  });
};

const handleRestoreSurvey = () => {
  ElMessageBox.confirm('是否重置问卷？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      editorStore.setStore();
      ElMessage.success('问卷重置成功');
    })
    .catch(() => {
      ElMessage.info('取消重置');
    });
};

const goToPreview = () => {
  ElMessageBox.confirm('预览将会保存问卷，是否继续？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    editorStore
      .updateSurveyToDB(Number(surveyId))
      .then(() => {
        router.push(`/preview/${surveyId}`);
      })
      .catch((error) => {
        ElMessage.error('问卷更新失败');
      });
  });
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
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
  flex-grow: 1;
  padding: 0 20px;
}

.btn-group {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
</style>
