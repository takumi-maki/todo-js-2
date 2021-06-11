import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除 共通化
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//  未完了リストに追加する関数　共通化
const createIncompleteList = (text) => {
  // li生成
  const li = document.createElement("li");

  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  const p = document.createElement("p");
  p.innerText = text;

  // button（完了)タグを生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // divの親タグ(li)を未完了リストから削除
    deleteFromIncompleteList(div.parentElement);

    // 完了リストに追加する要素
    const addTarget = div.parentNode;

    // TODO内容のテキストを取得
    const text = div.firstChild.innerText;

    // li以下を初期化
    addTarget.textContent = null;

    // divを生成
    const completeList = document.createElement("div");
    completeList.className = "list-row";

    // pタグを生成
    const completeText = document.createElement("p");
    completeText.innerText = text;

    // buttonタグを生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 完了リストから削除
      const backTarget = addTarget;
      document.getElementById("complete-list").removeChild(backTarget);

      // テキストを取得
      const text = div.firstChild.innerText;

      createIncompleteList(text);
    });

    // li(addTarget)以下にdivとtextとbuttonを設定
    addTarget.appendChild(completeList);
    completeList.appendChild(completeText);
    completeList.appendChild(backButton);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // button（削除)タグを生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // divの親タグ(li)を未完了リストから削除
    deleteFromIncompleteList(div.parentNode);
  });

  // liタグの子要素に各要素を設定
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了のリストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
