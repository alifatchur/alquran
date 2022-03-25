function dataAyat(numAyat) {
  // numAyat = 1;
  $('#list-data-ayat').html('')
  $('#ayat-list').html('')


  $.ajax({
    type: 'get',
    url: `https://api.quran.sutanlab.id/surah/${numAyat}`,
    dataType: 'json',
    success: function (result) {
      if (result.code === 200) {

        let rslt = result.data.verses
        
        for (let i = 0; i < rslt.length; i++) {

          $('#list-data-ayat').append(`
            <div class="mb-5">
              <p class="bd-lead fs-2 d-flex flex-row-reverse mb-5" id="ayat-${i+1}">${result.data.verses[i].text.arab}</p>
              <p class="fst-italic">${result.data.verses[i].text.transliteration.en}</p>
              <p>${result.data.verses[i].translation.id}</p>
            </div>
          `)

          $('#ayat-list').append(`
            <li><a href="#ayat-${i+1}">ayat-${i+1}</a></li>
          `)
          
        }
      } else {
        console.log(result.status);
        console.log(result.message);
      }
      
    }
  })

}
dataAyat(1);


$.ajax({
  type: 'get',
  url: 'https://api.quran.sutanlab.id/surah',
  dataType: 'json',
  success: function (result) {
    if (result.code === 200) {

      let rslt2 = result.data
      
      for (let i = 0; i < rslt2.length; i++) {
        $('#surat-list').append(`
          <li><a href="#" class="surat d-inline-flex align-items-center rounded" data-id="${i+1}">${result.data[i].name.transliteration.id} : ${i+1}</a></li>
        `)
      }

    } else {
      console.log(result.status);
      console.log(result.message);
    }

    
    
  }
})

$("#surat-list").on('click','.surat', function() {
  $(".surat").removeClass("active");
  $(this).addClass("active");

  const id = $(this).data('id')
  // console.log(id);
  $.ajax({
    type: 'get',
    url: 'https://api.quran.sutanlab.id/surah',
    dataType: 'json',
    success: function (result) {
      if (result.code === 200) {

        $('#judul-surah').html(result.data[id-1].name.transliteration.id)
        
      }else {
        console.log(result.status);
        console.log(result.message);
      }
   
    }
  })
  dataAyat(id)
});

$('#info').on('click', function () {
  $('#list-data-ayat').html('')
  $('#ayat-list').html('')
  $('#judul-surah').html('Info')
  $('#ayat-surat').html('Information')
  $('#list-data-ayat').append(`
    <div class="mb-5">
      <p>Enjoy With Qur'an</p>
    </div>
  `)
})

$('#search-input').on('keyup', function () {
  if (e.keyCode === 13) {
    dataAyat();
  }
})



