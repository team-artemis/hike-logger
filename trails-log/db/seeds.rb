User.create(
  firstname: "Taylor",
  lastname: "Swift",
  email: "Swifty1989@test.com",
  city: "Nashville",
  state: "TN",
  country: "USA",
  password: "password"
)

User.create(
  firstname: "Derek",
  lastname: "Gerson",
  email: "derekgrsn@gmail.com",
  city: "San Francisco",
  state: "CA",
  country: "USA",
  password: "pass"
)

User.create(
  firstname: "Andrew",
  lastname: "Patterson",
  email: "andrew.patterson.3001@gmail.com",
  city: "San Francisco",
  state: "CA",
  country: "USA",
  password: "pass"
)

User.create(
  firstname: "Ehtesham",
  lastname: "Khan",
  email: "ekhan15@gmail.com",
  city: "San Francisco",
  state: "CA",
  country: "USA",
  password: "pass"
)

User.create(
  firstname: "Daniela",
  lastname: "Schiana di Cola",
  email: "daschi87@gmail.com",
  city: "San Francisco",
  state: "CA",
  country: "USA",
  password: "pass"
)

User.create(
  firstname: "Canadian",
  lastname: "Travis",
  email: "trsiebenhaar@gmail.com",
  city: "San Francisco",
  state: "CA",
  country: "USA",
  password: "pass"
)

Trail.create(
  title: "Stinson Beach to Mt. Tamalpais",
  length: 17.3,
  duration: "Full day",
  difficulty: "Difficult",
  review: "It's a great time, I loved this trail. OMG! Bring a lot of water, and Karlie Kloss if you can.",
  rating: 5,
  trailhead_title:"Stinson Beach",
  trailhead_lon: -122.639476,
  trailhead_lat: 37.897568,
  trailend_lon: -122.582923,
  trailend_lat: 37.927665,
  waypoints: "-122.639476,37.897568;-122.582923,37.927665",
  user_id: 1,
  images: [
          ['http://2.bp.blogspot.com/-kw9YgQnbELY/Um6dt-GgdXI/AAAAAAAAB0o/VCErLESCKGE/s1600/mt-tamalpais-matt-davis-trail-staircase-big.jpg','A really big staircase on the Matt Davis Trail!'],
          ['http://www.boopidy.com/aj/lj/1-27-2006/trail__large_.jpg','How creepy! Am I in a horror movie starring Jonathon Taylor Thomas? I sure hope so.'],
          ['http://3.bp.blogspot.com/-zAm7BN6kPl4/T0x5xDp0rWI/AAAAAAAABFY/K0Ti2ONJw_Y/s1600/IMG_6393.JPG','I love plant.']
          ]
  )

Trail.create(
  title: "Point Reyes Coast Trail to Alamere Falls",
  length: 7.5,
  duration: "4 hours",
  difficulty: "Intermediate",
  review: "There is no shade, lots of exposure to the elements, and plenty of Elk. There's a waterfall too.",
  rating: 4,
  trailhead_title:"Palomarin",
  trailhead_lon: -122.747442,
  trailhead_lat: 37.934242,
  trailend_lon: -122.582923,
  trailend_lat: 37.927665,
  waypoints: "-122.747442,37.934242;-122.582923,37.927665",
  user_id: 2,
  images: [
        ['http://2.bp.blogspot.com/-kw9YgQnbELY/Um6dt-GgdXI/AAAAAAAAB0o/VCErLESCKGE/s1600/mt-tamalpais-matt-davis-trail-staircase-big.jpg','A really big staircase on the Matt Davis Trail!'],
        ['http://www.boopidy.com/aj/lj/1-27-2006/trail__large_.jpg','How creepy! Am I in a horror movie starring Jonathon Taylor Thomas? I sure hope so.'],
        ['http://3.bp.blogspot.com/-zAm7BN6kPl4/T0x5xDp0rWI/AAAAAAAABFY/K0Ti2ONJw_Y/s1600/IMG_6393.JPG','I love plant.']
        ]
  )

Trail.create(
  title: "Floridian Hike",
  length: 7.5,
  duration: "4 hours",
  difficulty: "Intermediate",
  review: "Never met a gater I didn't like!",
  rating: 4,
  trailhead_title:"Gator Farm",
  trailhead_lon: -81.747442,
  trailhead_lat: 30.934242,
  trailend_lon: -81.582923,
  trailend_lat: 30.927665,
  waypoints: "-81.747442,30.934242;-81.582923,30.927665",
  user_id: 1,
  images: [
        ['http://2.bp.blogspot.com/-kw9YgQnbELY/Um6dt-GgdXI/AAAAAAAAB0o/VCErLESCKGE/s1600/mt-tamalpais-matt-davis-trail-staircase-big.jpg','A really big staircase on the Matt Davis Trail!'],
        ['http://www.boopidy.com/aj/lj/1-27-2006/trail__large_.jpg','How creepy! Am I in a horror movie starring Jonathon Taylor Thomas? I sure hope so.'],
        ['http://3.bp.blogspot.com/-zAm7BN6kPl4/T0x5xDp0rWI/AAAAAAAABFY/K0Ti2ONJw_Y/s1600/IMG_6393.JPG','I love plant.']
        ]
  )

Trail.create(
  title: "Honolulu",
  length: 4.9,
  duration: "8 hours",
  difficulty: "Intermediate",
  review: "I saw the volcano up close.",
  rating: 4,
  trailhead_title:"Volcano",
  trailhead_lon: -157.857614,
  trailhead_lat: 21.304770,
  trailend_lon: -81.582923,
  trailend_lat: 30.927665,
  waypoints: "-157.857614,21.304770;-81.582923,30.927665",
  user_id: 2,
  images: [
        ['http://2.bp.blogspot.com/-kw9YgQnbELY/Um6dt-GgdXI/AAAAAAAAB0o/VCErLESCKGE/s1600/mt-tamalpais-matt-davis-trail-staircase-big.jpg','A really big staircase on the Matt Davis Trail!'],
        ['http://www.boopidy.com/aj/lj/1-27-2006/trail__large_.jpg','How creepy! Am I in a horror movie starring Jonathon Taylor Thomas? I sure hope so.'],
        ['http://3.bp.blogspot.com/-zAm7BN6kPl4/T0x5xDp0rWI/AAAAAAAABFY/K0Ti2ONJw_Y/s1600/IMG_6393.JPG','I love plant.']
        ]
  )

Trail.create(
  title: "Nashville",
  length: 1,
  duration: "1 hour",
  difficulty: "Intermediate",
  review: "Heard banjo music. Maybe it was the mountain man!",
  rating: 4,
  trailhead_title:"Waffle House Parking Lot",
  trailhead_lon: -86.778365,
  trailhead_lat: 36.167783,
  trailend_lon: -81.582923,
  trailend_lat: 30.927665,
  waypoints: "-86.778365,36.167783;-81.582923,30.927665",
  user_id: 3,
  images: [
        ['http://2.bp.blogspot.com/-kw9YgQnbELY/Um6dt-GgdXI/AAAAAAAAB0o/VCErLESCKGE/s1600/mt-tamalpais-matt-davis-trail-staircase-big.jpg','A really big staircase on the Matt Davis Trail!'],
        ['http://www.boopidy.com/aj/lj/1-27-2006/trail__large_.jpg','How creepy! Am I in a horror movie starring Jonathon Taylor Thomas? I sure hope so.'],
        ['http://3.bp.blogspot.com/-zAm7BN6kPl4/T0x5xDp0rWI/AAAAAAAABFY/K0Ti2ONJw_Y/s1600/IMG_6393.JPG','I love plant.']
        ]
  )

Trail.create(
  title: "Columbine Wilderness: Gold Hill",
  length: 6.2,
  duration: "6 hours",
  review: "We got stuck in a thunderstorm, but what is life without adversity?",
  rating: 10,
  trailhead_title: "New Mexico Hike",
  user_id: 4,
  trailhead_lon: -105.51555633544922,
  trailhead_lat: 36.67750930786133,
  trailend_lon: -105.45580291748047,
  trailend_lat: 36.64295959472656,
  waypoints: "-105.51555633544922,36.67750930786133;-105.45580291748047,36.64295959472656",
  images: [
        ['http://2.bp.blogspot.com/-kw9YgQnbELY/Um6dt-GgdXI/AAAAAAAAB0o/VCErLESCKGE/s1600/mt-tamalpais-matt-davis-trail-staircase-big.jpg','A really big staircase on the Matt Davis Trail!'],
        ['http://www.boopidy.com/aj/lj/1-27-2006/trail__large_.jpg','How creepy! Am I in a horror movie starring Jonathon Taylor Thomas? I sure hope so.'],
        ['http://3.bp.blogspot.com/-zAm7BN6kPl4/T0x5xDp0rWI/AAAAAAAABFY/K0Ti2ONJw_Y/s1600/IMG_6393.JPG','I love plant.']
        ]
  )

Trail.create(
  title: "Taft Point Trail",
  length: 3.1,
  duration: "2 hours",
  review: "Beautiful Views of the Valley!",
  rating: 8,
  trailhead_title: "Parking Lot",
  user_id: 5,
  trailhead_lon: -119.58438110351562,
  trailhead_lat: 37.72309875488281,
  trailend_lon: -119.60420989990234,
  trailend_lat: 37.712825775146484,
  waypoints: "-119.58438110351562,37.72309875488281;-119.58897113800049,37.72083080118816;-119.60420989990234,37.712825775146484",
  images: [
        ['http://2.bp.blogspot.com/-kw9YgQnbELY/Um6dt-GgdXI/AAAAAAAAB0o/VCErLESCKGE/s1600/mt-tamalpais-matt-davis-trail-staircase-big.jpg','A really big staircase on the Matt Davis Trail!'],
        ['http://www.boopidy.com/aj/lj/1-27-2006/trail__large_.jpg','How creepy! Am I in a horror movie starring Jonathon Taylor Thomas? I sure hope so.'],
        ['http://3.bp.blogspot.com/-zAm7BN6kPl4/T0x5xDp0rWI/AAAAAAAABFY/K0Ti2ONJw_Y/s1600/IMG_6393.JPG','I love plant.']
        ]
  )

Trail.create(
  title: "How Canadian Travis snuck across the border",
  length: 80.3,
  duration: "2 cold days on the run",
  review: "Evaded Border Patrol long enough, ya know, eh? I'm all a boat that American sodah!",
  rating: 1,
  trailhead_title: "Maple Syrup country",
  user_id: 6,
  trailhead_lon: -97.95674133300781,
  trailhead_lat: 49.43955993652344,
  trailend_lon: -98.30401611328125,
  trailend_lat: 48.22408676147461,
  waypoints: "-97.95674133300781,49.43955993652344;-98.30401611328125,48.22408676147461",
  images: [
        ['http://2.bp.blogspot.com/-kw9YgQnbELY/Um6dt-GgdXI/AAAAAAAAB0o/VCErLESCKGE/s1600/mt-tamalpais-matt-davis-trail-staircase-big.jpg','A really big staircase on the Matt Davis Trail!'],
        ['http://www.boopidy.com/aj/lj/1-27-2006/trail__large_.jpg','How creepy! Am I in a horror movie starring Jonathon Taylor Thomas? I sure hope so.'],
        ['http://3.bp.blogspot.com/-zAm7BN6kPl4/T0x5xDp0rWI/AAAAAAAABFY/K0Ti2ONJw_Y/s1600/IMG_6393.JPG','I love plant.']
        ]
  )