const textInput = document.getElementById("textInput");

const charCount = document.getElementById("charCount");
const sentenceCount = document.getElementById("sentenceCount");
const lineBreakCount = document.getElementById("lineBreakCount");

const copyButton = document.getElementById("copyButton");
const clearButton = document.getElementById("clearButton");
const restoreButton = document.getElementById("restoreButton");

const STORAGE_KEY = "savedText";
let lastClearedText = "";

// 保存されていた内容を復元
window.addEventListener("load", () => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
        textInput.value = saved;
    }

    updateCounts();
});

// 入力時
textInput.addEventListener("input", () => {
    localStorage.setItem(STORAGE_KEY, textInput.value);
    updateCounts();
});

// コピー
copyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(textInput.value);
        alert("コピーしました");
    } catch {
        alert("コピーに失敗しました");
    }
});

// クリア
clearButton.addEventListener("click", () => {

    if (textInput.value.length < 4) {
        return;
    }
    lastClearedText = textInput.value;

    textInput.value = "";

    localStorage.setItem(STORAGE_KEY, "");
    updateCounts();
});

// 復元
restoreButton.addEventListener("click", () => {
    textInput.value = lastClearedText;

    localStorage.setItem(STORAGE_KEY, textInput.value);
    updateCounts();
});

// カウント更新
function updateCounts() {
    const text = textInput.value;

    // 文字数
    charCount.textContent = text.length;

    // 文章数
    const sentences = text
        .split(/[。！？.!?]/)
        .filter(sentence => sentence.trim().length > 0);

    sentenceCount.textContent = sentences.length;

    // 改行数
    const breaks = text.match(/\n/g);
    lineBreakCount.textContent = breaks ? breaks.length : 0;
}