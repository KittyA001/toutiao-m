<template>
  <div class="edit_data_content">
      <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 点击头像触发input的点击事件上传图片 -->
    <input type="file" hidden ref="file" @change="onFileChange">
      <van-cell title="头像" is-link>
          <van-image
              class="avatar"
              fit="cover"
              round
              :src="info.photo"
              @click="$refs.file.click()"
          />
      </van-cell>
      <van-cell
        title="昵称"
        :value="info.name"
        is-link
        @click="isNameShow=true"
      />
       <van-cell
      title="性别"
      :value="info.gender === 0 ? '男' : '女'"
      is-link
      @click="isGenderShow = true"
    />
      <van-cell
        title="生日"
        :value="info.birthday"
        is-link
        @click="isBirthdayShow = true"
      />
      <!-- 昵称修改弹出层 -->
      <van-popup
       v-model="isNameShow"
       position="bottom"
       :style="{ height: '100%' }"
       >
          <edit-name
          v-if="isNameShow"
           @close="isNameShow=false"
           v-model="info.name"
          ></edit-name>
       </van-popup>
       <!-- 性别修改弹出层 -->
       <van-popup
       v-model="isGenderShow"
       position="bottom"
       >
          <edit-gender
          v-if="isGenderShow"
           @close="isGenderShow=false"
           v-model="info.gender"
          ></edit-gender>
       </van-popup>
       <!-- 生日修改弹出层 -->
       <van-popup
       v-model="isBirthdayShow"
       position="bottom"
       >
          <edit-birthday
           v-if="isBirthdayShow"
           @close="isBirthdayShow=false"
           v-model="info.birthday"
          ></edit-birthday>
       </van-popup>
       <!-- 头像修改弹出层 -->
       <van-popup
       v-model="isPhotoShow"
       position="bottom"
       :style="{ height: '100%' }"
       >
          <edit-photo
           v-if="isPhotoShow"
           @close="isPhotoShow=false"
           :img="img"
           @updatePhoto="info.photo = $event"
          ></edit-photo>
       </van-popup>
  </div>
</template>

<script>
import { getProLileApi } from '@/api/user.js'
import EditName from '@/views/component/EditName'
import EditGender from '@/views/component/EditGender'
import EditBirthday from '@/views/component/EditBirthday'
import EditPhoto from '@/views/component/EditPhoto'
export default {
  data () {
    return {
      info: {},
      isNameShow: false,
      isGenderShow: false,
      isBirthdayShow: false,
      isPhotoShow: false,
      img: null
    }
  },
  components: {
    EditName,
    EditGender,
    EditBirthday,
    EditPhoto
  },
  created () {
    this.getProLile()
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async getProLile () {
      try {
        const { data } = await getProLileApi()
        console.log(data)
        this.info = data.data
      } catch (err) {
        console.log(err)
      }
    },
    onFileChange () {
      // 获取文件对象
      // files属性是一个伪类数组，当选择了文件数组长度为1,0索引对应的是选中的文件对象
      const file = this.$refs.file.files[0]
      // console.log(file)
      // 基于文件对象获取blob对象数据,为文件地址
      const data = window.URL.createObjectURL(file)
      // console.log(data)
      this.img = data
      this.isPhotoShow = true
      // 这个很重要，选同一张图片的时候不会触发change事件，
      // 所以每次触发change事件是都要把input的value值设置为空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.edit_data_content {
    /deep/.van-nav-bar__content {
        // position: fixed;
        // top: 0;
        // left: 0;
        // width: 100%;
        background: #3296fa;
        text-align: center;
        color: #fff;
        .van-icon {
            font-size: 32px;
            color: #fff;
        }
        .van-nav-bar__title {
            max-width: unset;
        }
    }
    .avatar {
        width: 60px;
        height: 60px;
    }
    .van-popup {
        background: #f8f6f9;
    }
}
</style>
