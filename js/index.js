$(document).ready(function() {
    var item, tile, author, description, publishedDate, bookImg;
    var outputList = document.getElementById("list-output");
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    var apiKey = "key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw";
    var placeHldr = '<img src="https://via.placeholder.com/150">';
    var searchData;


    $("#search").click(function() {
        outputList.innerHTML = "";
        searchData = $("#search-box").val();

        if (searchData === "" || searchData === null) {
            displayError();
        } else {
            $.ajax({
                url: bookUrl + searchData,
                dataType: "json",
                success: function(response) {
                    console.log(response)
                    if (response.totalItems === 0) {
                        alert("no result!.. try again")
                    } else {

                        $(".book-list").css("visibility", "visible");
                        displayResults(response);
                    }
                },
                error: function() {
                    alert("Something went wrong.. <br>" + "Try again!");
                }
            });
        }
        $("#search-box").val("");
    });

    function displayResults(response) {
        for (var i = 0; i < response.items.length; i += 2) {
            item = response.items[i];
            title1 = item.volumeInfo.title;
            author1 = item.volumeInfo.authors;
            description1 = item.volumeInfo.description;
            publishedDate1 = item.volumeInfo.publishedDate;
            bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

            item = response.items[i + 1];
            title2 = item.volumeInfo.title;
            author2 = item.volumeInfo.authors;
            description2 = item.volumeInfo.description;
            publishedDate2 = item.volumeInfo.publishedDate;
            bookImg2 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

            item = response.items[i + 2];
            title3 = item.volumeInfo.title;
            author3 = item.volumeInfo.authors;
            description3 = item.volumeInfo.description;
            publishedDate3 = item.volumeInfo.publishedDate;
            bookImg3 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;



            outputList.innerHTML += '<div class="row mt-4">' +
                formatOutput(bookImg1, title1, author1, description1, publishedDate1) +
                formatOutput(bookImg2, title2, author2, description2, publishedDate2) +
                formatOutput(bookImg3, title3, author3, description3, publishedDate3) + '</div>';

            console.log(outputList);
        }
    }



    function formatOutput(bookImg, title, author, description, publishedDate) {

        var htmlCard = `<div class="col-lg-4">
       <div class="card" style="">
         <div class="row no-gutters">
           <div class="col-md-4">
             <img src="${bookImg}" class="card-img" alt="...">
           </div>
           <div class="col-md-8">
             <div class="card-body">
               <h5 class="card-title">${title}</h5>
               <p class="card-text">Author: ${author}</p>
               <p class="card-text">published: ${publishedDate}</p>
               <p id="description" class="card-text">description: ${description}</p>
             </div>
           </div>
         </div>
       </div>
     </div>`

        return htmlCard;
    }
    /*zrobiłem funkcję która miała skracać długość opisu ale gdy ją wywoływałem wyszukiwanie przestawało działać */
    function strtr(str1) {
        if (str1.length > 200) {
            return str1.slice(0, 200) + "...";
        } else {
            return str1;
        }
    }



    function displayError() {
        alert("search term can not be empty!")
    }

});