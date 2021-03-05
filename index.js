const calculateSizeBtn = document.getElementById('lb_calculator_button');
//Values
const sizeValue = document.getElementById('lb_calculator_size_value');
const heightValue = document.getElementById('lb_calculator_height_value');
const weightValue = document.getElementById('lb_calculator_weight_value');
//Units
const sizeUnit = document.getElementById('lb_calculator_size_unit');
const heightUnit = document.getElementById('lb_calculator_height_unit');
const weightUnit = document.getElementById('lb_calculator_weight_unit');

//
const resultMessage = document.querySelector('.lb_calculator_result_message');
const resultValue = document.querySelector('.lb_calculator_result_value');

calculateSizeBtn.addEventListener('click', () => {
  console.log(`Size: ${sizeValue.value} ${sizeUnit.value}`);
  console.log(`Height: ${heightValue.value} ${heightUnit.value}`);
  console.log(`Weight: ${weightValue.value} ${weightUnit.value}`);
  if(
    sizeValue.value > 0 && sizeValue.value <= 25 &&
    heightValue.value > 0 && heightValue.value <= 150 &&
    weightValue.value > 0 && weightValue.value <= 50
    ) {
    resultMessage.style.display = 'block';
    resultValue.textContent = "S";
  } else if(
    sizeValue.value >= 25 && sizeValue.value <= 30 &&
    heightValue.value >= 150 && heightValue.value <= 170 &&
    weightValue.value >= 50 && weightValue.value <= 70
    ) {
    resultMessage.style.display = 'block';
    resultValue.textContent = "M";
  } else if(
    sizeValue.value >= 30 && 
    heightValue.value >= 170 && 
    weightValue.value >= 70
    ) {
    resultMessage.style.display = 'block';
    resultValue.textContent = "L";
  } else {
    resultMessage.style.display = 'none';
  }
})