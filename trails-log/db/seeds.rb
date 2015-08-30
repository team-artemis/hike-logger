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
  trailhead_lon: "-122.639476",
  trailhead_lat: "37.897568",
  trailend_title:"Mt. Talmapais East Park",
  trailend_lon: "-122.582923",
  trailend_lat: "37.927665",
  user_id: 1
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
  trailhead_lon: "-122.747442",
  trailhead_lat: "37.934242",
  trailend_title:"Palomarin",
  trailend_lon: "-122.582923",
  trailend_lat: "37.927665",
  user_id: 2
  )

Trail.create(
  title: "Point Reyes Coast Trail to Alamere Falls",
  is_loop: true,
  length: 7.5,
  duration: "4 hours",
  difficulty: "Intermediate",
  review: "There is no shade, lots of exposure to the elements, and plenty of Elk. There's a waterfall too.",
  rating: 4,
  trailhead_title:"Florida",
  trailhead_lon: "-81.747442",
  trailhead_lat: "30.934242",
  trailend_title:"Palomarin",
  trailend_lon: "-81.582923",
  trailend_lat: "30.927665",
  user_id: 1
  )


