// js file
// 1만 시간 계산기: 입력값 처리 및 결과 출력   
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calculatorForm");
  const fieldInput = document.getElementById("field");
  const timeInput = document.getElementById("time");

  const resultSection = document.getElementById("resultSection");
  const resultField = document.getElementById("resultField");
  const resultDays = document.getElementById("resultDays");

  // 처음엔 결과 숨김
  resultSection.hidden = true;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // 새로고침 방지

    const field = fieldInput.value.trim();
    const time = Number(timeInput.value);

    // 유효성 검사
    if (!field || time <= 0) {
      alert("모든 값을 올바르게 입력해주세요.");
      return;
    }

    // 계산
    const totalHours = 10000;
    const days = Math.ceil(totalHours / time);

    // 결과 출력
    resultField.textContent = field;
    resultDays.textContent = days;

    // 결과 보이기
    resultSection.hidden = false;
  });
});