// 全局组件
import AppTopBar from "@/components/global/AppTopBar";
import AppBtmBar from "@/components/global/AppBtmBar";
import Countdown from "@choujiaojiao/vue2-countdown";
import tipsDialog from "@/components/tipsDialog";
import BtmActionSheet from "@/components/global/BtmActionSheet";
import {
  Form,
  Field,
  Button,
  radio,
  RadioGroup,
  picker,
  ActionSheet,
  Icon,
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  Image,
  List,
  Dialog,
  Loading,
  Badge,
  Progress,
  Grid,
  GridItem,
  DropdownMenu,
  DropdownItem,
  uploader,
  Checkbox,
  Sticky,
  Popup,
  Step,
  Steps,
  countDown,
  tabs,
  tab,
  popover,
  Stepper,
} from "vant";
export default {
  install(Vue) {
    Vue.component("Count-down", Countdown);
    Vue.component(AppBtmBar.name, AppBtmBar);
    Vue.component(AppTopBar.name, AppTopBar);
    Vue.component(tipsDialog.name, tipsDialog);
    Vue.component(BtmActionSheet.name, BtmActionSheet);
    Vue.use(popover);
    Vue.use(tabs);
    Vue.use(tab);
    Vue.use(Form);
    Vue.use(Field);
    Vue.use(Button);
    Vue.use(radio);
    Vue.use(RadioGroup);
    Vue.use(picker);
    Vue.use(ActionSheet);
    Vue.use(Icon);
    Vue.use(Toast);
    Vue.use(Swipe);
    Vue.use(SwipeItem);
    Vue.use(Lazyload);
    Vue.use(Image);
    Vue.use(List);
    Vue.use(Dialog);
    Vue.use(Loading);
    Vue.use(Badge);
    Vue.use(Progress);
    Vue.use(Grid);
    Vue.use(GridItem);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(uploader);
    Vue.use(Checkbox);
    Vue.use(Sticky);
    Vue.use(Popup);
    Vue.use(Step);
    Vue.use(Steps);
    Vue.use(countDown);
    Vue.use(Stepper);
  },
};
