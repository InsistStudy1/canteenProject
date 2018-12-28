<template>
  <div class="avatar">
    <div class="hasPic" v-if="imgUrls.length>0" v-for="(item,index) in imgUrls">
      <img class="seledPic" ref="picture" :src="item?item:require('static/images/imagebj.jpg')" name="avatar" @click="bigImg(index)">
      <img class="delect" src="static/images/del.png" @click="delect(index)">
    </div>
    <div class="imgMask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">
      <div class="showImg">
        <mt-swipe :auto="0" :show-indicators="false" @change="handleChange" :continuous="false" :defaultIndex="num">
          <mt-swipe-item v-for="(item,index) in imgUrls" :key="item.id">
            <div class="num"  >{{index+1+'/'+imgUrls.length}}</div>
            <img :src="imgUrls[index]" class="img"/>
          </mt-swipe-item>
        </mt-swipe>

      </div>
    </div>
    <div class="selPic"  v-if="imgUrls.length<6">
      <img src="static/images/imagebj.jpg" name="avatar">
      <span>{{pictureNums}}</span>
      <input type="file" maxlength="" class="input-file" multiple="multiple" name="avatar" ref="avatarInput" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
    </div>
  </div>
</template>
<script>
export default {
  name: 'upload',
  data () {
    return {
      showBigImg: false,
      maxImages: 6,
      leftImages: 0,
      pictureNums: '上传图片',
      imgUrls: [],
      num: 0,
      avatar: '',
      file: '',
      showBg: false
    }
  },
  props: ['uploadType', 'imgUrl'],
  created () {
    this.avatar = this.imgUrl
  },
  methods: {
    changeImage: function (e) {
      if (e.target.files.length <= (this.maxImages - this.imgUrls.length)) {
        for (var i = 0; i < e.target.files.length; i++) {
          let file = e.target.files[i];
          this.file = file;
          let reader = new FileReader();
          let that = this;
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            that.imgUrls.push(this.result)
          }
          this.$emit('getImgList', that.imgUrls);
        }
        // 剩余张数
        this.leftImages = this.maxImages - (this.imgUrls.length + e.target.files.length)
        this.pictureNums = String(this.maxImages - (this.imgUrls.length + e.target.files.length)) + '/' + String(this.maxImages)
      } else {
        mui.toast('只能选择' + (this.maxImages - this.imgUrls.length) + '张了')
      }
    },
    delect (index) {
      this.imgUrls.splice(index, 1)
      this.leftImages++
      if (this.leftImages === this.maxImages) {
        this.pictureNums = '上传图片'
      } else {
        this.pictureNums = String(this.leftImages) + '/' + String(this.maxImages)
      }
    },
    handleChange (index) {
      this.num = index
    },
    bigImg (index) {
      this.showBigImg = true
      this.num = index
    }
  }
}
</script>
<style scoped>
  .avatar {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .hasPic{
    position: relative;
    width: 4.5625rem;
    height:4.5625rem;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .input-file {
    width: 4.5625rem;
    height: 4.5625rem;
    background: red;
    opacity: 0;
  }
  .seledPic {
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .delect{
    position: absolute;
    top: -5px;
    right: -2px;
    width: 15px;
    height: 15px;
  }
  .selPic{
    margin-left: 10px;
    margin-bottom: 10px;
    position: relative;
    width: 4.5625rem;
    height:4.5625rem;
  }
  .selPic img{
    position: absolute;
    width: 4.5625rem;
    height: 4.5625rem;
    top: 0;
    left: 0;
  }
  .selPic span{
    position: absolute;
    bottom: .9rem;
    width:4.5625rem;
    color: #c4c3c3;
    font-size: .75rem;
    left:0;
    text-align: center;
  }
  .selPic input{
    position: absolute;
    top: 0;
    left: 0;
  }
  .imgMask{
    position: absolute;
    height: 100%;
    width:100%;
    top:0;
    left:0;
    z-index: 100;
    background:rgba(0,0,0,1);
  }
  .num{
    padding-top: 10px;
    color: white;
    font-size: .875rem;
    font-weight: bold;
  }
  .showImg{
    height: 100%;
    width: 100%;
    position: absolute;
    align-items: center;
    left: 0;
    top:0;
  }
  .img{
    position: absolute;
    left: 0;
    top: 50%;
    object-fit: scale-down;
    height: auto;
    width: 100%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
</style>
