(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.playAudioList([this.audio_36703AAB_3DE4_CC4F_41CD_7AC3E7E4C9E6]); this.init(); this.syncPlaylists([this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist,this.mainPlayList]); this.playList_4FF6D020_5819_ADB2_41C6_4DA7AF5705BB.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_4CB3D624_437C_7DE3_41B5_894BCC8B5F59].forEach(function(component) { component.set('visible', false); }) }",
 "layout": "absolute",
 "children": [
  "this.MainViewer",
  "this.MapViewer",
  "this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873",
  "this.IconButton_4CB3D624_437C_7DE3_41B5_894BCC8B5F59",
  "this.Image_562AA81F_4345_BCDF_41B2_7D1C43191DC0",
  "this.IconButton_2DA98648_3FAE_FE10_41C2_2831605922EE",
  "this.Image_57653967_4347_7F6F_4166_5A375DABB586",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "height": "100%",
 "id": "rootPlayer",
 "paddingLeft": 0,
 "desktopMipmappingEnabled": false,
 "paddingRight": 0,
 "width": "100%",
 "definitions": [{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_camera",
 "initialPosition": {
  "yaw": 1.29,
  "hfov": 120,
  "pitch": 3.97,
  "class": "PanoramaCameraPosition"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_camera",
 "initialPosition": {
  "yaw": 0.61,
  "hfov": 120,
  "pitch": 4.32,
  "class": "PanoramaCameraPosition"
 }
},
{
 "duration": 500,
 "id": "effect_5659CABD_4345_5DE3_41C1_5D443960365D",
 "from": "left",
 "easing": "linear",
 "class": "SlideInEffect"
},
{
 "label": "\uce60\uc0ac\ub2f9",
 "id": "panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57",
 "mapLocations": [
  {
   "map": "this.map_98DB5317_3BFB_3DDF_41C4_19EF616EB473",
   "x": 250.72,
   "angle": 194.56,
   "class": "PanoramaMapLocation",
   "y": 530.52
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "hfovMax": 135,
 "overlays": [
  "this.overlay_333B5203_3FEF_04D5_41C6_2B6326459E1B",
  "this.overlay_460E6E35_4911_D16C_41C9_322A4BF87249",
  "this.panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_tcap0"
 ],
 "hfovMin": "200%",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
   "yaw": -147.83,
   "distance": 1,
   "backwardYaw": -127.64,
   "class": "AdjacentPanorama"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_407070AE_5819_AE8E_41CB_4E00A277D0C9",
 "initialPosition": {
  "yaw": 58.26,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "id": "ImageResource_5896B006_44A6_94F6_41CF_1E37991F9803",
 "levels": [
  {
   "url": "media/popup_583A5A3D_44A6_F51A_41B1_1956C48EE782_0_0.png",
   "width": 3071,
   "height": 826,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_583A5A3D_44A6_F51A_41B1_1956C48EE782_0_1.png",
   "width": 2048,
   "height": 550,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_583A5A3D_44A6_F51A_41B1_1956C48EE782_0_2.png",
   "width": 1024,
   "height": 275,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_583A5A3D_44A6_F51A_41B1_1956C48EE782_0_3.png",
   "width": 512,
   "height": 137,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "label": "\uc815\uc804",
 "id": "panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
 "mapLocations": [
  {
   "map": "this.map_98DB5317_3BFB_3DDF_41C4_19EF616EB473",
   "x": 333.84,
   "angle": 10.31,
   "class": "PanoramaMapLocation",
   "y": 522.69
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/f/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/u/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/r/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/b/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/d/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_0/l/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "hfovMax": 135,
 "overlays": [
  "this.overlay_33512189_3FEF_07D5_41AF_4CA09E6C3635",
  "this.overlay_33511189_3FEF_07D5_41C1_F8DC1D054C6B",
  "this.overlay_33516189_3FEF_07D5_4191_633263E7FA4C",
  "this.overlay_33514189_3FEF_07D5_41C4_6B5790F03EA8",
  "this.overlay_47C8EA7B_4910_71E4_41B1_54F1A291FAC6",
  "this.overlay_3350A189_3FEF_07D5_41CB_D75AC6C6D231",
  "this.overlay_33508189_3FEF_07D5_41BF_5A1D2001CBB4",
  "this.overlay_3350C189_3FEF_07D5_41B5_E92EC747AF60",
  "this.overlay_46CDCEDD_4910_EEDC_41D1_DDD820182157",
  "this.overlay_46368E5E_4910_D1DC_41B2_CDE2BB93C7EE",
  "this.overlay_46438F75_4910_AFEC_41B3_177426B8571A",
  "this.popup_4DCCD8EE_4347_5D61_41C7_A15139392B70",
  "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_tcap0"
 ],
 "hfovMin": "200%",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3326AF10_3FEF_3CF3_418E_9395E076674D",
   "yaw": 132.82,
   "distance": 1,
   "backwardYaw": 155.84,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57",
   "yaw": -127.64,
   "distance": 1,
   "backwardYaw": -147.83,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E",
   "yaw": -79.97,
   "distance": 1,
   "backwardYaw": 179.82,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE",
   "yaw": 179.82,
   "distance": 1,
   "backwardYaw": 0.57,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5",
   "yaw": -0.01,
   "distance": 1,
   "backwardYaw": -121.74,
   "class": "AdjacentPanorama"
  }
 ]
},
{
 "duration": 500,
 "id": "effect_5659BABD_4345_5DE3_41B1_4057E1D5D6C7",
 "easing": "linear",
 "to": "left",
 "class": "SlideOutEffect"
},
{
 "label": "\uc815\uc804\ub0a8\uc2e0\ubb38",
 "id": "panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE",
 "mapLocations": [
  {
   "map": "this.map_98DB5317_3BFB_3DDF_41C4_19EF616EB473",
   "x": 316.93,
   "angle": 19.92,
   "class": "PanoramaMapLocation",
   "y": 572.05
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/f/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/u/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/r/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/b/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/d/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_0/l/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "hfovMax": 135,
 "overlays": [
  "this.overlay_33280DF3_3FEF_1F35_41CA_D94DB0424BA7",
  "this.overlay_33281DF3_3FEF_1F35_41CD_99C169A71A85",
  "this.overlay_4612D20A_4910_7124_41D1_83657FF5E984",
  "this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_tcap0"
 ],
 "hfovMin": "200%",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E",
   "yaw": 179.82,
   "distance": 1,
   "backwardYaw": 2.16,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
   "yaw": 0.57,
   "distance": 1,
   "backwardYaw": 179.82,
   "class": "AdjacentPanorama"
  }
 ]
},
{
 "layout": "vertical",
 "titleFontSize": "1.29vmin",
 "id": "window_4142C2FD_57EA_9292_41C1_E525FCCDA603",
 "titlePaddingRight": 5,
 "paddingLeft": 0,
 "headerBackgroundOpacity": 0,
 "bodyPaddingLeft": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "bodyBackgroundOpacity": 0,
 "minHeight": 20,
 "modal": true,
 "closeButtonPressedIconLineWidth": 3,
 "contentOpaque": false,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 20,
 "closeButtonIconHeight": 20,
 "scrollBarWidth": 10,
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "closeButtonIconLineWidth": 2,
 "veilOpacity": 0.4,
 "closeButtonIconColor": "#B2B2B2",
 "backgroundColor": [],
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "shadowSpread": 1,
 "title": "",
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "backgroundOpacity": 1,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "titleFontStyle": "normal",
 "headerPaddingTop": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "titlePaddingBottom": 5,
 "closeButtonBackgroundColor": [],
 "bodyPaddingRight": 0,
 "bodyBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonPressedIconColor": "#FFFFFF",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "closeButtonIconWidth": 20,
 "shadow": true,
 "bodyPaddingBottom": 0,
 "bodyPaddingTop": 0,
 "titlePaddingLeft": 5,
 "headerPaddingBottom": 5,
 "propagateClick": false,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "headerBackgroundColorDirection": "vertical",
 "shadowHorizontalLength": 3,
 "scrollBarVisible": "rollOver",
 "footerHeight": 5,
 "children": [
  "this.viewer_uid4FEEC01D_5819_AD92_418A_556E318E263E"
 ],
 "titleFontColor": "#000000",
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "headerPaddingRight": 0,
 "shadowColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "headerVerticalAlign": "middle",
 "closeButtonBorderRadius": 11,
 "veilColorDirection": "horizontal",
 "class": "Window",
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "titleFontFamily": "Arial",
 "shadowBlurRadius": 6,
 "footerBackgroundOpacity": 0,
 "titlePaddingTop": 5,
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "titleFontWeight": "normal",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonBackgroundColorRatios": [],
 "gap": 10,
 "paddingBottom": 0,
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "verticalAlign": "middle",
 "headerBorderSize": 0,
 "overflow": "scroll",
 "headerPaddingLeft": 10,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColor": [],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "horizontalAlign": "center",
 "shadowVerticalLength": 0,
 "footerBackgroundColorDirection": "vertical",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window16396"
 }
},
{
 "label": "\uc601\ub144\uc804",
 "id": "panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E",
 "mapLocations": [
  {
   "map": "this.map_98DB5317_3BFB_3DDF_41C4_19EF616EB473",
   "x": 180.56,
   "angle": 15.94,
   "class": "PanoramaMapLocation",
   "y": 379.83
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536,
      "rowCount": 3
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "hfovMax": 135,
 "overlays": [
  "this.overlay_330C948B_3FF1_0DD5_41C6_DF17468F4EE6",
  "this.overlay_460CCB98_4910_5724_41B4_34FBBE409CF1",
  "this.panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_tcap0"
 ],
 "hfovMin": "200%",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
   "yaw": 179.82,
   "distance": 1,
   "backwardYaw": -79.97,
   "class": "AdjacentPanorama"
  }
 ]
},
{
 "label": "\uc2e0\uc2e41",
 "id": "panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5",
 "mapLocations": [
  {
   "map": "this.map_98DB5317_3BFB_3DDF_41C4_19EF616EB473",
   "x": 346.8,
   "angle": 293.82,
   "class": "PanoramaMapLocation",
   "y": 455.18
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/f/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/u/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/r/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/b/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/d/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_0/l/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "hfovMax": 135,
 "overlays": [
  "this.overlay_3350E5FA_3FEF_0F37_41CA_D0F68D954A77",
  "this.overlay_3350C5FA_3FEF_0F37_41C8_A832CFB2D2D5",
  "this.overlay_46383233_4911_B164_41CB_0E0418E182F6",
  "this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_tcap0"
 ],
 "hfovMin": "200%",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_33289CC4_3FEF_1D53_419F_007869704957",
   "yaw": 179.37,
   "distance": 1,
   "backwardYaw": 179.51,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
   "yaw": -121.74,
   "distance": 1,
   "backwardYaw": -0.01,
   "class": "AdjacentPanorama"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_409CC0CE_5819_AE8E_41D3_05C3684043F0",
 "initialPosition": {
  "yaw": -177.84,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "duration": 500,
 "id": "effect_6353A5D8_4375_0435_41B7_34787061D6D6",
 "from": "right",
 "easing": "linear",
 "class": "SlideInEffect"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_40476082_5819_AD76_41C2_46F101AEDB69",
 "initialPosition": {
  "yaw": 32.17,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "initialZoomFactor": 1,
 "maximumZoomFactor": 1.2,
 "label": "\uc9c0\ub3c4",
 "id": "map_98DB5317_3BFB_3DDF_41C4_19EF616EB473",
 "fieldOfViewOverlayOutsideColor": "#FFFFFF",
 "width": 739,
 "image": {
  "levels": [
   {
    "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473.png",
    "width": 739,
    "height": 1025,
    "class": "ImageResourceLevel"
   },
   {
    "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_lq.png",
    "width": 217,
    "height": 301,
    "tags": "preload",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayInsideColor": "#FF0033",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayRadiusScale": 0.04,
 "class": "Map",
 "overlays": [
  "this.overlay_C1E31626_3B09_27F1_41CB_18BA6DF8E970",
  "this.overlay_C05B7046_3B09_FBB1_41B4_4AB4CDED2AC5",
  "this.overlay_C6BA80B1_3B09_1CD3_41B8_751B87845CFD",
  "this.overlay_C72B2C0E_3B09_2BB1_41A9_61C580F5B7B1",
  "this.overlay_C53C2A0A_3B09_2FB1_41B5_EFD282EB2FD6",
  "this.overlay_3AC1A423_3B09_1BF7_41B5_552B0C6303A6",
  "this.overlay_3AC1AE0A_3B09_67B1_41C7_676C9D38E35C",
  "this.overlay_3AC1B8CB_3B09_6CB7_41AB_75E89F274C89",
  "this.overlay_5ED295BB_459A_81CB_41A0_99829AA7A709"
 ],
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayInsideOpacity": 0.42,
 "thumbnailUrl": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_t.png",
 "height": 1025
},
{
 "items": [
  "this.PanoramaPlayListItem_4FF9D021_5819_ADB2_41D4_026A407369F9",
  "this.PanoramaPlayListItem_4FF97021_5819_ADB2_41C2_662D5A52C31E",
  "this.PanoramaPlayListItem_4FF8F021_5819_ADB2_41CB_FD30EB7A2096",
  "this.PanoramaPlayListItem_4FF87027_5819_ADBE_41C4_D6B5CB43265A",
  "this.PanoramaPlayListItem_4FFBF027_5819_ADBE_41B0_140D37025724",
  "this.PanoramaPlayListItem_4FFB7027_5819_ADBE_41C4_E223050AA967",
  "this.PanoramaPlayListItem_4FFAE027_5819_ADBE_41D4_BEA58B59EBF8",
  "this.PanoramaPlayListItem_4FFA6027_5819_ADBE_41D5_074F7CC2D1B3",
  {
   "media": "this.video_585F0C11_57EA_7592_41B8_756638AAAC61",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerVideoPlayer",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 8, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 8)"
  },
  {
   "media": "this.media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0",
   "end": "this.trigger('tourEnded')",
   "class": "Video360PlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerPanoramaPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 0)",
   "camera": "this.media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 9, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 9)"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "label": "\uc885\ubb18\uc785\uad6c",
 "id": "panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E",
 "mapLocations": [
  {
   "map": "this.map_98DB5317_3BFB_3DDF_41C4_19EF616EB473",
   "x": 435.1,
   "angle": 361.56,
   "class": "PanoramaMapLocation",
   "y": 956.48
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/f/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/u/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/r/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/b/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/d/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0/l/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "hfovMax": 135,
 "overlays": [
  "this.overlay_32E047E5_3FEF_0B5D_41C2_E8A68EB19F73",
  "this.overlay_4604D652_4917_D124_41C7_3E33A6EE9526",
  "this.panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_tcap0",
  "this.overlay_59842199_57EE_AE92_41BC_CAAB9CB282C1",
  "this.popup_58AE0360_57EA_93B2_41C9_C90E2A283C70",
  "this.overlay_47123AF7_57FA_929E_41B5_BC3A285D44B7",
  "this.overlay_44D9C792_57FA_9296_41C5_9C2091E42F78",
  "this.overlay_4305FFD6_57F9_B29E_41A4_C985AB7A3367"
 ],
 "hfovMin": "200%",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE",
   "yaw": 2.16,
   "distance": 1,
   "backwardYaw": 179.82,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0",
   "class": "AdjacentPanorama"
  }
 ]
},
{
 "closeButtonBorderSize": 0,
 "titleFontSize": "1.29vmin",
 "id": "window_58377443_57EA_95F6_41C7_51F0B1DE8C78",
 "titlePaddingRight": 5,
 "layout": "vertical",
 "paddingLeft": 0,
 "headerBackgroundOpacity": 0,
 "bodyPaddingLeft": 0,
 "closeButtonPressedBorderSize": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "bodyBackgroundOpacity": 0,
 "closeButtonBackgroundOpacity": 0.3,
 "minHeight": 20,
 "modal": true,
 "closeButtonRollOverBorderSize": 0,
 "closeButtonPressedIconLineWidth": 5,
 "contentOpaque": false,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 20,
 "closeButtonIconHeight": 20,
 "scrollBarWidth": 10,
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "closeButtonIconLineWidth": 5,
 "veilOpacity": 0.4,
 "closeButtonIconColor": "#000000",
 "backgroundColor": [],
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "shadowSpread": 1,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "backgroundOpacity": 1,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingTop": 10,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "closeButtonRollOverIconColor": "#666666",
 "titlePaddingBottom": 5,
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "bodyPaddingRight": 0,
 "bodyBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonRollOverBackgroundOpacity": 0.3,
 "closeButtonPressedIconColor": "#888888",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "closeButtonIconWidth": 20,
 "shadow": true,
 "bodyPaddingBottom": 0,
 "closeButtonBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 0,
 "titlePaddingLeft": 5,
 "headerPaddingBottom": 5,
 "propagateClick": false,
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "headerBackgroundColorDirection": "vertical",
 "shadowHorizontalLength": 3,
 "scrollBarVisible": "rollOver",
 "closeButtonPaddingLeft": 5,
 "footerHeight": 5,
 "children": [
  "this.viewer_uid4FEC5017_5819_AD9E_41B2_0A5F549D6EE0"
 ],
 "closeButtonRollOverBorderColor": "#000000",
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "headerPaddingRight": 0,
 "shadowColor": "#000000",
 "closeButtonPaddingTop": 5,
 "veilColorRatios": [
  0,
  1
 ],
 "headerVerticalAlign": "middle",
 "closeButtonBorderRadius": 0,
 "closeButtonBorderColor": "#000000",
 "class": "Window",
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "titleFontFamily": "Arial",
 "shadowBlurRadius": 6,
 "footerBackgroundOpacity": 0,
 "titlePaddingTop": 5,
 "scrollBarColor": "#000000",
 "closeButtonPaddingRight": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "gap": 10,
 "paddingBottom": 0,
 "closeButtonRollOverIconLineWidth": 5,
 "shadowOpacity": 0.5,
 "paddingTop": 0,
 "verticalAlign": "middle",
 "overflow": "scroll",
 "closeButtonPressedBackgroundOpacity": 0.3,
 "headerPaddingLeft": 10,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "closeButtonPaddingBottom": 5,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "horizontalAlign": "center",
 "closeButtonPressedBorderColor": "#000000",
 "shadowVerticalLength": 0,
 "footerBackgroundColorDirection": "vertical",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window3977"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_camera",
 "initialPosition": {
  "yaw": -3.89,
  "hfov": 120,
  "pitch": 1.61,
  "class": "PanoramaCameraPosition"
 }
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerVideoPlayer",
 "class": "VideoPlayer"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_40BB80E1_5819_AEB2_41BE_B98DFC6FDC89",
 "initialPosition": {
  "yaw": -0.49,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_camera",
 "initialPosition": {
  "yaw": 7.67,
  "hfov": 120,
  "pitch": -3,
  "class": "PanoramaCameraPosition"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_402D5065_5819_ADB2_4162_C7C2FB85EA21",
 "initialPosition": {
  "yaw": -0.18,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "id": "ImageResource_52FFF024_4345_ACE1_41C1_FD3C31F88BEB",
 "levels": [
  {
   "url": "media/popup_4DCCD8EE_4347_5D61_41C7_A15139392B70_0_0.png",
   "width": 1037,
   "height": 796,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_4DCCD8EE_4347_5D61_41C7_A15139392B70_0_1.png",
   "width": 1024,
   "height": 786,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_4DCCD8EE_4347_5D61_41C7_A15139392B70_0_2.png",
   "width": 512,
   "height": 393,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_408F50C5_5819_AEF2_41D1_A362CF62AD04",
 "initialPosition": {
  "yaw": 52.36,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "duration": 500,
 "id": "effect_6353B5D8_4375_0435_41A6_5A4BC2F5614A",
 "easing": "linear",
 "to": "right",
 "class": "SlideOutEffect"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_40AA30D8_5819_AE92_41C3_149E521B7338",
 "initialPosition": {
  "yaw": -0.18,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "viewerArea": "this.MainViewer",
 "mouseControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer",
 "displayPlaybackBar": true,
 "id": "MainViewerPanoramaPlayer",
 "touchControlMode": "drag_rotation"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_camera",
 "initialPosition": {
  "yaw": 1.75,
  "hfov": 120,
  "pitch": 4.46,
  "class": "PanoramaCameraPosition"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_33289CC4_3FEF_1D53_419F_007869704957_camera",
 "initialPosition": {
  "yaw": 4.74,
  "hfov": 120,
  "pitch": 0.96,
  "class": "PanoramaCameraPosition"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_camera",
 "initialPosition": {
  "yaw": -0.47,
  "hfov": 120,
  "pitch": 6.99,
  "class": "PanoramaCameraPosition"
 }
},
{
 "items": [
  {
   "media": "this.panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E",
   "camera": "this.panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE",
   "camera": "this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
   "camera": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5",
   "camera": "this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_33289CC4_3FEF_1D53_419F_007869704957",
   "camera": "this.panorama_33289CC4_3FEF_1D53_419F_007869704957_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_3326AF10_3FEF_3CF3_418E_9395E076674D",
   "camera": "this.panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57",
   "camera": "this.panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E",
   "camera": "this.panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.video_585F0C11_57EA_7592_41B8_756638AAAC61",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 8, 9)",
   "player": "this.MainViewerVideoPlayer",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 8, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 8)"
  },
  {
   "media": "this.media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0",
   "class": "Video360PlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerPanoramaPlayer); this.setEndToItemIndex(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 9, 0)",
   "camera": "this.media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "start": "this.MainViewerPanoramaPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 9, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist, 9)"
  }
 ],
 "id": "ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_40552091_5819_AE92_41BD_6E84F111F4EC",
 "initialPosition": {
  "yaw": -0.18,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_98DB5317_3BFB_3DDF_41C4_19EF616EB473",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_4FF6D020_5819_ADB2_41C6_4DA7AF5705BB",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_40200056_5819_AD9E_41D0_E44ACC6B243F",
 "initialPosition": {
  "yaw": 100.03,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_camera",
 "initialPosition": {
  "yaw": 0.04,
  "hfov": 120,
  "pitch": 2.88,
  "class": "PanoramaCameraPosition"
 }
},
{
 "manualRotationSpeed": 1800,
 "automaticZoomSpeed": 10,
 "class": "RotationalCamera",
 "manualZoomSpeed": 1,
 "id": "media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0_camera",
 "initialPosition": {
  "yaw": 0,
  "hfov": 120,
  "pitch": 0,
  "class": "RotationalCameraPosition"
 },
 "automaticRotationSpeed": 10
},
{
 "audio": {
  "oggUrl": "media/audio_0243F00B_3919_1BB7_41CC_5410EA18FBC6.ogg",
  "class": "AudioResource",
  "mp3Url": "media/audio_0243F00B_3919_1BB7_41CC_5410EA18FBC6.mp3"
 },
 "class": "MediaAudio",
 "autoplay": true,
 "id": "audio_0243F00B_3919_1BB7_41CC_5410EA18FBC6",
 "data": {
  "label": "\ub864\uc624\ubc843"
 }
},
{
 "items": [
  {
   "media": "this.video_585F0C11_57EA_7592_41B8_756638AAAC61",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid4FEC5017_5819_AD9E_41B2_0A5F549D6EE0VideoPlayer)",
   "player": "this.viewer_uid4FEC5017_5819_AD9E_41B2_0A5F549D6EE0VideoPlayer",
   "start": "this.viewer_uid4FEC5017_5819_AD9E_41B2_0A5F549D6EE0VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_45024D70_57F6_B792_41C0_52433678F260, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_45024D70_57F6_B792_41C0_52433678F260, 0)"
  }
 ],
 "id": "PlayList_45024D70_57F6_B792_41C0_52433678F260",
 "class": "PlayList"
},
{
 "label": "\uc2e0\uc2e42",
 "id": "panorama_33289CC4_3FEF_1D53_419F_007869704957",
 "mapLocations": [
  {
   "map": "this.map_98DB5317_3BFB_3DDF_41C4_19EF616EB473",
   "x": 394.87,
   "angle": 114.2,
   "class": "PanoramaMapLocation",
   "y": 477.27
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/f/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/u/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/r/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/b/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/d/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_0/l/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "hfovMax": 135,
 "overlays": [
  "this.overlay_3328BCC4_3FEF_1D53_41C2_5D07A77A92F7",
  "this.overlay_33286CC4_3FEF_1D53_41C4_AA6A2A79A97D",
  "this.panorama_33289CC4_3FEF_1D53_419F_007869704957_tcap0"
 ],
 "hfovMin": "200%",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5",
   "yaw": 179.51,
   "distance": 1,
   "backwardYaw": 179.37,
   "class": "AdjacentPanorama"
  }
 ]
},
{
 "duration": 500,
 "id": "effect_5E49C718_459A_82D5_41BC_347F532C2491",
 "easing": "linear",
 "to": "left",
 "class": "SlideOutEffect"
},
{
 "label": "360_SO31_004_11_3_2_1_24P",
 "id": "media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0",
 "pitch": 0,
 "loop": false,
 "partial": false,
 "hfov": 360,
 "class": "Video360",
 "hfovMax": 140,
 "hfovMin": 60,
 "vfov": 180,
 "thumbnailUrl": "media/media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0_t.jpg",
 "video": [
  {
   "width": 3840,
   "url": "media/media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0.m3u8",
   "bitrate": 10074,
   "posterURL": "media/media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0_poster.jpg",
   "class": "Video360Resource",
   "type": "application/x-mpegurl",
   "height": 1920,
   "framerate": 24
  },
  {
   "width": 3840,
   "url": "media/media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0.mp4",
   "bitrate": 10074,
   "posterURL": "media/media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0_poster.jpg",
   "class": "Video360Resource",
   "type": "video/mp4",
   "height": 1920,
   "framerate": 24
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_4081D0BC_5819_AE92_41A2_D47FCA4A3395",
 "initialPosition": {
  "yaw": -0.63,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "viewerArea": "this.MapViewer",
 "id": "MapViewerMapPlayer",
 "movementMode": "constrained",
 "class": "MapPlayer"
},
{
 "label": "\ubc30\ud5a5\uacf5\uc2e0\ub2f9",
 "id": "panorama_3326AF10_3FEF_3CF3_418E_9395E076674D",
 "mapLocations": [
  {
   "map": "this.map_98DB5317_3BFB_3DDF_41C4_19EF616EB473",
   "x": 375.37,
   "angle": 189.79,
   "class": "PanoramaMapLocation",
   "y": 586.37
  }
 ],
 "pitch": 0,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/f/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/u/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/r/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/b/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/d/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_0/l/1/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512,
      "rowCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "hfovMax": 135,
 "overlays": [
  "this.overlay_46333C32_4911_D164_41C2_90A86E6B5471",
  "this.popup_583A5A3D_44A6_F51A_41B1_1956C48EE782",
  "this.overlay_59E246DE_484D_3721_41C3_2BE3F6605A32",
  "this.panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_tcap0"
 ],
 "hfovMin": "200%",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
   "yaw": 155.84,
   "distance": 1,
   "backwardYaw": 132.82,
   "class": "AdjacentPanorama"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_40C8E0EA_5819_AEB6_41D3_5EC37FE09F46",
 "initialPosition": {
  "yaw": 179.99,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_98DB5317_3BFB_3DDF_41C4_19EF616EB473",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_4FF6A021_5819_ADB2_419F_AF5D4240C726",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_40365074_5819_AD92_41CF_7937F319C8C8",
 "initialPosition": {
  "yaw": -24.16,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "items": [
  {
   "media": "this.media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0",
   "class": "Video360PlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uid4FEEC01D_5819_AD92_418A_556E318E263EPanoramaPlayer)",
   "camera": "this.media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0_camera",
   "player": "this.viewer_uid4FEEC01D_5819_AD92_418A_556E318E263EPanoramaPlayer",
   "start": "this.viewer_uid4FEEC01D_5819_AD92_418A_556E318E263EPanoramaPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_41800001_57EA_AD72_41CE_77554ECA149A, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_41800001_57EA_AD72_41CE_77554ECA149A, 0)"
  }
 ],
 "id": "playList_41800001_57EA_AD72_41CE_77554ECA149A",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_4016A043_5819_ADF6_41CB_B1C82606A45E",
 "initialPosition": {
  "yaw": -47.18,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "popupMaxWidth": "95%",
 "rotationX": 0,
 "hfov": 9.04,
 "class": "PopupPanoramaOverlay",
 "rotationY": 0,
 "id": "popup_58AE0360_57EA_93B2_41C9_C90E2A283C70",
 "popupMaxHeight": "95%",
 "rotationZ": 0,
 "loop": false,
 "showEasing": "cubic_in",
 "showDuration": 500,
 "pitch": 37.36,
 "popupDistance": 100,
 "autoplay": true,
 "yaw": 1.2,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "video": {
  "width": 1920,
  "mp4Url": "media/video_585F0C11_57EA_7592_41B8_756638AAAC61.mp4",
  "height": 1080,
  "class": "VideoResource"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_4062F0A0_5819_AEB2_41C1_FC339B76819A",
 "initialPosition": {
  "yaw": -179.43,
  "hfov": 120,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "popupMaxWidth": "50%",
 "rotationX": 0,
 "hfov": 28.73,
 "class": "PopupPanoramaOverlay",
 "rotationY": 0,
 "id": "popup_583A5A3D_44A6_F51A_41B1_1956C48EE782",
 "popupMaxHeight": "50%",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "image": {
  "levels": [
   {
    "url": "media/popup_583A5A3D_44A6_F51A_41B1_1956C48EE782_0_2.png",
    "width": 1024,
    "height": 275,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 2.08,
 "popupDistance": 100,
 "yaw": 8.41,
 "hideEasing": "cubic_out",
 "showDuration": 500,
 "hideDuration": 500
},
{
 "popupMaxWidth": "95%",
 "rotationX": 0,
 "hfov": 4.56,
 "class": "PopupPanoramaOverlay",
 "rotationY": 0,
 "id": "popup_4DCCD8EE_4347_5D61_41C7_A15139392B70",
 "popupMaxHeight": "95%",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "image": {
  "levels": [
   {
    "url": "media/popup_4DCCD8EE_4347_5D61_41C7_A15139392B70_0_1.png",
    "width": 1024,
    "height": 786,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 29.82,
 "popupDistance": 100,
 "yaw": 2.99,
 "hideEasing": "cubic_out",
 "showDuration": 500,
 "hideDuration": 500
},
{
 "autoplay": true,
 "loop": true,
 "audio": {
  "oggUrl": "media/audio_36703AAB_3DE4_CC4F_41CD_7AC3E7E4C9E6.ogg",
  "class": "AudioResource",
  "mp3Url": "media/audio_36703AAB_3DE4_CC4F_41CD_7AC3E7E4C9E6.mp3"
 },
 "class": "MediaAudio",
 "id": "audio_36703AAB_3DE4_CC4F_41CD_7AC3E7E4C9E6",
 "data": {
  "label": "S_SMA_TR03 More and More"
 }
},
{
 "class": "Video",
 "label": "\uad6c\uae00\uc5b4\uc2a4\uc2a4\ud29c\ub514\uc624_\uadf8\ub79c\ub4dc \ucf00\ub2c8\uc5b8 \uad6d\ub9bd\uacf5\uc6d0",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "id": "video_585F0C11_57EA_7592_41B8_756638AAAC61",
 "thumbnailUrl": "media/video_585F0C11_57EA_7592_41B8_756638AAAC61_t.jpg",
 "height": 1080,
 "video": {
  "width": 1920,
  "mp4Url": "media/video_585F0C11_57EA_7592_41B8_756638AAAC61.mp4",
  "height": 1080,
  "class": "VideoResource"
 }
},
{
 "progressBorderColor": "#000000",
 "data": {
  "name": "Main Viewer"
 },
 "id": "MainViewer",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingLeft": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipBorderColor": "#FFFFFF",
 "right": -0.35,
 "toolTipShadowSpread": 0,
 "toolTipOpacity": 1,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "2.5vmin",
 "width": "99.975%",
 "playbackBarHeight": 10,
 "minHeight": 50,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "toolTipPaddingBottom": 8,
 "toolTipFontWeight": "bold",
 "playbackBarProgressBorderSize": 0,
 "minWidth": 100,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "borderSize": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "shadow": false,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "toolTipFontStyle": "normal",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipFontFamily": "나눔스퀘어",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "paddingRight": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "displayTooltipInTouchScreens": true,
 "toolTipFontColor": "#FFFFFF",
 "toolTipBackgroundColor": "#000000",
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarOpacity": 1,
 "bottom": "0%",
 "top": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "transitionDuration": 500,
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 8,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "paddingTop": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingRight": 8,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipPaddingTop": 8,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipBorderRadius": 3,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipShadowVerticalLength": 0,
 "progressBarBorderColor": "#000000",
 "toolTipShadowHorizontalLength": 0
},
{
 "progressBorderColor": "#000000",
 "data": {
  "name": "MapViewer"
 },
 "id": "MapViewer",
 "left": "1.57%",
 "paddingLeft": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#FFFFFF",
 "right": "69.21%",
 "toolTipShadowSpread": 0,
 "toolTipOpacity": 1,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.5vmin",
 "playbackBarHeight": 10,
 "minHeight": 1,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "toolTipPaddingBottom": 8,
 "toolTipFontWeight": "bold",
 "playbackBarProgressBorderSize": 0,
 "minWidth": 1,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "borderSize": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "shadow": false,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipFontFamily": "나눔스퀘어",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "paddingRight": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "displayTooltipInTouchScreens": true,
 "toolTipFontColor": "#FFFFFF",
 "toolTipBackgroundColor": "#000000",
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarOpacity": 1,
 "bottom": "2.07%",
 "top": "49.82%",
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "transitionDuration": 500,
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 8,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "paddingTop": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingRight": 8,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipPaddingTop": 8,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipBorderRadius": 3,
 "visible": false,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipShadowVerticalLength": 0,
 "progressBarBorderColor": "#000000",
 "toolTipShadowHorizontalLength": 0
},
{
 "layout": "vertical",
 "data": {
  "name": "ThumbnailList35762"
 },
 "id": "ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873",
 "itemThumbnailShadowVerticalLength": 3,
 "paddingLeft": 0,
 "itemLabelHorizontalAlign": "center",
 "right": "1.34%",
 "width": 91.2,
 "itemLabelFontFamily": "Arial",
 "minHeight": 20,
 "rollOverItemBackgroundOpacity": 0,
 "itemThumbnailOpacity": 1,
 "minWidth": 20,
 "scrollBarWidth": 10,
 "itemPaddingRight": 3,
 "itemHorizontalAlign": "center",
 "scrollBarMargin": 2,
 "itemThumbnailShadowOpacity": 0.54,
 "height": 738.05,
 "selectedItemLabelFontColor": "#FFCC00",
 "itemBackgroundOpacity": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "itemPaddingTop": 3,
 "itemThumbnailShadowSpread": 1,
 "itemBackgroundColor": [],
 "itemLabelGap": 6,
 "itemBackgroundColorRatios": [],
 "propagateClick": false,
 "rollOverItemLabelFontWeight": "bold",
 "itemLabelPosition": "bottom",
 "itemThumbnailShadow": true,
 "paddingRight": 0,
 "itemThumbnailShadowHorizontalLength": 3,
 "itemLabelFontWeight": "normal",
 "itemBorderRadius": 0,
 "itemLabelTextDecoration": "none",
 "itemThumbnailShadowBlurRadius": 8,
 "class": "ThumbnailList",
 "itemPaddingLeft": 3,
 "itemLabelFontSize": 14,
 "itemThumbnailScaleMode": "fit_outside",
 "playList": "this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873_playlist",
 "bottom": "8.62%",
 "itemOpacity": 1,
 "scrollBarColor": "#FFFFFF",
 "itemThumbnailBorderRadius": 5,
 "itemLabelFontColor": "#FFFFFF",
 "gap": 0,
 "paddingBottom": 0,
 "itemThumbnailHeight": 55,
 "itemBackgroundColorDirection": "vertical",
 "selectedItemLabelFontWeight": "bold",
 "verticalAlign": "top",
 "paddingTop": 0,
 "borderRadius": 5,
 "itemThumbnailWidth": 61,
 "itemPaddingBottom": 3,
 "visible": false,
 "horizontalAlign": "left",
 "itemThumbnailShadowColor": "#000000",
 "itemMode": "normal",
 "itemLabelFontStyle": "normal",
 "itemVerticalAlign": "middle"
},
{
 "maxHeight": 128,
 "maxWidth": 128,
 "id": "IconButton_4CB3D624_437C_7DE3_41B5_894BCC8B5F59",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "1.46%",
 "width": 37.65,
 "minHeight": 1,
 "class": "IconButton",
 "transparencyActive": true,
 "minWidth": 1,
 "top": "2.8%",
 "mode": "toggle",
 "height": 34,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "shadow": false,
 "horizontalAlign": "center",
 "cursor": "hand",
 "propagateClick": false,
 "data": {
  "name": "IconButton1493"
 },
 "iconURL": "skin/IconButton_4CB3D624_437C_7DE3_41B5_894BCC8B5F59.png"
},
{
 "maxHeight": 64,
 "maxWidth": 64,
 "id": "Image_562AA81F_4345_BCDF_41B2_7D1C43191DC0",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "7.26%",
 "url": "skin/Image_562AA81F_4345_BCDF_41B2_7D1C43191DC0.png",
 "width": "2.334%",
 "minHeight": 1,
 "class": "Image",
 "bottom": "92.95%",
 "minWidth": 1,
 "top": "2.46%",
 "click": "if(!this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873.get('visible')){ this.setComponentVisibility(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873, true, 0, this.effect_6353A5D8_4375_0435_41B7_34787061D6D6, 'showEffect', false) } else { this.setComponentVisibility(this.ThumbnailList_3110C4FE_3FEE_AA94_41CF_038F42695873, false, 0, this.effect_6353B5D8_4375_0435_41A6_5A4BC2F5614A, 'hideEffect', false) }",
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "shadow": false,
 "scaleMode": "fit_inside",
 "horizontalAlign": "center",
 "propagateClick": false,
 "data": {
  "name": "Image5191"
 }
},
{
 "id": "IconButton_2DA98648_3FAE_FE10_41C2_2831605922EE",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "4.32%",
 "width": 40.9,
 "minHeight": 0,
 "class": "IconButton",
 "transparencyActive": true,
 "top": "2.8%",
 "minWidth": 0,
 "mode": "toggle",
 "height": 38.25,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_2DA98648_3FAE_FE10_41C2_2831605922EE_pressed.png",
 "horizontalAlign": "center",
 "cursor": "hand",
 "propagateClick": false,
 "data": {
  "name": "Button53070"
 },
 "iconURL": "skin/IconButton_2DA98648_3FAE_FE10_41C2_2831605922EE.png"
},
{
 "maxHeight": 64,
 "maxWidth": 64,
 "id": "Image_57653967_4347_7F6F_4166_5A375DABB586",
 "left": "3.38%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "url": "skin/Image_57653967_4347_7F6F_4166_5A375DABB586.png",
 "width": "2.829%",
 "minHeight": 1,
 "class": "Image",
 "bottom": "5.86%",
 "minWidth": 1,
 "top": "89.34%",
 "click": "if(!this.MapViewer.get('visible')){ this.setComponentVisibility(this.MapViewer, true, 0, this.effect_5659CABD_4345_5DE3_41C1_5D443960365D, 'showEffect', false) } else { this.setComponentVisibility(this.MapViewer, false, 0, this.effect_5659BABD_4345_5DE3_41B1_4057E1D5D6C7, 'hideEffect', false) }",
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "shadow": false,
 "scaleMode": "fit_inside",
 "horizontalAlign": "center",
 "propagateClick": false,
 "data": {
  "name": "Image4456"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "veilPopupPanorama",
 "left": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 0,
 "class": "UIComponent",
 "bottom": 0,
 "minWidth": 0,
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "top": 0,
 "backgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "backgroundOpacity": 0.55,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "propagateClick": false,
 "data": {
  "name": "UIComponent18810"
 }
},
{
 "backgroundColorRatios": [],
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 0,
 "class": "ZoomImage",
 "bottom": 0,
 "minWidth": 0,
 "top": 0,
 "backgroundColor": [],
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "shadow": false,
 "scaleMode": "custom",
 "visible": false,
 "propagateClick": false,
 "data": {
  "name": "ZoomImage18811"
 }
},
{
 "fontFamily": "Arial",
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "layout": "horizontal",
 "data": {
  "name": "CloseButton18812"
 },
 "id": "closeButtonPopupPanorama",
 "iconBeforeLabel": true,
 "paddingLeft": 5,
 "paddingRight": 5,
 "right": 10,
 "backgroundColorDirection": "vertical",
 "shadowColor": "#000000",
 "pressedIconColor": "#888888",
 "minHeight": 0,
 "class": "CloseButton",
 "iconColor": "#000000",
 "borderColor": "#000000",
 "top": 10,
 "minWidth": 0,
 "shadowBlurRadius": 6,
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "fontSize": "1.29vmin",
 "label": "",
 "mode": "push",
 "rollOverIconColor": "#666666",
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingBottom": 5,
 "shadowSpread": 1,
 "paddingTop": 5,
 "borderSize": 0,
 "backgroundOpacity": 0.3,
 "verticalAlign": "middle",
 "iconWidth": 20,
 "fontColor": "#FFFFFF",
 "borderRadius": 0,
 "shadow": false,
 "gap": 5,
 "visible": false,
 "horizontalAlign": "center",
 "fontStyle": "normal",
 "textDecoration": "none",
 "iconHeight": 20,
 "cursor": "hand",
 "propagateClick": false,
 "fontWeight": "normal",
 "iconLineWidth": 5
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -147.83,
   "hfov": 9.96,
   "pitch": 5.2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4, this.camera_408F50C5_5819_AEF2_41D1_A362CF62AD04); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_4511AD5E_57F6_B78E_41C5_B2528D942BC8",
   "pitch": 5.2,
   "yaw": -147.83,
   "hfov": 9.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_333B5203_3FEF_04D5_41C6_2B6326459E1B",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_1_HS_6_0_0_map.gif",
      "width": 21,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 0.03,
   "hfov": 26.99,
   "pitch": 1.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "\uc778\uac04\uc758 \uc0b6\uacfc \uc0dd\ud65c\uc5d0 \uad00\uc5ec\ud558\ub294 \u000a\uc77c\uacf1 \uc2e0\uc744 \uc704\ud574 \uc81c\uc0ac\ub97c \uc9c0\ub0b4\ub294 \uacf3",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_1_HS_6_0.png",
      "width": 299,
      "height": 218,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.46,
   "yaw": 0.03
  }
 ],
 "id": "overlay_460E6E35_4911_D16C_41C9_322A4BF87249",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "angle": 0,
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "id": "panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_tcap0",
 "distance": 50,
 "image": {
  "levels": [
   {
    "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_5_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 132.82,
   "hfov": 9.34,
   "pitch": -4.92,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3326AF10_3FEF_3CF3_418E_9395E076674D, this.camera_40365074_5819_AD92_41CF_7937F319C8C8); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_452C6D5C_57F6_B792_41B8_85003241B8D8",
   "pitch": -4.92,
   "yaw": 132.82,
   "hfov": 9.34,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_33512189_3FEF_07D5_41AF_4CA09E6C3635",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_7_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -79.97,
   "hfov": 9.35,
   "pitch": -4.02,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E, this.camera_40552091_5819_AE92_41BD_6E84F111F4EC); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_452C3D5D_57F6_B792_41B3_ACB6C75A975D",
   "pitch": -4.02,
   "yaw": -79.97,
   "hfov": 9.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_33511189_3FEF_07D5_41C1_F8DC1D054C6B",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_8_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -0.01,
   "hfov": 9.37,
   "pitch": 0.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5, this.camera_407070AE_5819_AE8E_41CB_4E00A277D0C9); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_452CCD5D_57F6_B792_41D4_230F4026BDA3",
   "pitch": 0.75,
   "yaw": -0.01,
   "hfov": 9.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_33516189_3FEF_07D5_4191_633263E7FA4C",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_9_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -127.64,
   "hfov": 9.35,
   "pitch": -4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57, this.camera_40476082_5819_AD76_41C2_46F101AEDB69); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_452C8D5D_57F6_B792_41B8_2B8F1FFEBA2A",
   "pitch": -4,
   "yaw": -127.64,
   "hfov": 9.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_33514189_3FEF_07D5_41C4_6B5790F03EA8",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_40_0_0_map.gif",
      "width": 24,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -0.14,
   "hfov": 20.25,
   "pitch": 26.02,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_40_0.png",
      "width": 180,
      "height": 117,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 26.02,
   "yaw": -0.14
  }
 ],
 "id": "overlay_47C8EA7B_4910_71E4_41B1_54F1A291FAC6",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_10_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 2.99,
   "hfov": 4.56,
   "pitch": 29.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_4DCCD8EE_4347_5D61_41C7_A15139392B70, {'rollOverBorderSize':0,'pressedIconWidth':20,'pressedBorderSize':0,'pressedIconColor':'#888888','rollOverIconWidth':20,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconHeight':20,'paddingBottom':5,'paddingLeft':5,'paddingRight':5,'paddingTop':5,'pressedBackgroundColorDirection':'vertical','borderSize':0,'backgroundOpacity':0.3,'rollOverIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical','iconHeight':20,'iconWidth':20,'pressedBackgroundOpacity':0.3,'rollOverBorderColor':'#000000','iconColor':'#000000','rollOverIconColor':'#666666','backgroundColorDirection':'vertical','pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'iconLineWidth':5,'borderColor':'#000000','pressedBorderColor':'#000000','pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundOpacity':0.3,'backgroundColorRatios':[0,0.09803921568627451,1],'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1]}, this.ImageResource_52FFF024_4345_ACE1_41C1_FD3C31F88BEB, null, null, null, null, false); this.playGlobalAudioWhilePlay(this.mainPlayList, 2, this.audio_0243F00B_3919_1BB7_41CC_5410EA18FBC6, undefined)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_452F1D5D_57F6_B792_41D4_5E1F396DBA27",
   "pitch": 29.82,
   "yaw": 2.99,
   "hfov": 4.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3350A189_3FEF_07D5_41CB_D75AC6C6D231",
 "data": {
  "label": "Info 02"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_12_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 179.82,
   "hfov": 10,
   "pitch": 1.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE, this.camera_4062F0A0_5819_AEB2_41C1_FC339B76819A); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_452FCD5D_57F6_B792_41D5_53493131C477",
   "pitch": 1.56,
   "yaw": 179.82,
   "hfov": 10,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_33508189_3FEF_07D5_41BF_5A1D2001CBB4",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "id": "overlay_3350C189_3FEF_07D5_41B5_E92EC747AF60",
 "bleachingDistance": 0.4,
 "pitch": 65.97,
 "class": "LensFlarePanoramaOverlay",
 "yaw": 130.74,
 "bleaching": 0.7
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_41_0_0_map.gif",
      "width": 30,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -74.23,
   "hfov": 24.57,
   "pitch": 10.67,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_41_0.png",
      "width": 199,
      "height": 103,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 10.67,
   "yaw": -74.23
  }
 ],
 "id": "overlay_46CDCEDD_4910_EEDC_41D1_DDD820182157",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_42_0_0_map.gif",
      "width": 25,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 137.13,
   "hfov": 24.87,
   "pitch": 5.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_42_0.png",
      "width": 199,
      "height": 126,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.82,
   "yaw": 137.13
  }
 ],
 "id": "overlay_46368E5E_4910_D1DC_41B2_CDE2BB93C7EE",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_43_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -133.92,
   "hfov": 24.76,
   "pitch": 7.91,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_43_0.png",
      "width": 199,
      "height": 155,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.91,
   "yaw": -133.92
  }
 ],
 "id": "overlay_46438F75_4910_AFEC_41B3_177426B8571A",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "angle": 0,
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "id": "panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_tcap0",
 "distance": 50,
 "image": {
  "levels": [
   {
    "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_1_HS_3_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 0.57,
   "hfov": 9.36,
   "pitch": -3.5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4, this.camera_40AA30D8_5819_AE92_41C3_149E521B7338); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_452D4D5C_57F6_B792_41CA_4B81385C4014",
   "pitch": -3.5,
   "yaw": 0.57,
   "hfov": 9.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_33280DF3_3FEF_1F35_41CA_D94DB0424BA7",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_1_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 179.82,
   "hfov": 10,
   "pitch": 1.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E, this.camera_409CC0CE_5819_AE8E_41D3_05C3684043F0); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_452D1D5C_57F6_B792_41AA_53487A0CFC44",
   "pitch": 1.56,
   "yaw": 179.82,
   "hfov": 10,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_33281DF3_3FEF_1F35_41CD_99C169A71A85",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_1_HS_12_0_0_map.gif",
      "width": 22,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 0.05,
   "hfov": 20.08,
   "pitch": 36.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_1_HS_12_0.png",
      "width": 200,
      "height": 144,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 36.57,
   "yaw": 0.05
  }
 ],
 "id": "overlay_4612D20A_4910_7124_41D1_83657FF5E984",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "angle": 0,
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "id": "panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_tcap0",
 "distance": 50,
 "image": {
  "levels": [
   {
    "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false
},
{
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea18809"
 },
 "id": "viewer_uid4FEEC01D_5819_AD92_418A_556E318E263E",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingLeft": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "toolTipOpacity": 1,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "width": "100%",
 "playbackBarHeight": 10,
 "minHeight": 50,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "minWidth": 100,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "borderSize": 0,
 "height": "100%",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "shadow": false,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipFontFamily": "Arial",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "paddingRight": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "displayTooltipInTouchScreens": true,
 "toolTipFontColor": "#606060",
 "toolTipBackgroundColor": "#F6F6F6",
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "transitionDuration": 500,
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 6,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "paddingTop": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingRight": 6,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipPaddingTop": 4,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipBorderRadius": 3,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipShadowVerticalLength": 0,
 "progressBarBorderColor": "#000000",
 "toolTipShadowHorizontalLength": 0
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 179.82,
   "hfov": 10,
   "pitch": -1.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4, this.camera_40200056_5819_AD9E_41D0_E44ACC6B243F); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_4510DD5F_57F6_B789_41D5_AEBCDF204A57",
   "pitch": -1.46,
   "yaw": 179.82,
   "hfov": 10,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_330C948B_3FF1_0DD5_41C6_DF17468F4EE6",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_1_HS_7_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -5.19,
   "hfov": 35.93,
   "pitch": 3.7,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "\ud0dc\uc870\uc758 4\ub300 \ucd94\uc874\uc655\uc758 \uc2e0\uc8fc\ub97c \ubaa8\uc2e0 \ubcc4\ubb18",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 35.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_1_HS_7_0.png",
      "width": 400,
      "height": 245,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.7,
   "yaw": -5.19
  }
 ],
 "id": "overlay_460CCB98_4910_5724_41B4_34FBBE409CF1",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "angle": 0,
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "id": "panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_tcap0",
 "distance": 50,
 "image": {
  "levels": [
   {
    "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_1_HS_2_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 179.37,
   "hfov": 9.34,
   "pitch": -5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_33289CC4_3FEF_1D53_419F_007869704957, this.camera_40BB80E1_5819_AEB2_41BE_B98DFC6FDC89); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_452F1D5E_57F6_B78E_41C6_AB1580F5FD7E",
   "pitch": -5,
   "yaw": 179.37,
   "hfov": 9.34,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3350E5FA_3FEF_0F37_41CA_D0F68D954A77",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -121.74,
   "hfov": 9.77,
   "pitch": -12.36,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4, this.camera_40C8E0EA_5819_AEB6_41D3_5EC37FE09F46); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_452FBD5E_57F6_B78E_41C4_D4E6BCDC0F0C",
   "pitch": -12.36,
   "yaw": -121.74,
   "hfov": 9.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3350C5FA_3FEF_0F37_41C8_A832CFB2D2D5",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_1_HS_9_0_0_map.gif",
      "width": 44,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -0.18,
   "hfov": 24.96,
   "pitch": -3.43,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_1_HS_9_0.png",
      "width": 200,
      "height": 72,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.43,
   "yaw": -0.18
  }
 ],
 "id": "overlay_46383233_4911_B164_41CB_0E0418E182F6",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "angle": 0,
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "id": "panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_tcap0",
 "distance": 50,
 "image": {
  "levels": [
   {
    "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false
},
{
 "map": {
  "width": 70,
  "x": 400.1,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_18_map.gif",
     "width": 17,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 63.85,
  "y": 924.56
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 400.1,
  "y": 924.56,
  "class": "HotspotMapOverlayImage",
  "width": 70,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_18.png",
     "width": 70,
     "height": 63,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 63.85
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_C1E31626_3B09_27F1_41CB_18BA6DF8E970",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "toolTip": "\uc885\ubb18",
   "class": "HotspotMapOverlayArea"
  }
 ]
},
{
 "map": {
  "width": 70,
  "x": 281.93,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_19_map.gif",
     "width": 17,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 63.85,
  "y": 540.13
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 281.93,
  "y": 540.13,
  "class": "HotspotMapOverlayImage",
  "width": 70,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_19.png",
     "width": 70,
     "height": 63,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 63.85
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_C05B7046_3B09_FBB1_41B4_4AB4CDED2AC5",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "toolTip": "\uc815\uc804\ub0a8\uc2e0\ubb38",
   "class": "HotspotMapOverlayArea"
  }
 ]
},
{
 "map": {
  "width": 70,
  "x": 298.84,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_20_map.gif",
     "width": 17,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 63.85,
  "y": 490.76
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 298.84,
  "y": 490.76,
  "class": "HotspotMapOverlayImage",
  "width": 70,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_20.png",
     "width": 70,
     "height": 63,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 63.85
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_C6BA80B1_3B09_1CD3_41B8_751B87845CFD",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "toolTip": "\uc815\uc804",
   "class": "HotspotMapOverlayArea"
  }
 ]
},
{
 "map": {
  "width": 70,
  "x": 340.37,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_21_map.gif",
     "width": 17,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 63.85,
  "y": 554.44
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 340.37,
  "y": 554.44,
  "class": "HotspotMapOverlayImage",
  "width": 70,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_21.png",
     "width": 70,
     "height": 63,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 63.85
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_C72B2C0E_3B09_2BB1_41A9_61C580F5B7B1",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "toolTip": "\uacf5\uc2e0\ub2f9",
   "class": "HotspotMapOverlayArea"
  }
 ]
},
{
 "map": {
  "width": 70,
  "x": 215.72,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_22_map.gif",
     "width": 17,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 63.85,
  "y": 498.6
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 215.72,
  "y": 498.6,
  "class": "HotspotMapOverlayImage",
  "width": 70,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_22.png",
     "width": 70,
     "height": 63,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 63.85
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_C53C2A0A_3B09_2FB1_41B5_EFD282EB2FD6",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "toolTip": "\uce60\uc0ac\ub2f9",
   "class": "HotspotMapOverlayArea"
  }
 ]
},
{
 "map": {
  "width": 70,
  "x": 145.56,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_23_map.gif",
     "width": 17,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 63.85,
  "y": 347.91
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 145.56,
  "y": 347.91,
  "class": "HotspotMapOverlayImage",
  "width": 70,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_23.png",
     "width": 70,
     "height": 63,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 63.85
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_3AC1A423_3B09_1BF7_41B5_552B0C6303A6",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "toolTip": "\uc601\ub144\uc804",
   "class": "HotspotMapOverlayArea"
  }
 ]
},
{
 "map": {
  "width": 70,
  "x": 311.8,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_24_map.gif",
     "width": 17,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 63.85,
  "y": 423.25
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 311.8,
  "y": 423.25,
  "class": "HotspotMapOverlayImage",
  "width": 70,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_24.png",
     "width": 70,
     "height": 63,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 63.85
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_3AC1AE0A_3B09_67B1_41C7_676C9D38E35C",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "toolTip": "\uc2e0\uc2e41",
   "class": "HotspotMapOverlayArea"
  }
 ]
},
{
 "map": {
  "width": 70,
  "x": 359.87,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_25_map.gif",
     "width": 17,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 63.85,
  "y": 445.34
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 359.87,
  "y": 445.34,
  "class": "HotspotMapOverlayImage",
  "width": 70,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_25.png",
     "width": 70,
     "height": 63,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 63.85
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_3AC1B8CB_3B09_6CB7_41AB_75E89F274C89",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "toolTip": "\uc2e0\uc2e42",
   "class": "HotspotMapOverlayArea"
  }
 ]
},
{
 "map": {
  "width": 45.44,
  "x": 524.52,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_28_map.gif",
     "width": 19,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "offsetX": 0,
  "class": "HotspotMapOverlayMap",
  "offsetY": 0,
  "height": 37.26,
  "y": 209.24
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 524.52,
  "y": 209.24,
  "class": "HotspotMapOverlayImage",
  "width": 45.44,
  "image": {
   "levels": [
    {
     "url": "media/map_98DB5317_3BFB_3DDF_41C4_19EF616EB473_HS_28.png",
     "width": 45,
     "height": 37,
     "class": "ImageResourceLevel"
    }
   ],
   "class": "ImageResource"
  },
  "height": 37.26
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "id": "overlay_5ED295BB_459A_81CB_41A0_99829AA7A709",
 "areas": [
  {
   "click": "this.setComponentVisibility(this.MapViewer, false, 0, this.effect_5E49C718_459A_82D5_41BC_347F532C2491, 'hideEffect', false)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ]
},
{
 "camera": "this.panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4FF9D021_5819_ADB2_41D4_026A407369F9, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "media": "this.panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_4FF9D021_5819_ADB2_41D4_026A407369F9"
},
{
 "camera": "this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4FF97021_5819_ADB2_41C2_662D5A52C31E, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "media": "this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_4FF97021_5819_ADB2_41C2_662D5A52C31E"
},
{
 "camera": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4FF8F021_5819_ADB2_41CB_FD30EB7A2096, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "media": "this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_4FF8F021_5819_ADB2_41CB_FD30EB7A2096"
},
{
 "camera": "this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4FF87027_5819_ADBE_41C4_D6B5CB43265A, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "media": "this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_4FF87027_5819_ADBE_41C4_D6B5CB43265A"
},
{
 "camera": "this.panorama_33289CC4_3FEF_1D53_419F_007869704957_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4FFBF027_5819_ADBE_41B0_140D37025724, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "media": "this.panorama_33289CC4_3FEF_1D53_419F_007869704957",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_4FFBF027_5819_ADBE_41B0_140D37025724"
},
{
 "camera": "this.panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4FFB7027_5819_ADBE_41C4_E223050AA967, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "media": "this.panorama_3326AF10_3FEF_3CF3_418E_9395E076674D",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_4FFB7027_5819_ADBE_41C4_E223050AA967"
},
{
 "camera": "this.panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4FFAE027_5819_ADBE_41D4_BEA58B59EBF8, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "media": "this.panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_4FFAE027_5819_ADBE_41D4_BEA58B59EBF8"
},
{
 "camera": "this.panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4FFA6027_5819_ADBE_41D5_074F7CC2D1B3, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
 "media": "this.panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_4FFA6027_5819_ADBE_41D5_074F7CC2D1B3"
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_1_HS_3_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 2.16,
   "hfov": 9.08,
   "pitch": -14.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE, this.camera_402D5065_5819_ADB2_4162_C7C2FB85EA21); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_45229D52_57F6_B79B_41CA_35D1B3863C73",
   "pitch": -14.31,
   "yaw": 2.16,
   "hfov": 9.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_32E047E5_3FEF_0B5D_41C2_E8A68EB19F73",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_1_HS_25_0_0_map.gif",
      "width": 23,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 0.79,
   "hfov": 21.31,
   "pitch": 31.51,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_1_HS_25_0.png",
      "width": 199,
      "height": 137,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 31.51,
   "yaw": 0.79
  }
 ],
 "id": "overlay_4604D652_4917_D124_41C7_3E33A6EE9526",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "angle": 0,
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "id": "panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_tcap0",
 "distance": 50,
 "image": {
  "levels": [
   {
    "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0_HS_26_0_0_map.gif",
      "width": 33,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 1.2,
   "hfov": 9.04,
   "pitch": 37.36,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_58AE0360_57EA_93B2_41C9_C90E2A283C70, {'rollOverBorderSize':0,'pressedIconWidth':20,'pressedBorderSize':0,'pressedIconColor':'#888888','rollOverIconWidth':20,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconHeight':20,'paddingBottom':5,'paddingLeft':5,'paddingRight':5,'paddingTop':5,'pressedBackgroundColorDirection':'vertical','borderSize':0,'backgroundOpacity':0.3,'rollOverIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical','iconHeight':20,'iconWidth':20,'pressedBackgroundOpacity':0.3,'rollOverBorderColor':'#000000','iconColor':'#000000','rollOverIconColor':'#666666','backgroundColorDirection':'vertical','pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'iconLineWidth':5,'borderColor':'#000000','pressedBorderColor':'#000000','pressedIconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundOpacity':0.3,'backgroundColorRatios':[0,0.09803921568627451,1],'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1]}, true) } else { this.showPopupMedia(this.window_58377443_57EA_95F6_41C7_51F0B1DE8C78, this.video_585F0C11_57EA_7592_41B8_756638AAAC61, this.PlayList_45024D70_57F6_B792_41C0_52433678F260, '95%', '95%', true, true) }",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0_HS_26_0.png",
      "width": 91,
      "height": 44,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 37.36,
   "yaw": 1.2
  }
 ],
 "id": "overlay_59842199_57EE_AE92_41BC_CAAB9CB282C1",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0_HS_27_0_0_map.gif",
      "width": 33,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -19.39,
   "hfov": 8.17,
   "pitch": 38.94,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 8); this.MainViewerVideoPlayer.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0_HS_27_0.png",
      "width": 84,
      "height": 40,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 38.94,
   "yaw": -19.39
  }
 ],
 "id": "overlay_47123AF7_57FA_929E_41B5_BC3A285D44B7",
 "data": {
  "label": "Image"
 }
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0_HS_28_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 1.66,
   "hfov": 4.17,
   "pitch": 47.76,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9); this.MainViewerPanoramaPlayer.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0_HS_28_0.png",
      "width": 49,
      "height": 44,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 47.76,
   "yaw": 1.66
  }
 ],
 "id": "overlay_44D9C792_57FA_9296_41C5_9C2091E42F78",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0_HS_29_0_0_map.gif",
      "width": 20,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 18.37,
   "hfov": 4.83,
   "pitch": 44.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.showPopupMedia(this.window_4142C2FD_57EA_9292_41C1_E525FCCDA603, this.media_43C416A5_57EB_92B2_41C2_8DB94CFDE0D0, this.playList_41800001_57EA_AD72_41CE_77554ECA149A, '90%', '90%', false, true)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_0_HS_29_0.png",
      "width": 54,
      "height": 43,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 44.83,
   "yaw": 18.37
  }
 ],
 "id": "overlay_4305FFD6_57F9_B29E_41A4_C985AB7A3367",
 "data": {
  "label": "Image"
 }
},
{
 "progressBorderColor": "#000000",
 "data": {
  "name": "ViewerArea18808"
 },
 "id": "viewer_uid4FEC5017_5819_AD9E_41B2_0A5F549D6EE0",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingLeft": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "toolTipOpacity": 1,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "width": "100%",
 "playbackBarHeight": 10,
 "minHeight": 50,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "minWidth": 100,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "borderSize": 0,
 "height": "100%",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "shadow": false,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipFontFamily": "Arial",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "paddingRight": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "displayTooltipInTouchScreens": true,
 "toolTipFontColor": "#606060",
 "toolTipBackgroundColor": "#F6F6F6",
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "transitionDuration": 500,
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 6,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "paddingTop": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingRight": 6,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipPaddingTop": 4,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipBorderRadius": 3,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipShadowVerticalLength": 0,
 "progressBarBorderColor": "#000000",
 "toolTipShadowHorizontalLength": 0
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.viewer_uid4FEC5017_5819_AD9E_41B2_0A5F549D6EE0",
 "id": "viewer_uid4FEC5017_5819_AD9E_41B2_0A5F549D6EE0VideoPlayer",
 "class": "VideoPlayer"
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_1_HS_2_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 179.51,
   "hfov": 9.37,
   "pitch": -1.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5, this.camera_4081D0BC_5819_AE92_41A2_D47FCA4A3395); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_452E0D5E_57F6_B78E_41D5_36BC227D6130",
   "pitch": -1.46,
   "yaw": 179.51,
   "hfov": 9.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3328BCC4_3FEF_1D53_41C2_5D07A77A92F7",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 143.49,
   "hfov": 10,
   "pitch": -1.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_452EAD5E_57F6_B78E_41BB_740BA8EF4FEC",
   "pitch": -1.46,
   "yaw": 143.49,
   "hfov": 10,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_33286CC4_3FEF_1D53_41C4_AA6A2A79A97D",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "angle": 0,
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "id": "panorama_33289CC4_3FEF_1D53_419F_007869704957_tcap0",
 "distance": 50,
 "image": {
  "levels": [
   {
    "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_1_HS_9_0_0_map.gif",
      "width": 30,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 8.41,
   "hfov": 28.73,
   "pitch": 2.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_583A5A3D_44A6_F51A_41B1_1956C48EE782, {'rollOverBorderSize':0,'pressedIconWidth':15,'pressedBorderSize':0,'pressedIconColor':'#888888','rollOverIconWidth':15,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconHeight':15,'paddingBottom':5,'paddingLeft':5,'paddingRight':5,'paddingTop':5,'pressedBackgroundColorDirection':'vertical','borderSize':0,'backgroundOpacity':0.3,'rollOverIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical','iconHeight':15,'iconWidth':15,'pressedBackgroundOpacity':0.3,'rollOverBorderColor':'#000000','iconColor':'#000000','rollOverIconColor':'#666666','backgroundColorDirection':'vertical','pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'iconLineWidth':5,'borderColor':'#000000','pressedBorderColor':'#000000','pressedIconHeight':15,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundOpacity':0.3,'backgroundColorRatios':[0,0.09803921568627451,1],'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1]}, this.ImageResource_5896B006_44A6_94F6_41CF_1E37991F9803, null, null, null, this.audio_0243F00B_3919_1BB7_41CC_5410EA18FBC6, false)",
   "mapColor": "#FF0000",
   "toolTip": "\uc870\uc120\uc655\uc870 \ub54c \uacf5\ub85c\uac00 \ud070 \uc2e0\ud558\ub4e4\uc758\u000a\uc704\ud328\ub97c \ubaa8\uc2dc\uace0 \uc81c\uc0ac \uc9c0\ub0b4\ub358 \uacf3",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 28.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_1_HS_9_0.png",
      "width": 230,
      "height": 120,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.08,
   "yaw": 8.41
  }
 ],
 "id": "overlay_46333C32_4911_D164_41C2_90A86E6B5471",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_1_HS_7_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 155.84,
   "hfov": 9.94,
   "pitch": 6.11,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4, this.camera_4016A043_5819_ADF6_41CB_B1C82606A45E); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_45111D5E_57F6_B78E_41D4_2DCC24BE9EFD",
   "pitch": 6.11,
   "yaw": 155.84,
   "hfov": 9.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_59E246DE_484D_3721_41C3_2BE3F6605A32",
 "data": {
  "label": "Arrow 01b"
 },
 "enabledInCardboard": true
},
{
 "angle": 0,
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "rotate": false,
 "id": "panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_tcap0",
 "distance": 50,
 "image": {
  "levels": [
   {
    "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_tcap0.png",
    "width": 850,
    "height": 850,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "inertia": false
},
{
 "viewerArea": "this.viewer_uid4FEEC01D_5819_AD92_418A_556E318E263E",
 "mouseControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer",
 "displayPlaybackBar": true,
 "id": "viewer_uid4FEEC01D_5819_AD92_418A_556E318E263EPanoramaPlayer",
 "touchControlMode": "drag_rotation"
},
{
 "frameCount": 24,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_4511AD5E_57F6_B78E_41C5_B2528D942BC8",
 "levels": [
  {
   "url": "media/panorama_333B6203_3FEF_04D5_41BA_BDDC9ADA8D57_1_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
},
{
 "frameCount": 24,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_452C6D5C_57F6_B792_41B8_85003241B8D8",
 "levels": [
  {
   "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_5_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
},
{
 "frameCount": 24,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_452C3D5D_57F6_B792_41B3_ACB6C75A975D",
 "levels": [
  {
   "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_7_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
},
{
 "frameCount": 24,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_452CCD5D_57F6_B792_41D4_230F4026BDA3",
 "levels": [
  {
   "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_8_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
},
{
 "frameCount": 24,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_452C8D5D_57F6_B792_41B8_2B8F1FFEBA2A",
 "levels": [
  {
   "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_9_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
},
{
 "frameCount": 24,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_452F1D5D_57F6_B792_41D4_5E1F396DBA27",
 "levels": [
  {
   "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_10_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
},
{
 "frameCount": 24,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_452FCD5D_57F6_B792_41D5_53493131C477",
 "levels": [
  {
   "url": "media/panorama_3351C189_3FEF_07D5_41CF_86A6AB3792F4_1_HS_12_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
},
{
 "frameCount": 24,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_452D4D5C_57F6_B792_41CA_4B81385C4014",
 "levels": [
  {
   "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_1_HS_3_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
},
{
 "frameCount": 24,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_452D1D5C_57F6_B792_41AA_53487A0CFC44",
 "levels": [
  {
   "url": "media/panorama_3328FDF3_3FEF_1F35_4166_BF4005D1DFBE_1_HS_4_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
},
{
 "frameCount": 24,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_4510DD5F_57F6_B789_41D5_AEBCDF204A57",
 "levels": [
  {
   "url": "media/panorama_330C748B_3FF1_0DD5_41CB_D67AD84D735E_1_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
},
{
 "frameCount": 24,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_452F1D5E_57F6_B78E_41C6_AB1580F5FD7E",
 "levels": [
  {
   "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_1_HS_2_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
},
{
 "frameCount": 24,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_452FBD5E_57F6_B78E_41C4_D4E6BCDC0F0C",
 "levels": [
  {
   "url": "media/panorama_335085FA_3FEF_0F37_41C6_CEB2D6CD85A5_1_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
},
{
 "frameCount": 24,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_45229D52_57F6_B79B_41CA_35D1B3863C73",
 "levels": [
  {
   "url": "media/panorama_32E077E5_3FEF_0B5D_41C1_108BDCA62F3E_1_HS_3_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
},
{
 "frameCount": 9,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_452E0D5E_57F6_B78E_41D5_36BC227D6130",
 "levels": [
  {
   "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_1_HS_2_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 3
},
{
 "frameCount": 24,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_452EAD5E_57F6_B78E_41BB_740BA8EF4FEC",
 "levels": [
  {
   "url": "media/panorama_33289CC4_3FEF_1D53_419F_007869704957_1_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
},
{
 "frameCount": 24,
 "frameDuration": 62,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_45111D5E_57F6_B78E_41D4_2DCC24BE9EFD",
 "levels": [
  {
   "url": "media/panorama_3326AF10_3FEF_3CF3_418E_9395E076674D_1_HS_7_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6
}],
 "minHeight": 20,
 "vrPolyfillScale": 1,
 "class": "Player",
 "backgroundPreloadEnabled": true,
 "buttonToggleFullscreen": "this.IconButton_4CB3D624_437C_7DE3_41B5_894BCC8B5F59",
 "mobileMipmappingEnabled": false,
 "contentOpaque": false,
 "minWidth": 20,
 "scrollBarWidth": 10,
 "downloadEnabled": true,
 "scrollBarMargin": 2,
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "paddingTop": 0,
 "defaultVRPointer": "laser",
 "borderSize": 0,
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderRadius": 0,
 "shadow": false,
 "overflow": "visible",
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "buttonToggleMute": "this.IconButton_2DA98648_3FAE_FE10_41C2_2831605922EE",
 "propagateClick": false,
 "data": {
  "name": "Player513"
 },
 "scripts": {
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = undefined; if(mediaDispatcher){ var playListsWithMedia = this.getPlayListsWithMedia(mediaDispatcher, true); playListDispatcher = playListsWithMedia.indexOf(playList) != -1 ? playList : (playListsWithMedia.length > 0 ? playListsWithMedia[0] : undefined); } if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } item.bind('begin', onBeginFunction, self); this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "registerKey": function(key, value){  window[key] = value; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setOverlayBehaviour": function(overlay, media, action, preventDoubleClick){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(preventDoubleClick){ if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 1000); } }; if(preventDoubleClick && window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getFirstPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback, stopBackgroundAudio){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } var src = this.playGlobalAudio(audio, endCallback); if(stopBackgroundAudio === true){ var stateChangeFunc = function(){ if(src.get('state') == 'playing'){ this.pauseGlobalAudios(src.get('id'), [src]); } else if(src.get('state') == 'stopped'){ this.resumeGlobalAudios(src.get('id')); src.unbind('stateChange', stateChangeFunc, this); } }; src.bind('stateChange', stateChangeFunc, this); } return src; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "keepCompVisible": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getPlayListsWithMedia": function(media, onlySelected){  var result = []; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) result.push(playList); } return result; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "unregisterKey": function(key){  delete window[key]; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getFirstPlayListWithMedia": function(media, onlySelected){  var playLists = this.getPlayListsWithMedia(media, onlySelected); return playLists.length > 0 ? playLists[0] : undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "existsKey": function(key){  return key in window; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getKey": function(key){  return window[key]; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "keepCompVisibleWhileInitItem": function(playList, index, component, keep){  var item = playList.get('items')[index]; var stopFunc = function() { item.unbind('stop', stopFunc, this, true); item.unbind('stop', stopFunc, this); item.unbind('begin', stopFunc, this, true); item.unbind('begin', stopFunc, this); this.keepCompVisible(component, !keep); }; this.keepCompVisible(component, keep); item.bind('stop', stopFunc, this, true); item.bind('stop', stopFunc, this); item.bind('begin', stopFunc, this, true); item.bind('begin', stopFunc, this); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; }
 }
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
