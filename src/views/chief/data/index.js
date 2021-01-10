import region from "./region.js";
import river from "./river.js";

console.log(region);
console.log(river);

/**
 *
 * @param {Array} data
 */
function transferRegionToTree(
  data,
  id = "adCode",
  name = "adName",
  parentId = "parentAdCode"
) {
  function extractTargetField(item) {
    return {
      id: item[id],
      name: item[name]
    };
  }
  function setRec(item) {
    !dict[item.id] && (dict[item.id] = item);
  }
  function getRec(id) {
    return dict[id];
  }
  let dict = Object.create(null);
  const res = [];
  if (Array.isArray(data)) {
    data.forEach(item => {
      if (!item[parentId]) {
        const single = extractTargetField(item);
        setRec(single);
        res.push(single);
      } else {
        const parent = getRec(item[parentId]);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          const single = extractTargetField(item);
          setRec(single);
          parent.children.push(single);
        }
      }
    });
  }
  dict = undefined;
  return res;
}

function transRiverToTree(data) {
  function extract(item) {
    return {
      id: item.guid,
      name: item.reaName
    };
  }
  return data.map(item => extract(item));
}

console.log("123", transRiverToTree(river));

export default {
  region: transferRegionToTree(region),
  river: transRiverToTree(river)
};
