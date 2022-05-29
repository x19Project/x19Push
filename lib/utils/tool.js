function arrayRemove(arr,need_remove) {
  let index = arr.indexOf(need_remove);
  if(index === -1) return;
  arr.splice(index,1);
  return arr;
}

export { arrayRemove }