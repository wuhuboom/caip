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
};
