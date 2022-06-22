<template>
  <div style="padding-bottom: 55px">
    <div class="sayComments" style="border-bottom: 1px solid #DDD;padding-bottom: 60px">
      <el-avatar style="margin-right: 10px;float: left" :src="info.stPicturePath === '' ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' : info.stPicturePath"></el-avatar>
      <el-input placeholder="写点什么?" v-model="myComment" style="width: 90%"/>
      <el-button type="primary" icon="el-icon-s-promotion" style="float: right;margin-top: 15px" size="mini" @click="yesAddComment">发表</el-button>
    </div>
    <div class="comments" v-if="commentsList.length !== 0" v-for="item in commentsList" :key="item.cmId" style="display: flex;align-items: center;margin: 15px 0;border-bottom: 1px dotted #CCC;padding-bottom: 15px">
<!--      <el-avatar style="margin-right: 10px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>-->
      <el-card shadow="never" style="width: 100%;position: relative;height: 90px">
        {{item.cmContent}}
        <div class="bottom" style="position: absolute;right: 0;bottom: 0">
          <span style="font-size: 14px;margin-right: 15px;padding-bottom: 2px;color: #BBB"  >{{item.createTime}}</span>
          <img :src="!item.isComment ? iconSrc.praise : iconSrc.praise_o" width="20" alt="err" style="margin-right: 15px;cursor: pointer" @click="good(item.cmId)">
          <span style="font-size: 12px;margin-right: 10px">{{item.cmLikes === 0 ? '' : item.cmLikes}}</span>
          <img :src="!item.isUnlike ? iconSrc.stamp : iconSrc.stamp_o" width="15" alt="err" style="margin-right: 15px;cursor: pointer" @click="bad(item.cmId)">
          <span style="font-size: 12px;margin-right: 10px">{{item.cmUnlikes === 0 ? '' : item.cmUnlikes}}</span>
        </div>
      </el-card>
    </div>
    <div v-if="commentsList.length === 0">
      <el-empty description="暂时没有评论哦，快来抢占沙发吧!"></el-empty>
    </div>
  </div>

</template>

<script>
import { addComment, getComment, commentLike, commentUnLike } from '../../../api/api';
export default {
  props: {
      topicid: {
        type: String
      }
  },
  name: "StudentComments",
  data() {
    return {
      info: {},
      iconSrc: {
        "praise": '/icon/praise.png',
        "praise_o": '/icon/praise_o.png',
        "stamp":'/icon/stamp.png',
        "stamp_o":'/icon/stamp_o.png'
      },
      isClick: false,
      isClickStamp: false,
      myComment: '',
      commentsList: [],
      totalCount: '',
      currentPage: 1,
      totalPage: 1,
      isLike: true,
      isUnlike: true,
      historyLike: false
    }
  },
  methods: {
    getInfo() {
      let info = JSON.parse(localStorage.getItem('info'));
      info.stPicturePath = this.$baseImgUrl + info.stPicturePath;
      this.info = info;
    },
    good(id) {
      let list = this.commentsList;
      for (let i in list) {
        if (list.hasOwnProperty(i)) {
          if (list[i].cmId === id) {
            list[i].isComment = true;
            let query = {
              commentId: id
            }
            commentLike(query).then((res) => {
              if (res.message.data.createCode === 1) {
                this.$notify.success("点赞成功");
                this.getAllComment(1, id);
              } else {
                this.$notify.error("点赞失败");
              }
            }).catch((err) => {
              this.$notify.error(err);
            })
          }
        }
      }
      // this.isClick = !isClick;
    },
    bad(id) {
      let list = this.commentsList;
      for (let i in list) {
        if (list.hasOwnProperty(i)) {
          if (list[i].cmId === id) {
            list[i].isUnlike = true;
            let query = {
              commentId: id
            }
            if (list[i].isUnlike) {
              commentUnLike(query).then((res) => {
                if (res.message.data.createCode === 1) {
                  this.$notify.success("点踩成功");
                  this.getAllComment(2, id);
                } else {
                  this.$notify.error("点踩失败");
                }
              }).catch((err) => {
                this.$notify.error(err);
              })
            } else {
              this.$notify.error("已经踩过啦");
            }
          }
        }
      }
    },
    yesAddComment() {
      let tpId = localStorage.getItem('tpId');
      let data = {
        cmTopicId: tpId,
        cmUserId: this.info.stId,
        cmUserRole: this.info.stRoleId,
        cmContent: this.myComment
      }
      addComment(data).then((res) => {
        if (res.message.data.createCode === 1) {
          this.$notify.success("评论成功");
          this.myComment = '';
          this.getAllComment();
        } else {
          this.$notify.error("评论失败");
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    },
    getAllComment(isLike, id) {
      let tpId = localStorage.getItem('tpId');
      let query = {
        topicId: tpId,
        page: 1,
        count: 10
      }
      getComment(query).then((res) => {
        if (res.message.data.createCode === 1) {
          let result = res.message.data.result.data;
          for (let i in result) {
            if (result.hasOwnProperty(i)) {
              let time = "";
              time = result[i].createTime.split("T")[0];
              time += " " + result[i].createTime.split("T")[1].split(".")[0]
              result[i].createTime = time;
              if (!this.historyLike) {
                result[i].isComment = false;
                result[i].isUnlike = false;
              }
              if (result[i].cmId === id) {
                if (isLike === 1) {
                  result[i].isComment = true;
                  result[i].isUnlike = false;
                  this.historyLike = true;
                } else if (isLike === 2){
                  result[i].isComment = false;
                  result[i].isUnlike = true;
                }
              }
            }
          }
          this.commentsList = result;
          console.log(this.commentsList);
          this.totalCount = res.message.data.result.totalCount;
          this.totalPage = res.message.data.result.totalPage;
          this.currentPage = res.message.data.result.currentPage;
        } else {
          this.$notify.error("获取评论列表失败");
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    }
  },
  mounted() {
    this.getInfo();
    this.getAllComment();
  }
}
</script>

<style lang="stylus" scoped>

.my-reply
  padding 10px
  background-color #fafbfc

  .header-img
    display inline-block
    vertical-align top

  .reply-info
    display inline-block
    margin-left 5px
    width 90%
    @media screen and (max-width: 1200px) {
      width 80%
    }

    .reply-input
      min-height 20px
      line-height 22px
      padding 10px 10px
      color #ccc
      background-color #fff
      border-radius 5px

      &:empty:before
        content attr(placeholder)

      &:focus:before
        content none

      &:focus
        padding 8px 8px
        border 2px solid blue
        box-shadow none
        outline none

  .reply-btn-box
    height 25px
    margin 10px 0

    .reply-btn
      position relative
      float right
      margin-right 15px

.my-comment-reply
  margin-left 50px

  .reply-input
    width flex

.author-title:not(:last-child)
  border-bottom: 1px solid rgba(178, 186, 194, .3)

.author-title
  padding 10px

  .header-img
    display inline-block
    vertical-align top

  .author-info
    display inline-block
    margin-left 5px
    width 60%
    height 40px
    line-height 20px

    > span
      display block
      cursor pointer
      overflow hidden
      white-space nowrap
      text-overflow ellipsis

    .author-name
      color #000
      font-size 18px
      font-weight bold

    .author-time
      font-size 14px

  .icon-btn
    width 30%
    padding 0 !important
    float right
    @media screen and (max-width: 1200px) {
      width 20%
      padding 7px
    }

    > span
      cursor pointer

    .iconfont
      margin 0 5px

  .talk-box
    margin 0 50px

    > p
      margin 0

    .reply
      font-size 16px
      color #000

  .reply-box
    margin 10px 0 0 50px
    background-color #efefef
</style>
