<template>
    <div class="edit">
        <!-- 我的频道 -->
        <div class="my_channel">
            <van-cell :border="false">
                <div class="title" slot="title">我的频道</div>
                <van-button
                  type="danger"
                  plain round size="mini"
                  class="btn"
                  @click="isShowEdit = !isShowEdit"
                  >{{ isShowEdit? '完成': '编辑'}}</van-button>
            </van-cell>
            <van-grid :column-num="4" :border="false">
                <van-grid-item
                  class="grid_item"
                  v-for="(obj, index) in my_channels" :key="index"
                  @click="switchAndDelChannel(isShowEdit, obj, index)"
                >
                    <van-icon slot="icon" name="clear" v-show="isShowEdit && !fixChannels.includes(obj.id)"/>
                    <span slot="text" class="text" :class="{ active: active === index }">{{ obj.name }}</span>
                </van-grid-item>
            </van-grid>
        </div>
        <!-- 频道推荐 -->
        <div class="recommend_channel">
            <van-cell :border="false">
                <div class="title" slot="title">频道推荐</div>
            </van-cell>
            <van-grid :column-num="4" :border="false">
                <van-grid-item
                  class="grid_item"
                  icon="plus"
                  v-for="item in recommend_channels" :key="item.id"
                  :text="item.name"
                  @click="addMyChannerls(item)"
                />

            </van-grid>
        </div>
    </div>
</template>

<script>
import { GetAllChannelsApi, addChannelsApi, DeleteChannelsApi } from '@/api/channels.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelsEdit',
  props: {
    my_channels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      all_channels: [], // 全部频道
      isShowEdit: false, // 是否显示删除图标
      fixChannels: [0] // 固定频道
    }
  },
  // 一个变量的值, 依赖另外一些数据计算而来的结果
  // 计算属性会监测依赖数据的变化，当数据变化时计算属性会重新执行
  computed: {
    ...mapState(['user']),
    // 推荐频道 = 全部频道 -我的频道
    recommend_channels () {
      // filter()方法筛选符合条件的所有元素，并返回一个新数组
      return this.all_channels.filter(allItem => {
        // find()方法遍历数组，返回符合条件的第一个元素，
        return !this.my_channels.find(myItem => {
          return allItem.id === myItem.id
        })
      })
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      const { data } = await GetAllChannelsApi()
      this.all_channels = data.data.channels
    },
    // 添加我的频道
    async addMyChannerls (channel) {
      this.my_channels.push(channel)
      if (this.user) {
        try {
          // 线上存储我的频道
          const res = await addChannelsApi(
            {
              id: channel.id,
              seq: this.my_channels.length // 频道序号
            }
          )
          console.log(res)
        } catch (err) {
          this.$toast('添加失败')
        }
      } else {
        // 本地存储我的频道
        setItem('localMyChannels', this.my_channels)
      }
    },
    // 点击我的频道里的频道项，切换频道和删除功能
    switchAndDelChannel (isShowEdit, channel, index) {
      if (isShowEdit) { // 删除功能
        if (this.fixChannels.includes(channel.id)) {
          return
        }
        // 因为切换频道是用点击当前索引号去影响active的，所以当点击删除的频道在激活索引之前，需active的值减一
        if (this.active >= index) {
          this.$emit('upActive', this.active - 1, true)
        }
        // 删除对应索引的频道
        this.my_channels.splice(index, 1)
        if (this.user) {
          // 线上删除
          this.delChannel(channel)
        } else {
          // 本地删除
          // 更新本地存储我的频道
          setItem('localMyChannels', this.my_channels)
        }
      } else { // 切换功能
        // 在编辑区切换频道，更新active值，子向父传值，父级自定义事件，子级自动触发事件，
        this.$emit('upActive', index, false)
      }
    },
    // 删除频道请求
    async delChannel (channel) {
      try {
        const res = await DeleteChannelsApi(channel.id)
        console.log(res)
      } catch (err) {
        console.log('删除失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.edit {
    padding-top: 85px;
    /deep/.van-cell {
            .van-cell__title {
                .title {
                    padding-top: 10px;
                    font-size: 32px;
                    color: #333;
                }
            }
    }
    .btn {
        padding-right: 22px;
        padding-left: 22px;
        width: 104px;
        height: 48px;
        line-height: 48px;
        font-size: 26px;
        color: #f85f5f;
        border: 1px solid #f97777;

    }
    .van-grid {
        padding-left: 20px;
    /deep/.grid_item {
            .van-grid-item__content {
                flex-direction: row;
                width: 160px;
                height: 86px;
                background: #f4f5f6;
                border-radius: 7px;
                margin-top: 20px;
                .van-icon-plus {
                    margin-bottom: 5px;
                    font-size: 28px;
                }
                .text,
                .van-grid-item__text {
                    font-size: 28px;
                    color: #222;
                    margin-top: 0;
                    white-space: nowrap;
                }
                .van-icon-clear {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 30px;
                    color: #ccc;
                }
                .van-grid-item__icon-wrapper {
                    position: unset;
                }
                .active {
                    color: red;
                }
            }

        }
    }
    .my_channel {
        padding-bottom: 40px;
    }
}
</style>
