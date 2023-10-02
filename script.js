var formEl = document.getElementById('searchForm')
var cityEl = document.getElementById('city')


formEl.addEventListener('submit', (event) => {
  event.preventDefault()
  submitForm()  
})

cityEl.addEventListener('keyup', (event) => {
  if(event.key === 'Enter') {
    submitForm()
  }
})

function submitForm(event) {
  console.log('***[submiting]',);
}