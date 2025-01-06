<template>
  <div class="m-t-4 red-img">
    <img
      class="d-img pointer"
      :src="canGet ? red1 : red2"
      alt=""
      @click="open"
    />
    <van-popup class="popupOpen pointer" v-model="showOpen">
      <ul class="flex-column center-center getPacket font14" @click="getPacket">
        <li class="align-center font14">
          <img
            class="d-img user-red m-r-8"
            :src="
              doc.img
                ? doc.img.includes('http')
                  ? doc.img
                  : `${$baseURL}/${doc.img}`
                : userPic
            "
          />
          收到{{ doc.user }}的红包
        </li>
        <li class="d-desc m-t-12">恭喜发财, 大吉大利</li>
      </ul>
    </van-popup>
    <van-popup class="popupFinish" v-model="showFinish">
      <ul class="flex-column center-center font14 m-b-8">
        <li class="align-center font14 names">
          <img
            class="d-img user-red m-r-8"
            :src="
              doc.img
                ? doc.img.includes('http')
                  ? doc.img
                  : `${$baseURL}/${doc.img}`
                : userPic
            "
          />
          收到{{ doc.user }}的红包
        </li>
        <li class="d-desc m-b-8">恭喜发财, 大吉大利</li>
        <li class="d-meng d-flex m-b-8">
          1212.00
          <span>元</span>
        </li>
        <li class="view pointer">
          全部领取记录<van-icon :size="12" name="arrow" />
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import userApi from "@/api/user";
import { mapState, mapActions } from "vuex";
import red1 from "@/assets/img/red1.png";
import red2 from "@/assets/img/red2.png";
export default {
  name: "RedImg",
  data() {
    return {
      red1,
      red2,
      showOpen: false,
      showFinish: false,
    };
  },
  computed: {
    ...mapState("chat", ["messages", "playerId", "query", "ws", "wsStatus"]),
    packet() {
      // {
      //      "id": 4,
      //      "createdAt": 1736042197315,
      //      "describes": "每日福利2",
      //      "nickname": "super_admin",
      //      "quantity": 20,
      //      "money": 1000000,
      //      "status": 0,// 0可抢 1抢空 2过期
      //      "list": [
      //      //状态为0,list为空,可抢红包
      //      //list有数据,表示已抢到该红包
      //          {
      //              "nickname": "User1",
      //              "money": 50963
      //          }
      //      ]
      //  }

      return this.doc.packet || {};
    },
    //是否可抢
    canGet() {
      return this.packet.status === 0 && this.packet.list?.length === 0;
    },
  },
  watch: {
    wsStatus() {
      this.alertReload();
    },
  },
  props: {
    doc: {
      type: Object,
      default: () => {},
    },
    userPic: {
      type: String,
      default: "",
    },
  },
  methods: {
    ...mapActions("chat", [
      "initWebSocket",
      "closeWebSocket",
      "sendMessage",
      "fetchHistory",
    ]),
    getStatus() {
      //{"type":5,"data":"{\"id\":6}"}
      this.sendMessage({
        type: 5,
        msgId: this.doc.id,
        data: JSON.stringify({ id: this.doc.data?.id }),
      });
    },
    alertReload() {
      if (this.wsStatus === false) {
        this.showOpen = false;
        this.showFinish = false;
      }
    },
    open() {
      if (this.canGet) {
        this.showOpen = true;
      } else {
        this.showFinish = true;
      }
    },
    //发送消息:{"type":6,"data":"{\"id\":2}"}
    getPacket() {
      this.sendMessage({
        type: 6,
        msgId: this.doc.id,
        data: JSON.stringify({ id: this.doc.data?.id }),
      });
      this.showOpen = false;
    },
  },
  created() {
    this.getStatus();
  },
};
</script>
<style scoped lang="scss">
.red-img {
  width: 234px;
  height: 86px;
  img {
    object-fit: contain;
  }
}
.popupOpen {
  padding-top: 73px;
  width: 255px;
  height: 397px;
  background: url("@/assets/img/openRed.png") no-repeat center;
  background-size: 100% 100%;
  color: #feedaf;

  .d-desc {
    font-size: 18px;
  }
}
.user-red {
  width: 16px;
  height: 16px;
}
.popupFinish {
  padding-top: 204px;
  width: 255px;
  height: 399px;
  background: url("@/assets/img/finishRed.png") no-repeat center;
  background-size: 100% 100%;
  .names {
    color: #191919;
  }
  .d-desc {
    color: #999999;
    font-size: 12px;
  }
  .d-meng {
    font-size: 42px;
    color: #cdac74;
    align-items: baseline;
    span {
      font-size: 12px;
    }
  }
  .view {
    color: #b78756;
    font-size: 12px;
  }
}
</style>
