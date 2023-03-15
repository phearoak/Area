import React from "react";

const APK_FILE = "http://localhost:8082/client.apk";

const Apk = () => {
  const downloadApk = (url) => {
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", "client.apk");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  return (
    <div>
      <button data-testid="apkJest" onClick={() => downloadApk(APK_FILE)}>Download</button>
    </div>
  );
};

export default Apk;
