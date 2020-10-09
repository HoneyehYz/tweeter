/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = (tweetData) => {
  $dateCreated = new Date(tweetData.created_at);
  $dateToday = new Date();

  $timeDiff = Math.abs($dateToday.getTime() - $dateCreated.getTime());
  $diffDays = Math.ceil($timeDiff / (1000 * 3600 * 24));

  //structure of tweet
  $tweet = (`<article>` +
              `<header>` +
                `<img src="${tweetData.user.avatars}">` +
                `<h2>${tweetData.user.name}</h2>` +
                `<span>${tweetData.user.handle}</span>` +
              `</header>` +
              `<section class="body">${tweetData.content.text}</section>` +
              `<footer>` +
                `<p class="daysAgo">${$diffDays} days ago</p>` +
                `<div class="options">` +
                  `<span><i class="fas fa-flag"></i></span>` +
                  `<span><i class="fas fa-retweet"></i></span>` +
                  `<span class="fas fa-heart"><i class="fas fa-heart"></i></span>` +
                `</div>` +
              `</footer>` +
            `</article>`);

  return $tweet;

}
const renderTweets = (tweets) => {

  $("#tweet-container").empty();
  for (let i in tweets) {
   const $tweet = createTweetElement(tweets[i]);
    $('#tweet-container').prepend($tweet);
  }
  $("#tweet-container")[0].reset();

}

$(document).ready(function () {
//const tweet = renderTweets(tweets);
//const $tweet = createTweetElement(tweetData);

//console.log($tweet); 
//$('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
//loadTweets();



$(".tweet-form").on("submit", function(event) {

  event.preventDefault();
  



  let tweetMsg  = $("#messages").val();
  

  if ( tweetMsg === "" || tweetMsg === null) {

    $( ".tweet-form" ).slideDown( "slow", function() {
      // Animation complete.
      alert("There is nothing to post.");
    });

      
   

  } else if (tweetMsg.length > 140) {

  
      alert("Your message is too long.");

    

  } else {


    $.ajax({

      url: "/tweets",
      method: "POST",
      data: $(this).serialize(),
    })
      .then((response) => {
       loadTweets();
            });


  }

});


const loadTweets = () => {

  $.ajax({

    url: "/tweets",
    method: "GET",
    dataType: "JSON"
  })
    .then((response) => {
     renderTweets(response);
          });
  

};


loadTweets();


});




