<template>
  <div class="pic-item">
    <div style="width: 200px; height: 200px">
      <el-upload
        @click.prevent
        accept=".jpg,.png,.jpeg"
        name="image"
        action="/api/upload"
        :show-file-list="false"
        :on-success="handleImageUpload"
        :before-upload="beforeImageUpload"
      >
        <img v-if="url" :src="url" class="upload-img" />
        <div v-else class="upload-text">
          <el-icon>
            <Upload />
          </el-icon>
          <div>上传图片</div>
        </div>
      </el-upload>
    </div>

    <div class="info">
      <div class="title">{{ title }}</div>
      <div class="desc">{{ desc }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { Upload } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const props = defineProps(['title', 'desc', 'url', 'index']);
const getLink = inject('getLink');

const handleImageUpload = (response: any) => {
  getLink({
    link: response.imageUrl,
    index: props.index,
  });
};

const beforeImageUpload = (file: any) => {
  // 限制文件大小为 2MB
  if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过 2MB');
    return false;
  }
  return true;
};
</script>

<style scoped lang="scss">
.pic-item {
  color: var(--el-text-color-regular);
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  overflow: hidden;
  width: 200px;
}

.upload-img {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

.upload-text {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--el-text-color);
}

.info {
  color: var(--el-text-color-regular);
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
  border-top: 1px solid var(--el-border-color);
  height: 100px;
}

.title {
  font-size: var(--el-font-size-medium);
}

.desc {
  font-size: var(--el-font-size-small);
  white-space: wrap;
}
</style>
