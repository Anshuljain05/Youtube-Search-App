$(document).ready(function () {
    var API_KEY = "";
    var search = "";
    var maxResults=10;    
    
    $("#myForm").submit(function (e) {
      e.preventDefault();
  
      search = $("#search").val();
  
      API_KEY = "AIzaSyC4ld1h_rO50pMhyDs6lrSWhjBiWTXAjGI";
  
      var url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${search}&maxResults=${maxResults}&type=video`;
  
      $.ajax({
        method: "GET",
        url: url,
        beforeSend: function () {
          $("#btn").attr("disabled", true);
          $("#results").empty();
        },
        success: function (data) {
          console.log(data);
          $("#btn").attr("disabled", false);
          displayVideos(data);
        },
      });
    });
    
    $("#search").change(function () {
      search = $("#search").val();
    });
  
    function displayVideos(data) {
  
      var videoData = "";
  
      $("#table").show();
  
      data.items.forEach((item) => {
        videoData = `
                      
                      <tr>
                      <td>
                      <a target="_blank" href="https://www.youtube.com/watch?v=${item.id.videoId}">
                      ${item.snippet.title}</td>
                      <td>
                      <img width="200" height="200" src="${item.snippet.thumbnails.high.url}"/>
                      </td>
                      <td>
                      <a target="_blank" href="https://www.youtube.com/channel/${item.snippet.channelId}">${item.snippet.channelTitle}</a>
                      </td>
                      </tr>
                      `;
  
        $("#results").append(videoData);
      });
    }
  });