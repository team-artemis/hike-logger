# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150829030324) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "trails", force: :cascade do |t|
    t.string   "title"
    t.float    "length"
    t.string   "duration"
    t.string   "difficulty"
    t.string   "review"
    t.integer  "rating"
    t.string   "city"
    t.string   "state"
    t.string   "trailhead_title"
    t.decimal  "trailhead_lon"
    t.decimal  "trailhead_lat"
    t.decimal  "trailend_lon"
    t.decimal  "trailend_lat"
    t.string   "waypoints"
    t.string   "images",                       array: true
    t.integer  "user_id"
    t.integer  "map_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.string   "city"
    t.string   "state"
    t.string   "country"
    t.string   "password_digest"
    t.string   "email"
    t.string   "avatar_url"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
