const textInput = document.getElementById("textInput");

const charCount = document.getElementById("charCount");
const sentenceCount = document.getElementById("sentenceCount");
const lineBreakCount = document.getElementById("lineBreakCount");

textInput.addEventListener("input", updateCounts);

function updateCounts() {
    const text = textInput.value;

    // 文字数
    charCount.textContent = text.length;

    // 文章数（。！？で区切る）
    const sentences = text
        .split(/[。！？.!?]/)
        .filter(sentence => sentence.trim().length > 0);

    sentenceCount.textContent = sentences.length;

    // 改行数
    const breaks = text.match(/\n/g);
    lineBreakCount.textContent = breaks ? breaks.length : 0;
}