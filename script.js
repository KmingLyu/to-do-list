let listState = [];

const STATE_KEY = "todoList";

function loadState() {
  const listState = localStorage.getItem(STATE_KEY);
  if (listState !== null) {
    return JSON.parse(listState);
  }
  return [];
}

function saveState(list) {
  localStorage.setItem(STATE_KEY, JSON.stringify(list));
}

function initList() {
  // load state
  listState = loadState();

  // render list
  const ul = document.getElementById("list");
  for (const item of listState) {
    const li = document.createElement("li");

    const listText = document.createElement("div");
    listText.classList.add("list-text");
    listText.innerText = item.text;

    const deleteButton = document.createElement("div");
    deleteButton.classList.add("delete");
    deleteButton.onclick = deleteItem;

    li.appendChild(listText);
    li.appendChild(deleteButton);

    li.classList.add("item");
    if (item.checked) {
      li.classList.add("checked");
    }
    li.onclick = checkItem;
    console.log(li);
    console.log(ul);
    ul.appendChild(li);
  }
}

function addItem() {
  const ul = document.getElementById("list");
  const input = document.getElementById("input");
  const text = input.value;
  if (text === "") {
    alert("請輸入內容");
    return;
  }

  // 新增一個 item：
  // <li class="unchecked">
  //   <div class="list-text">洗衣服</div>
  //   <div class="delete"></div>
  // </li>
  const newItem = document.createElement("li");
  newItem.classList.add("item");

  newItem.onclick = checkItem;

  const newItemText = document.createElement("div");
  newItemText.classList.add("list-text");
  newItemText.innerText = text;

  const deleteButton = document.createElement("div");
  console.log(deleteButton);
  deleteButton.classList.add("delete");
  deleteButton.onclick = deleteItem;

  newItem.appendChild(newItemText);
  newItem.appendChild(deleteButton);

  listState.push({
    text,
    checked: false,
  });
  saveState(listState);

  ul.appendChild(newItem);
  input.value = "";
}

// 傳入 <li>
function checkItem(e) {
  const item = e.target;
  // 當 item 的 className 不包含 "item" 時，代表點到的不是確認框，直接返回
  if (!item.classList.contains("item")) {
    return;
  }

  const parent = item.parentNode; // <ul>
  const idx = Array.from(parent.children).indexOf(item); // 找到 item 在 parent.children 的 index
  console.log(idx);
  console.log(listState);
  console.log(listState[idx]);
  listState[idx].checked = !listState[idx].checked; // 將 listState 中的 checked 改為相反值

  item.classList.toggle("checked");
  saveState(listState);
}

// 傳入 <div class="delete"></div>
function deleteItem(e) {
  // console.log(e);
  const item = e.target.parentNode; // <li>
  const parent = item.parentNode; // <ul>
  const idx = Array.from(parent.children).indexOf(item); // 找到 item 在 parent.children 的 index
  console.log("liststate = ", listState);
  listState = listState.filter((_, i) => i !== idx); // 將 listState 中的第 idx 個刪除
  parent.removeChild(item);
  saveState(listState);
  e.stopPropagation(); // 防止事件冒泡
}

initList();

const addButton = document.getElementById("add-button");
// 滑鼠移入效果
addButton.addEventListener("mouseover", () => {
  addButton.style.backgroundColor = "#0029CC"; // 滑鼠碰到的顏色
});
// 滑鼠移出效果
addButton.addEventListener("mouseout", () => {
  addButton.style.backgroundColor = "#355dff"; // 原始顏色
});
// 滑鼠按下效果
addButton.addEventListener("mousedown", () => {
  addButton.style.backgroundColor = "#001466"; // 按下的顏色
  addButton.style.fontWeight = "bold";
});
// 滑鼠放開效果
addButton.addEventListener("mouseup", () => {
  addButton.style.backgroundColor = "#0029CC"; // 滑鼠碰到的顏色
  addButton.style.fontWeight = "normal";
});

// 滑鼠點擊事件
addButton.addEventListener("click", addItem);

const form = document.getElementById("input-wrapper");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // 讓表單不會自動刷新(預設會刷新)
});
