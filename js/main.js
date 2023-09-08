/*
  1:interface of search
    requested address: https://autumnfish.cn/search
    requested method: get
    requested params: keywords
    responsed content: the result list of the music

  2:interface of music url
    requested address: https://autumnfish.cn/song/url
    requested method: get
    requested params: id(music_id)
    responsed content: music's url address

  3.interface of music info
    requested address: https://autumnfish.cn/song/detail
    requested method: get
    requested params: ids(music_id)
    responsed content: music info(including music cover)

  4.interface of hot comments
    requested address: https://autumnfish.cn/comment/hot?type=0
    requested method: get
    requested params: id(music_id)
    responsed content: music's hot comments

  5.interface of mv url
    requested address: https://autumnfish.cn/mv/url
    requested method: get
    requested params: id(mvid, 0 indicates no mv)
    responsed content: mv url
*/
var app = new Vue({
  el: "#player",
  data: {
    // search keyword
    query: "",
    // music lists
    musicList: [],
    // music address
    musicUrl: "",
    // music cover
    musicCover: "",
    // music comments
    hotComments: [],
    // status of playing
    isPlaying: false,
    // status of cover showing
    isShow: false,
    // mv address
    mvUrl: ""
  },
  methods: {
    // Search a music
    searchMusic: function() {
      var that = this;
      axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
        function(response) {
          // console.log(response);
          that.musicList = response.data.result.songs;
          console.log(response.data.result.songs);
        },
        function(err) {}
      );
    },
    // Play the music
    playMusic: function(musicId) {
      //   console.log(musicId);
      var that = this;
      // get the url of the music
      axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(
        function(response) {
          // console.log(response);
          // console.log(response.data.data[0].url);
          that.musicUrl = response.data.data[0].url;
        },
        function(err) {}
      );

      // get the info of the music
      axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(
        function(response) {
          // console.log(response);
          // console.log(response.data.songs[0].al.picUrl);
          that.musicCover = response.data.songs[0].al.picUrl;
        },
        function(err) {}
      );

      // get the comments of the music
      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(
        function(response) {
          // console.log(response);
          // console.log(response.data.hotComments);
          that.hotComments = response.data.hotComments;
        },
        function(err) {}
      );
    },
    // play the music
    play: function() {
      // console.log("play");
      this.isPlaying = true;
    },
    // pause the music
    pause: function() {
      // console.log("pause");
      this.isPlaying = false;
    },
    // play the mv
    playMV: function(mvid) {
      var that = this;
      axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
        function(response) {
          // console.log(response);
          console.log(response.data.data.url);
          that.isShow = true;
          that.mvUrl = response.data.data.url;
        },
        function(err) {}
      );
    },
    // hide
    hide: function() {
      this.isShow = false;
    }
  }
});
