[
  {
    "module": "net.urlToDom",
    "config": {
      "url": "http://seiga.nicovideo.jp/illust/ranking/point/hourly/g_creation"
    }
  },

  {
    "module": "net.domFilter",
    "config": {
      "selector": ".rank_block_right img",
      "callback": "return item.attr('src');"
    }
  },

  {
    "module": "net.httpDownload",
    "config": {
      "dir": "./tmp/nicoseiga"
    }
  }

]
