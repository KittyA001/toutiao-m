<template>
<!-- 2.img标签外面要有一个容器 -->
    <div class="img_content">
        <img :src="img" class="img" ref="img">
        <div class="bottom_btn">
            <div class="cancel" @click="$emit('close')">取消</div>
            <div class="comfirm" @click="onComfirm">完成</div>
        </div>
    </div>
</template>

<script>
// 1.安装cropperjs
// 4.导入裁剪的包和样式
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updatePhotoApi } from '@/api/user.js'
export default {
  props: {
    // img可能是字符串也可能是blob对象
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: {}
    }
  },
  mounted () {
    // 5.
    // 获取DOM元素
    const image = this.$refs.img
    // 原来pc端的配置
    // const cropper = new Cropper(image, {
    //   aspectRatio: 16 / 9,
    //   crop (event) {
    //     console.log(event.detail.x)
    //     console.log(event.detail.y)
    //     console.log(event.detail.width)
    //     console.log(event.detail.height)
    //     console.log(event.detail.rotate)
    //     console.log(event.detail.scaleX)
    //     console.log(event.detail.scaleY)
    //   }
    // })

    // 移动端的配置
    const cropper = new Cropper(image, {
      viewMode: 1, // 默认是0,1就是截图框不能移出外边
      dragMode: 'move', // 默认是crop能随意的拖动框大小，move为图片拖动，none为截图框拖动图片不能拖动
      aspectRatio: 1, // 默认16/，截图框的比例
      // autoCropArea: 1, // 自动裁剪区域
      cropBoxMovable: false, // 截图框不能移动
      cropBoxResizable: false, // 不能改变截图框大小
      background: false // 关闭原有背景
    })
    this.cropper = cropper
  },
  methods: {
    onComfirm () {
      // 基于服务端的裁切使用getData 方法获取裁切参数
      console.log(this.cropper.getData()) // {x: 78, y: 78, width: 624, height: 624, rotate: 0,…}
      // 纯客户端的裁切使用getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
        // console.log(blob) // Blob{size: 336398, type: "image/png"}
        this.updatePhoto(blob)
      })
    },
    async updatePhoto (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      const formData = new FormData()
      // formData.append(发起请求需要传的参数, 值为blob对象);
      formData.append('photo', blob)
      try {
        // 发起请求更新数据
        // 如果接口要求 Content-Type 是 multipart/form-data
        // 必须传 FormData 对象，一般是上传文件才是FormData 对象
        // 一般数据的要求的 Content-Type 都是 application/json 对象
        const { data } = await updatePhotoApi(formData)
        // console.log(data)
        // 更新视图
        this.$emit('updatePhoto', data.data.photo)
        // 关闭弹出层
        this.$emit('close')
        // this.$emit('input', this.localName)
        // 提示修改成功
        this.$toast.success('修改成功')
      } catch (err) {
        // console.log(err)
        // 提示修改失败
        this.$toast('修改失败！')
      }
    }
  }

}
</script>

<style scoped lang="less">
.img_content {
    background: #000;
    height: 100%;
    // 3.img标签要是块级元素和最大宽度是100%
    .img {
        display: block;
        max-width: 100%;
    }
    .bottom_btn {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        .cancel,
        .comfirm {
            width: 120px;
            height: 100px;
            font-size: 30px;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

</style>
