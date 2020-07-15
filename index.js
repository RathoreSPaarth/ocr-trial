let load = document.createElement('div')
load.setAttribute('style','width: 100%; height: 100%; position: absolute;')
load.innerHTML = "LOADING!"



$("input").change(function(e) {

  for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
      
      var file = e.originalEvent.srcElement.files[i];
      
      var img = document.createElement("img");
      var reader = new FileReader();
      reader.onloadend = function() {
           img.src = reader.result;
           document.body.appendChild(load) 
           Tesseract.recognize(
            img.src,
            'eng',
            { logger: m => console.log(m) }
          ).then(({ data: { text } }) => {
            console.log(text);
            api(text)
          })
      }
      reader.readAsDataURL(file);
      // $("input").after(img);
  }
});


function api(food){
axios({
  "method":"GET",
  "url":"https://edamam-food-and-grocery-database.p.rapidapi.com/parser",
  "headers":{
  "content-type":"application/octet-stream",
  "x-rapidapi-host":"edamam-food-and-grocery-database.p.rapidapi.com",
  "x-rapidapi-key":"acde7d9edemsh8b1b9dcc1ff6b19p1dcab6jsn191a80232242",
  "useQueryString":true
  },"params":{
  "ingr":`${food}`
  }
  })
  .then((response)=>{
    console.log(response)
    document.getElementById('a').setAttribute('href',`${response.data._links.next.href}`)
    document.body.removeChild(load)
  })
  .catch((error)=>{
    console.log(error)
  })


}
