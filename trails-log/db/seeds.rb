# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

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
  firstname: "Bee",
  lastname: "Derek",
  email: "derek@test.com",
  city: "San Francisco",
  state: "CA",
  country: "USA",
  password: "pass"
)

Trail.create(
  title: "Stinson Beach to Mt. Tamalpais",
  length: 17.3,
  is_loop: false,
  duration: "Full day",
  difficulty: "Difficult",
  review: "It's a great time, I loved this trail. OMG! Bring a lot of water, and Karlie Kloss if you can.",
  rating: 5,
  trailhead_title:"Stinson Beach",
  trailhead_lon: -122.639476,
  trailhead_lat: 37.897568,
  trailend_lon: -122.582923,
  trailend_lat: 37.927665,
  user_id: 1,
  images: [
          ['https://i.imgur.com/O6QEpBs.jpg','The U.S. Capitol after the burning of Washington during the War of 1812'],
          ['https://i.imgur.com/xND1MND.jpg','Ford\'s Theatre in the 19th century, site of the 1865 assassination of President Lincoln'],
          ['https://i.imgur.com/EKJmqui.jpg','The National Cherry Blossom Festival is celebrated around the city each spring.']
          ]
  )

Trail.create(
  title: "Point Reyes Coast Trail to Alamere Falls",
  is_loop: true,
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
  user_id: 2
  )

Trail.create(
  title: "Floridian Hike",
  is_loop: true,
  length: 7.5,
  duration: "4 hours",
  difficulty: "Intermediate",
  review: "There is no shade, lots of exposure to the elements, and plenty of Elk. There's a waterfall too.",
  rating: 4,
  trailhead_title:"Florida",
  trailhead_lon: -81.747442,
  trailhead_lat: 30.934242,
  trailend_lon: -81.582923,
  trailend_lat: 30.927665,
  user_id: 1
  )

Trail.create(
  title: "White House Hike",
  is_loop: true,
  length: 7.5,
  duration: "4 hours",
  difficulty: "Intermediate",
  review: "There is no shade, lots of exposure to the elements, and plenty of Elk. There's a waterfall too.",
  rating: 4,
  trailhead_title:"Florida",
  trailhead_lon: -77.036530,
  trailhead_lat: 38.897676,
  trailend_lon: -81.582923,
  trailend_lat: 30.927665,
  user_id: 2
  )


