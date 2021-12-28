module.exports = {
   zeropad: function zeropad(number){
        if(number < 10){
          number = '0' + number
          return number.toString()
        }else{
          return number.toString()
        }
      },
    getSongID: function getSongID(spotifyurl){
        var split_url = spotifyurl.split("/")
        var len = split_url.length
        return split_url[len - 1]
      }
}