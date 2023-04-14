var movieMood = {
  "Music": ["music"] , // 🎶 // all subgriup music!
  "Romance": ["kiss", "red heart", "hearts", "heart-eyes"] , // 💏 names contating these words
  "Comedy": ["grin", "laugh", "tears of joy"], // 🤣
  "Biography": ["memo", "scroll"], // 📝
  "Family": ["family"], // 👪 
  "War": ["bomb", "Military Medal"], // 💣
  "News": ["new"], // 📰
  "Reality": ["person tipping hand", "television"], // 💁
  "Talk Show": ["speaking head"], // 🗣️
  "Adventure" : ["person mountain biking", "camping", "desert", "national park", "world map", "sunrise", "climbing", "water wave", "palm tree", "sunset"], // 🚵
  "Fantasy" : ["mage", "castle", "dragon", "merperson", "fairy", "elf"], // 🧙
  "Animation" : ["eyes", " mouse face"], //
  "Drama" : ["performing arts", "crying face", "broken heart"], // 🎭
  "Film Noir" : ['magnifying glass', 'cigarette', 'black heart', 'night with stars'], //
  "Horror" : ['face screaming in fear'], // 🧟// 😱
  "Action" : ["helicopter", "motorcycle", "pistol"], // ⚔️
  "Game Show" : ["slot machine", "thinking face"], // 🎰
  "History" : ["old man", "face with monocle", 'film frames', 'film projector', 'mantelpiece clock'], // 👴
  "Western" : ["cowboy hat face"], // 🤠
  "Musical" : ["woman dancing"], // 💃
  "Sport" : ["person-sport"], //subgroup
  "Thiller" : ["drop of blood", 'skul'], 
  "Short" : ["ruler"], // 
  "Crime" : ["police officer", "police car light", "oncoming police car", "police car"], // 👮
  "Science Fiction" : ["nerdy face", "dna", "telescope", "test tube"], // 👽
  "Mystery" : ["detective", "silhouette","briefcase",  "compass", "old key", "puzzle"], // 🕵️
  "Documentary" : ["video camera", "film frames", "bookmark tabs"] // 📹
};

var genres = {
    "Biography": "1",
    "Music": "10402",
    "Romance": "10749",
    "Family":"10751",
    "War":"10752",
    "News":"10763",
    "Reality":"10764",
    "Talk Show":"10767",
    "Adventure":"12",
    "Fantasy":"14",
    "Animation":"16",
    "Drama":"18",
    "Film Noir": "2",
    "Horror":"27",
    "Action":"28",
    "Game Show":"3",
    "Comedy":"35",
    "History":"36",
    "Western":"37",
    "Musical":"4",
    "Sport":"5",
    "Thriller":"53",
    "Short":"6",
    "Crime":"80",
    "Science Fiction":"878",
    "Mystery":"9648",
    "Documentary":"99"
}

var genre;
var keywords = [];


$(document).ready(function() {


    function getRandomSubarray(arr, size) {
        var shuffled = arr.slice(0), i = arr.length, temp, index;
        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(0, size);
    }
    
    var genreEmoji = [];
    for (const [key, value] of Object.entries(movieMood)) {
        for (var j = 0; j<value.length;j++ ){
            genreEmoji.push(value[j]);
        }
    
    }

    
    var queryURL = "https://emoji-api.com/emojis?access_key=352cbcc2559967a6e748bbd1b737ab1e71d5f6a5"
    
    var subGroupsEmotionToInclude =["music", "person-sport"];
    var subGroupsToInclude =["animal-bird","animal-amphibian","animal-reptile","animal-marine","animal-bug", "plant-flower", "plant-other", "food-fruit",
    "food-vegetable", "food-prepared", "food-asian", "food-marine", "food-sweet", "drink", "dishware", "transport-ground","transport-water",
    "transport-air", "hotel", "time", "event", "award-medal","game","arts-crafts","clothing"];

    var emojiToPresent = [];
    
    var keyWordsToPresent = [];
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(results) {
        $(".loader").css("display","none");
        
       
        var wordsToExclude = ["skin tone", "E0", "E1", "E2" , "E3", "E4", "E5" , "E3", 
            "E4", "E5", "E6", "E7", "E8", "E9", "couple with heart", "-thirty", "o’clock",
            "mahjong", "new moon", "selfie"]  

        for (var i = 0; i < results.length; i++) {
            var flag = true;
            for (var j=0; j<results.length; j++){
                if (results[i].unicodeName.includes(wordsToExclude[j])){
                    flag = false;
                }
            } 
            if (!flag){
                continue;
            }

            
            if (subGroupsToInclude.includes(results[i].subGroup)){
                keyWordsToPresent.push(results[i]);
            }
            if (subGroupsEmotionToInclude.includes(results[i].subGroup)){
                emojiToPresent.push(results[i]);
            }
            else{
                var flag = false; 
                for (var j=0; j<genreEmoji.length; j++){
                
        
                    if (results[i].unicodeName.includes(genreEmoji[j])){
                        flag = true;
                    }
                }
                if (flag){
                    emojiToPresent.push(results[i]);
                }
            
            }
        }
    });

  
    function GenerateEmojis(){    

            $('#emojis').empty()
            $('#chooseEmojis').css("display", "block");
            var random10 = getRandomSubarray(emojiToPresent, 10);


            for (var i = 0; i < random10.length; i++) {

                var emoji = $('<div>');
                emoji.addClass("tile");
                var emojiChar = $('<h1>');
                emoji.addClass("emojiDiv");
                emojiChar.css({ 'font-size': "100px" });
                emojiChar.text(random10[i].character);
                emoji.append(emojiChar);
                
                emoji.attr("data-group", random10[i].group);
                emoji.attr("data-subGroup", random10[i].subGroup);
                emoji.attr("data-name", random10[i].unicodeName);

                $('#emojis').append(emoji);
                
            }

            $('#click-emoji').text("Click on the Emoji you want to select or generate new Emojis");


    }
        
    

    function GenerateKeyWords(){    
        $('#emojis').empty()
        var random10 = getRandomSubarray(keyWordsToPresent, 10);

        for (var i = 0; i < random10.length; i++) {

            var keyWordEmoji = $('<div>');
            keyWordEmoji.addClass("tile");
            keyWordEmoji.addClass("keyWordDiv");
            var keyWordChar = $('<h1>');
            keyWordChar.css({'font-size': "100px" });
            keyWordChar.text(random10[i].character);
            keyWordEmoji.append(keyWordChar);
            
            keyWordEmoji.attr("data-group", random10[i].group);
            keyWordEmoji.attr("data-subGroup", random10[i].subGroup);
            keyWordEmoji.attr("data-name", random10[i].unicodeName);

            $('#emojis').append(keyWordEmoji);
            
        }
        $('#chooseKeyWord-btn').text("Generate your second Emoji again! 🌹");
    }
        
    function pickKeyWord(){
       
        var name = $(this).attr("data-name");
        var group = $(this).attr("data-group");
        var subGroup = $(this).attr("data-subGroup");
  
        //var chosenEmoji = $('<h1>');
        //chosenEmoji.css({'font-size': "150px" });
        //chosenEmoji.text($(this).children().eq(0).text());
        //$("#KeyWordEmotion").append(chosenEmoji);
        textAlreadyThere = $("#genreEmotion").children().eq(0).text() + $(this).children().eq(0).text();
        $("#genreEmotion").children().eq(0).text(textAlreadyThere);
       
        $('#emojis').empty();
        
        name_words = name.split(" ");
        console.log(name_words);
        
        for (var j=0; j<name_words.length; j++){
            word = name_words[j];
            if (word!=="person" && word!=="face" && word!=="man" && word!=="woman" && word!=="with"&& word!=="and"){
                keywords.push(word);
            }
        }
        if (name_words.length>1){
            keywords.push(name);
        }
        console.log(keywords);
        $("#chooseKeyWord-btn").css("display", "none");
        pickMovie(genre, keywords);

        $('#click-emoji').css("display", "none");
    }  



    function pickEmoji(){
       
        var name = $(this).attr("data-name");
        console.log(name);
        var group = $(this).attr("data-group");
        var subGroup = $(this).attr("data-subGroup");
  
        var chosenEmoji = $('<h1>');
        chosenEmoji.css({'font-size':'150px'});
        chosenEmoji.text($(this).children().eq(0).text() + " ");

        $("#genreEmotion").append(chosenEmoji);
        $("#chooseEmoji-btn").css("display", "none");
        $("#chooseKeyWord-btn").css("display", "block");
        $('#emojis').empty();

        if (subGroup == "music"){
            genre = genres["Music"];
        }
        else if (subGroup == "person-sport"){
            genre = genres["Sport"];
            name_words = name.split(" ");
            keywords.push(name_words[name_words.length-1]);
        }
        else{
            for (const [key, value] of Object.entries(movieMood)){
                for (var j = 0; j<value.length;j++ ){
                    if (name.includes(value[j])){
                        genre = genres[key];
                        console.log(key);
                        break;
                    }
                }
            }       
        }
        
        if (!genre){
            genre = "27";
        }
        console.log(genre);
    }
    function showOldMovies(){
        $('#movies').empty();
        var getMoviegenres = JSON.parse(localStorage.getItem("movieListGenres"));
        var getMovie = JSON.parse(localStorage.getItem("movieList"));
        console.log(getMoviegenres);
        console.log(getMovie);

        $("#presentMovies").css("display", "block");
        if (getMovie!=null){
            $('#chooseEmoji-btn').css("display", "none");
            for (var j=0; j<getMovie.length; j++){
                var movie = getMovie[j];
                displayMovie(movie);
            }
        }
        else if (getMoviegenres!=null){
            $('#chooseEmoji-btn').css("display", "none");
            for (var j=0; j<getMoviegenres.length; j++){
                var movie = getMoviegenres[j];
                displayMovie(movie);
            }
        }
        else {

            $('#modal').addClass("is-active");

        }


    }

    function resetAll(){
        $('#startOver-btn').css("display", "none");
        $("#chooseEmojis").css("display","none");
        $("#presentMovies").css("display", "none");
        $('#emojis').empty();
        $('#movies').empty();
        $("#genreEmotion").empty();
        $('#chooseEmoji-btn').css("display", "block");
        $('#chooseEmoji-btn').text("Generate Emojis🤪");
  
    }

    $(document).on("click", "#chooseEmoji-btn", GenerateEmojis);
    $(document).on("click", "#chooseKeyWord-btn", GenerateKeyWords);
    $('.delete').on("click", function(){ $('#modal').removeClass("is-active");}); 
    $(document).on("click", ".emojiDiv", pickEmoji);
    $(document).on("click", ".keyWordDiv",pickKeyWord);
    $('#stored-movies').on("click",showOldMovies);
    $('#startOver-btn').on("click", resetAll);
     
     


});




    
