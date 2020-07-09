<template>
  <div class="is-overlay-hover">
    <div class="has-cursor-pointer" @click="showLightbox">
      <BackgroundSquareImage :image-url="profilePhoto.src" size="100" rounded="true" border-inside="true" border="3" />
    </div>

    <SingleValidatedImageUpload
      v-if="isMyProfile"
      class="is-overlay-left is-disabled-till-hover"
      rules="size:2048"
      :label="$t('common.field.profilePhoto')"
      :parent-folder-ref="parentFolderRef"
      :upload-completed="uploadCompleted"
      :get-alt-value="getProfilePhotoAltValue"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { AuthUser, Image, ProfilePhotoPlaceholder, ProfilePhotoStorageRef, StateNamespace } from '~/types'
import Lightbox from '~/components/image/lightbox/Lightbox.vue'
import BackgroundSquareImage from '~/components/image/BackgroundSquareImage.vue'
import SingleValidatedImageUpload from '~/components/image/upload/SingleValidatedImageUpload.vue'
import { profilePhotoObservable } from '~/service/rx-service'

@Component({
  components: { SingleValidatedImageUpload, BackgroundSquareImage }
})
export default class ProfilePhoto extends Vue {
  @Prop({ type: Boolean, required: true }) isMyProfile: boolean
  @Prop({ required: true }) authUser: AuthUser
  @Prop({ required: true }) profilePhoto: Image

  @StateNamespace.auth.Action updateProfilePhoto: (profilePhoto: Image) => Promise<void>;

  get parentFolderRef () {
    return ProfilePhotoStorageRef.folderRef
      .replace(ProfilePhotoStorageRef.parameters.userId, this.authUser.userId)
  }

  get placeholder () {
    return ProfilePhotoPlaceholder
  }

  imageLoadError (event: any) {
    event.target.src = ProfilePhotoPlaceholder
  }

  getProfilePhotoAltValue (fileName: string) {
    return `Profile photo of ${this.authUser.name} as ${fileName}`
  }

  showLightbox () {
    this.$buefy.modal.open({
      parent: this,
      component: Lightbox,
      hasModalCard: false,
      trapFocus: true,
      canCancel: true,
      props: {
        images: [this.profilePhoto],
        initialIndex: 20
      }
    })
  }

  uploadCompleted (image: Image) {
    this.updateProfilePhoto(image)
      .then(() => profilePhotoObservable.next(image))
  }
}
</script>
