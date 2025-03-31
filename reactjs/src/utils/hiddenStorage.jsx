let opfsRoot = null;
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

async function initOpfs() {
  if ('storage' in navigator && 'getDirectory' in navigator.storage) {
    opfsRoot = await navigator.storage.getDirectory();
  } else {
    console.error(
      'Origin Private File System is not supported in this browser.',
    );
  }
}

export const getHidden = async (fileName = 'default.txt') => {
  initOpfs();
  const existingFileHandle = await opfsRoot.getFileHandle(fileName);
};

export const putHidden = async (fileName = 'default.txt', content = '') => {
  const fileHandle = await opfsRoot.getFileHandle(fileName, { create: true });
  const accessHandle = await fileHandle.createSyncAccessHandle();

  let size;
  size = accessHandle.getSize();
  const newContent = textEncoder.encode(content);
  accessHandle.write(newContent, { at: size });
  accessHandle.flush();
  size = accessHandle.getSize();

  const moreContent = textEncoder.encode('More content');
  accessHandle.write(moreContent, { at: size });
  accessHandle.flush();
  size = accessHandle.getSize();

  const dataView = new DataView(new ArrayBuffer(size));
  accessHandle.read(dataView, { at: 0 });
  console.log(textDecoder.decode(dataView));

  accessHandle.read(dataView, { at: 9 });
  console.log(textDecoder.decode(dataView));

  accessHandle.truncate(4);
};
