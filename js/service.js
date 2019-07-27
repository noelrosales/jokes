var getRandomJoke = function(){
    return $.ajax({
        method: 'get',
        url: JOKES_API
    })
}

var getRandomReaction = function(){
    return $.ajax({
        method: 'get',
        url: YN_API
    })
}