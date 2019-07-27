$(function(){
  var jokeButton = $('#joke-button');
  var jokeResetButton = $('#joke-reset-button');
  var jokesList = $('#jokes-list');
  var jokeStatus = $('#status');
  var reaction = $('#reaction');
  var jokeLoader = $('#joke-loader');

  var randomJoke = '';
  var randomReaction = {};
  var jokeCount = 0;
  var jokeRating = 0;
  var funny = false;

  jokeLoader.hide();
  jokeResetButton.hide();

  jokeButton.on('click', function(e){
    makeJoke();
  });

  jokeResetButton.on('click', function(){
    resetJokesList();
    enableSubmit();
    reaction.empty();
    $(this).hide();
  });

  function makeJoke(){
    jokeLoader.show();
    disableSubmit();
    getRandomJoke()
      .then(res => {
        randomJoke = res;
        return getRandomReaction();
      })
      .then(res => {
        randomReaction = res;

        if(randomReaction.answer === 'yes'){
          jokeRating += 1;
        }

      })
      .then(() => {
        jokeCount ++;
        jokeLoader.hide();
        renderJoke(randomJoke, randomReaction.image);
        checkStatus();
      })
  }

  function enableSubmit(){
    jokeButton.attr('disabled', false);
  }

  function disableSubmit(){
    jokeButton.attr('disabled', true);
  }

  function renderJoke(randomJoke, thumbnail){
    var template = `
      <li>
        <p>${randomJoke}</p>
        <img src=${thumbnail}>
      </li>
    `
    jokesList.append(template);
  }

  function checkStatus(){
    if(jokeCount === 5){
      disableSubmit();
      getJokeRating();
      jokeButton.text(MESSAGE.FULL);
      jokeResetButton.show();
    } else{
      enableSubmit();
    }
  }

  function getJokeRating(){
    funny = jokeRating >= 3 ? true : false;
    reaction.append(renderStatus(funny));
  }

  function renderStatus(isFunny){
    var message = isFunny ? MESSAGE.FUNNY : MESSAGE.NOT_FUNNY ;
    var thumbnail = isFunny ? IMAGE.FUNNY : IMAGE.NOT_FUNNY;
    
    return `
      <div>
        <img src="${thumbnail}"/>
        <h4>${message}</h4>
      </div>
    `
  }

  function resetJokesList(){
    jokeCount = 0;
    jokeRating = 0;
    funny = false;
    jokeButton.text('GENERATE A JOKE');
    jokesList.empty();
  }
  
})