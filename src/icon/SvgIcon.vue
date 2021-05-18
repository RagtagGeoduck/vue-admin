<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
  <!-- <div>1</div> -->
</template>

<script type="text/ecmascript-6">
import { computed, ref } from "@vue/composition-api";
export default {
  name: "svgIcon",
  props: {
    iconClass: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },
  // props:['iconClass','className','item'],
  setup(props) {
    // console.log(props.iconClass);
    // console.log(props.className);
    const iconName = computed(() => `#icon-${props.iconClass}`);

    // console.log("iconName",iconName);

    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });
    // const iconName = computed(() => {
    //   `#icon-${props.iconClass}`;
    // });
    // const svgClass = computed(() => {
    //   if (props.className) {
    //     return `svg-icon ${props.className}`;
    //   } else {
    //     return `svg-icon`;
    //   }
    // });
    return {
      iconName,
      svgClass,
    };
  },
};
</script>
<style  scoped lang="scss" >
.svg-icon{
  width: 1.4em;
  height: 1.4em;
  // line-height: 1.4em;
  margin-right: 10px;
  margin-bottom: 4px;
  color: #fff;
  fill: currentColor;
  &.font12{
    font-size: 12px;
  }
}
</style>
