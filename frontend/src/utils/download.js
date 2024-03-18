export function download(fileName, data) {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  link.click();
  window.URL.revokeObjectURL(url);
}
