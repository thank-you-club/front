<template>
  <div class="field">
    <label class="label"
      >{{ label }} <strong class="has-text-danger">*</strong></label
    >
    <div class="file has-name is-boxed">
      <label class="file-label">
        <input
          class="file-input"
          type="file"
          name="file"
          :accept="accept"
          @change="onFileChange"
        />
        <span class="file-cta">
          <span class="file-icon">
            <i
              :class="
                `${isLoading ? 'fas fa-spinner fa-spin' : 'fas fa-upload'}`
              "
            ></i>
          </span>
          <span class="file-label">
            {{ text }}
          </span>
        </span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { upload } from '@/services/upload.service';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { AxiosResponse, AxiosError } from 'axios';
@Component
export default class FileUpload extends Vue {
  public isLoading: boolean = false;
  @Prop({
    required: true,
  })
  public label!: string;
  @Prop({
    required: true,
  })
  public text!: string;
  @Prop({
    required: true,
  })
  public id!: string;
  @Prop({
    required: true,
  })
  public accept!: string;
  public onFileChange(e: Event) {
    if (e && e.target) {
      this.isLoading = true;
      const formData = new FormData();
      // @ts-ignore
      const fileList = e.target.files;
      // @ts-ignore
      const fieldName = e.target.name;
      if (!fileList.length) {
        return;
      }
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });
      this.save(formData);
    }
  }
  public save(formData: FormData) {
    upload(formData)
      .then((x: AxiosResponse) => {
        this.$emit('uploaded', {
          url: x.data.url,
          originalFileName: x.data.originalFileName,
        });
        this.isLoading = false;
      })
      .catch((err: AxiosError) => {
        console.error(err);
        alert('Une erreur s\'est produite');
      });
  }
}
</script>

<style>
</style>
