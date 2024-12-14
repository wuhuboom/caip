export default {
  saveJson(responseData = {}, name = "data") {
    // 创建一个Blob对象，用于保存JSON数据
    const blob = new Blob([JSON.stringify(responseData, null, 2)], {
      type: "application/json",
    });

    // 创建一个下载链接
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${name}.json`;

    // 将链接添加到文档中，并模拟点击下载
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // 清理下载链接
    document.body.removeChild(downloadLink);
  },
  detectDevice() {
    const isIos = /ios|iPhone|Macintosh|iPad|iPod/gi.test(navigator.userAgent);
    return isIos ? 1 : 0;
  },
  regUserName: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
  regPassword: /^(?=.*[a-zA-Z])(?=.*\d)[^\s]{8,20}$/,
  toPercent(value1, value2, decimalPlaces = 0) {
    if (typeof value1 !== "number" || typeof value2 !== "number") {
      throw new Error("输入值必须是数字");
    }
    if (value2 === 0) {
      throw new Error("除数不能为零");
    }

    // 计算比例
    const ratio = value1 / value2;

    // 转换为百分比并保留指定小数位
    const percentage = (ratio * 100).toFixed(decimalPlaces);

    return `${percentage}%`;
  },
};
